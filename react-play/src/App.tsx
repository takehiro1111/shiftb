// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import { posts } from "./data/posts";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <title>記事一覧ページ</title>
        <ul>
          {posts.map((element) => {
            return (
              <li key={element.id}>
                <a href={element.thumbnailUrl}>
                  <h2>{element.title}</h2>
                  <p>{element.createdAt}</p>
                  <p>{element.categories}</p>
                  <p>{element.content}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
