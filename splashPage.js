const makeSplashPage = function () {
    const back = document.getElementById("back")
    back.setAttribute("class", "displayNone")
    const splashDiv = document.getElementById("splash");
    const s = document.createElement("H1");
    s.id = "s"
    s.textContent = "SPLASH";
    splashDiv.appendChild(s);
    const startButton = document.createElement('button');
    startButton.textContent = "Start";
    startButton.setAttribute("id", "Start")
    startButton.setAttribute("onclick", 'handleStartButtonClick(back)')
    splashDiv.appendChild(startButton);

}

function handleStartButtonClick(back) {
    const splashDiv = document.getElementById("splash");
    // splashDiv.setAttribute("style", "display:none;");
    // const back = getElementById("back");
    //const s = document.getElementById("s");
    splashDiv.setAttribute("class", "displayNone");
    back.setAttribute("class", "back");



    // }
}
//makeSplashPage();