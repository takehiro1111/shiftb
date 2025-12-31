import { useState } from "react";

export default function StateNest() {
  const [form, setForm] = useState({
    name: "山田太郎",
    address: {
      prefecture: "神奈川県",
      city: "横浜市",
    },
  });

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormNest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      address: {
        ...form.address,
        [e.target.name]: e.target.value,
      },
    });
  };

  const show = () => {
    console.log(
      `${form.name}さんの住所は、${form.address.prefecture}${form.address.city}です。`
    );
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="name">名前</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleForm}
            value={form.name}
          />
        </div>
        <div>
          <label htmlFor="prefecture">住所(都道府県)</label>
          <input
            type="text"
            id="prefecture"
            name="prefecture"
            onChange={handleFormNest}
            value={form.address.prefecture}
          />
        </div>
        <div>
          <label htmlFor="city">住所(市町村)</label>
          <input
            type="text"
            id="city"
            name="city"
            onChange={handleFormNest}
            value={form.address.city}
          />
        </div>
        <div>
          <button type="button" onClick={show}>
            送信
          </button>
        </div>
      </form>
    </>
  );
}
