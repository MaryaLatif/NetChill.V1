import { RefObject, useEffect, useState } from 'react';

/*
const DEFAULT_OPTIONS = {
  threshold: 1,
  rootMargin: '0px',
};
 */

function useIntersectionObserver(observedElement:RefObject<HTMLElement>, opts?: IntersectionObserverInit) {
  const [isElementVisible, setIsElementVisible] = useState(false);

  useEffect(() => {
    if (!observedElement.current) {
      return;
    }

    // const threshold = opts?.threshold ?? DEFAULT_OPTIONS.threshold;

    // eslint-disable-next-line compat/compat
    const observer = new IntersectionObserver(
      (entries) => {
        setIsElementVisible(entries[0].isIntersecting);
      },
      opts,
    );

    observer.observe(observedElement.current);

    return () => observer.disconnect();
  }, [observedElement.current, opts]);

  return isElementVisible;
}

export default useIntersectionObserver;
