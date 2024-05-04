import {Link} from "react-router-dom"
import first from "../images/dict/1.png"
    import sec from "../images/dict/2.png"
    import third from "../images/dict/3.png"
    import four from "../images/dict/4.png"
    import five from "../images/dict/5.png"
    import sixth from "../images/dict/6.png"
    import seven from "../images/dict/7.png"
    import eight from "../images/dict/8.png"
    import nine from "../images/dict/9.png"
    import ten from "../images/dict/10.png"
    import elve from "../images/dict/11.png"
    import twel from "../images/dict/12.png"
    import thirteen from "../images/dict/13.png"
    import fourtenn from "../images/dict/14.png"
import StepCreate from "./StepCreate"
const DicctKeyStep=()=>{
    const Imgarray = [
        first,
        sec,
        third,
        four,
        five,
        sixth,
        seven,
        eight,
        nine,
        ten,
        elve,
        twel,
        thirteen,
        
    ];



    return(
        <>
       <StepCreate data={Imgarray} last={fourtenn} links={"https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text/pricing"}/>
        </>
    )
}
export default DicctKeyStep