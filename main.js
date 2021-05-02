var counter2 = 1;

dosomething = function(){
    counter2 +=1
 console.log("did something"+counter2)
};



//let intElemClientWidth = 900; //need to convert to dynamic for responsiveness;
//let intElemClientHeight = 700; 
let sizingBox = document.getElementById('container')
//console.log(sizingBox.offsetHeight, sizingBox.offsetWidth)
var canvas = document.getElementById('canvas');
canvas.height = sizingBox.offsetHeight;
canvas.width = sizingBox.offsetWidth;

//console.log(canvas.height, canvas.width)
//but don't know how to do it.
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let keyPressed, mousexy;
let buttonTrigger = false;
let objectsInSpace = [];
let offsetAmount = {
    x: 0,
    y: 0,
};
let asteroidArray = [];

const gameMusic = new Audio("sounds/game.mp3")
const introMusic = new Audio("sounds/intro.mp3")
const fireBooster = new Audio("sounds/hollowhiss.wav"); // buffers automatically when created
const landingSound = new Audio("sounds/grass.wav"); // buffers automatically when created
const yay = new Audio("sounds/celebration.wav"); // buffers automatically when created

let ship = {
    noFlameImageFile: "rocketNoFlame.png",
    flameImageFile: "rocketWithFlame.png",
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    direction: 0,
    velocityx: 0,
    velocityy: 0,
    planetHit: "none",
    score: 0,
    boost: false,
    turnAmount:0,
    playSound: true,
    winner: false,
    vector: {
        x: 0,
        y: 0,
    },
    objectsHit: ["Objects hit"],
};
const rocketNoFlame = new Image(200, 200);
rocketNoFlame.src = "imagesfiles/rocketNoFlame.png";
const rocketWithFlame = new Image(200, 200);
rocketWithFlame.src = "imagesfiles/rocketWithFlame.png";
function preload() {
    makeLoadingText();
    const listOfImageObjects = [
        mercury,
        venus,
        earth,
        mars,
        jupiter,
        saturn,
        uranus,
        neptune,
        sun,
        ceres
    ];
    for (let i = 0; i < listOfImageObjects.length; i++) {
        listOfImageObjects[i].image = new Image(150, 150);
        listOfImageObjects[i].image.src =
            "imagesfiles/" + listOfImageObjects[i].imageSource;
    }
    userEvents();
    resetEverything();
    makeAllAsteroids(asteroids);
}

//--- Start the Program for Here ---
preload();
//once loaded preload will be hidden and go to beginAdventureView

window.onload = (event) => {
    document.getElementById("loadingBox").style.display = "none";
    //    preload();
    // makeWelcomeBoxView();
    beginAdventureView();
    // loadAtStart();

};

function handleBeginAdventureButtonClick() {
    document.getElementById("welcomeBox").style.display = "none";
    buttonTrigger = false;
    introMusic.loop = true;
    introMusic.volume = 0.2;
    introMusic.play();
    makeWelcomeBoxView()
    loadAtStart();
    //  window.requestAnimationFrame(draw)
}

function loadAtStart() {
    const listOfImageObjects = [
        moon,
        phobos,
        deimos,
        io,
        europa,
        ganymede,
        calisto,
        enceladus,
        titan,
    ];
    for (let i = 0; i < listOfImageObjects.length; i++) {
        listOfImageObjects[i].image = new Image(150, 150);
        listOfImageObjects[i].image.src =
            "imagesfiles/" + listOfImageObjects[i].imageSource;
    }
}


function handleStartButtonClick() {
    document.getElementById("welcomeBox").style.display = "none";
    buttonTrigger = false;
    introMusic.pause();
    gameMusic.loop = true;
    gameMusic.volume = 0.04;
    gameMusic.play();
    document.getElementById("controlPanel").style.display = "block";
//    makeControlButtons();
    window.requestAnimationFrame(draw)
}

function resetEverything() {
    makeObjectsInSpaceArray();
    for (let i = 0; i < objectsInSpace.length; i++) {
        objectsInSpace[i].hit = false;
    }
    buttonTrigger = false;
    ship.playSound = true;
    ship.winner = false;
    ship.objectsHit.length = 0; // Clear contents
    ship.objectsHit.push("Objects hit"); //fill reset contents
    ship.x = canvasWidth / 2;
    ship.y = canvasHeight / 2;
    ship.velocityx = 0;
    ship.velocityy = 0;
    ship.turnAmount = 0;
    ship.score = 0;
    ship.winnerAmount = 1; // Have to hit all objects to win.
}

