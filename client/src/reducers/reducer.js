import { sendMessage } from '../actions/action';
import { FETCH_QUESTION_REQUEST, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_FAILURE } from '../actions/action';
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, SET_ACTIVE_QUESTION, SET_ID_INPUT, SET_MESSAGE_INPUT, SET_ACTIVE_USER } from '../actions/action';

const initialState = {
  questions: [],
  loading: false,
  error: null,
  users: [],
  activeUsers: [],
  activeQuestion: null,
  inputIds: '',
  inputMessage:''
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
  case SET_ACTIVE_QUESTION:
    return{
      ...state,
      activeQuestion: action.question
    }
  case SET_ID_INPUT:
    return{
      ...state,
      inputIds: action.ids
    }
  case SET_MESSAGE_INPUT:
    return{
      ...state,
      inputMessage: action.message
    }
  case SET_ACTIVE_USER:
  if(state.activeUsers.includes(action.user[0].id)){
    let arr = state.activeUsers.filter(i=>i !== action.user[0].id)
    return{
      ...state,
      activeUsers: arr
    }
  } else{
    return{
      ...state,
      activeUsers: [...state.activeUsers, action.user[0].id]
    }
  }
  default:
    return state;
  }
};


