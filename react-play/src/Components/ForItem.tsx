import cn from 'classnames'

type Props = {
  book: {id: number, title: string,}
}

export default function ForItem({book}: Props) {
  return (
    <>
    <div className={cn('flex  bg-sky-50' )}>
      <dt>
        <p>{book.id}</p>
      </dt>
      <dd>{book.title}</dd>
      </div>
      </>
  )
}
