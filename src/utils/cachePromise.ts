const cachePromise = <T, S>(func:(value: T) => Promise<S>) => {
  const cache: any = {};
  return (value: T) => {
    let promise;
    let cacheKey = '';
    if (typeof value === 'object') {
      try {
        cacheKey = JSON.stringify(value);
      } catch {
        cacheKey = value as unknown as string;
      }
    }
    if (cache[cacheKey]) {
      promise = cache[cacheKey];
    } else {
      cache[cacheKey] = func(value);
      promise = cache[cacheKey];
    }
    return promise;
  }
}

export default cachePromise;
