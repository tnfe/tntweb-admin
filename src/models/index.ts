// 需要全局共享的model，提升到这里导出
// 然后全局可以使用 services/concent 里的 useC2Mode(modName) 来拿到目标模块了
export { default as $$global } from './global'; // 覆写concent内置的$$global模块
export { default as Counter } from './counter';
export { default as TodoList } from './todolist';
export { default as Demo } from './_demo';
