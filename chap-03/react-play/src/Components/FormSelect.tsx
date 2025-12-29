import { useState } from "react";

export default function FormSelect() {
  const [form, setForm] = useState({
    animal: "dog",
  });

  const handleForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const show = () => {
    console.log(`好きな動物: ${form.animal}`);
  };

  return (
    <>
      <form>
        <label htmlFor="animal">好きな動物:</label>
        <select
          name="animal"
          id="animal"
          value={form.animal}
          onChange={handleForm}
        >
          <option value="dog">犬</option>
          <option value="cat">猫</option>
          <option value="rabbit">ウサギ</option>
        </select>
        <button type="button" onClick={show}>
          送信
        </button>
      </form>

      <h2>DTタグ</h2>
      <dl>
        <dt>価格</dt>
        <dd>¥1,980</dd>

        <dt>在庫</dt>
        <dd>あり</dd>
      </dl>
    </>
  );
}
