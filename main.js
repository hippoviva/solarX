//todo:
//make a splash page------
// make it follow and respond to a mouse
// complete planet & moon information
//make a question page popup----------
//make points on questions correct------------
//make proper sounds - Done-------------
// make a reset button and winner div-----------s
//let elementContainer = document.getElementById("container")
//let element = getElementById("container");

let intElemClientWidth = 900 //window.innerWidth;
let intElemClientHeight = 700 //intElemClientWidth //* .5625;
let canvasWidth = intElemClientWidth;
let canvasHeight = intElemClientHeight;
let keyPressed, mousexy;
let fireBooster = new Audio("sounds/hollowhiss.wav"); // buffers automatically when created
let landing = new Audio("sounds/landinggrass.wav"); // buffers automatically when created
let yay = new Audio("sounds/celebration.wav"); // buffers automatically when created
let buttonTrigger = false;
let objectsInSpace = [];
let offsetAmount = {
    "x": 0,
    "y": 0
};


let ship = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    direction: 0,
    velocityx: 0,
    velocityy: 0,
    planetHit: "none",
    score: 0,
    boost: false,
    playSound: true,
    winner: false,
    vector: {
        x: 0,
        y: 0
    },
    objectsHit: ["Objects hit"]
};


function preload() {

    const listOfImageObjects = [
        mercury,
        venus,
        earth,
        mars,
        jupiter,
        saturn,
        uranus,
        neptune,
        sun
    ];
    for (let i = 0; i < listOfImageObjects.length; i++) {
        listOfImageObjects[i].image = new Image(250, 250);
        listOfImageObjects[i].image.src = "imagesfiles/" + listOfImageObjects[i].imageSource;
    }
}

preload();
window.onload = (event) => {
    console.log('page is fully loaded');
    window.requestAnimationFrame(draw);
    loadAtStart();
};

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
        sun
    ];
    for (let i = 0; i < listOfImageObjects.length; i++) {
        listOfImageObjects[i].image = new Image(250, 250);
        listOfImageObjects[i].image.src = "imagesfiles/" + listOfImageObjects[i].imageSource;
    }
    return ("done")
}



function resetEverything() {
    makeObjectsInSpaceArray();
    //resetShip();
    for (let i = 0; i < objectsInSpace.length; i++) {
        objectsInSpace[i].hit = false;
    }
    buttonTrigger = false;
    ship.playSound = true;
    ship.winner = false;
    ship.objectsHit.length = 0; // Clear contents
    ship.objectsHit.push("Objects hit");
    ship.x = canvasWidth / 2;
    ship.y = canvasHeight / 2;
    ship.velocityx = 0;
    ship.velocityy = 0;
    ship.score = 0;
    ship.winnerAmount = 15;
    // makeObjectsInSpace();

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
        titan
    ];
    objectsInSpace.length = 0; // Clear contents
    objectsInSpace.push.apply(objectsInSpace, listOfObjectsInSpace);
}

function mouseloc() {
    document.addEventListener("keydown", logKey);
    let canvas = document.getElementById("canvas");

    canvas.addEventListener(
        "mousemove",
        function (evt) {
            let mousePos = getMousePos(canvas, evt);
            let message = "Mouse position: " + mousePos.x + "," + mousePos.y;
            mousexy = message;
        },
        false
    );
}

function init() {
    resetEverything();
    mouseloc();
    // window.requestAnimationFrame(draw);
}

function draw() {
    let ctx = document.getElementById("canvas").getContext("2d");
    startDraw(ctx);
    text(ctx);
    offsetView();
    let time = new Date();
    //ctx.imageSmoothingEnabled = false;
    makePlanets(ctx, time);
    makeShip(ctx);
    checkForWinner();
    detectCollisions();
    checkForButtonTrigger();
}

function checkForButtonTrigger() {
    if (ship.winner == false) {
        if (buttonTrigger == false) {
            window.requestAnimationFrame(draw);
        } else {
            //  updateScore();
            makeInfoBox();
        }
    } else {
        yay.currentTime = 0;
        yay.play()
        makeYouWonBox()
    }
}

