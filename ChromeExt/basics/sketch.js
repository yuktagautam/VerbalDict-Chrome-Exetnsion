let bgpage = chrome.extension.getBackgroundPage();
let mostouter = document.querySelector(".mostouter");
let word = bgpage.word;
console.log("let's see it's a trim or not");
word = word.trim();

if (word.indexOf(" ") != -1) {
  mostouter.innerHTML = `<h1><b>Something went Wrong</b></h1></br>1.Check Out Your Internet Connection</br>2.Selecting more than one word is not allowed `;
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("voice").addEventListener("click", voice);
  document.getElementById("ReadMeaning").addEventListener("click", ReadP);
});

async function ReadP() {
  let paragraph = document.getElementById("para1").innerHTML;
  console.log(paragraph);
  if (word.indexOf(" ") == -1) {
    try {
      if ("speechSynthesis" in window) {
        // Speech Synthesis supported 🎉

        var msg1 = new SpeechSynthesisUtterance();
        msg1.text = paragraph;
        // msg.rate = slider.value;
        // msg.volume = sliderVol.value; // From 0 to 1

        window.speechSynthesis.speak(msg1);
      }
    } catch (e) {
      console.log("some error occured");
    }
  }
}
async function voice() {
  // var slider = document.getElementById("myRangeRate");
  // var sliderVol=document.getElementById("myRangeVol");
  try {
    let msg = new SpeechSynthesisUtterance();

    if (word.indexOf(" ") == -1) {
      console.log("white space nhi hai yukta");
      if ("speechSynthesis" in window) {
        // Speech Synthesis supported 🎉

        // msg.rate = slider.value;
        // msg.volume = sliderVol.value; // From 0 to 1
        msg.text = word;
        console.log(msg);
        window.speechSynthesis.speak(msg);
      }
    } else {
      let helper = new SpeechSynthesisUtterance();
      helper.text = "First select a text";
      window.speechSynthesis.speak(helper);
    }
  } catch (e) {
    document.getElementById("para1").innerHTML =
      "Check Your Internet Connection";
  }
}
function initlocalStorage() {
  let allarray = JSON.parse(localStorage.getItem("allDef"));

  console.log(allarray);
  if (allarray == null) {
    //if doesn't exist
    localStorage.setItem("allDef", JSON.stringify([]));
  }
}
async function fetchData() {
  console.log("below word");
  console.log(word);
  try {
    console.log("call before url");
    let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    console.log("uske badh");
    console.log(url);

    const response = await fetch(url);
    // waits until the request completes...

    const ans = await response.json();
    console.log(ans[0].meanings[0].definitions[0].definition);
    let def1 = ans[0].meanings[0].definitions[0].definition;
    console.log(word + " " + def1);

    document.getElementById("h1ist").innerHTML = word;
    document.getElementById("para1").innerHTML = def1;
    storeToLocalStorage(word, def1);

    
    let imgurl = `https://source.unsplash.com/600x400/?${word}`;
    document.getElementById("imageid").src = imgurl;
  } catch (e) {
    // document.getElementById("para1").innerHTML =
    //   "Try to select one word and refresh the page";
    console.log("some error occured");
  }
}


  fetchData();

function storeToLocalStorage(word, defination) {
  let allarray = JSON.parse(localStorage.getItem("allDef"));

  initlocalStorage();
  allarray = JSON.parse(localStorage.getItem("allDef"));

  let defObj = {
    defId: new Date(),
    defword: word,
    defmean: defination,
  };

  allarray.push(defObj);

  console.log(allarray);

  // let id = uid();
  // console.log(id)
  localStorage.setItem("allDef", JSON.stringify(allarray));
}
