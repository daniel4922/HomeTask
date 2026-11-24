import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Play, Trash2, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import questions from "@/data/questions"
import { clearResults, loadResults } from "@/lib/storage"

export default function Home() {
  const navigate = useNavigate()

  // useState: the player's name and the saved results
  const [name, setName] = useState("")
  const [results, setResults] = useState(loadResults)

  // useEffect: set the browser tab title when this page opens
  useEffect(() => {
    document.title = "Quiz Master"
  }, [])

  // Best 5 scores (highest score first, newest first if tied)
  const topScores = [...results]
    .sort((a, b) => b.score - a.score || b.date - a.date)
    .slice(0, 5)

  const handleStart = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    // useNavigate: go to the quiz and send the name along with the navigation
    navigate("/quiz", { state: { name: name.trim() } })
  }

  const handleClear = () => {
    clearResults()
    setResults([])
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Web Dev Quiz</CardTitle>
          <CardDescription>
            {questions.length} questions about React, hooks and Tailwind. You get 15 seconds per
            question.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleStart} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
            <Button type="submit" disabled={!name.trim()}>
              <Play /> Start Quiz
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Trophy className="size-4" /> Leaderboard
            </span>
            {results.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <Trash2 /> Clear
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topScores.length === 0 ? (
            <p className="text-sm text-muted-foreground">No results yet. Be the first!</p>
          ) : (
            <ol className="space-y-2">
              {topScores.map((r, i) => (
                <li key={r.date} className="flex items-center justify-between text-sm">
                  <span>
                    {i + 1}. {r.name}
                  </span>
                  <span className="font-medium">
                    {r.score}/{r.total}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
