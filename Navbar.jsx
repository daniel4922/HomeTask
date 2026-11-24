import { Link } from "react-router-dom"
import { Brain } from "lucide-react"

export default function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-xl items-center p-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Brain className="size-5" />
          Quiz Master
        </Link>
      </div>
    </header>
  )
}
