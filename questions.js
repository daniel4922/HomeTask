// Each question: the text, 4 options, and the index (0-3) of the correct option.
const questions = [
  {
    id: 1,
    question: "Which hook adds state to a function component?",
    options: ["useEffect", "useRef", "useNavigate", "useState"],
    answer: 3,
  },
  {
    id: 2,
    question: "Which hook is used for side effects like updating the document title?",
    options: ["useEffect", "useState", "useMemo", "useContext"],
    answer: 0,
  },
  {
    id: 3,
    question: "Which react-router hook changes the page from code?",
    options: ["useLocation", "useParams", "useNavigate", "useHref"],
    answer: 2,
  },
  {
    id: 4,
    question: "What does JSX stand for?",
    options: [
      "Java Syntax Extension",
      "JavaScript XML",
      "JSON Extra",
      "JavaScript Extension Script",
    ],
    answer: 1,
  },
  {
    id: 5,
    question: "How does a parent component pass data to a child component?",
    options: ["Using state", "Using refs", "Using props", "Using keys"],
    answer: 2,
  },
  {
    id: 6,
    question: "What does an empty dependency array [] in useEffect mean?",
    options: [
      "Run on every render",
      "Run only once after the first render",
      "Never run",
      "Run only when the component unmounts",
    ],
    answer: 1,
  },
  {
    id: 7,
    question: "What is shadcn/ui?",
    options: [
      "A CSS preprocessor",
      "A paid npm component library",
      "A state management library",
      "Copy-paste components that you own in your project",
    ],
    answer: 3,
  },
  {
    id: 8,
    question: "Which command starts the Vite dev server?",
    options: ["npm run dev", "npm run build", "npm publish", "npm test"],
    answer: 0,
  },
  {
    id: 9,
    question: "Which Tailwind class makes text bold?",
    options: ["text-bold", "bold", "font-bold", "weight-bold"],
    answer: 2,
  },
  {
    id: 10,
    question: "What is the correct way to update state using its previous value?",
    options: [
      "setCount(count++)",
      "setCount((prev) => prev + 1)",
      "count = count + 1",
      "setCount = count + 1",
    ],
    answer: 1,
  },
]

export default questions
