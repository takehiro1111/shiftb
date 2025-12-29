import { useState } from "react";

export default function FormSelect() {
  const [form, setForm] = useState({
    animal: ["dog", "cat"],
  });

  const handleFormList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const data = []

    const opts = e.target.options
    for (const opt of opts) {
      if (opt.selected) {
        data.push(opt.value)
      }
    }
    
    setForm({
      ...form,
      [e.target.name]: data,
    });
  };

  const show = () => {
    console.log(`好きな動物: ${form.animal}`);
  };

  return (
    <>
      <form>
        <label htmlFor="animal">好きな動物:</label><br />
        <select
          name="animal"
          id="animal"
          value={form.animal}
          onChange={handleFormList}
          size={2}
          multiple={true}
        >
          <option value="dog">犬</option>
          <option value="cat">猫</option>
          <option value="hamster">ハムスター</option>
          <option value="rabbit">ウサギ</option>
        </select>
        <button type="button" onClick={show}>
          送信
        </button>
      </form>
    </>
  );
}
