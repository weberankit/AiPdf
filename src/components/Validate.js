const Validate=(email,password)=>{
    const emailValidation =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const passwrodValidtion =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
if(!emailValidation)return "emailID is not valid"
if(!passwrodValidtion) return "please include special,capital,small,number and 8-digit"
return null
}

export default Validate