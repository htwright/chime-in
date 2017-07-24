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
