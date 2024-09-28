/*
let myHeading = document.querySelector("h1");
myHeading.textContent = "Sweet Home";
*/

let myImage = document.querySelector("img");

myImage.onclick = function () {
  let mySrc = myImage.getAttribute("src");
  if (mySrc === "images/小埋4.jpg") {
    myImage.setAttribute("src", "images/小埋1.png");
  } else {
    myImage.setAttribute("src", "images/小埋4.jpg");
  }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
    let myName = prompt("Plz enter your name:");
    localStorage.setItem("name", myName);
    myHeading.textContent = "Hello, " + myName;
}

if (!localStorage.getItem("name")) {
setUserName();
} 
else {
let storedName = localStorage.getItem("name");
myHeading.textContent = "Hello," + storedName;
}

myButton.onclick = function () {
    setUserName();
};
  