
window.addEventListener("mouseup", wordSelected);
function wordSelected() {
  let selectedTxt = window.getSelection().toString();
  console.log(selectedTxt);
 
  if (selectedTxt.length > 0) {
    let message = {
      text: selectedTxt,
    };
    console.log(message);
    chrome.runtime.sendMessage(message);
  } 
}

