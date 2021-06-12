document.getElementById("ReadTxt").addEventListener("click", Read);
let defbutton=document.querySelector(".alldef");

let bpage= chrome.extension.getBackgroundPage();

let word=bpage.word;

defbutton.addEventListener("click",function(){
 chrome.tabs.create({url:"alldef.html"});
})

async function Read(){
    let msg=new SpeechSynthesisUtterance();
    msg.text=word;
    console.log(word);
    try{
      window.speechSynthesis.speak(msg); 
    }catch{
        console.log("First select some Word ");
    }
}
