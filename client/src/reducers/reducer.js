import { SEND_PHONE_MESSAGE } from "../actions/action";

const initialState = {

}

export default function reducer(state=initialState, action){
  if(action.type=== SEND_PHONE_MESSAGE){
    console.log("hooray!");
    console.log(action);
  }
}
