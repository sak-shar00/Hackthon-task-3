import { useState } from "react";

const QuestionCard = ({ data, onAnswer }) => {
  const [selected, setSelected] = useState(null);

  // Defensive check for data
  if (!data) {
    return <div>Loading question...</div>;
  }

  const handleClick = (opt) => {
    setSelected(opt);
    onAnswer(opt, () => setSelected(null));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl mt-6 w-full">
      <h2 className="text-xl font-semibold mb-6">
        {data.question || "Loading question..."}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {data.options && data.options.length > 0 ? (
          data.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleClick(opt)}
              className={`border p-3 rounded text-left ${
                selected === opt ? "bg-indigo-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {opt}
            </button>
          ))
        ) : (
          <div>Loading options...</div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;