let btn = document.getElementById("btn");
let player = document.querySelector(".player");
let gameplay = document.querySelector(".gameplay");
let objectt = document.querySelectorAll(".object");
let score = document.querySelector(".score");
let restart = document.querySelector(".restart");
let catrun = document.querySelector(".catrun");
let displayfilecat = document.querySelector(".heart > p");
let superman = document.querySelector(".superman");
let controlaudio = document.querySelector(".controlaudio");
let playaudio = document.querySelector(".playaudio");

let Top = -30;
let checkclick = 1;
let checkjump = 1;
let checkaudiojump = 1;
let thisscore = 0;
let lifecat = 9;
let checksuperman = 1;
let hightscore = 0;
let coutimg = 0;
let arrpo = [];
let arrpathimg = ["catrun1.gif","catrun2.gif","catrun3.gif","catrun4.gif","catrun5.gif","catrun6.gif"];
let cleateobject;
let tmoveobject;
let tscore;
let tcatrun;
let tsuperman;

controlaudio.addEventListener("click",() => {
    if (playaudio.paused) {
        playaudio.volume = 0.2;
        playaudio.play();
    }
    else{
        playaudio.pause();
    }
});

btn.addEventListener("click",() => {
    let audio = new Audio("audio1.mp3");
    audio.volume = 0.1;
    if (checkaudiojump == 1) {
        audio.play();
        checkaudiojump = 0;
    }
    player.classList.add("animationjump");
    player.addEventListener("animationend",() => {
        player.classList.remove("animationjump");
        checkaudiojump = 1;
    });
});

restart.addEventListener("click",() => {
    restart.style.display = "none";
    btn.style.display = "block";
    catrun.style.top = "30%";
    thisscore = 0;
    lifecat--;
    displayfilecat.innerHTML = `${lifecat}`;

    for (let i = 0 ; i < objectt.length ; i++) {
        objectt[0].remove();
        arrpo.splice(0,1);
        objectt = document.querySelectorAll(".object");
    }

    CleateObject();
    MoveObject();
    CountScore();
    CatRun();
});

CleateObject();
MoveObject();
CountScore();
CatRun();
superMan();

function CleateObject() {
    cleateobject = setInterval(() => {
        let divobject = document.createElement("img");
        let po = Math.floor(Math.random() * -120) + -30;
        arrpo.push(po);
        divobject.src = "catwig.png";
        divobject.classList.add("object");
        divobject.style.right = `${po}px`;
        gameplay.appendChild(divobject);
        objectt = document.querySelectorAll(".object");

        for (let i = 0 ; i < objectt.length ; i++) {
            let objectpo = objectt[i].getBoundingClientRect();
            if (objectpo.x < 0) {
                objectt[0].remove();
                arrpo.splice(0,1);
                objectt = document.querySelectorAll(".object");
            }
        }
    },1000);
}

function MoveObject() {
    tmoveobject = setInterval(() => {
        let playerpo = player.getBoundingClientRect();
    
        if (objectt[objectt.length - 1] != undefined) {
            for (let i = 0 ; i < objectt.length ; i++) {
                let objectpo = objectt[i].getBoundingClientRect();
    
                arrpo[i] += 4;
                objectt[i].style.right = `${arrpo[i]}px`;
    
                if (playerpo.top < objectpo.bottom &&
                    playerpo.bottom > objectpo.top &&
                    playerpo.left < objectpo.right &&
                    playerpo.right > objectpo.left) {
                        for (let i = 0 ; i < objectt.length ; i++) {
                            objectt[0].remove();
                            arrpo.splice(0,1);
                            objectt = document.querySelectorAll(".object");
                        }
                        clearInterval(tmoveobject);
                        clearInterval(tscore);
                        clearInterval(cleateobject);
                        clearInterval(tcatrun);
                        catrun.src = "catdead.gif";
                        catrun.style.top = "100%";
                        restart.style.display = "grid";
                        btn.style.display = "none";
                }
            }
        }
    },10);
}

function CountScore() {
    tscore =  setInterval(() => {
        thisscore++;
        if (hightscore < thisscore) {
            hightscore++
        }
        score.innerHTML = `HI ${hightscore} | ${thisscore}`;
    },120);
}

function CatRun() {
    tcatrun = setInterval(() => {
        if (coutimg > arrpathimg.length - 1) {
            coutimg = 0;
        }
        catrun.src = `${arrpathimg[coutimg]}`;
        coutimg++
    },100);
}

function superMan() {
    tsuperman = setInterval(() => {
        if (checksuperman == 1) {
            superman.style.left = "-150px";
            superman.style.transform = "rotateY(180deg) rotate(-20deg)";
            superman.style.right = "unset";
            superman.classList.add("animationsuper");
            superman.classList.remove("animationsuperback");
        }
        else if (checksuperman == 0) {
            superman.style.right = "-150px";
            superman.style.transform = "rotateY(0deg) rotate(-20deg)";
            superman.style.left = "unset";
            superman.classList.remove("animationsuper");
            superman.classList.add("animationsuperback");
        }
        
        if (checksuperman == 1) {
            checksuperman = 0;
        }
        else{
            checksuperman = 1;
        }
    },20000);
}