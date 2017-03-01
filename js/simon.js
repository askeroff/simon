(function() {

  // audio files
  const audioGreen = new Audio('sounds/simonSound1.mp3');
  const audioRed = new Audio('sounds/simonSound2.mp3');
  const audioYellow = new Audio('sounds/simonSound3.mp3');
  const audioBlue = new Audio('sounds/simonSound4.mp3');

  // grabbing simon elements
  const greenBlock = document.querySelector(".green-block");
  const redBlock = document.querySelector(".red-block");
  const yellowBlock = document.querySelector(".yellow-block");
  const blueBlock = document.querySelector(".blue-block");
  const countdisplay = document.querySelector(".countdisplay");
  const info = document.querySelector(".info");

  // game state

  let defaultState = {
    status: "initial", // running, error, won
    turn: "initial", // user
    turnedOn: false,
    strict: false,
    count: 0,
    sounds: [],
    userPressed: [],
  }

  let state = Object.assign({}, defaultState);

  function playAudio(a) {
    return a.play();
  }

  function checkWin() {
    if(checkUserSounds()) {
        if(state.count+1 === state.sounds.length) {
          info.innerHTML = "You won!";
          let state = Object.assign({}, defaultState);
          return true;
        } else if(state.count+1 == state.userPressed.length){
          state.count += 1;
          countdisplay.innerHTML = state.count + 1;
          state.userPressed = [];
          state.turn = "machine";
          setTimeout(() => { presentSounds(state.count); }, 1000); 
          return true;          
        }
    } else {
      return "error";
    } 
   

  }

  function checkError() {
    if(state.strict === true) {
      state.userPressed = [];
      state.count = 0;
      countdisplay.innerHTML = 1;
      info.innerHTML = "!!!Error!!!";
      state.turn = "machine";
      setTimeout(() => { presentSounds(state.count); }, 1000);     
    } else {
      state.userPressed = [];
      info.innerHTML = "!!!Error!!!";
      state.turn = "machine";
      setTimeout(() => { presentSounds(state.count); }, 1000);  
    }

  }

  function whatUserPressed(pressedButton) {
    switch(pressedButton.classList[1]) {
      case "green-block":
        state.userPressed.push(1);
        break;
      case "red-block":
        state.userPressed.push(2);
        break;
       case "yellow-block":
        state.userPressed.push(3);
        break;
       case "blue-block":
        state.userPressed.push(4);
        break;              
    }
    
      if(checkWin() == "error") {
        checkError();
      }
  }


  function checkUserSounds() {
    for(let i = 0; i < state.count+1 && i < state.userPressed.length; i++) {
      if(state.userPressed[i] != state.sounds[i]) {
        return false;
      } 
    }
      return true;
  }

  function userClick(a, pressedButton) {
    if(state.turn == "user" && state.turnedOn) {
      a.play();
      whatUserPressed(pressedButton);
      return true;
    }

    return false;
  }

  function lightUp(button) {
    button.style.opacity = 1;
    setTimeout(function() {
      button.style.opacity = 0.6;
    }, 500);
  }

  function getRandom(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }

  function getRandomSounds() {
    for(let i = 0; i < 20; i++) {
      let number = getRandom(1, 5);
      state.sounds.push(number);
    }
    
  }

  function whichSound(sound) {
    switch(sound) {
      case 1:
        lightUp(greenBlock);
        playAudio(audioGreen);
        break;
      case 2:
        lightUp(redBlock);
        playAudio(audioRed);
        break;
      case 3:
        lightUp(yellowBlock);
        playAudio(audioYellow);
        break;
      case 4:
        lightUp(blueBlock);
        playAudio(audioBlue);
        break;
    }
  }
//wrap up in another function
function presentSounds(i) {
  let a = 0;
  info.innerHTML = "";
  function recurseSounds () {
    setTimeout(function () {
      whichSound(state.sounds[a]);
      if (a < i) {      
        a++;    
        recurseSounds(a);       
      }
    }, 700);
  } 
  recurseSounds(); 
  state.turn = "user";
}  


  // attaching events 

  function onOffHandle() {
    state.turnedOn = state.turnedOn == false ? true : false;
    if(!state.turnedOn) {
     document.querySelector(".startbutton").classList.remove("started");
     document.querySelector(".startbutton").value = "Start";
    }
    return state.turnedOn;
  }



  function start() {
    if(state.turnedOn === true) {
      state = Object.assign({}, defaultState);
      state.turnedOn = true;
      state.status = "running";

      state.strict = document.querySelector("#strict").checked == true;

      document.querySelector(".startbutton").classList.add("started");
      document.querySelector(".startbutton").value = "Restart";

      state.sounds = [];
      getRandomSounds();
      presentSounds(0);
      countdisplay.innerHTML = state.count + 1;
      state.turn = "user";
      console.log(state);
    }
    return;
  }

  
  document.querySelector("#poweron").addEventListener("change", onOffHandle);
  document.querySelector("#start").addEventListener("click", start);

  greenBlock.addEventListener("click", (e) => {
    
    if(userClick(audioGreen, e.target)) {
      lightUp(e.target);
    }
  
  });

  redBlock.addEventListener("click", (e) => {
    if(userClick(audioRed, e.target)) {
      lightUp(e.target);
    }
  });

  yellowBlock.addEventListener("click", (e) => {
    if(userClick(audioYellow, e.target)) {
      lightUp(e.target);
    }
  });

  blueBlock.addEventListener("click", (e) => {
    if(userClick(audioBlue, e.target)) {
      lightUp(e.target);
    }
  });


}());
