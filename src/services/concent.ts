/**
 * concent 相关的一些公共封装函数
 */
import {
  useConcent, reducer, IRefCtxM, ModuleDesc,
  getState as getSt, getGlobalState as getGst, emit,
  ReducerCallerParams, IReducerFn, IActionCtxBase,
  ICtxBase, IAnyObj, SettingsType, ComputedValType, SetupFn,
} from 'concent';
import { CtxM, Modules, RootRd, RootState, CtxDe } from 'types/store';
import { EvMap } from 'types/eventMap';

/**
 * 调用目标函数，用于对接 reducer里的 ghost函数
 * @param callerParams 
 * @param ac 
 */
export async function callTarget(callerParams: ReducerCallerParams | [IReducerFn, any], ac: IActionCtxBase) {
  try {
    // 支持 reducer文件里内部调用 ac.dispatch(loading, [targetFn, payload])
    if (Array.isArray(callerParams)) {
      let [fn, payload] = callerParams;
      await ac.dispatch(fn, payload);
    } else {
      const { fnName, payload, renderKey, delay } = callerParams;
      await ac.dispatch(fnName, payload, renderKey, delay);
    }
  } catch (err) {
    alert(err.message);
  }
}

/**
 * 适用于不属于任何模块，只是设置setup函数的场景
 * @param setup 
 */
export function useSetup<T extends SetupFn>(setup: T, props?: any) {
  const { settings } = useConcent<{}, CtxDe<{}, SettingsType<T>>>({ setup, props });
  return settings;
}

/**
 * use the target model context you want by passing a module name
 * 如需要全局任意地方可通过 useC2Mod('xx') 导出xx模块上下文来使用，
 * 需要在 src/models/index.js 显式的导出该模块
 * 
 * -----------------------[Code example]-----------------------
 *  import somePageModel from 'pages/SomePage/model';
 *  import someCompModel from 'components/SomeComp/model';
 * 
 *  const allModels = {
 *    ...somePageModel,
 *    ...someCompModel,
 *  }
 * 
 *  export default allModels;
 * --------------------------------------------------------------
 * @param moduleName
 */
export function useC2Mod<M extends Modules>(moduleName: M) {
  type Ctx = CtxM<{}, M>;
  return useConcent<{}, Ctx>(moduleName);
}


export function useC2ModWithSetup<M extends Modules, Setup extends (ctx: ICtxBase) => IAnyObj, P extends IAnyObj>
  (module: M, setup: Setup, props?: P) {
  const targetProps = props || {};
  type Ctx = CtxM<P, M, SettingsType<Setup>>;
  return useConcent<{}, Ctx>({ module, setup, props: targetProps });
}

export const ccReducer = (reducer as unknown) as RootRd;

/**
 * 获取 globa模块的状态
 * 在已拥有concent model上下文、action上线文的地方，推荐直接获取，代替调用此函数
 */
export function getGlobalState() {
  const globalState = getGst<RootState>();
  return globalState;
}

/**
 * 获取整个根状态
 */
export function getRootState() {
  const rootState = getSt() as RootState;
  return rootState;
}

/**
 * 获取目标模块状态
 */
export function getModelState<T extends Modules>(modelName: T) {
  const modelState = getSt(modelName) as RootState[T];
  return modelState;
}

type EvKeys = keyof EvMap;
/**
 * 发射事件
 * @param eventName - 事件名
 * @param args 
 */
export function ccEmit<E extends EvKeys, T extends EvMap[E]>(eventName: E, ...args: T) {
  emit(eventName, ...args);
}

/**
 * 携带id的发射事件
 * @param eventdesc - [eventName, id]
 * @param args 
 */
export function ccEmitId<E extends EvKeys, T extends EvMap[E]>(eventdesc: [E, string], ...args: T) {
  emit(eventdesc, ...args);
}

type OnFn = <E extends EvKeys>(eventName: E, cb: (...args: EvMap[E]) => void) => void;
/**
 * 配合EvMap，为ctx.on装配类型
 * 外部调用时传入具体的事件名就推导出cb函数的参数列表类型
 * 
 *  function setup(ctx: Ctx){
 *    const on = ctxOn(ctx);
 *    on('xxx',(a, b)=>{
 *      // 此处ts能感知a、b的具体类型
 *    })
 *  }
 * 
 */
export function ctxOn(ctx: ICtxBase) {
  return ctx.on as OnFn;
}

type OnIdFn = <E extends EvKeys>(eventdesc: [E, string], cb: (...args: EvMap[E]) => void) => void;
/**
 * 可以携带id的ctx.on
 * @param ctx 
 */
export function ctxOnId(ctx: ICtxBase) {
  return ctx.on as OnIdFn;
}
