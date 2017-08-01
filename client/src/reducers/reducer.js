import { sendMessage } from '../actions/action';
import { FETCH_QUESTION_REQUEST, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_FAILURE } from '../actions/action';
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from '../actions/action';

const initialState = {
  questions: [],
  loading: false,
  error: null,
  users: [],
  targets: []
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
  case FETCH_USERS_REQUEST:
    return {
      ...state,
      loading: true
    };
  case FETCH_USERS_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };
  case FETCH_USERS_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      users: action.users
    };
  default:
    return state;
  }
};


