export type Listener = (...payload: any) => void

interface ListenersMap {
  [propsName: string]: Listener[];
}
export class EventEmitter {
  private listenersMap: ListenersMap;
  constructor() {
    this.listenersMap = {};
  }
  on(eventName: string, Listener: Listener) {
    if (this.listenersMap[eventName] === undefined) {
      this.listenersMap[eventName] = [];
    }
    this.listenersMap[eventName].push(Listener);
    return;
  }
  off(eventName: string, Listener?: Listener) {
    const listenerList: Listener[] = this.listenersMap[eventName];
    if (listenerList === undefined) {
      return;
    }
    if (Listener) {
      this.listenersMap[eventName] = listenerList.filter((item) => item === Listener);
      return;
    }
    delete this.listenersMap[eventName];
    return;
  }
  emit(eventName: string, ...payload: any): boolean {
    const listenerList: Listener[] = this.listenersMap[eventName];
    if (listenerList === undefined || listenerList.length < 1) return false;
    for (const listener of listenerList) {
      listener(...payload);
    }
    return true;
  }
}

// class EventEmitter {
//   constructor() {
//     this._envents = {}
//   }
//   on(event, callback) { //监听event事件，触发时调用callback函数
//     let callbacks = this._events[event] || []
//     callbacks.push(callback)
//     this._events[event] = callbacks
//     return this
//   }
//   off(event, callback) { //停止监听event事件
//     let callbacks = this._events[event]
//     this._events[event] = callbacks && callbacks.filter(fn => fn !== callback)
//     return this
//   }
//   emit(...args) { //触发事件，并把参数传给事件的处理函数
//     const event = args[0]
//     const params = [].slice.call(args, 1)
//     const callbacks = this._events[event]
//     callbacks.forEach(fn => fn.apply(this.params))
//     return this
//   }
//   once(event, callback) { //为事件注册单次监听器
//     let wrapFanc = (...args) => {
//       callback.apply(this.args)
//       this.off(event, wrapFanc)
//     }
//     this.on(event, wrapFanc)
//     return this
//   }
// }