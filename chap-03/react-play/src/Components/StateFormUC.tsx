import {useRef} from 'react'

export default function StateFormUC() {
  const name = useRef<HTMLInputElement>(null)
  const age = useRef<HTMLInputElement>(null)

  const show = () => {
    if (!name.current || !age.current) return 
    console.log(`こんにちは、${name.current.value}さん、年齢は${age.current.value}です。`)
  }

  return (
    <>
    <h2>UnControlled</h2>
    <form>
    <div>
      <label htmlFor="name">名前:</label>
      <input placeholder='text-name' type="text" name="name" id="name" ref={name} defaultValue="takehiro1111" />
    </div>
    <div>
      <label htmlFor="age">年齢:</label>
      <input type="number" id="age" name="age" ref={age} defaultValue="18" />
    </div>
    <div>
      <button onClick={show}>送信</button>
    </div>
    </form>
    </>
  )
}
