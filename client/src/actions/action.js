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
export const fetchQuestion = () => dispatch => {

  let url = 'http://localhost:8080';
  if (process.env.NODE_ENV === 'production'){
    url = 'http://chime-in.herokuapp.com';
  }
  
  return fetch(`${url}/api/questions/questionsList`)
  .then(res =>{
    return res.json();
  })
  .then(res =>{
    //console.log(res);
    return res;
  });
};

export const fetchUsers = () => dispatch => {
    let url = 'http://localhost:8080';
  if (process.env.NODE_ENV === 'production'){
    url = 'http://chime-in.herokuapp.com';
  }

  return fetch(`${url}/api/users`)
  .then(response => {
    return response.json();
  })
  .then(response => {
    console.log(response);
    return response;
  })
}