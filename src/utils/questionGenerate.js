import { GoogleGenerativeAI } from "@google/generative-ai";
import { safetySettings } from "./youtubeVideosFun";
//import { error } from "pdf-lib";


//import { text } from "@fortawesome/fontawesome-svg-core";




const questionGenerate = (textGrab,dispatch,addGenQuestion) => {

  //calling api
  async function generate() {
    const apiKey1=process.env.REACT_APP_firstQuestionGena;
    const apiKey2 = process.env.REACT_APP_SecondQuestionGena;
    const genAI = new GoogleGenerativeAI(apiKey1);//
 
   const prompt = `From the text below, generate 2 multiple-choice questions. Format the response as follows:

  1. [Question]
   a) [Option 1]
   b) [Option 2]
   c) [Option 3]
   d) [Option 4]
   Answer: [Correct Option]

Text:${textGrab}`;

 try {
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          safetySettings,
        });  
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
      
    if(text){
          const parsedQuestions = parseQuestions(text);
         
          dispatch(addGenQuestion(parsedQuestions)) 
          return parsedQuestions
        }
      }
 catch (error) {
      // console.log(error)

        try{
         
          const genAIt = new GoogleGenerativeAI(apiKey2);
          const model = genAIt.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
                 if(text){
                  const parsedQuestions = parseQuestions(text);
                  
                  dispatch(addGenQuestion(parsedQuestions))
                  return parsedQuestions 
                 }
          }
        catch(error){
          //if fail use constant data
         let defaultData=[
          {
              "question": "Sorry, this message is from AiPdf. We are currently unable to provide questions. Can you guess why?",
              "options": [
                  "API expired",
                  "It never worked",
                  "Too many requests",
                  "Hope you enjoyed"
              ],
              "correctAnswer": "a"
          },
          {
              "question": "Hope you have enjoyed AiPdf. We are extremely sorry for the reason.",
              "options": [
                  "we are not able to generate text beacuse of api expired",
                  "ok enjoy the features",
                  "hope you like the way we are handling error",
                  "hope you will revisit"
              ],
              "correctAnswer": "a"
          }
      ]
      
      dispatch(addGenQuestion(defaultData)) 
      return defaultData
             }

      }
    
  }



 //generate unique id
 async function generateUniqueId(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function cacheData() {
  try {
    const uidg = await generateUniqueId(textGrab); // Generate unique key
    // Retrieve the cached object or initialize an empty one
    const getCachedData = JSON.parse(sessionStorage.getItem("main")) || {};
    if (getCachedData[uidg]) {
      dispatch(addGenQuestion(getCachedData[uidg]))
    } else {
      getCachedData[uidg] = await generate(); // Generate and cache new data
      sessionStorage.setItem("main", JSON.stringify(getCachedData)); // Save updated cache
    }

    
  } catch (error) {
    console.error("Error in cacheData:", error);
    generate()
  }
}

cacheData()


//parsing the response
   function parseQuestions(text) {
    // Split the text into individual question blocks
    const questions = text.trim().split(/\n(?=\d+\.)/);
  
    return questions.map((questionBlock) => {
      // Match the question text, including handling multiline text before the options
      const questionMatch = questionBlock.match(/^\d+\.\s+([\s\S]*?)(?=\n\s*[a-d]\))/);
  
      // Match the options
      const optionsMatch = [...questionBlock.matchAll(/[a-d]\)\s+(.+)/g)];
  
      // Match the correct answer
      const answerMatch = questionBlock.match(/Answer:\s*([a-d])/i);
  
      return {
        question: questionMatch ? questionMatch[1].trim() : "",
        options: optionsMatch.map((match) => match[1].trim()),
        correctAnswer: answerMatch ? answerMatch[1].toLowerCase() : "",
      };
    });
  }
  
  
};
export default questionGenerate;
