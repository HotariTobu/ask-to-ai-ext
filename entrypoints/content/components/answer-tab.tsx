import { AnswerResult } from "../hooks/useAnswerItems"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { AnswerBody } from "./answer-body";

export const AnswerTab = (props: {
  result: AnswerResult
}) => {
  const [result, setResult] = useState<Awaited<AnswerResult> | null>(null)

  useEffect(() => {
    props.result.then(setResult)
  }, [props.result])

  if (result === null) {
    return
  }

  if (result instanceof Error) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{result.message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <AnswerBody stream={result} />
  )
}
