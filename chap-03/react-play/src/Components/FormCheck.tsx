import { useState } from "react";

export default function FormCheck() {
  const [form, setForm] = useState({
    agreement: true,
  });

  const handleFormCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    });
  };

  const show = () => {
    console.log(`同意確認: ${form.agreement ? "同意" : "反対"}`)
  };

  return (
    <>
      <form>
        <label htmlFor="agreement">同意します</label>
        <input
          type="checkbox"
          name="agreement"
          id="agreement"
          checked={form.agreement}
          onChange={handleFormCheck}
        />
        <br />
        <button type="button" onClick={show}>
          送信
        </button>
      </form>
    </>
  );
}
