let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
];

type ITreeObject = {
  id: number;
  pid: number;
  name?: string;
  children?: ITreeObject[];
}
const getTree = (result: ITreeObject[], arr: ITreeObject[], id: number) => {
  for (let item of arr) {
    if (item.pid === id) {
      const itemResult = { ...item, children: [] };
      result.push(itemResult);
      getTree(itemResult.children, arr, item.id);
    }
  }
}

const arrayToTree = (arr: ITreeObject[], id: number) => {
  const result: ITreeObject[] = [];
  getTree(result, arr, id);
  return result;
}

type ItemMap = {
  [id: number]: ITreeObject;
}
const arrayToTree2 = (arr: ITreeObject[]) => {
  const result: ITreeObject[] = [];
  const itemMap: ItemMap = {};
  for (let item of arr) {
    itemMap[item.id] = { ...item, children: [] };
  }
  for (let item of arr) {
    const id = item.id;
    const pid = item.pid;
    const treeItem = itemMap[id];
    if (pid === 0) {
      result.push(treeItem);
    } else {
      itemMap[pid]?.children?.push(treeItem);
    }
  }
  return result;
}
const test = arrayToTree2(arr);