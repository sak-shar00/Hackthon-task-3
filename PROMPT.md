Prompt 1: Understanding the Problem Statement

“I am building a multiple-choice quiz application using React and Tailwind CSS.
Please help me understand the required user flow, UI/UX expectations, and key features such as subject selection, question navigation, retry-until-correct behavior, progress tracking, and score summary.”

Outcome:
Clarified the complete quiz flow including setup screen, quiz screen, retry logic, progress tracking, and result summary.


Prompt 2: Designing UI/UX Without Figma

“There is no Figma design provided.
Suggest a clean, modern, and responsive UI layout for a quiz app using Tailwind CSS, including gradients, cards, buttons, and feedback states.”

Outcome:
Implemented a card-based UI with gradient background, clear typography, responsive layout, and visual feedback for correct and incorrect answers.


Prompt 3: React State Management Strategy

“How should I structure React state for a quiz app that fetches questions from an API, shows one question at a time, tracks score, incorrect attempts, and supports restarting the quiz?”

Outcome:
Used screen-based state management (setup, quiz, result) along with dedicated states for questions, loading, and results.

Prompt 4: API Integration & Error Handling

“Help me integrate a POST API in React using Axios, handle loading states, API failures, and prevent crashes due to undefined data.”

Outcome:
Implemented safe API handling with async/await, loading indicators, validation of API response, and graceful error alerts.

Prompt 5: Debugging Runtime Errors

“I am getting a ‘Cannot read properties of undefined (reading length)’ error in React when starting the quiz. Please help me debug and fix it.”

Outcome:
Identified improper state initialization and unsafe rendering. Fixed by initializing arrays correctly and adding conditional rendering checks.

Prompt 6: Retry-Until-Correct Logic

“How can I enforce that a user must retry the same question until the correct answer is selected before moving to the next question?”

Outcome:
Implemented per-question validation ensuring progression only after selecting the correct answer, while tracking incorrect attempts.


Prompt 7: Submission Readiness

“Review my React quiz app for code cleanliness, maintainability, and evaluation readiness for a frontend assessment.”

Outcome:
Refactored code for readability, added proper error handling, improved UX flow, and ensured responsiveness and stability.


Notes
	•	LLM assistance was used to speed up development, debug runtime issues, and improve UX decisions.
	•	Final implementation decisions, code structure, and UI refinements were manually reviewed and customized.