function makeObjectsInSpaceArray() {
    const listOfObjectsInSpace = [
        mercury,
        venus,
        earth,
        mars,
        jupiter,
        saturn,
        uranus,
        neptune,
        moon,
        phobos,
        deimos,
        io,
        europa,
        ganymede,
        calisto,
        enceladus,
        titan,
        ceres,
    ];
    objectsInSpace.length = 0; // Clear contents
    objectsInSpace.push.apply(objectsInSpace, listOfObjectsInSpace);
}

function userEvents() {
    document.addEventListener("keydown", logKey);
    

}

function draw() {
   // let container = document.getElementById("container")
    let ctx = document.getElementById("canvas").getContext("2d");
    //ctx.height=container.offsetHeight;
    //ctx.width=container.offsetWidth;
    startDraw(ctx);
    text(ctx);
    offsetView();
    let time = new Date();
    makePlanets(ctx, time);
    makeShip(ctx);
    checkForWinner();
    detectCollisions();
    checkForButtonTrigger();
}
//this function interupts the draw sequence for infoBox button
function checkForButtonTrigger() {
    if (ship.winner == false) {
        if (buttonTrigger == false) {
            window.requestAnimationFrame(draw);
        } else {
            makeInfoBox();
        }
    } else {
        yay.currentTime = 0;
        yay.play();
        makeYouWonBox();
    }
}

function checkForWinner() {
    if (objectsInSpace.length < ship.winnerAmount || ship.score > 1400) {
        ship.winner = true;
    }
}

function offsetView() {
    offsetAmount.x = -ship.x + canvasWidth / 2;
    offsetAmount.y = -ship.y + canvasHeight / 2;
}

function makeInfoBox() {
    const infoBox = document.getElementById("infoBox");
    setInfoBoxContent(infoBox);
    infoBox.setAttribute("style", "display:inline-block;");
}

function handleResumeButtonClick() {
    let infoBox = document.getElementById("infoBox");
    let resume1 = document.getElementById("Resume1");
    if (resume1.textContent == "Resume") {
        infoBox.setAttribute("style", "display:none;");
        buttonTrigger = false;
        ship.playSound = true;
        checkForButtonTrigger();
    } else {
        updateScore();
        resume1.textContent = "Resume";
    }
}

function handleRestartButtonClick() {
    let infoBox = document.getElementById("infoBox");
    infoBox.setAttribute("style", "display:none;");
    resetEverything();
    checkForButtonTrigger();
}

function updateScore() {
    let scored = 0;
    let q1Text = document.getElementById("q1Text");
    let q2Text = document.getElementById("q2Text");
    let q1r1 = document.getElementById("q1r1").checked;
    let q1r2 = document.getElementById("q1r2").checked;
    let q2r1 = document.getElementById("q2r1").checked;
    let q2r2 = document.getElementById("q2r2").checked;

    if (ship.planetHit.question[0].q1 == true && q1r1 == true) {
        scored += 50;
        q1Text.style.color = "green";
    } else if (ship.planetHit.question[0].q1 == false && q1r2 == true) {
        scored += 50;
        q1Text.style.color = "green";
    } else {
        q1Text.setAttribute("class", "lineThrough");
    }

    if (ship.planetHit.question[1].q2 == true && q2r1 == true) {
        scored += 50;
        q2Text.style.color = "green";
    } else if (ship.planetHit.question[1].q2 == false && q2r2 == true) {
        scored += 50;
        q2Text.style.color = "green";
    } else {
        q2Text.setAttribute("class", "lineThrough");
    }

    ship.score += scored;
    ship.objectsHit.push(ship.planetHit.name);
}

function makeYouWonBox() {
    const infoBox = document.getElementById("infoBox");
    setYouWonBoxContent(infoBox);
    infoBox.setAttribute("style", "display:inline-block;");
}



//In this function objInSpace is an object reference to the object hit.
function detectCollisions() {
    for (let i = 0; i < objectsInSpace.length; i++) {
        const objInSpace = objectsInSpace[i];
        const dx = ship.x - objInSpace.location.x;
        const dy = ship.y - objInSpace.location.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (
            distance < objInSpace.size + 10 &&
            ship.objectsHit.indexOf(objInSpace.name) < 0
        ) {
            buttonTrigger = "resume";
            ship.velocityx = ship.velocityx / 4;
            ship.velocityy = ship.velocityy / 4;
            objInSpace.hit = true;
            ship.planetHit = objInSpace;
            objectsInSpace.splice(i, 1);
        }
    }
}


