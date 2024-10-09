import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";
import Snackbar from "@mui/material/Snackbar";
export default function Quiz() {
  const [answerFromQuestion, setAnswerFromQuestion] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [snackBar, setSnackBar] = useState(false);
  let activeQuestionIndex = userAnswers.length;

  const quizisComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  function handleNext() {
    if (answerFromQuestion != "") {
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, answerFromQuestion];
      });
    } else {
      setSnackBar(true);
    }
    setAnswerFromQuestion("");
  }
  if (quizisComplete) {
    return <Summary userAnswers={userAnswers} />;
  }
  console.log(userAnswers);

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        bringAnswer={setAnswerFromQuestion}
      />
      <br />
      <button
        className="buttons"
        onClick={() => {
          setUserAnswers(userAnswers.slice(0, -1));
        }}
      >
        prev
      </button>
      <button className="buttons" onClick={handleSkipAnswer}>
        skip
      </button>
      <button className="buttons" onClick={handleNext}>
        next
      </button>
      <Snackbar
        open={snackBar}
        autoHideDuration={3000}
        onClose={() => {
          setSnackBar(false);
        }}
        message="please select answer before clicking next"
      />
    </div>
  );
}
