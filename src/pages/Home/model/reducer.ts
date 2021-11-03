import { St } from './state';
import { VoidPayload, AC } from 'types/store';
import { T_COUNTER } from 'configs/c2Mods';
import { random } from 'utils/num';

type IAC = AC<T_COUNTER>;

export function forCopy(payload: VoidPayload, moduleState: St, ac: IAC) {
  console.log('call ac.setState or ac.dispatch when needed', ac.setState);
}

const delay = (ms = 1000) => new Promise(r => setTimeout(r, ms));

export function incrementBigValue(payload: VoidPayload, moduleState: St): Partial<St> {
  return { bigValue: moduleState.bigValue + 50 };
}

export function increment(payload: VoidPayload, moduleState: St): Partial<St> {
  return { value: moduleState.value + 1 };
}

export function decrement(payload: VoidPayload, moduleState: St): Partial<St> {
  return { value: moduleState.value - 1 };
}

export function incrementByAmount(amount: number, moduleState: St): Partial<St> {
  return { value: moduleState.value + amount };
}

export async function incrementAsync(amount: number, moduleState: St): Promise<Partial<St>> {
  await delay();
  // or just write ac.dispatch of return
  // await ac.dispatch(incrementByAmount, amount);
  return { value: moduleState.value + amount };
}

export function foo() {
  console.log('call foo');
}

export function ranChartData(p: VoidPayload): Partial<St> {
  const getItem = (i: number) => ({ time: `部门${i}`, value: random(100) });
  const getAreaItem = (i: number) => ({ year: i + 2000, value: random(200) });
  const getScatterItem = (i: number) => {
    if (i % 2 === 0) return { gender: 'male', height: random(180), weight: random(100) };
    return { gender: 'female', height: random(120), weight: random(60) };
  };
  const getHorizontalBarItem = (i: number) => {
    if (i % 2 === 0) return { city: '中国', type: '城市人口', value: random(5)/10 };
    return { city: '中国', type: '农村人口', value: random(8)/10 };
  };
  return {
    barData: new Array(16).fill('').map((v, idx) => getItem(idx)),
    areaData: new Array(12).fill('').map((v, idx) => getAreaItem(idx)),
    scatterData: new Array(38).fill('').map((v, idx) => getScatterItem(idx)),
    horizontalBarData: new Array(2).fill('').map((v, idx) => getHorizontalBarItem(idx)),
  };
}

export function clear() {
  console.log('clear');
}
