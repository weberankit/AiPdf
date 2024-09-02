import { createContext } from "react"
export const widthSetResponseBox=(setWidth,fontValue,valueToHideText)=>{
    
    //
    if(window.innerWidth<500){
        setWidth(50)
        fontValue=18 
        valueToHideText="hidden"
    }
if(window.innerWidth>500 && window.innerWidth<=632){
    setWidth(35)
    fontValue=18 
    valueToHideText=""
}
   if(window.innerWidth>632 && window.innerWidth<=816){
        
        setWidth(30)
        fontValue=18 
            valueToHideText=""
    }
    if(window.innerWidth>816 && window.innerWidth<=1024){
        setWidth(25)
        fontValue=18 
        valueToHideText=""
    }

if(window.innerWidth>1024){
    setWidth(20)
    fontValue=18 
    valueToHideText=""
}
}




export function handlePrint( keyForStoringHighlight,printfileName) {
  
    try {
      const valuesPrint = JSON.parse(localStorage.getItem(`${keyForStoringHighlight}`));
      if (valuesPrint && valuesPrint.length > 0) {
        const divContents = valuesPrint.map(item => {
          const textToPrint = item.content.text || item.comment.text;
          return `<div class="print-item">${textToPrint}</div>`;
        }).join("");
  
        const printWindow = window.open('', '', 'height=600, width=800');
        printWindow.document.write(`<html><head><title>${printfileName}</title>`);
        printWindow.document.write('<style>');
        printWindow.document.write('body { font-family: Arial, sans-serif; }');
        printWindow.document.write('.print-item { padding: 10px; margin-bottom: 10px; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 5px; }');
        printWindow.document.write('.print-item:last-child { margin-bottom: 0; }');
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(divContents);
        printWindow.document.write('<p>click on print and save the highlighted text pdf</p>')
        printWindow.document.write('<button onclick="window.print()" style="margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Print</button>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
      } else {
        console.log("No data found in local storage.");
        alert("you have not highlighted any text, first highlight in pdf")
      }
    } catch (error) {
      console.error("An error occurred while parsing or accessing local storage:", error);
      // Handle error if any
    }
  
}

export  const contextSpinLogin=createContext({spin:false})

export const processa={env:{REACT_APP_DATA:"AIzaSyA3P2rKf3SptvkGRDZhOYZ3dycHp6zmSdE"}}
export const processb={env:{REACT_APP_DATA:"AIzaSyCfRdHd8JVBIn5IaFZTE0iURfeoD-0i2l4"}}
