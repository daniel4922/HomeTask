# Quiz Master (React + Vite + shadcn/ui)

A timed quiz app. Enter your name, answer 10 questions (15 seconds each), see your score, and check the leaderboard. Results are saved in the browser (localStorage).

## Run it

```bash
npm install
npm run dev
```

Needs Node 18 or newer (`node -v` to check).

## How this project was set up (from scratch)

```bash
npm create vite@latest quiz-master -- --template react
cd quiz-master
npm install
npm install tailwindcss @tailwindcss/vite     # Tailwind CSS v4
npx shadcn@latest init                        # shadcn/ui
npx shadcn@latest add button card input label badge progress
npm install react-router-dom                  # for useNavigate
```

## Pages

| Route     | File                    | What it does                                        |
|-----------|-------------------------|-----------------------------------------------------|
| `/`       | `src/pages/Home.jsx`    | Enter name, start quiz, leaderboard                 |
| `/quiz`   | `src/pages/Quiz.jsx`    | Questions, countdown timer, score                   |
| `/result` | `src/pages/Result.jsx`  | Final score, play again                             |
| `*`       | `src/pages/NotFound.jsx`| 404 page                                            |

## React Hooks used (explain this part to sir)

### useState
- `Home.jsx`: `name` (input) and `results` (saved scores).
- `Quiz.jsx`: `current` (question index), `selected` (clicked option), `answered`, `score`, `timeLeft`.

### useEffect
- `Quiz.jsx` **timer**: every second `timeLeft` goes down by 1. The effect depends on `[timeLeft, answered]`, so it re-runs after each tick. The cleanup (`clearTimeout`) cancels the old timer.
- `Quiz.jsx`: redirects to `/` if there is no player name; updates the tab title with the question number.
- `Result.jsx`: redirects to `/` if opened directly; sets the tab title.
- `Home.jsx`: sets the tab title.

### useNavigate
- `Home.jsx`: Start button goes to `/quiz` and sends the name with `{ state: { name } }`.
- `Quiz.jsx`: after the last question, goes to `/result` and sends `{ name, score, total }`.
- `Result.jsx`: "Play again" goes to `/quiz`, "Home" goes to `/`.
- `NotFound.jsx`: "Go home" button.

(`useLocation` reads the `state` that `navigate` sent.)

## Files, one line each

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts (`npm run dev`) |
| `vite.config.js` | Vite setup: React + Tailwind plugins, `@` alias for `src/` |
| `jsconfig.json` | Lets VS Code understand the `@` alias |
| `components.json` | shadcn/ui configuration |
| `index.html` | The one HTML page, loads `src/main.jsx` |
| `.gitignore` | Keeps `node_modules` and `dist` out of GitHub |
| `src/main.jsx` | Entry point, wraps the app in `BrowserRouter` |
| `src/index.css` | Tailwind import and theme colors |
| `src/App.jsx` | Navbar plus all routes |
| `src/lib/utils.js` | `cn()` helper that merges Tailwind classes |
| `src/lib/storage.js` | Load, save and clear results in localStorage |
| `src/data/questions.js` | The 10 questions and correct answers |
| `src/components/Navbar.jsx` | Top bar with the app name |
| `src/components/ui/*` | shadcn components: Button, Card, Input, Label, Badge, Progress |

## shadcn/ui components used

`Button`, `Card` (Header, Title, Description, Content, Footer), `Input`, `Label`, `Badge` (timer), `Progress` (quiz progress and result bar). They live in `src/components/ui/` and are files you own.

## Push to GitHub

```bash
git init
git add .
git commit -m "Quiz app with React, Vite and shadcn/ui"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

(Create the empty repo on github.com first.)
