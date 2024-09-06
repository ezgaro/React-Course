import { useQuiz } from "../context/QuizContext";

export default function StartScreen() {
  const { dispatch, numQuestions } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to the react quiz</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
