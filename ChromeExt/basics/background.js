console.log("background running");

window.word = "first select the content you want to read";
chrome.runtime.onMessage.addListener(reciever);
function reciever(request, sender, sendResponse) {
  window.word = request.text;
}
