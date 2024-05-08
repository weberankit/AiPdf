import React from 'react';


/*
const PrintComponent = ({ value }) => {

const grabHighlight=()=>{
    const divContents = document.querySelector(value).outerHTML;
    console.log(divContents)
    const style = document.querySelector(value);
    const highlightParts = document.querySelectorAll(".Highlight__part")
     console.log(highlightParts)
    let highlightedText = '';

    highlightParts.forEach(part => {
        console.log(part,part.innerHTML,part.textContent)
       const { background, left, top, width, height } = part.style;
       // console.log(background, left, top, width, height)
       // console.log(part.style)
       // const { background } = part.style;
      console.log(background)
        // Check if the background color is yellow
        if (background=== 'rgba(255, 226, 143, 1)') {
            // Extract text content of the element
            const textContent = part.textContent.trim();
            // Append to highlightedText variable
            highlightedText += textContent + '\n';
        }
    });
        return highlightedText
}

    const printDiv = () => {
       
grabHighlight()
        console.log("Highlighted Text:", grabHighlight());

       
    }

    const printText = () => {

       grabHighlight()

const printWindow = window.open('', '', 'height=500, width=500');
        printWindow.document.write('<html><head><title>Highlighted Text</title></head><body>');
        printWindow.document.write(`<pre>${ grabHighlight()}</pre>`); // Display the text in a <pre> tag for better formatting
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
    
    return (
        <div>
            <div onClick={() => printDiv()}>Click here to log highlighted text</div>
            <button onClick={() => printText("Highlighted Text")}>Print Highlighted Text</button>
        </div>
    );
}

export default PrintComponent;
*/