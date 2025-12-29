import { useState } from "react";

export default function FormCheckMulti() {
  const [form, setForm] = useState({
    animal: ["dog"],
  });

  const handleFormMulti = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fa = [...form.animal];

    if (e.target.checked) {
      fa.push(e.target.value);
    } else {
      fa.splice(fa.indexOf(e.target.value), 1);
    }

    setForm({
      ...form,
      [e.target.name]: fa,
    });
  };

  const show = () => {
    console.log(`好きな動物: ${form.animal}`);
  };

  return (
    <>
      <form>
        <fieldset className="border border-gray-300 p-4 rounded">
          <legend>好きな動物:</legend>
          <label htmlFor="animal_dog">イヌ</label>
          <input
            type="checkBox"
            value="dog"
            name="animal"
            id="animal"
            checked={form.animal.includes("dog")}
            onChange={handleFormMulti}
          />
          <br />
          <label htmlFor="animal_cat">ネコ</label>
          <input
            type="checkBox"
            value="cat"
            name="animal"
            id="animal"
            checked={form.animal.includes("cat")}
            onChange={handleFormMulti}
          />{" "}
          <br />
          <label htmlFor="animal_bird">鳥</label>
          <input
            type="checkBox"
            value="bird"
            name="animal"
            id="animal"
            checked={form.animal.includes("bird")}
            onChange={handleFormMulti}
          />{" "}
          <br />
        </fieldset>
        <button type="button" onClick={show}>
          送信
        </button>
      </form>
    </>
  );
}
