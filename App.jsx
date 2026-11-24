import { Route, Routes } from "react-router-dom"

import Navbar from "@/components/Navbar"
import Home from "@/pages/Home"
import Quiz from "@/pages/Quiz"
import Result from "@/pages/Result"
import NotFound from "@/pages/NotFound"

export default function App() {
  return (
    <div className="min-h-screen bg-muted/40">
      <Navbar />
      <main className="mx-auto max-w-xl p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
