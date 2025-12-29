import { useState } from "react";

export default function FormRadio() {
  const [form, setForm] = useState<{
    os: string;
  }>({
    os: "mac",
  });

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const show = () => {
    console.log(`使用OS: ${form.os}`);
  };
  return (
    <>
      <form action="">
        <fieldset className="border border-gray-300 p-4 rounded">
          <legend>使用OS:</legend>
          <label htmlFor="os_mac">Mac</label>
          <input
            type="radio"
            value="mac"
            name="os"
            id={"os_mac"}
            checked={form.os === "mac"}
            onChange={handleForm}
          />
          <br />
          <label htmlFor="os_win">Windows</label>
          <input
            type="radio"
            value="win"
            name="os"
            id={"os_win"}
            checked={form.os === "win"}
            onChange={handleForm}
          />
          <br />
        </fieldset>
        <button type="button" onClick={show}>
          送信
        </button>
      </form>
    </>
  );
}
