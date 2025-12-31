import { useState } from "react";
import axios from "axios";

export default function DisplayPostalCode() {
  const [inputcode, setInputCode] = useState<string>("");
  const [displayCode, setDisplayCode] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${inputcode}`
      );
      const result = res.data.results?.[0];
      if (!result) {
        setDisplayCode("住所が見つかりませんでした。");
        return;
      }

      const address = `${result.address1}${result.address2}${result.address3}`;
      setDisplayCode(address);
      alert(address);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          郵便番号
          <input type="text" name="code" onChange={handleChange} />
        </label>
        <button type="submit">送信</button>
      </form>
      <p>{displayCode}</p>
    </div>
  );
}
