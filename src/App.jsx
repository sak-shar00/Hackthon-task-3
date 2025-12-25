import { useState } from "react";
import Setup from "./components/Setup";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { fetchQuiz } from "./services/quizApi";

const App = () => {
  const [screen, setScreen] = useState("setup");
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const startQuiz = async (subject, count) => {
    try {
      setIsLoading(true);

      const data = await fetchQuiz(subject, count);

      // 🔐 safety check
      if (!data || !Array.isArray(data.questions)) {
        throw new Error("Invalid quiz data");
      }

      setQuestions(data.questions);
      setScreen("quiz");
    } catch (err) {
      console.error(err);
      // Provide more specific error messages
      const errorMessage = err.message || "Unable to load quiz. Please try again.";
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const finishQuiz = (score, wrong, statistics = {}) => {
    setResult({ 
      score, 
      wrong, 
      statistics 
    });
    setScreen("result");
  };

  const restartQuiz = () => {
    setQuestions([]);
    setResult(null);
    setScreen("setup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center p-4">
      {screen === "setup" && (
        <Setup onStart={startQuiz} isLoading={isLoading} />
      )}

      {screen === "quiz" && questions.length > 0 && (
        <Quiz questions={questions} onFinish={finishQuiz} />
      )}

      {screen === "result" && result && (
        <Result
          score={result.score}
          wrong={result.wrong}
          total={questions.length}
          statistics={result.statistics}
          restart={restartQuiz}
        />
      )}
    </div>
  );
};

export default App;