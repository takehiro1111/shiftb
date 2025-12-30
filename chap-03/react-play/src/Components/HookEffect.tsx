import { useState } from "react";
// import { useLayoutEffect } from "react";
import { useEffect } from "react";

const sleep = (delay: number) => {
  const start = Date.now();

  while (true) {
    if (Date.now() - start > delay) {
      break;
    }
  }
};

type Props = {
  init: number;
};

export default function HookEffect({ init }: Props) {
  const [count, setCount] = useState(1);

  // useEffect: 画面描画後に実行される
  // → 最初に 0 が表示され、2秒後に init に変わる
  useEffect(() => {
    sleep(2000);
    setCount(init);
  }, [init]);

  // useLayoutEffect: 画面描画前に実行される
  // → 処理完了まで画面が表示されない（ブロッキング）
  // useLayoutEffect(() => {
  //   sleep(2000);
  //   setCount(init);
  // }, [init]);

  return (
    <div>
      <p>カウント: {count}</p>
      <p>（初期値1から{init}に変わる様子を確認）</p>
    </div>
  );
}
