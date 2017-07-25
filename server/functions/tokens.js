let bCrypt = require("bcrypt");
let crypto = require("crypto");

class tokens{
  constructor(){
    this.SaltFactor = 10;
    //console.log("hit the token constructor");
  }
  makeToken(user){
    //generate a token
    return crypto.randomBytes(128).toString("hex");

  }

  makeVerificationCode(){
    return crypto.randomBytes(1).toString("hex");
  }

}

module.exports=tokens;
