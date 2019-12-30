import React from "react";
import { connect } from "react-redux";

function App({ questions, dispatch }) {
  const currentQuestion = Object.values(questions).find(
    question => question.answer === null
  );
  const handleClick = (questionId, option) => {
    const action = {
      type: "vote",
      payload: {
        questionId,
        option
      }
    };
    dispatch(action);
  };

  return (
    <>
      {currentQuestion ? (
        <div>
          Would you rather:
          <div onClick={() => handleClick(currentQuestion.id, "optionOne")}>
            {currentQuestion.optionOne.text}
          </div>
          or
          <div onClick={() => handleClick(currentQuestion.id, "optionTwo")}>
            {currentQuestion.optionTwo.text}
          </div>
        </div>
      ) : (
        <div>ALL QUESTIONS DONE-ZO!</div>
      )}
    </>
  );
}

const mapStatetoProps = state => ({
  questions: state.questions
});
//const mapDispatchToProps  = () => {}  if the second argument isn't passed
//to connect the component will receive dispatch by default
export default connect(mapStatetoProps)(App);
