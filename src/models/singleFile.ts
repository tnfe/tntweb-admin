import { defineModule } from 'concent';
import { delay } from 'utils/timer';

interface St {
  value: number;
  loading: boolean;
}

const m = defineModule({
  state: (): St => ({
    value: 1,
    loading: false,
  }),
  reducer: {
    add(payload: number | void, moduleState) {
      const toAdd = payload === undefined ? 1 : 0;
      return { value: moduleState.value + toAdd };
    },
    async asyncAdd(payload: number | void, moduleState, ac) {
      await ac.setState({ loading: true });
      await delay(2000);
      await ac.dispatch(m.r.add, 100);
      return { loading: false };
    },
  },
  computed: {
    double(newState) {
      return newState.value * 2;
    }
  }
});

export default m;
