import { useState } from "react";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";

const Quiz = ({ questions, onFinish }) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);

  // Add defensive check for questions
  if (!questions || questions.length === 0) {
    return <div>No questions available. Please go back and try again.</div>;
  }

  const current = questions[index];
  
  // Add defensive check for current question
  if (!current) {
    return <div>Question not found. Please go back and try again.</div>;
  }

  const handleAnswer = (selected, reset) => {
    if (selected === current.correctAnswer) {
      setScore(score + 1);
      reset();

      if (index + 1 === questions.length) {
        onFinish(score + 1, wrong);
      } else {
        setIndex(index + 1);
      }
    } else {
      setWrong(wrong + 1);
    }
  };

  return (
    <div className="max-w-5xl w-full">
      <Timer onTimeUp={() => setIndex(index + 1)} index={index} />
      <p className="mt-2">
        Question {index + 1} of {questions.length}
      </p>
      <ProgressBar current={index + 1} total={questions.length} />

      <QuestionCard data={current} onAnswer={handleAnswer} />
    </div>
  );
};

export default Quiz;