import { mockImpl } from '../../../src/assets/mock/mockHttpService';

// see https://stackoverflow.com/questions/64245013/difference-between-jest-mock-and-jest-domock
// jest.mock 有自动的全局提升效果，不能访问到 apiData，这里需要使用 jest.doMock
jest.doMock('../../../src/services/http', mockImpl);
