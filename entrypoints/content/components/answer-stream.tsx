export const AnswerStream = (props: {
  stream: AsyncIterable<string> | string
}) => {
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    (async () => {
      for await (const answerPart of props.stream) {
        setAnswer(prevAnswer => prevAnswer + answerPart)
      }
    })()
  }, [props.stream])

  return (
    <div className="whitespace-break-spaces">{answer}</div>
  )
}
