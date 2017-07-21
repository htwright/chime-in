import { SEND_PHONE_MESSAGE } from '../actions/action';
import { DISPLAY_QUESTIONS } from '../actions/action';

const initialState = {
  questions: []
};

export default function reducer(state=initialState, action){

  if(action.type=== SEND_PHONE_MESSAGE){

    let sendMessage = (targetID, message) =>{
      console.log(targetID);

      fetch('http://chime-in.herokuapp.com/api/users/get/'+targetID)
          .then(el=>el.text())
          .then(el=>{

            fetch('http://chime-in.herokuapp.com/api/messages/send', {
              method: 'POST',
              body: JSON.stringify({
                'phone': el,
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
  }

  if(action.type === DISPLAY_QUESTIONS){

    let displayQuestions = (questions) =>{
      console.log(questions);

      fetch('http://chime-in.herokuapp.com/api/questions/questionsList')
      .then(result => result.text());
  }
  }
}
