
## useC2Mod

### example

```ts
import { useC2Mod } from 'services/concent';

export function Example() {
  const { state, setState } = useC2Mod('Counter');
  return <h1 onClick={() => setState({ value: state.value + 1 })}>{state.value} </h1>;
}
```
