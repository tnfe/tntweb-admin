
/**
 * delare module names in this file
 */

// 用于处理分微前端场景，在动态加载新模块时，防止不同的子应用模块重复
// 推荐起一个和当前子应用同名的名字
// 如不需要前缀，这里写为 '' 即可\
export const MOD_PREFIX = '' as const;

const modName = <T extends string>(name: T) => `${MOD_PREFIX}${name}` as `${typeof MOD_PREFIX}${T}`;

export const DEMO = 'Demo' as const;
export type T_DEMO = typeof DEMO;

export const DEMO_TODO_LIST = modName('DemoTodoList');
export type T_DEMO_TODO_LIST = typeof DEMO_TODO_LIST;

export const DEMO_CLONED = modName('DemoCloned');
export type T_DEMO_CLONED = typeof DEMO_CLONED;

export const COUNTER = modName('Counter');
export type T_COUNTER = typeof COUNTER;

export const HOME = modName('Home');
export type T_HOME = typeof HOME;

// 接入申请页面
export const APPLY_CONFIG = modName('ApplyConfig');
export type T_APPLY_CONFIG = typeof APPLY_CONFIG;

// 接入列表页面
export const APPLY_LIST = modName('ApplyList');
export type T_APPLY_LIST = typeof APPLY_LIST;
