import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ArrowRight, Timer } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import questions from "@/data/questions"
import { saveResult } from "@/lib/storage"
import { cn } from "@/lib/utils"

const TIME_PER_QUESTION = 15

export default function Quiz() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const name = state?.name

  // useState: everything that changes while the quiz is running
  const [current, setCurrent] = useState(0) // index of the current question
  const [selected, setSelected] = useState(null) // option the player clicked
  const [answered, setAnswered] = useState(false) // true after an answer or time-out
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)

  // useEffect: if someone opens /quiz directly (no name), send them home
  useEffect(() => {
    if (!name) navigate("/", { replace: true })
  }, [name, navigate])

  // useEffect: countdown timer. Runs again every time timeLeft changes.
  // The cleanup function cancels the old timer so we never get two timers.
  useEffect(() => {
    if (answered) return
    if (timeLeft === 0) {
      setAnswered(true) // time is up
      return
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft, answered])

  // useEffect: show the question number in the browser tab
  useEffect(() => {
    document.title = `Question ${current + 1} | Quiz Master`
  }, [current])

  if (!name) return null

  const question = questions[current]
  const total = questions.length
  const isLast = current === total - 1
  const progress = ((current + (answered ? 1 : 0)) / total) * 100

  const handleChoose = (index) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    if (index === question.answer) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (isLast) {
      saveResult({ name, score, total, date: Date.now() })
      // useNavigate: open the result page and pass the score along
      navigate("/result", { state: { name, score, total } })
      return
    }
    setCurrent((c) => c + 1)
    setSelected(null)
    setAnswered(false)
    setTimeLeft(TIME_PER_QUESTION)
  }

  // Colors for each option after the player has answered
  const optionClass = (index) => {
    if (!answered) return ""
    if (index === question.answer) {
      return "border-green-500 bg-green-50 text-green-900 hover:bg-green-50"
    }
    if (index === selected) {
      return "border-red-500 bg-red-50 text-red-900 hover:bg-red-50"
    }
    return "opacity-60"
  }

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Question {current + 1} of {total}
          </span>
          <Badge variant={timeLeft <= 5 && !answered ? "destructive" : "secondary"}>
            <Timer className="size-3" /> {timeLeft}s
          </Badge>
        </div>
        <Progress value={progress} />
        <CardTitle className="text-lg leading-snug">{question.question}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {question.options.map((option, index) => (
          <Button
            key={option}
            variant="outline"
            className={cn("h-auto w-full justify-start whitespace-normal py-3 text-left", optionClass(index))}
            onClick={() => handleChoose(index)}
          >
            {option}
          </Button>
        ))}

        {answered && selected === null && (
          <p className="pt-2 text-sm font-medium text-red-600">Time's up!</p>
        )}
      </CardContent>

      <CardFooter className="justify-between">
        <span className="text-sm text-muted-foreground">Score: {score}</span>
        {answered && (
          <Button onClick={handleNext}>
            {isLast ? "Finish" : "Next"} <ArrowRight />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
