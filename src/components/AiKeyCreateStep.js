//import { Link } from "react-router-dom"
//import Header from "./Header"
import first from "../images/aiStep/first.png"
import sec from "../images/aiStep/sec.png"
import third from "../images/aiStep/third.png"
import four from "../images/aiStep/fourt.png"
import five from "../images/aiStep/fifth.png"
import sixth from "../images/aiStep/sixth.png"
import seven from "../images/aiStep/seventh.png"
import eight from "../images/aiStep/eight.png"
import nine from "../images/aiStep/nine.png"
import StepCreate from "./StepCreate"
const AiKeyCreateStep=()=>{
    const Imgarray=[first,sec,third,four,five,sixth,seven,eight]
    return(
        <>
      <StepCreate data={Imgarray} last={nine} links={"https://ai.google.dev/gemini-api/docs/get-started/web#set-up-project"}/>
        </>
    )
}

export default AiKeyCreateStep