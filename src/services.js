import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from "./_DATA";
import {
  getUsersCompleted,
  getQuestionsCompleted,
  saveQuestionCompleted,
  saveQuestionAnswerCompleted
} from "./redux/actions";

export async function getUsers() {
  const users = await _getUsers();
  getUsersCompleted(users);
}
export async function getQuestions() {
  const questions = await _getQuestions();
  getQuestionsCompleted(questions);
}
export async function saveQuestion(question) {
  const persistedQuestion = await _saveQuestion(question);
  saveQuestionCompleted(persistedQuestion);
}
export async function saveQuestionAnswer(user, question, answer) {
  await _saveQuestionAnswer({
    authedUser: user.id,
    qid: question.id,
    answer
  });
  saveQuestionAnswerCompleted({ questionId: question.id, option: answer });
}
