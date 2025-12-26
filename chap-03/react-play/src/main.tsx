// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'

const root  = createRoot(document.getElementById('root')!)
// .render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

setInterval(() => {
  root.render(
    <p>現在時刻: {new Date().toLocaleString()}</p>
  )
}, 3000)