function checkForWinner() {
    if (objectsInSpace.length < ship.winnerAmount) {
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
    let infoBox = document.
    getElementById('infoBox');
    updateScore();
    infoBox.setAttribute("style", "display:none;");
    buttonTrigger = false;
    ship.playSound = true;
    checkForButtonTrigger();
}

function handleRestartButtonClick() {
    let infoBox = document.getElementById('infoBox');
    infoBox.setAttribute("style", "display:none;");
    resetEverything();
    checkForButtonTrigger();
}

function updateScore() {
    let scored = 0;
    let q1 = document.getElementById('q1');
    let q2 = document.getElementById('q2');
    if (q1.checked == ship.planetHit.question[0].q1) {
        scored += 50;
    }
    if (q2.checked == ship.planetHit.question[1].q2) {
        scored += 50;
    }
    ship.score += scored;
    ship.objectsHit.push(ship.planetHit.name);
}

function makeYouWonBox() {
    const infoBox = document.getElementById("infoBox");
    setYouWonBoxContent(infoBox);
    infoBox.setAttribute("style", "display:inline-block;");
}

function setInfoBoxContent() {
    let infoBox = document.getElementById("infoBox")
    landing.currentTime = 0;
    landing.play();
    const planetName = document.createElement("p");
    while (infoBox.firstChild) {
        infoBox.removeChild(infoBox.firstChild);
    }
    infoBox.appendChild(ship.planetHit.image);
    planetName.textContent = ship.planetHit.name;
    infoBox.appendChild(planetName);
    const ul = document.createElement("span");
    planetName.appendChild(ul);
    const temp = document.createElement("p");
    temp.textContent = "Temp: " + ship.planetHit.temp;
    const mass = document.createElement("p");
    mass.textContent = "Mass: " + ship.planetHit.mass;
    const atmosphere = document.createElement("p");
    atmosphere.textContent = "Atmosphere: " + ship.planetHit.atmosphere;
    const cosmic = document.createElement("p");
    cosmic.textContent = "Cosmic Rays: " + ship.planetHit.cosmic;
    const surface = document.createElement("p");
    surface.textContent = "Surface: " + ship.planetHit.surface;
    const water = document.createElement("p");
    water.textContent = "Water: " + ship.planetHit.water;
    const magneto = document.createElement("p");
    magneto.textContent = "Magnetosphere: " + ship.planetHit.magnetosphere;
    ul.appendChild(temp);
    ul.appendChild(mass);
    ul.appendChild(atmosphere);
    ul.appendChild(cosmic);
    ul.appendChild(surface);
    ul.appendChild(water);
    ul.appendChild(magneto);
    const divider = document.createElement("p");
    divider.textContent = "*   *   *  *   *"
    ul.appendChild(divider);
    const instructions = document.createElement("p");
    instructions.textContent = "Check if is a reason life would exist here"
    ul.appendChild(instructions);
    const divider2 = document.createElement("p");
    divider2.textContent = "------"
    ul.appendChild(divider2);

    const q1label = document.createElement('label');
    q1label.textContent = ship.planetHit.question[0].text;
    const q1 = document.createElement('input')
    q1.type = 'checkbox';
    q1.id = 'q1';
    q1label.appendChild(q1);
    ul.appendChild(q1label);

    const q2label = document.createElement('p');
    q2label.textContent = ship.planetHit.question[1].text;
    const q2 = document.createElement('input');
    q2.type = 'checkbox';
    q2.id = 'q2';
    q2label.appendChild(q2);
    ul.appendChild(q2label);

    const resumeButton = document.createElement('button');
    resumeButton.textContent = "Resume";
    resumeButton.setAttribute("id", "Resume1")
    resumeButton.setAttribute("type", "Button");
    resumeButton.setAttribute("onclick", 'handleResumeButtonClick()')
    infoBox.appendChild(resumeButton);
    ship.playSound = false;
}

function setYouWonBoxContent(infoBox) {
    while (infoBox.firstChild) {
        infoBox.removeChild(infoBox.firstChild);
    }
    const messageGroup = document.createElement("span");
    infoBox.appendChild(messageGroup);
    const youWonBanner = document.createElement("h2");
    youWonBanner.textContent = "You competed your mission";
    messageGroup.appendChild(youWonBanner);

    const restartButton = document.createElement('button');
    restartButton.textContent = "Restart";
    restartButton.setAttribute("id", "Resart")
    restartButton.setAttribute("onclick", 'handleRestartButtonClick()')
    infoBox.appendChild(restartButton);
    ship.playSound = false;
}

function detectCollisions() {
    for (let i = 0; i < objectsInSpace.length; i++) {
        const objInSpace = objectsInSpace[i];
        const dx = ship.x - objInSpace.location.x;
        const dy = ship.y - objInSpace.location.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < (objInSpace.size + 10) && (ship.objectsHit.indexOf(objInSpace.name) < 0)) { //
            buttonTrigger = "resume";
            ship.velocityx = ship.velocityx / 2;
            ship.velocityy = ship.velocityy / 2;
            objInSpace.hit = true;
            ship.planetHit = objInSpace;
            objectsInSpace.splice(i, 1);
        }
    }
}

