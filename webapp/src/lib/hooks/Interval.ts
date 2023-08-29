import { useRef } from 'react';
import { useOnComponentUnMounted } from '../react-hooks-alias/ReactHooksAlias';

// eslint-disable-next-line @typescript-eslint/naming-convention
type IntervalObject = {
  intervalId: NodeJS.Timeout | undefined,
  createInterval: (callback: () => unknown, timer: number) => void,
  stopInterval: () => void,
  resetInterval: () => void,
};

type IntervalContext = {
  callback: () => unknown,
  timer: number
};

function useInterval(): IntervalObject {
  const intervalRef = useRef<NodeJS.Timeout>();
  const context = useRef<IntervalContext>();

  function createInterval(callback: () => unknown, timer: number) {
    if (intervalRef.current) {
      stopInterval();
    }

    context.current = { callback, timer };
    intervalRef.current = setInterval(callback, timer);
  }

  function stopInterval() {
    if (!intervalRef.current) {
      return;
    }
    clearInterval(intervalRef.current);
  }

  function resetInterval() {
    if (!context.current) {
      return;
    }
    const { callback, timer } = context.current;
    createInterval(callback, timer);
  }

  useOnComponentUnMounted(stopInterval);

  return {
    intervalId: intervalRef.current,
    createInterval,
    stopInterval,
    resetInterval,
  };
}

export default useInterval;
