let url = 'http://localhost:8080';
if (process.env.NODE_ENV === 'production'){
  url = 'http://chime-in.herokuapp.com';
}

export const SEND_PHONE_MESSAGE = 'SEND_PHONE_MESSAGE';
export const sendPhoneMessage = (id, message) => ({
  type: SEND_PHONE_MESSAGE,
  id,
  message
});

export const TOGGLE_QUESTION_DETAILS = 'TOGGLE_QUESTION_DETAILS';
export const toggleQuestionDetails = () => ({
  type: TOGGLE_QUESTION_DETAILS
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

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST
});

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  users
});

export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const fetchUsersFailure = () => ({
  type: FETCH_USERS_FAILURE
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

export const sendMessage = (targetID, message) => dispatch => {
    console.log(targetID);
    fetch(`${url}/api/users/get/${targetID}`)
        .then(el=> el.text())
        .then(el=>{
          let elem = JSON.parse(el);
          fetch(`${url}/api/messages/send`, {
            method: 'POST',
            body: JSON.stringify({
              'phone': elem[0].phonenumber,
              'id': elem[0].id,
              'message':message
            }),
            headers:{'content-type': 'application/json'}
          }).then(el=>console.log(el));
        });
  };

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

export const fetchUsers = () => dispatch => {
  dispatch(fetchUsersRequest());
  return fetch(`${url}/api/users`)
    .then(data => {
      if (!data.ok) {
        return dispatch(fetchUsersFailure());
      }
      return data.json();
    })
    .then(response => {
      return dispatch(fetchUsersSuccess(response));
  })
}