function updateShip() {
    setDirection();
    ship.x = ship.x + ship.velocityx; // offsetAmound.x;
    ship.y = ship.y + ship.velocityy;
    if (ship.x > canvasWidth || ship.x < 5) {
        ship.velocityx = ship.velocityx * -1;
    }
    if (ship.y > canvasHeight || ship.y < 5) {
        ship.velocityy = ship.velocityy * -1;
    }
    if (Math.abs(ship.velocityx) > 1) {
        ship.velocityx = 1 * Math.sign(ship.velocityx);
    }
    if (Math.abs(ship.velocityy) > 1) {
        ship.velocityy = 1 * Math.sign(ship.velocityy);
    }
}

function setDirection() {
    ship.direction += ship.turnAmount;
    ship.vector.x = Math.cos((ship.direction * Math.PI) / 180);
    ship.vector.y = Math.sin((ship.direction * Math.PI) / 180);
}

function playBoostSound() {
    if (ship.playSound == true) {
        fireBooster.currentTime = 0;
        fireBooster.play();
    }
}

function boost(ship) {
    ship.boost = true;
    ship.velocityx += 0.05 * ship.vector.x;
    ship.velocityy += 0.05 * ship.vector.y;
    playBoostSound();
}

function makeShip(ctx) {
    updateShip();
  //  const rocketWithFlame = new Image(200, 200);
  //  rocketWithFlame.src = "imagesfiles/rocketWithFlame.png";
    const pos = ship;
    let x = pos.x;
    let y = pos.y;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(((pos.direction + 45) * Math.PI) / 180);
    ctx.translate(-x, -y);

    if (ship.boost == true) {
        ctx.drawImage(rocketWithFlame, x - 40, y - 15, 50, 50);
        ship.boost = false;
    } else {
        ctx.drawImage(rocketNoFlame, x - 40, y - 15, 50, 50);
    }
    ctx.restore();
}

//j=74 k = 75 rightArrow = 39  leftArrow = 37  upArrow 38  down 40

function logKey(logKey) {
    if (logKey.keyCode == 39) {
        ship.direction += 5;
    }
    if (logKey.keyCode == 37) {
        ship.direction -= 5;
    }
    if (logKey.keyCode == 38 || logKey.keyCode == 67) {
        boost(ship);
    }
    if (logKey.keyCode == 13 && buttonTrigger == "resume") {
        //   buttonTrigger == false;
        handleResumeButtonClick();
    }
    if (logKey.keyCode == 13 && buttonTrigger == "start") {

        //   buttonTrigger == false;
        handleStartButtonClick();
    }
}



function handleControlPanel(input){
   // console.log(input,ship.turnAmount);
    if(input == "right"){
        ship.turnAmount = 3;
  //      ship.direction += 5;
    }
    if (input == "left"){
        ship.turnAmount = -3
//        ship.direction += -5;
        //console.log("through to handleControlPanel")
    }
    if (input == "stop"){
        ship.turnAmount = 0;
    }

    if(input == "boost"){
        boost(ship);
    }
    console.log(input,ship.turnAmount)
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
    };
}

function startDraw(ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // clear canvas
    ctx.fillStyle = "rgba(200, 200, 200, .4)";
    ctx.strokeStyle = "rgba(0, 153, 255, 0.4)";
}

