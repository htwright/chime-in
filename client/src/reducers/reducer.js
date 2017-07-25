import { SEND_PHONE_MESSAGE } from '../actions/action';
import { DISPLAY_QUESTIONS } from '../actions/action';
import { FETCH_QUESTION_REQUEST, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_FAILURE, } from '../actions/action';

let url = 'http://localhost:8080';
if (process.env.NODE_ENV === 'production'){
  url = 'http://chime-in.herokuapp.com';
}

const initialState = {
  questions: [],
  loading: false,
  error: null
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
  case SEND_PHONE_MESSAGE:
    let sendMessage = (targetID, message) =>{
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
    console.log('hooray!');
    console.log(action);
    //now for the serious stuff: actually send the message.
    action.id.forEach(el=>{sendMessage(el, action.message);});
    return ({...state})

  default:
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
