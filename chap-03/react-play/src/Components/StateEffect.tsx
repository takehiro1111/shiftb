import { useEffect, useState } from "react";

type Props = {
  init: number
}

export default function StateEffect({init}: Props) {
  const [count, setCount] = useState(init);
  const [hoge, setHoge] = useState("hoge");

  useEffect(() => {
    console.log(`count is ${count}`);
  }, [count]);

  const handleClick = () => setCount(prev => prev + 1);

  return (
    <>
      <button onClick={() => setHoge(String(Date.now()))}>Hoge {hoge}</button>
      <button onClick={handleClick}>カウントへ</button>
      <p>{count}回、クリックされました。</p>
    </>
  );
}
