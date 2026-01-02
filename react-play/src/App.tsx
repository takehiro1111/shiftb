// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import { posts } from "./data/posts";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <h1>記事一覧ページ</h1>
        <ul>
          {posts &&
            posts.map((element) => {
              return (
                <li key={element.id}>
                  <a href={element.thumbnailUrl}>{element.title}</a>
                  <p>{element.createdAt}</p>
                  <p>{element.categories}</p>
                  <p>{element.content}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default App;
