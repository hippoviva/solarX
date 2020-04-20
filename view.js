function setYouWonBoxContent(infoBox) {
    //clear the infoBox div

    while (infoBox.firstChild) {
        infoBox.removeChild(infoBox.firstChild);
    }

    // make a new infoBox content
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


//Text display on screen:
function text(ctx) {
    ctx.fillStyle = "white ";
    ctx.font = "18px serif";
    ctx.fillText("Score: " + ship.score, canvasWidth / 2, 30);
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
        "Check good if it would allow for life to exist here";
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
    q1r1Text.textContent = " good   ";
    q1span.appendChild(q1r1Text);

    const q1r2 = document.createElement("input");
    q1r2.type = "radio";
    q1r2.id = "q1r2";
    q1r2.name = "1";
    q1span.appendChild(q1r2);

    const q1r2Text = document.createElement("span");
    q1r2Text.textContent = " bad";
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
    q2r1Text.textContent = " good  ";
    q2span.appendChild(q2r1Text);

    const q2r2 = document.createElement("input");
    q2r2.type = "radio";
    q2r2.id = "q2r2";
    q2r2.name = "2";
    q2span.appendChild(q2r2);

    const q2r2Text = document.createElement("span");
    q2r2Text.textContent = " bad";
    q2span.appendChild(q2r2Text);

    q2label.appendChild(q2span);
    ul.appendChild(q2label);

    const breakBeforeButton = document.createElement("p");
    breakBeforeButton.textContent = " - ";
    infoBox.appendChild(breakBeforeButton);

    // check answers and resume button

    const resumeButton = document.createElement("button");
    resumeButton.textContent = "Check Answers";
    resumeButton.setAttribute("id", "Resume1");
    resumeButton.setAttribute("type", "Button");
    resumeButton.setAttribute("onclick", "handleResumeButtonClick()");
    infoBox.appendChild(resumeButton);


    ship.playSound = false; //turn off sound so they can't hear boost
}