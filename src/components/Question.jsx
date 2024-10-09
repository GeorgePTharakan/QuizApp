import Answers from "./Answers";
import questions from "../questions";

export default function Question({ index, bringAnswer }) {
  const answer = {
    selectedAnswer: "",
    isCorrect: null,
  };

  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }
  function handleSelectAnswer(answer) {
    bringAnswer(answer);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <h2>{questions[index]?.text}</h2>
      <Answers
        answers={questions[index]?.answers}
        selectedAnswers={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
