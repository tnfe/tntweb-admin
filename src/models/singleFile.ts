import { defineModule } from 'concent';

interface St {
  value: number;
}

const m = defineModule({
  state: (): St => ({
    value: 1,
  }),
  reducer: {
    add(payload: any, moduleState) {
      return { value: moduleState.value + 1 };
    }
  },
  computed: {
    double(newState) {
      return newState.value * 2;
    }
  }
});

export default m;
