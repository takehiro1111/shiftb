import {useState, useId} from 'react'

export default function StateForm() {
  const id = useId()
  const [form, setForm] = useState<{name:string, age:number} | null>({
    name: "test",
    age: 22
  })
  if (!form) return

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const show = () => {
    console.log(`こんにちは、${form.name}さん、年齢は${form.age}です。`)
  }

  return (
    <>
    <form>
    <div>
      <label htmlFor="name">名前:</label>
      <input placeholder='text-name' type="text" name="name" id={`${id}-name`} onChange={handleInput} value={form.name} />
    </div>
    <div>
      <label htmlFor="age">年齢:</label>
      <input type="number" id={`${id}-age`} name="age" onChange={handleInput} value={form.age} />
    </div>
    <div>
      <button onClick={show}>送信</button>
    </div>
    <p>こんにちは、{form.name}さん、年齢は{form.age}です。</p>
    </form>
    </>
  )
}
