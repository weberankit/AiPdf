
import { GoogleGenerativeAI } from "@google/generative-ai";
//import { processa ,processb} from "./helper";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

//import { useDispatch } from "react-redux";

export const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];
const apiFail=[
    {
        "kind": "youtube#searchResult",
        "etag": "dlbgNXhmY3-WZeinYTcwmG1rnmQ",
        "id": {
            "kind": "youtube#video",
            "videoId": "MHUGuw1Agnc"
        },
        "snippet": {
            "publishedAt": "2022-01-17T13:30:03Z",
            "channelId": "UCNa2XVW-mWw3DG8fnvtSSdg",
            "title": "Message from AiPdf -please Retry search might be api data limit is over",
            "description": "please-Retry-if-it-continue-then-try-next-day--sorry",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/B2mI--uy99U/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://ucarecdn.com/0d4514f1-ad08-4a6f-997e-439c246064a4/Untitleddesign1.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/B2mI--uy99U/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "Edusquadz",
            "liveBroadcastContent": "none",
            "publishTime": "2022-01-17T13:30:03Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "etag": "ODiTwkaVcQ65yfId1uZevXTWiQ8",
        "id": {
            "kind": "youtube#video",
            "videoId": "4iy_fHfWnnc"
        },
        "snippet": {
            "publishedAt": "2022-10-13T13:14:37Z",
            "channelId": "UC4EacBmPcZXvr02g78hddUA",
            "title": "How to increase views on education content?🤔 #sandeepmaheshwari #shorts #khansir",
            "description": "How to increase views on education content by @SandeepSeminars Motivational speech | Motivational video | Sandeep MH ...",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/4iy_fHfWnnc/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/4iy_fHfWnnc/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/4iy_fHfWnnc/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "Sandeep MH Shorts",
            "liveBroadcastContent": "none",
            "publishTime": "2022-10-13T13:14:37Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "etag": "u0ltdFNeGxGhCaOSks9Bd_L_jUI",
        "id": {
            "kind": "youtube#video",
            "videoId": "_KD4apPO-nw"
        },
        "snippet": {
            "publishedAt": "2022-06-03T16:58:43Z",
            "channelId": "UC46UeayN09BD0ju8S8OgRCg",
            "title": "30 Research topics on Education#yotubeshorts",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/_KD4apPO-nw/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/_KD4apPO-nw/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/_KD4apPO-nw/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "Educational videos YouTube shorts",
            "liveBroadcastContent": "none",
            "publishTime": "2022-06-03T16:58:43Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "etag": "QGJ_Lqkoth2bCErrKoqYQfGwOQU",
        "id": {
            "kind": "youtube#video",
            "videoId": "iNyvTUbMu8I"
        },
        "snippet": {
            "publishedAt": "2022-03-14T00:28:42Z",
            "channelId": "UCr2blDDifARIoqJcHbM-6zg",
            "title": "How to increase views &amp; subscribers on educational channel|how to upload education videos in youtube",
            "description": "How to increase views & subscribers in educational channel || how to upload education videos in youtube 2022 || New Channel ...",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/iNyvTUbMu8I/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/iNyvTUbMu8I/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/iNyvTUbMu8I/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "ShriRaj Rahul Tech",
            "liveBroadcastContent": "none",
            "publishTime": "2022-03-14T00:28:42Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "etag": "GSNsiFJnpRONhlEyAkR0gNme3Mc",
        "id": {
            "kind": "youtube#channel",
            "channelId": "UC_opX1PjtWVozP8ahO-CFeQ"
        },
        "snippet": {
            "publishedAt": "2019-08-04T11:30:14Z",
            "channelId": "UC_opX1PjtWVozP8ahO-CFeQ",
            "title": "Information & Educational Videos",
            "description": "Hi , Friends welcome to this informative English Channel , Here you will get the Following Videos For Engineering Entrance Exam ...",
            "thumbnails": {
                "default": {
                    "url": "https://yt3.ggpht.com/8xZmYMdoxde3808_aUgSQpHq0i_0R4LKu7f3mG12VUwz-lOKuarsUkmpqfC0URPeImLN1qm2Tw=s88-c-k-c0xffffffff-no-rj-mo"
                },
                "medium": {
                    "url": "https://yt3.ggpht.com/8xZmYMdoxde3808_aUgSQpHq0i_0R4LKu7f3mG12VUwz-lOKuarsUkmpqfC0URPeImLN1qm2Tw=s240-c-k-c0xffffffff-no-rj-mo"
                },
                "high": {
                    "url": "https://yt3.ggpht.com/8xZmYMdoxde3808_aUgSQpHq0i_0R4LKu7f3mG12VUwz-lOKuarsUkmpqfC0URPeImLN1qm2Tw=s800-c-k-c0xffffffff-no-rj-mo"
                }
            },
            "channelTitle": "Information & Educational Videos",
            "liveBroadcastContent": "none",
            "publishTime": "2019-08-04T11:30:14Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "etag": "RXZlMVeNQVmo8esqAhQZfHSCx_E",
        "id": {
            "kind": "youtube#video",
            "videoId": "DlN3Lx8r2H8"
        },
        "snippet": {
            "publishedAt": "2023-05-28T06:48:33Z",
            "channelId": "UCrvrKZACb0ooCb13xTrSOsg",
            "title": "Real meaning of  Education | Presentation | Motivational speech | Public speaking | English-english",
            "description": "Join us to be an icebreaker Public Speaker. Join us to be fluent in English speaking. Join us to develop personality. Join us ...",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/DlN3Lx8r2H8/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/DlN3Lx8r2H8/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/DlN3Lx8r2H8/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "WellTalk Institute",
            "liveBroadcastContent": "none",
            "publishTime": "2023-05-28T06:48:33Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "etag": "susbPCyqWbjHmy9WKwyOqoEjbig",
        "id": {
            "kind": "youtube#playlist",
            "playlistId": "PL8828Z-IEhFGAg0WRVHxHtHjHdIAlj5hA"
        },
        "snippet": {
            "publishedAt": "2018-02-13T12:12:33Z",
            "channelId": "UC-CSyyi47VX1lD9zyeABW3w",
            "title": "Educational Videos",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/R-6DorkdP28/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/R-6DorkdP28/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/R-6DorkdP28/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "Dhruv Rathee",
            "liveBroadcastContent": "none",
            "publishTime": "2018-02-13T12:12:33Z"
        }
    },
  
]




const apikeyai=process.env.REACT_APP_Gemini_KEY;
const apikeyai2=process.env.REACT_APP_Temini_KEY;
   //process.env.REACT_APP_first_KEY
 const genAI = new GoogleGenerativeAI(apikeyai);
function apiCall(videoQuery,dispatch,addListYt,addShowMsgi,addQueryInput){
 dispatch(addShowMsgi("Ai- finding topic of text"))
  async  function apiCallai(){
  try{
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });
const prompt = `you have to act as topic finder from given prompt, if the prompt is vague or general or small, provide the topic that best matches or related to context of prompt.
please Note strictly only return 4-5 words of topic that closely matches from prompt.here is your prompt ${videoQuery} `
const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text();
       
if(text){
  videoFetch(text,dispatch,addListYt)
 dispatch(addShowMsgi("finding videos from youtube "))
 dispatch(addQueryInput(text))
}
}catch(error){
   //if it fail again fetch data -- api quotaa over   
try{
    dispatch(addShowMsgi("Retrying Ai understanding "))
    const genAIt = new GoogleGenerativeAI(apikeyai2);
    const model = genAIt.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });
    const prompt = `you have to act as topic finder from given prompt, if the prompt is vague or general or small, provide the topic that best matches or related to context of prompt.
    please Note strictly only return 4-5 words of topic that closely matches from prompt.here is your prompt ${videoQuery} `
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
           if(text){
       videoFetch(text,dispatch,addListYt)
      dispatch(addShowMsgi("finding videos from youtube "))
      dispatch(addQueryInput(text))
           }
}catch(error){
    //if fail use constant data
    let textLimit=videoQuery.split(" ",9).join(" ")
    videoFetch(textLimit,dispatch,addListYt);
    dispatch(addShowMsgi("oh! Ai fail no worry it will find videos from youtube"))
}
}
}

apiCallai()
}


function videoFetch(text,dispatch,addListYt){
async function videoFetchYt(){


try{
   // setStatus("fetching data from youtube")
   // dispatch(addShowMsg("getting value from youtube"))
      
       
    const data = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=id%2Csnippet&maxResults=15&q=${text}&key=${process.env.REACT_APP_first_KEY}`)
           
    const json = await data.json()
    //console.log(json)
 if(json?.items){
    //console.log("llk",json?.items)
 
    dispatch(addListYt(json?.items));
    
    }
    else if (json?.error?.errors?.some(e => e?.reason === 'quotaExceeded')) {
        
        const dataVideo = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=id%2Csnippet&maxResults=15&q=${text}&key=${process.env.REACT_APP_Second_KEY}`);
       const json = await dataVideo.json();
        
        if (json?.items) {
           dispatch(addListYt(json?.items));
           
        } else {
            //if this also fail provide constant data
            dispatch(addListYt(apiFail));
        
        }
    } 
    
    
    
    
    else{
       //if api fail
       dispatch(addListYt(apiFail));
      // dispatch(addShowMsg(null));
     // dispatchVal(null,dispatch,addShowMsg)
    }
    }catch(error){
        //if api fail
        dispatch(addListYt(apiFail));
       // dispatch(addShowMsg(null));
      // dispatchVal(null,dispatch,addShowMsg)
    }
           }

videoFetchYt()
}

  
   



export const handleAiVideo=(videoQuery,dispatch,addListYt,addShowMsgi,addQueryInput,sideBarShow)=>{
if(!videoQuery || videoQuery.trim()=== " " || !sideBarShow){
    alert("please  select text in pdf then go for AiVideos ")
    return
}

//setCheckClick(true)
apiCall(videoQuery,dispatch,addListYt,addShowMsgi,addQueryInput);
dispatch(addShowMsgi("text is sent to Ai"))
}
  

