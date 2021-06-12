let body = document.querySelector("body");
let content = document.querySelector(".defContent");
let keyup = document.querySelector(".keyup");
let alldef = JSON.parse(localStorage.getItem("allDef"));
let heading = document.querySelector(".mainheading");
let img = document.querySelector("img");
img.style.animation = "move 2s 1";
let txt = "The<br>History Of <br> Word Search";
let i = 0;
let speed = 60;
function appendBoxToUI(arr) {
  for (let i = 0; i < arr.length; i++) {
    let { defId, defword, defmean } = alldef[i];
    let box = document.createElement("div");
    box.innerHTML = `
          <div class="boxall" id=${defId}>
          <div class="date">${defId}</div>
          <div class="word">${defword}</div>
          <div class="meaning">${defmean}</div>
          <div class="delete" delId=${defId}><i class="fas fa-trash"></i></div>
          </div>
          `;
    content.append(box);
    //  deleteFromStorage();
    let cross = box.querySelector(".delete");
    let icondel = box.querySelector(".fa-trash");
    icondel.addEventListener("click", function () {
      cross.click(); //if clicked on icon then to clicko on outer div
    });
    cross.addEventListener("click", function (e) {
      
      let currid = e.target.getAttribute("delId");
      
      box.remove();
      let alldefAfterDel = alldef.filter(function (obj) {
        

        if (obj.defId != currid) {
          console.log(true);
          return true;
        }
        console.log(false);
        return false;
      });
      alldef = alldefAfterDel;

      console.log(alldefAfterDel);

      localStorage.setItem("allDef", JSON.stringify(alldef)); //JSON stringify imp
    });
  }
}
appendBoxToUI(alldef);
const InputDelay = function (d, value) {
  let timer;
  return function () {
    //if the function has not already been executed, you will be able to stop the execution by calling the clearTimeout() method.
    clearTimeout(timer); //in every next keyup,
    timer = setTimeout(() => {
      console.log("ye toh e hai");

      console.log(value);
      let narr = [];
      for (let i = 0; i < alldef.length; i++) {
        let ans = alldef[i].defword.startsWith(value);
        if (ans == true) {
          narr.push(alldef[i]);
        }
      }
      clearfromui(alldef);
      showtoui(narr);
    }, d);
  };
};
keyup.addEventListener("keyup", function (e) {
  //cluster concept InputDelay returns a function
  let value = e.target.value;
  console.log(value);
  let debouncing = InputDelay(2000, value);
  debouncing();
});
function showtoui(narr) {
  for (let i = 0; i < narr.length; i++) {
    let id = narr[i].defId;
    let currbox = document.querySelector(`div[id='${id}']`);
    currbox.classList.remove("hide");
  }
}
function clearfromui(arr) {
  for (let i = 0; i < arr.length; i++) {
    let id = arr[i].defId;
    let currbox = document.querySelector(`div[id='${id}']`);
    console.log("ye hai classbox");
    console.log(currbox);
    currbox.classList.add("hide");
  }
}
heading.addEventListener("load", typewriter());
function typewriter() {
  if (i < txt.length) {
    let str=txt.substring(i,i+4);
    if(str=="<br>"){
      i=i+4;
      heading.innerHTML +=str;
    }else{
      heading.innerHTML += txt.charAt(i);
      i++;
    }
    setTimeout(typewriter,speed);
  }
}
