const Validate=(email,password,reEnterPass)=>{
    const emailValidation =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    //const passwrodValidtion =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    //due to reset password i have to use simply not allow empty string as firebase rest password allow spaces at 
    //start also so in input value of password there were we cannot use trim .this below only prevent from entring spaces only
    const passwrodValidtion = password.length>=6
   // const reEnterPassword=reEnterPass.trim()
   
if(!emailValidation)return "emailID is not valid"
if(!passwrodValidtion) return "password is not valid (password must be 6 character)"

 /*if(passwrodValidtion !== reEnterPassword){
      return "Passwords do not match"
    }*/

return null
}

export default Validate