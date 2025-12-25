import { useState } from "react";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";

const Quiz = ({ questions, onFinish }) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [questionAttempts, setQuestionAttempts] = useState({});
  const [resetTrigger, setResetTrigger] = useState(0);

  // Add defensive check for questions
  if (!questions || questions.length === 0) {
    return <div>No questions available. Please go back and try again.</div>;
  }

  const current = questions[index];
  
  // Add defensive check for current question
  if (!current) {
    return <div>Question not found. Please go back and try again.</div>;
  }

  const handleAnswer = (selected, isCorrect, attempts, reset) => {
    setTotalAttempts(prev => prev + 1);
    
    // Update question-specific attempts
    setQuestionAttempts(prev => ({
      ...prev,
      [index]: attempts
    }));

    if (isCorrect) {
      // Correct answer - advance to next question after showing color
      setScore(prevScore => prevScore + 1);
      
      // Wait 2 seconds to show green color, then advance
      setTimeout(() => {
        reset(); // Reset QuestionCard state for next question
        
        if (index + 1 === questions.length) {
          // Quiz completed
          onFinish(score + 1, wrong, {
            totalAttempts,
            questionAttempts: {
              ...questionAttempts,
              [index]: attempts
            }
          });
        } else {
          // Move to next question
          setIndex(prevIndex => prevIndex + 1);
          setResetTrigger(prev => prev + 1); // Reset timer and QuestionCard for new question
        }
      }, 2000); // Show green color for 2 seconds
    } else {
      // Incorrect answer - increment wrong counter and allow retry immediately
      setWrong(prevWrong => prevWrong + 1);
      
      // Wait 1 second to show red color, then reset for retry
      setTimeout(() => {
        reset(); // Reset QuestionCard state for retry
        setResetTrigger(prev => prev + 1); // Reset timer for retry
      }, 1000);
    }
  };

  const handleTimerExpiry = () => {
    // Timer expired - treat as wrong attempt
    setWrong(prevWrong => prevWrong + 1);
    setTotalAttempts(prev => prev + 1);
    
    // Increment question attempts for timer expiry
    const currentAttempts = questionAttempts[index] || 0;
    setQuestionAttempts(prev => ({
      ...prev,
      [index]: currentAttempts + 1
    }));

    // Don't advance - user can try again with the same question
    setResetTrigger(prev => prev + 1); // Reset timer for retry
  };

  const getCurrentQuestionAttempts = () => {
    return questionAttempts[index] || 0;
  };

  return (
    <div className="max-w-5xl w-full">
      <div className="bg-white p-6 rounded-xl shadow-xl mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-indigo-600">Quiz in Progress</h1>
          <div className="text-sm text-gray-600">
            Score: {score} | Wrong: {wrong} | Attempts: {totalAttempts}
          </div>
        </div>
        
        <Timer 
          onTimeUp={handleTimerExpiry} 
          index={index} 
          resetTrigger={resetTrigger}
        />
        
        <p className="mt-2 text-gray-700">
          Question {index + 1} of {questions.length}
        </p>
        
        <ProgressBar 
          current={index + 1} 
          total={questions.length}
          percentage={((index + 1) / questions.length) * 100}
        />
      </div>

      <QuestionCard 
        data={current} 
        onAnswer={handleAnswer}
        questionIndex={index}
        resetTrigger={resetTrigger}
        currentAttempts={getCurrentQuestionAttempts()}
      />
    </div>
  );
};

export default Quiz;