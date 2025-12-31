type Props = {
  src: { id: number; url: string; title: string }[];
};

export default function ForList({src}: Props) {
  return (
    <dl>
      {
        src.map((elem) => (
            <dt key={elem.id}>
              <h2>TItle: {elem.title}</h2>
              <a href={elem.url}>サイトへ</a>
            </dt>
        ))
      }
    </dl>
  )
}
