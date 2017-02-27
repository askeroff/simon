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

  // game state

  let state = {
    status: "initial", // running, error, won
    turn: "initial", // user
    turnedOn: false,
    strict: false,
    count: 0,
    sounds: []
  }

  function playAudio(a) {
    console.log(state);
    return a.play();
  }

  function userClick(a) {
    if(state.turn == "user") {
      a.play();
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
  function presentSounds (i) {
    ++state.count;
    setTimeout(function () {
      whichSound(state.sounds[i]);
      if (--i) {          
        presentSounds(i);       
      }
    }, 700);
  }

  // attaching events 

  function onOffHandle() {
    state.turnedOn = state.turnedOn == false ? true : false;
    if(!state.turnedOn) {
     state.status = "initial";
     document.querySelector(".startbutton").classList.remove("started");
     document.querySelector(".startbutton").value = "Start";
    }
    return state.turnedOn;
  }

  function start() {
    if(state.turnedOn) {
      state.status = "running";
      document.querySelector(".startbutton").classList.add("started");
      document.querySelector(".startbutton").value = "Restart";
      state.sounds = [];
      getRandomSounds();
      presentSounds(1);
      state.turn = "user";
    }
    return;
  }

  
  document.querySelector("#poweron").addEventListener("change", onOffHandle);
  document.querySelector("#start").addEventListener("click", start);

  greenBlock.addEventListener("click", (e) => {
    
    if(userClick(audioGreen)) {
      lightUp(e.target);
    }
  
  });

  redBlock.addEventListener("click", (e) => {
    if(userClick(audioRed)) {
      lightUp(e.target);
    }
  });

  yellowBlock.addEventListener("click", (e) => {
    if(userClick(audioYellow)) {
      lightUp(e.target);
    }
  });

  blueBlock.addEventListener("click", (e) => {
    if(userClick(audioBlue)) {
      lightUp(e.target);
    }
  });


}());
