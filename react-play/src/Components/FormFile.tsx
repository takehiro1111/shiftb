import { useRef } from "react";

export default function FormFile() {
  const file = useRef<HTMLInputElement>(null);

  const show = () => {
    console.log(file)
    const fs = file.current?.files;
    console.log("fs", fs)
    if (!fs) return

    for (const f of fs) {
      console.log(`ファイル名: ${f.name}`);
      console.log(`種類: ${f.type}`);
      console.log(`サイズ: ${Math.trunc(f.size / 1024)}KB`);
      console.log(`更新日時: ${new Date(f.lastModified).toLocaleString()}`);
    }
  };

  return (
    <form>
      <input type="file" ref={file} multiple />
      <button type="button" onClick={show}>
        送信
      </button>
    </form>
  );
}
