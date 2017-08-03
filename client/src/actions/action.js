let url = 'http://localhost:8080';
if (process.env.NODE_ENV === 'production'){
  //do not include a slash at the end!
  url = 'https://chime-in.herokuapp.com';
}

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

export const CREATE_USER = 'CREATE_USER';
export const createUser = (currentUser) => ({
  type: CREATE_USER,
  currentUser
});

export const SET_ACTIVE_QUESTION = 'SET_ACTIVE_QUESTION';
export const setActiveQuestion = (question) => ({
  type: SET_ACTIVE_QUESTION,
  question: question
});

export const SET_ID_INPUT = 'SET_ID_INPUT';
export const setIdInput = (string) => ({
  type:SET_ID_INPUT,
  ids: string
});

export const SET_MESSAGE_INPUT = 'SET_MESSAGE_INPUT';
export const setMessageInput = (string) => ({
  type:SET_MESSAGE_INPUT,
  message:string
});

export const SET_ACTIVE_USER = 'SET_ACTIVE_USER';
export const setActiveUser = (user) => ({
  type: SET_ACTIVE_USER,
  user: JSON.parse(user)
});

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST'
export const addUserRequest = () => ({
  type: ADD_USER_REQUEST
});


export const sendMessage = (targetID, message) => dispatch => {
  console.log(targetID);
  fetch(`${url}/api/users/get/${targetID}`)
        .then(el=> el.text())
        .then(el=>{
          let elem = JSON.parse(el);
          fetch(`${url}/api/messages/send`, {
            method: 'POST',
            body: JSON.stringify({
              data:elem,
              message: message,
              targets: targetID
            }),
            headers:{'content-type': 'application/json'}
          }).then(data =>console.log(data));
        }).catch(err => console.error(err));
};

  export const sendEmail = (targetID, message) => dispatch => {
      // console.log(targetID);
      // console.log('HI');
      fetch(`${url}/api/users/getByEmail/${targetID}`)
          .then(el=> el.text())
          .then(el=>{
            let elem = JSON.parse(el);
            fetch(`${url}/api/messages/sendEmail`, {
              method: 'POST',
              body: JSON.stringify({
                'email': elem[0].email,
                'id': elem[0].id,
                'message':message
              }),
              headers:{'content-type': 'application/json'}
            }).then(el=>console.log(el));
          });

    };

export const fetchQuestion = () => dispatch => {
  dispatch(fetchQuestionRequest());
  return fetch(`${url}/api/questions/questionsList`)
      .then(data => {
        if (!data.ok) {
          return dispatch(fetchQuestionFailure());
        }
        return data.json();
      }).then(response => {
        return dispatch(fetchQuestionSuccess(response));
      });
};

export const fetchUsers = (id = 1) => dispatch => {
  dispatch(fetchUsersRequest());
  return fetch(`${url}/api/users/targets/${id}`)
    .then(data => {
      if (!data.ok) {
        return dispatch(fetchUsersFailure());
      }
      return data.json();
    })
    .then(response => {
      return dispatch(fetchUsersSuccess(response));

    });
};

export const addUser = (user) => dispatch => {
  console.log(user);
  dispatch(addUserRequest());
  fetch(`${url}/api/users/new`, {
    method: 'POST',
    body: JSON.stringify({
      'name': user.name,
      'email': user.email,
      'phonenumber': user.phonenumber,
      'preferred': user.preferred
    }),
    headers: {'content-type': 'application/json'}
  }).then(el=>console.log(el));

};
