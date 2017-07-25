let crypto = require("crypto");

class tokens{
  makeToken(user){
    //generate a token
    return crypto.randomBytes(16).toString("hex");

  }

  makeVerificationCode(){
    return crypto.randomBytes(1).toString("hex");
  }

}

module.exports=tokens;
