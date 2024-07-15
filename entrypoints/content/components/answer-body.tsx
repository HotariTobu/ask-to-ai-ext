import Markdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import { AnswerStream } from '../hooks/useAnswerItems'

export const AnswerBody = (props: {
  stream: AnswerStream
}) => {
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    const { text, textStream } = props.stream
    text.then(setAnswer)

    if (typeof textStream === 'undefined') {
      return
    }

    (async () => {
      for await (const answerPart of textStream) {
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
