import { sendMessage } from '../actions/action';
import { DISPLAY_QUESTIONS } from '../actions/action';
import { FETCH_QUESTION_REQUEST, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_FAILURE, } from '../actions/action';
import { fetchUsers } from '../actions/action';


const initialState = {
  questions: [],
  loading: false,
  error: null,
  users: []
};

export default function reducer (state=initialState, action) {
switch (action.type) {
  case FETCH_QUESTION_REQUEST:
    return {
      ...state,
      loading: true
    };
  case FETCH_QUESTION_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };
  case FETCH_QUESTION_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      questions: action.questions
    };
  case sendMessage:
    //now for the serious stuff: actually send the message.
    action.id.forEach(el => {
      sendMessage(el, action.message);
    });
    return ({...state})

  default:

  }

  else if(action.type === fetchQuestion){

    console.log(action.questions);
      fetch(`${url}/api/questions/questionsList`)
      .then(result => result.text())
      .then(result => {
        console.log(result);
      });

    return ({ ...state, questions: action.questions})
    }

    else if(action.type === fetchUsers){

    console.log(action.users);
      fetch(`${url}/api/users`)
      .then(result => result.text())
      .then(result => {
        console.log(result);
      });

    return ({ ...state, users: action.users})
    }

  else 
    return state;
  }
};

  // else if(action.type === fetchQuestion){
  //
  //   // console.log(action.questions);
  //   //   fetch(`${url}/api/questions/questionsList`)
  //   //   .then(result => result.text())
  //   //   .then(result => {
  //   //     console.log(result);
  //   //   });
  //
  //   return ({ ...state, questions: action.questions})
  //   }
  //
  // else
  //   return state;
  //
  // }
