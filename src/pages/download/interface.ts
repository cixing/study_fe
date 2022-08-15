interface IChunkTask {
  chunkName: string;
  chunkFile: File;
  hash: string;
  status: 'init' | 'uploading' | 'success' | 'error',
}
export { IChunkTask };