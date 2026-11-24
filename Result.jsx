import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Home, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Result() {
  const navigate = useNavigate()
  const { state } = useLocation() // data sent by navigate("/result", { state })

  // useEffect: if someone opens /result directly (no data), send them home
  useEffect(() => {
    if (!state) navigate("/", { replace: true })
  }, [state, navigate])

  // useEffect: set the browser tab title
  useEffect(() => {
    document.title = "Result | Quiz Master"
  }, [])

  if (!state) return null

  const { name, score, total } = state
  const percent = Math.round((score / total) * 100)
  const message =
    percent >= 80
      ? "Excellent work!"
      : percent >= 50
        ? "Good job, keep practicing!"
        : "Don't give up, try again!"

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Well done, {name}!</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p className="text-5xl font-bold">
          {score}/{total}
        </p>
        <Progress value={percent} />
        <p className="text-sm text-muted-foreground">{percent}% correct</p>

        <div className="flex justify-center gap-2 pt-2">
          <Button onClick={() => navigate("/quiz", { state: { name } })}>
            <RotateCcw /> Play again
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            <Home /> Home
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
