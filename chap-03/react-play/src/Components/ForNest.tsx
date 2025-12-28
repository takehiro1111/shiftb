import ForItem from "./ForItem";

type Props = {
  src: {id: number, title: string,}[]
}


export default function ForNest({src}: Props) {
  return (
    <dl>
      {src.map((elem) => (<ForItem book={elem}/>))}
    </dl>
  )
}
