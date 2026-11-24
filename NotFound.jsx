import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">This page doesn't exist.</p>
        <Button onClick={() => navigate("/")}>Go home</Button>
      </CardContent>
    </Card>
  )
}
