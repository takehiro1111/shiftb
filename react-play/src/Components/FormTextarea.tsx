import {useState} from 'react' 

export default function FormTextArea() {
  const [form, setForm] = useState({
    comment: `さまざまなフォーム要素を...`
  })

  const handleForm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const show = () => {
    console.log(`コメント: ${form.comment}`)
  }

  return (
    <>
      <form>
        <textarea name="comment" id="comment" cols={30} rows={7} value={form.comment} onChange={handleForm}></textarea><br />
        <button type="button" onClick={show}>送信</button>
      </form>
    </>
  )
}
