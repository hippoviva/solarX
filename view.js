function makeLoadingText() {
    let loadingBox = document.getElementById("loadingBox");
    loadingMessageText = document.createElement("p");
    loadingMessageText.textContent = "Loading ...."
    loadingBox.appendChild(loadingMessageText)
    loadingBox.style.display = "inline-block";

}

function makeWelcomeBoxText() {
    let welcomeBox = document.getElementById("welcomeBox");
    let board = document.createElement("div");
    board.id = "board";
    let content1 = document.createElement("div");
    content1.id = "content1"
    let title = document.createElement("p");
    title.textContent = "Episode I";
    title.id = "title1"
    let subtitle = document.createElement("p");
    subtitle.textContent = "Solar Explorer";
    subtitle.id = "subtitle"
    let breaktext = document.createElement("br")
    let breaktext1 = document.createElement("br")
    let breaktext2 = document.createElement("br")
    let breaktext3 = document.createElement("br")
    let breaktext4 = document.createElement("br")
    let breaktext5 = document.createElement("br")
    let breaktext6 = document.createElement("br")
    let breaktext7 = document.createElement("br")
    let breaktext8 = document.createElement("br")


    let text1 = document.createElement("p")
    text1.textContent = "Turmoil has set upon the solar system as Coach Anderson works diligently to become a master of his trade.. and defeat Weatherford.  He needs you to explore the solar system to find good places to build outposts."
    let text2 = document.createElement("p");
    text2.textContent = "You will pilot your spacecraft to each object in the solar system that has a green title."
    let text3 = document.createElement("p");
    text3.textContent = "Once there you will analyze the data and answer two questions on whether it has a characteristic that allows for life."
    let text4 = document.createElement("p");
    text4.textContent = "Each correct answer will reward you with 50 points.  Reach 1,400 points to complete your mission."
    let text5 = document.createElement("p");
    text5.textContent = "Remember, it has to have water, a suitable atmosphere with oxygen, a mass of between .5 and 2 times Earth, a magnetosphere to protect from cosmic rays and a nice rocky surface to build the new outpost."
    let text6 = document.createElement("p");
    text6.textContent = "The alliance is counting on you, we know you can do it!!"
    let text7 = document.createElement("p");
    text7.textContent = "May the force be with you and ... "
    let text8 = document.createElement("p");
    text8.textContent = "Go Bearcats!!"
    text8.id = "subtitle2";


    content1.appendChild(title);
    content1.appendChild(breaktext);
    content1.appendChild(subtitle);
    content1.appendChild(breaktext1);
    content1.appendChild(text1);
    content1.appendChild(breaktext2);
    content1.appendChild(text2);
    content1.appendChild(breaktext3);
    content1.appendChild(text3);
    content1.appendChild(breaktext4);
    content1.appendChild(text4);
    content1.appendChild(breaktext5);
    content1.appendChild(text5);
    content1.appendChild(breaktext6);
    content1.appendChild(text6);
    content1.appendChild(breaktext7);
    content1.appendChild(text7);
    content1.appendChild(breaktext8);
    content1.appendChild(text8);

    board.appendChild(content1);

    const startButton = document.createElement("button");
    startButton.textContent = "Start";
    startButton.setAttribute("type", "Button")
    startButton.id = "startButton";
    startButton.setAttribute("onclick", "handleStartButtonClick()");

    welcomeBox.appendChild(startButton);
    welcomeBox.appendChild(board)

    welcomeBox.style.display = "block";

    ship.playSound = true;
}



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
    restartButton.setAttribute("type", "Button");
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
        "Select good if it would allow for life to exist here";
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