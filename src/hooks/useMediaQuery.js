import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    if (mq.matches !== matches) {
      setMatches(mq.matches);
    }

    console.log(mq);

    const listener = () => setMatches(mq.matches);

    mq.addEventListener("change", listener);
    return () => {
      mq.removeEventListener("change", listener);
    };
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;