//Text display on screen:  
function text(ctx) {
    ctx.fillStyle = "white ";
    ctx.font = "18px serif ⬆️";
    ctx.fillText("Score: " + ship.score, canvasWidth - 100, canvasHeight - 60);
    ctx.fillStyle = 'rgba(255,255,255,.5'
    ctx.fillText("⬅️ or ➡️ Turn Ship", 20, 20);
    ctx.fillText("⬆️ = Boost", 20, 40);
    ctx.fillStyle = "white ";
    makeUpperListOfObjectsHit(ctx);

}

function makeUpperListOfObjectsHit(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "14px serif";
    ctx.fillText((objectsInSpace.length) + " left ", (canvasWidth - 100), 20);
    for (let i = 0; i < objectsInSpace.length; i++) {
        ctx.fillStyle = "white";
        ctx.font = "14px serif";
        ctx.fillText(objectsInSpace[i].name, (canvasWidth - 100), (40 + i * 20));
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
    ship.vector.x = Math.cos((ship.direction * Math.PI) / 180); //* magnitude;
    ship.vector.y = Math.sin((ship.direction * Math.PI) / 180); //* magnitude;
}

function playSound() {
    if (ship.playSound == true) {
        fireBooster.currentTime = 0;
        fireBooster.play();
    }
}

function boost(ship) {
    ship.boost = true;
    ship.velocityx += 0.05 * ship.vector.x;
    ship.velocityy += 0.05 * ship.vector.y;
    playSound();
}

function makeShip(ctx) {
    updateShip();
    const rocketNoFlame = new Image(200, 200);
    rocketNoFlame.src = 'imagesfiles/rocketNoFlame.png';
    const rocketWithFlame = new Image(200, 200);
    rocketWithFlame.src = 'imagesfiles/rocketWithFlame.png';
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
        ctx.drawImage(rocketNoFlame, x - 40, y - 15, 50, 50)
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
        buttonTrigger == false;
        handleResumeButtonClick()
    }
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function startDraw(ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasWidth); // clear canvas
    ctx.fillStyle = "rgba(200, 200, 200, .4)";
    ctx.strokeStyle = "rgba(0, 153, 255, 0.4)";
    //  ctx.fillRect(0, 0, 700, 700);
}

function makeMoon(time, ctx,
    planetInfo, moonNum) {
    moveMoon(planetInfo, time, moonNum);

    ctx.fillStyle = "grey";
    if (planetInfo.moons[moonNum].hit == true) {
        ctx.fillStyle = "red";
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
        y: planetInfo.location.y
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
        ctx.fillStyle = "red";
    }
    ctx.fillText(
        " " + planetInfo.name,
        planetInfo.location.x + planetInfo.size,
        planetInfo.location.y
    );
    const planetImage = new Image(200, 200);
    planetImage.src = "imagesfiles/" + planetInfo.imageSource;
    ctx.drawImage(planetInfo.image, planetInfo.location.x - planetInfo.size, planetInfo.location.y - planetInfo.size, planetInfo.size * 2, planetInfo.size * 2);
    if (planetInfo.moons[0].name != "none") {
        makeMoons(time, ctx, planetInfo);
    }
}

function movePlanet(planetInfo, time) {
    let timeBuffer = (time.getMilliseconds() + 1) / (time.getMilliseconds() + 1);
    let middle = {
        x: canvasWidth / 2 + offsetAmount.x,
        y: canvasHeight / 2 + offsetAmount.y
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
    ctx.strokeStyle = 'rgba(0, 200, 200, .1)';
    ctx.arc(canvasWidth / 2 + offsetAmount.x, canvasHeight / 2 + offsetAmount.y, planetInfo.orbit, 0, Math.PI * 2, false); // planet orbit
    ctx.stroke();

}

function makeSun(ctx) {
    let img = sun.image //new Image();
    // img.src = "imagesfiles/" + sun.imageSource;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, canvasWidth / 2 - 40 + offsetAmount.x, canvasHeight / 2 - 40 + offsetAmount.y, 80, 80);
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
}
init();