import { Link } from "react-router-dom";

export function Header(){
  return (
    <header className="flex gap-4 p-4 bg-gray-800">
      <Link to="/" className="text-white hover:text-gray-300">
        Blog
      </Link>
      <Link to="/contact" className="text-white hover:text-gray-300">
        お問い合わせ
      </Link>
    </header>
  );
};
