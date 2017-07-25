export const SEND_PHONE_MESSAGE = 'SEND_PHONE_MESSAGE';
export const sendPhoneMessage = (id, message) => ({
  type: SEND_PHONE_MESSAGE,
  id,
  message
});

export const DISPLAY_QUESTIONS = 'DISPLAY_QUESTION';
export const displayQuestions = (questions) => ({
  type: DISPLAY_QUESTIONS,
  questions
});

export const FETCH_QUESTION_REQUEST = 'FETCH_QUESTION_REQUEST';
export const fetchQuestionRequest = () => ({
  type: FETCH_QUESTION_REQUEST
});

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = (questions) => ({
  type: FETCH_QUESTION_SUCCESS,
  questions
});

export const FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE';
export const fetchQuestionFailure = () => ({
  type: FETCH_QUESTION_FAILURE
});

// export const fetchQuestion = (questions) => dispatch => {
//   return fetch('http://localhost:8080/api/questions/questionsList', {
//     method: 'GET',
//     body: JSON.stringify(questions),
//     headers: {
//       'content-type': 'application/json'
//     }
//   })
//       .then(result => result.json())
//       .then(result => {
//         console.log(result);
//         return result;
//       });
// };
export const fetchQuestion = () => dispatch => {
  dispatch(fetchQuestionRequest());
  return fetch('http://localhost:8080/api/questions/questionsList')
      .then(data => {
        if (!data.ok) {
          return dispatch(fetchQuestionFailure());
        }
        return data.json();
      }).then(response => {
        return dispatch(fetchQuestionSuccess(response));
      });
};
