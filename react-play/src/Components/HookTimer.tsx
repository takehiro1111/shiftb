import { useEffect, useState } from "react";
import cn from 'classnames'

type Props = {
  init: number;
};

export default function HookTimer({ init }: Props) {
  const [count, setCount] = useState(init);

  useEffect(() => {
    const t = setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);

    return () => {
      clearInterval(t);
    };
  }, []);

  return (
    <>
      <div className={cn({'text-red-400': count < 0})}>現在のカウント: {count}</div>
    </>
  );
}
