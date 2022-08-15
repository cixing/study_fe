import { useState } from "react";
import md5Tool from 'js-md5';
import { IChunkTask } from "./interface";
import TaskQueue from "utils/queue";

const fileSizeUnit = 1014 * 1024;

async function getMd5(file: File): Promise<string> {
  const fileReader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    fileReader.readAsBinaryString(file);
    fileReader.onload = () => {
      const md5Hash = md5Tool.create();
      md5Hash.update(fileReader.result);
      const md5 = md5Hash.hex();
      resolve(md5);
    }
    fileReader.onerror = () => {
      reject('');
    }
  })
}

function getChunksFile(fileInfo: File, chunksSize: number = 5) {
  const tempChunks: File[] = [];
  if (fileInfo.size < chunksSize * fileSizeUnit) {
    tempChunks.push(fileInfo);
  }
  const chunksNum = Math.ceil((fileInfo.size / fileSizeUnit) / chunksSize);
  for(let i = 0; i < chunksNum; i++) {
    tempChunks.push(new File([fileInfo.slice(i * fileSizeUnit, (i+1) * fileSizeUnit)], 'chunkName'));
  }
  return tempChunks;
}

type IUploadFunction = (file: File) => Promise<string>;
const useUploader = (uploadFunction: IUploadFunction) => {
  const [chunks, setChunks] = useState<File[]>([]);

  const uploader = async (file: File, chunksSize: number, ConcurrentNum: number) => {
    const tempChunks = getChunksFile(file, chunksSize);
    const taskQueue = new TaskQueue({ maxInitNum: 3 });

    let res = await Promise.all(tempChunks.map((item) => getMd5(item)));
    res = res.filter((item) => !!item);
    if (res.length < tempChunks.length) {
      console.log('计算md5错误');
      return;
    }
    const tempChunksInfo: IChunkTask = res.map((item, index) => ({
      chunkName: tempChunks[index].name,
      chunkFile: tempChunks[index],
      hash: item,
      status: 'init',
    }));
    
    setChunks(getChunksFile(file, chunksSize));
  }
}