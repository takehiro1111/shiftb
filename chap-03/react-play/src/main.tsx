import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ForList from './Components/ForList.tsx'
import ForNest from './Components/ForNest.tsx'
import StateForm from './Components/StateForm.tsx'
import StateFormUC from './Components/StateFormUC.tsx'
import FormTextArea from './Components/FormTextarea.tsx'
import FormSelect from './Components/FormSelect.tsx'
import FormList from './Components/FormList.tsx'
import FormRadio from './Components/FormRadio.tsx'
import FormCheck from './Components/FormCheck.tsx'
import FormCheckMulti from './Components/FormCheckMulti.tsx'
import FormFile from './Components/FormFile.tsx'
import StateNest from './Components/StateNest.tsx'
import StateTodo from './Components/StateTodo.tsx'
import './index.css'
import App from './App.tsx'

const webSite = [
  {id: 1, url: "https://www.nextbeat.co.jp/en", title: "ネクストビート"},
  {id: 2, url: "https://www.b-tm.co.jp/", title: "BTM"}
]

const src = [
  {id: 1, title: "title-1"},
  {id: 2, title: "title-2"},
]


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ForList src={webSite}/>
    <ForNest src={src}/>
    <StateForm/>
    <StateFormUC/>
    <FormTextArea/>
    <FormSelect/>
    <FormList/>
    <FormRadio/>
    <FormCheck/>
    <FormCheckMulti/>
    <FormFile/>
    <StateNest/>
    <StateTodo/>
  </StrictMode>,
)

// setInterval(() => {
//   root.render(
//     <p>現在時刻: {new Date().toLocaleString()}</p>
//   )
// }, 3000)
