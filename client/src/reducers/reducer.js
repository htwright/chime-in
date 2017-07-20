import { SEND_PHONE_MESSAGE } from "../actions/action";

const initialState = {

}

export default function reducer(state=initialState, action){
  if(action.type=== SEND_PHONE_MESSAGE){

    let sendMessage = (targetID, message) =>{
        console.log(targetID)

        fetch("http://localhost:8080/api/users/get/"+targetID)
          .then(el=>el.text())
          .then(el=>{

            fetch("http://localhost:8080/api/messages/send", {
              method: 'POST',
              body: JSON.stringify({
                "phone": el,
                "message":message
              }),
              headers:{'content-type': 'application/json'}
            }).then(el=>console.log(el))
          })
    }
    console.log("hooray!");
    console.log(action);
    //now for the serious stuff: actually send the message.
    action.id.forEach(el=>{sendMessage(el, action.message)});
  }
}