function makeMoon(time, ctx, planetInfo, moonNum) {
    moveMoon(planetInfo, time, moonNum);

    ctx.fillStyle = "grey";
    if (planetInfo.moons[moonNum].hit == true) {
        ctx.fillStyle = "rgba(255,0,0,0.5)";
    }
    if (planetInfo.moons[moonNum].hit == false) {
        ctx.fillStyle = "rgba(0,255,0,0.7)";
    }
    ctx.font = "10px serif";
    ctx.fillText(
        " " + planetInfo.moons[moonNum].name,
        planetInfo.moons[moonNum].location.x + planetInfo.moons[moonNum].size,
        planetInfo.moons[moonNum].location.y
    );
    ctx.fillStyle = planetInfo.moons[moonNum].color;
    ctx.beginPath();
    ctx.ellipse(
        planetInfo.moons[moonNum].location.x,
        planetInfo.moons[moonNum].location.y,
        planetInfo.moons[moonNum].size,
        planetInfo.moons[moonNum].size,
        Math.PI * 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.font = "14px serif";
}

function moveMoon(planetInfo, time, moonNum) {
    const timeBuffer =
        (time.getMilliseconds() + 1) / (time.getMilliseconds() + 1);
    const middle = {
        x: planetInfo.location.x,
        y: planetInfo.location.y,
    };
    planetInfo.moons[moonNum].angle +=
        0.02 * timeBuffer * planetInfo.moons[moonNum].speed;
    if (planetInfo.moons[moonNum].angle == 360) {
        planetInfo.moons[moonNum].angle = 0;
    }
    planetInfo.moons[moonNum].location.x =
        Math.sin(planetInfo.moons[moonNum].angle * (Math.PI / 180)) *
        planetInfo.moons[moonNum].orbit +
        middle.x;
    planetInfo.moons[moonNum].location.y =
        Math.cos(planetInfo.moons[moonNum].angle * (Math.PI / 180)) *
        -planetInfo.moons[moonNum].orbit +
        middle.y;
}

function makeMoons(time, ctx, planetInfo) {
    for (let i = 0; i < planetInfo.moons.length; i++) {
        makeMoon(time, ctx, planetInfo, i);
    }
}

function makePlanet(time, ctx, planetInfo) {
    movePlanet(planetInfo, time);
    orbitLine2(ctx, planetInfo);
    ctx.fillStyle = "grey";
    if (planetInfo.hit == true) {
        ctx.fillStyle = "rgba(255,0,0,0.5)";
    }
    if (planetInfo.hit == false) {
        ctx.fillStyle = "rgba(0,255,0,0.7)";
    }
    ctx.fillText(
        " " + planetInfo.name,
        planetInfo.location.x + planetInfo.size,
        planetInfo.location.y
    );
    const planetImage = new Image(200, 200);
    planetImage.src = "imagesfiles/" + planetInfo.imageSource;
    ctx.drawImage(
        planetInfo.image,
        planetInfo.location.x - planetInfo.size,
        planetInfo.location.y - planetInfo.size,
        planetInfo.size * 2,
        planetInfo.size * 2
    );
    if (planetInfo.moons[0].name != "none") {
        makeMoons(time, ctx, planetInfo);
    }
}

function movePlanet(planetInfo, time) {
    let timeBuffer = (time.getMilliseconds() + 1) / (time.getMilliseconds() + 1);
    let middle = {
        x: canvasWidth / 2 + offsetAmount.x,
        y: canvasHeight / 2 + offsetAmount.y,
    };
    planetInfo.angle += 0.02 * timeBuffer * planetInfo.speed;
    if (planetInfo.angle == 360) {
        planetInfo.angle = 0;
    }
    planetInfo.location.x =
        Math.sin(planetInfo.angle * (Math.PI / 180)) * planetInfo.orbit + middle.x;
    planetInfo.location.y =
        Math.cos(planetInfo.angle * (Math.PI / 180)) * -planetInfo.orbit + middle.y;
}

function orbitLine2(ctx, planetInfo) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 200, 200, .1)";
    ctx.arc(
        canvasWidth / 2 + offsetAmount.x,
        canvasHeight / 2 + offsetAmount.y,
        planetInfo.orbit,
        0,
        Math.PI * 2,
        false
    ); // planet orbit
    ctx.stroke();
}

function makeSun(ctx) {
    let img = sun.image; //new Image();
    ctx.drawImage(
        img,
        canvasWidth / 2 - 40 + offsetAmount.x,
        canvasHeight / 2 - 40 + offsetAmount.y,
        80,
        80
    );
}

function makePlanets(ctx, time) {
    makeSun(ctx);
    makePlanet(time, ctx, earth);
    makePlanet(time, ctx, mercury);
    makePlanet(time, ctx, venus);
    makePlanet(time, ctx, mars);
    makePlanet(time, ctx, jupiter);
    makePlanet(time, ctx, saturn);
    makePlanet(time, ctx, uranus);
    makePlanet(time, ctx, neptune);
    makePlanet(time, ctx, ceres);
    drawAsteroids(ctx, time);
    //  ;
}

function makeAllAsteroids(planetInfo) {
    for (let i = 0; i < planetInfo.howMany; i++) {
        let randomAngle = Math.floor(Math.random() * 360)
        let randomSpeed = Math.floor(Math.random() * 6) - 3 + planetInfo.speed
        let randomOrbit = Math.floor(Math.random() * 60) - 40 + ceres.orbit
        let k = {
            "name": ('asteroid' + i),
            "location": {
                "x": 0,
                "y": 0
            },
            "size": planetInfo.size,
            "speed": randomSpeed,
            "orbit": randomOrbit,
            "angle": randomAngle,
            "color": planetInfo.color
        }
        asteroidArray.push(k)
    }
}

function drawAsteroids(ctx, time) {
    for (let i = 0; i < asteroidArray.length; i++) {
        makeAsteroids(time, ctx, asteroidArray[i])
    }
}


function makeAsteroids(time, ctx, planetInfo) {
    movePlanet(planetInfo, time);
    ctx.fillStyle = planetInfo.color;
    ctx.beginPath();
    ctx.ellipse(
        planetInfo.location.x,
        planetInfo.location.y,
        planetInfo.size,
        planetInfo.size,
        Math.PI * 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}