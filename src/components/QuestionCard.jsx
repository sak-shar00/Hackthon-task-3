import { useState, useEffect } from "react";

const QuestionCard = ({ data, onAnswer, questionIndex }) => {
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Reset state when question changes
  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);
  }, [questionIndex]);

  if (!data) {
    return <div>Loading question...</div>;
  }

  const handleClick = (opt) => {
    if (selected !== null) return; // Don't allow multiple clicks
    
    setSelected(opt);
    const correct = opt === data.correctAnswer;
    setIsCorrect(correct);
    
    // Create reset function
    const reset = () => {
      setSelected(null);
      setIsCorrect(null);
    };
    
    // Call parent callback with all expected parameters
    onAnswer(opt, correct, 1, reset);
    
    // Set timeout to reset the color after showing it
    setTimeout(() => {
      reset();
    }, correct ? 2000 : 1000);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl mt-6 w-full">
      <h2 className="text-xl font-semibold mb-6">
        {data.question || "Loading question..."}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {data.options && data.options.length > 0 ? (
          data.options.map((opt, i) => {
            // Determine button style based on selection
            let buttonStyle = {
              border: '3px solid #ccc',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'left',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '18px',
              backgroundColor: 'white',
              color: 'black',
              transition: 'all 0.3s ease'
            };

            // If this option is selected, apply color
            if (selected === opt) {
              if (isCorrect) {
                // Correct answer - make it GREEN
                buttonStyle.backgroundColor = 'limegreen';
                buttonStyle.color = 'white';
                buttonStyle.border = '4px solid green';
                buttonStyle.boxShadow = '0 0 20px rgba(0,255,0,0.5)';
              } else if (isCorrect === false) {
                // Wrong answer - make it RED
                buttonStyle.backgroundColor = 'red';
                buttonStyle.color = 'white';
                buttonStyle.border = '4px solid darkred';
                buttonStyle.boxShadow = '0 0 20px rgba(255,0,0,0.5)';
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleClick(opt)}
                style={buttonStyle}
              >
                {String.fromCharCode(65 + i)}. {opt}
              </button>
            );
          })
        ) : (
          <div>Loading options...</div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
