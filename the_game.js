const container = document.querySelector(".container");
const startgame = document.querySelector(".startgame");
const time = document.querySelector(".d");
const time1 = document.querySelector(".s");
const win = document.querySelector(".win");
const lose = document.querySelector(".lose");
const wl = document.querySelector(".wl");
const winlos = document.querySelector(".winlos");
const winlose = document.querySelector(".winlose");
const stopButton = document.querySelector(".stopButton");
const hellon = document.querySelector(".hellon");
const pwin = document.querySelector(".pwin");
const plose = document.querySelector(".plose");

let countWin=0;
let countLose=0; 
let u=JSON.parse(localStorage.getItem("user"))
const hello = "Hello "  +u.name;
hellon.append(hello)
hellon.classList.add("hellon");

let arr2 = ["😂", "🤣", "😃", "😎", "🥰", "😛", "🤩", "😝"];
let arr = [...arr2, ...arr2];
let correct2 = [];
let flippedCards = [];
let sumWin = 0;

localStorage.setItem("user",JSON.stringify(u))
pwin.textContent="win:"+ u.win
plose.textContent="lose:" + u.lose

//פונקציית שמגרילה רנדומלי
const rand = () => {
  return arr.sort(() => Math.random() - 0.5);
};
const audio1 = new Audio("r.mp3");
const audio2 = new Audio("f.mp3");
const audio3 = new Audio("h.mp3");

// פונקציה לניגון השמע הראשון
const playSound1 = () => {
  audio1.play();
};

// פונקציה לניגון השמע השני
const playSound2 = () => {
  audio2.play();
};

// פונקציה לניגון השמע השלישי
const playSound3 = () => {
  audio3.play();
};

// פונקציה לעצירת כל השמע
const stopSound = () => {
  audio1.pause();
  audio1.currentTime = 0;
  audio2.pause();
  audio2.currentTime = 0;
  audio3.pause();
  audio3.currentTime = 0;
};

// הוספת אירוע לחיצה לכפתור עצירת השמע
stopButton.addEventListener("click", () => {
  stopSound();
});


//יוצר ורץ על הקלפים
const renderCards = () => {
  container.innerHTML = "";
  rand();
  let flippedCards = []; 
  for (let j = 0; j < arr.length; j++) {
    const card = document.createElement("div");
    card.textContent = " ";
    container.append(card);
    card.classList.add("cards");

    card.addEventListener("click", () => {
      if (flippedCards.length === 2 || flippedCards.includes(card) || card.textContent !== " ") {
        return; 
      }
      
      card.textContent = arr[j];
      flippedCards.push(card);
      playSound1();
      
      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        
        if (card1.textContent === card2.textContent) {
          setTimeout(() => {
            sumWin++;
            playSound3();
            if (sumWin === 8) {
              countWin++;
             
              location.href="./win.html"
              let u=JSON.parse(localStorage.getItem("user"))
              u.win=countWin
              localStorage.setItem("user",JSON.stringify(u))
              let users=JSON.parse(localStorage.getItem("users"))
              let currentUser=users.find(uu=>uu.name===u.name)
              currentUser.win++
              localStorage.setItem("users",JSON.stringify(users))
              
            }
          }, 500);
        } else {
          setTimeout(() => {
            playSound2();
            card1.textContent = " ";
            card2.textContent = " ";
          }, 500);
        }
        
        flippedCards = []; 
      }
    });
  }
};
//טיימר
let timerMinutes;
let timerSeconds;

const startTimer = () => {
  let count = 1;
  let count1 = 59;

  const updateTimer = () => {
      time.textContent = count;
      time1.textContent = count1 < 10 ? "0" + count1 : count1;
  };

  updateTimer();

  clearInterval(timerMinutes);
  clearInterval(timerSeconds);
  let t=JSON.parse(localStorage.getItem("user"))


  // טיימר דקות
  timerMinutes = setInterval(() => {
    
      count--;
      updateTimer();
      if (count === 0) {
          clearInterval(timerMinutes);
      }
  }, 60000);

  // טיימר שניות
  timerSeconds = setInterval(() => {
      count1--;
      if (count1 < 10) {
          time1.textContent = "0" + count1;
      } else {
          time1.textContent = count1;
      }
      if (count === 0 && count1 === 0) {
          clearInterval(timerSeconds);
          countLose++;
          location.href="./gameover.html"
          let y=JSON.parse(localStorage.getItem("user"))
          y.lose=countLose
          localStorage.setItem("user", JSON.stringify(y));
          let users=JSON.parse(localStorage.getItem("users"))
              let currentUser=users.find(uu=>uu.name===y.name)
              currentUser.lose++
              localStorage.setItem("users",JSON.stringify(users))    
      } else if (count1 === 0) {
          count1 = 59;
      }
  }, 1000);
};

//משחק חדש
startgame.addEventListener("click", () => {
  renderCards();
  startTimer();
});
renderCards();
startTimer();






