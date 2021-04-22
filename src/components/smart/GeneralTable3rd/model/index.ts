import { setModuleName, modelDesc, defaultModuleName } from './meta';
import { configure } from 'concent';


export const configureModule = (name?: string) => {
  const finalName = name || defaultModuleName;
  setModuleName(finalName);
  // 后期替换为新接口 configureModule，返回registeredModule
  configure(finalName, modelDesc);
};
