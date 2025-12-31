import { useState } from "react";
import axios from "axios";

type ZipCloudResult = {
  zipcode: string;
  address1: string; // 都道府県
  address2: string; // 市区町村
  address3: string; // 町域
  kana1: string;
  kana2: string;
  kana3: string;
};

type ZipCloudResponse = {
  status: number;
  message: string | null;
  results: ZipCloudResult[] | null;
};

export default function DisplayPostalCode() {
  const [inputcode, setInputCode] = useState<string>("");
  const [displayAddress, setDisplayAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.get<ZipCloudResponse>(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${inputcode}`
      );
      const result = res.data.results?.[0];
      if (!result) {
        setDisplayAddress("住所が見つかりませんでした。");
        return;
      }

      const address = `${result.address1}${result.address2}${result.address3}`;
      setDisplayAddress(address);
      alert(address);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          郵便番号
          <input
            type="text"
            name="code"
            onChange={handleChange}
            disabled={isLoading}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "送信中..." : "送信"}
        </button>
      </form>
      <p>{displayAddress}</p>
    </div>
  );
}
