const Validate=(email,password)=>{
    const emailValidation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
    const passwrodValidtion =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
if(!emailValidation)return "emailID is not valid"
if(!passwrodValidtion) return "please include special,capital,small,number and 8-digit"
return null
}

export default Validate