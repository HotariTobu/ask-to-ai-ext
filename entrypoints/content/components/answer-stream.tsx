import Markdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'

export const AnswerStream = (props: {
  stream: AsyncIterable<string> | string
}) => {
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    if (typeof props.stream === 'string') {
      setAnswer(props.stream)
      return
    }

    (async () => {
      for await (const answerPart of props.stream) {
        setAnswer(prevAnswer => prevAnswer + answerPart)
      }
    })()
  }, [props.stream])

  return (
    <Markdown
      className="prose"
      components={{
        code(props) {
          const { children, className, node, ref, style, ...rest } = props
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <Prism
              {...rest}
              PreTag="div"
              language={match[1]}
            >
              {String(children).replace(/\n$/, '')}
            </Prism>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          )
        }
      }}
    >
      {answer}
    </Markdown>
  )
}
