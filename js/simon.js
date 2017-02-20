(function() {

  // audio files
  const audioGreen = new Audio('sounds/simonSound1.mp3');
  const audioRed = new Audio('sounds/simonSound2.mp3');
  const audioYellow = new Audio('sounds/simonSound3.mp3');
  const audioBlue = new Audio('sounds/simonSound4.mp3');

  // game state

  let state = {
    status: "initial", // running, error, won
    turn: "user", // user
    turnedOn: false,
  }

  function playAudio(file) {
    if(state.turn == "user" && state.status == "running") {
      return file.play();
    } 
  }

  function removeClass(el, className) {
    if (el.classList){
      el.classList.remove(className)
    }
    else if (hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
      el.className=el.className.replace(reg, ' ')
    }
  }

  // grabbing simon elements
  const greenBlock = document.querySelector(".green-block");
  const redBlock = document.querySelector(".red-block");
  const yellowBlock = document.querySelector(".yellow-block");
  const blueBlock = document.querySelector(".blue-block");


  // attaching events 

  function onOffHandle() {
    state.turnedOn = state.turnedOn == false ? true : false;
    if(!state.turnedOn) {
      state.status = "initial";
      removeClass(document.querySelector(".startbutton"), "started");
    }
    return state.turnedOn;
  }

  function start() {
    if(state.turnedOn) {
      state.status = "running";
      document.querySelector(".startbutton").className += " started";
    }
    return;
  }

  
  document.querySelector("#poweron").addEventListener("change", onOffHandle);
  document.querySelector("#start").addEventListener("click", start);

  greenBlock.addEventListener("click", () => {
    return playAudio(audioGreen);
  });

  redBlock.addEventListener("click", () => {
    return playAudio(audioRed);
  });

  yellowBlock.addEventListener("click", () => {
    return playAudio(audioYellow);
  });

  blueBlock.addEventListener("click", () => {
    return playAudio(audioBlue);
  });


}());
