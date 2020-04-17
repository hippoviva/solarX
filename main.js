let intElemClientWidth = 900; //window.innerWidth;
let intElemClientHeight = 700; //intElemClientWidth //* .5625;
let canvasWidth = intElemClientWidth;
let canvasHeight = intElemClientHeight;
let keyPressed, mousexy;
let buttonTrigger = false;
let objectsInSpace = [];
let offsetAmount = {
    x: 0,
    y: 0,
};

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

function makeLoadingText() {
    let loadingBox = document.getElementById("loadingBox");
    loadingMessageText = document.createElement("p");
    loadingMessageText.textContent = "Loading ...."
    loadingBox.appendChild(loadingMessageText)
    loadingBox.style.display = "inline-block";

}


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
    ];
    for (let i = 0; i < listOfImageObjects.length; i++) {
        listOfImageObjects[i].image = new Image(150, 150);
        listOfImageObjects[i].image.src =
            "imagesfiles/" + listOfImageObjects[i].imageSource;
    }
    mouseloc();
    resetEverything();
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
    return "done";
}

preload();
window.onload = (event) => {
    document.getElementById("loadingBox").style.display = "none";
    window.requestAnimationFrame(draw)
    loadAtStart();
};

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
    ship.winnerAmount = 1;
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
            makeInfoBox();
        }
    } else {
        yay.currentTime = 0;
        yay.play();
        makeYouWonBox();
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
    let infoBox = document.getElementById("infoBox");
    let resume1 = document.getElementById("Resume1");
    if (resume1.textContent == "Resume") {
        infoBox.setAttribute("style", "display:none;");
        buttonTrigger = false;
        ship.playSound = true;
        checkForButtonTrigger();
    } else {
        updateScore();
        //checkAnswers();
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

function setInfoBoxContent() {
    let infoBox = document.getElementById("infoBox");
    // landing.currentTime = 0;
    landingSound.play();
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
    divider.textContent = "*   *   *  *   *";
    ul.appendChild(divider);
    const instructions = document.createElement("p");
    instructions.textContent =
        "Check true if it would allow for life to exist here";
    ul.appendChild(instructions);
    const divider2 = document.createElement("p");
    divider2.textContent = "------";
    ul.appendChild(divider2);

    ///this is the new radio buttons

    const q1label = document.createElement("label");
    const q1Text = document.createElement("q1Text");
    q1Text.id = "q1Text";
    q1Text.textContent = ship.planetHit.question[0].text + "  ";
    q1label.appendChild(q1Text);
    const q1span = document.createElement("span");
    const q1r0 = document.createElement("input");
    q1r0.type = "radio";
    q1r0.id = "q1r0";
    q1r0.name = "1";
    q1r0.checked = true;
    q1r0.style = "display:none";
    q1span.appendChild(q1r0);

    const q1r1 = document.createElement("input");
    q1r1.type = "radio";
    q1r1.id = "q1r1";
    q1r1.name = "1";
    q1span.appendChild(q1r1);
    const q1r1Text = document.createElement("span");
    q1r1Text.textContent = " true   ";
    q1span.appendChild(q1r1Text);

    const q1r2 = document.createElement("input");
    q1r2.type = "radio";
    q1r2.id = "q1r2";
    q1r2.name = "1";
    q1span.appendChild(q1r2);

    const q1r2Text = document.createElement("span");
    q1r2Text.textContent = " false";
    q1span.appendChild(q1r2Text);

    q1label.appendChild(q1span);
    ul.appendChild(q1label);

    const q2label = document.createElement("p");
    const q2Text = document.createElement("span");
    q2Text.id = "q2Text";
    q2Text.textContent = ship.planetHit.question[1].text + "  ";
    q2label.appendChild(q2Text);
    const q2span = document.createElement("span");
    const q2r0 = document.createElement("input");
    q2r0.type = "radio";
    q2r0.id = "q2r0";
    q2r0.name = "2";
    q2r0.checked = true;
    q2r0.style = "display:none";
    q2span.appendChild(q2r0);

    const q2r1 = document.createElement("input");
    q2r1.type = "radio";
    q2r1.id = "q2r1";
    q2r1.name = "2";
    q2span.appendChild(q2r1);

    const q2r1Text = document.createElement("span");
    q2r1Text.textContent = " true  ";
    q2span.appendChild(q2r1Text);

    const q2r2 = document.createElement("input");
    q2r2.type = "radio";
    q2r2.id = "q2r2";
    q2r2.name = "2";
    q2span.appendChild(q2r2);

    const q2r2Text = document.createElement("span");
    q2r2Text.textContent = " false";
    q2span.appendChild(q2r2Text);

    q2label.appendChild(q2span);
    ul.appendChild(q2label);

    const breakBeforeButton = document.createElement("p");
    breakBeforeButton.textContent = " - ";
    infoBox.appendChild(breakBeforeButton);

    const resumeButton = document.createElement("button");
    resumeButton.textContent = "Check Answers";
    resumeButton.setAttribute("id", "Resume1");
    resumeButton.setAttribute("type", "Button");
    resumeButton.setAttribute("onclick", "handleResumeButtonClick()");
    infoBox.appendChild(resumeButton);

    const breakAfterButton = document.createElement("p");
    breakAfterButton.textContent = " - ";
    infoBox.appendChild(breakAfterButton);

    ship.playSound = false;
}

function setYouWonBoxContent(infoBox) {
    while (infoBox.firstChild) {
        infoBox.removeChild(infoBox.firstChild);
    }
    const messageGroup = document.createElement("span");
    infoBox.appendChild(messageGroup);
    const youWonBanner = document.createElement("h2");
    youWonBanner.textContent = "  You competed your mission!!  ";
    messageGroup.appendChild(youWonBanner);

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.setAttribute("id", "Resart");
    restartButton.setAttribute("onclick", "handleRestartButtonClick()");
    infoBox.appendChild(restartButton);
    ship.playSound = true;
}
//On this function objInSpace is an object reference to the object hit.
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
            //
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
    ctx.font = "18px serif";
    ctx.fillText("Score: " + ship.score, canvasWidth - 100, canvasHeight - 60);
    ctx.fillStyle = "rgba(255,255,255,.5";
    ctx.fillText("left and righ arrow turn ship", 20, 20);
    ctx.fillText("Up arrow is Boost", 20, 40);
    ctx.fillStyle = "white ";
    makeUpperListOfObjectsHit(ctx);
}

function makeUpperListOfObjectsHit(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "14px serif";
    ctx.fillText(objectsInSpace.length + " left ", canvasWidth - 100, 20);
    for (let i = 0; i < objectsInSpace.length; i++) {
        ctx.fillStyle = "white";
        ctx.font = "14px serif";
        ctx.fillText(objectsInSpace[i].name, canvasWidth - 100, 40 + i * 20);
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

function playSound1() {
    if (ship.playSound == true) {
        fireBooster.currentTime = 0;
        fireBooster.play();
    }
}

function boost(ship) {
    ship.boost = true;
    ship.velocityx += 0.05 * ship.vector.x;
    ship.velocityy += 0.05 * ship.vector.y;
    playSound1();
}

function makeShip(ctx) {
    updateShip();
    const rocketWithFlame = new Image(200, 200);
    rocketWithFlame.src = "imagesfiles/rocketWithFlame.png";
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
        buttonTrigger == false;
        handleResumeButtonClick();
    }
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
    };
}

function startDraw(ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasWidth); // clear canvas
    ctx.fillStyle = "rgba(200, 200, 200, .4)";
    ctx.strokeStyle = "rgba(0, 153, 255, 0.4)";
    //  ctx.fillRect(0, 0, 700, 700);
}

function makeMoon(time, ctx, planetInfo, moonNum) {
    moveMoon(planetInfo, time, moonNum);

    ctx.fillStyle = "grey";
    if (planetInfo.moons[moonNum].hit == true) {
        ctx.fillStyle = "red";
    }
    if (planetInfo.moons[moonNum].hit == false) {
        ctx.fillStyle = "green";
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
        ctx.fillStyle = "red";
    }
    if (planetInfo.hit == false) {
        ctx.fillStyle = "green";
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
}
//init();