

let buildMessage = (questionString,optionArr, attachmentArr)=>{
    let message = {
      "text": questionString,
      "attachments": []
    }
    let blankEntry = {
                    "name": null,
                    "text": null,
                    "type": "button",
                    "value": null
                };
    let acc = [];
    optionArr.forEach(el=>{
        let entry = Object.assign({},blankEntry);
        console.log(typeof el)
        if(typeof el === "object"){
            console.console.log("in here");
            entry.text = el.text;
            entry.name = el.name !== undefined ? el.name : "choice";
            entry.type = el.type !== undefined ? el.type : "button";
            entry.value = el.value !== undefined ? el.value : el.text;
        }else{
          entry = {
              "name": "choice",
              "text": el,
              "type": "button",
              "value": el

          }
      }
      acc.push(entry);
      message.attachments[0]={
          
            "fallback": "You are unable to choose.  Sorry!",
            "callback_id": "wopr_game",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": []
      }
      message.attachments[0].actions = acc;
    })
    return message;
}

let messageString = buildMessage("What is love?",["baby don't hurt me", "don't hurt me", "no more"])

console.log(JSON.stringify(messageString, null, 2));
