import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
const countByList = [1, 3, 5] as const;
export const CounterStore = signalStore(
  withState({
    count: 0,
    countBy: 1,
  }),
  withMethods((store) => {
    return {
      addCount: () => {
        patchState(store, { count: store.count() + store.countBy() });
        // localStorage.setItem('count', store.count().toString());
      },
      minusCount: () => {
        patchState(store, { count: store.count() - store.countBy() });
        // localStorage.setItem('count', store.count().toString());
      },
      updateCountBy: (countBy: number) => {
        patchState(store, { countBy });
        // localStorage.setItem('countBy', countBy.toString());
      },
      resetCounter: () => {
        patchState(store, { count: 0 });
        // localStorage.setItem('count', '0');
      },
      prefsList: () => countByList,
    };
  }),
  withComputed((store) => {
    return {
      removeCounterDisabled: computed(
        () => store.count() === 0 || store.count() < store.countBy(),
      ),
      fizzBuzz: computed(() => {
        if (store.count() === 0) {
          return '';
        }
        if (store.count() % 15 === 0) {
          return 'FizzBuzz';
        } else if (store.count() % 3 === 0) {
          return 'Fizz';
        } else if (store.count() % 5 === 0) {
          return 'Buzz';
        } else {
          return '';
        }
      }),
    };
  }),
  withHooks((store) => {
    return {
      onInit() {
        patchState(store, {
          count: parseInt(localStorage.getItem('count') || '0'),
          countBy: parseInt(localStorage.getItem('countBy') || '1'),
        });

        watchState(store, () => {
          localStorage.setItem('count', store.count().toString());
          localStorage.setItem('countBy', store.countBy().toString());
        });
      },
      onDestroy() {
        // localStorage.setItem('count', store.count().toString());
        // localStorage.setItem('countBy', store.countBy().toString());
      },
    };
  }),
);
