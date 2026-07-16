var gameLoaded = false;
var iAd;

initializeFireBase();


function iAdPause() {
}
function iAdUnpause() {
    unityAdFinishedCallback()
}
function requestNewAd() {
    unityAdFinishedCallback()
}

// This function calls Unity to tell the ad finished
function unityAdFinishedCallback() {
    try {
        if (gameInstance)
            gameInstance.SendMessage('AdsManager', 'OnWebCallback');
    }
    catch (error) {
        console.log(error);
    }
}

var gameInstance = UnityLoader.instantiate("gameContainer", "1v1oldschool/1/Build.json", {onProgress: UnityProgress});

var lockedOccured = false;

function UnityProgress(gameInstance, progress) {
    if (!gameInstance.Module) {
        return;
    }
    const loader = document.querySelector("#loader");
    if (!gameInstance.progress) {
        const progress = document.querySelector("#loader .progress");
        progress.style.display = "block";
        gameInstance.progress = progress.querySelector(".full");
        loader.querySelector(".spinner").style.display = "none";
    }
    gameInstance.progress.style.transform = `scaleX(${progress})`;
    if (progress === 1 && !gameInstance.removeTimeout) {
        loader.style.display = "none";
        gameLoaded = true;
    }
}

document.onkeydown = function (e) {
    if (e.altKey || e.ctrlKey || e.key == "F1" || e.key == "F2" || e.key == "F3" || e.key == "F4") {
        e.preventDefault();
    }
}

document.onmouseup = function (e) {
    e.preventDefault();
}

document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
    if (!lockedOccured && document.pointerLockElement)
        lockedOccured = true;
    if (!document.pointerLockElement && lockedOccured)
        gameInstance.SendMessage("Pause Menu", "PauseGame");
}

var isFirstLoad = true;
var lastRefreshTime = new Date();

function showAds() {
    // document.getElementById("adRectangleTop").style.display = "block";
    // document.getElementById("adRectangleBottom").style.display = "block";
    // document.getElementById("adLeaderboardBottom").style.display = "block";

    if (isFirstLoad) {
        isFirstLoad = false;
    }
    else {
        refresh();
    }
}

function hideAds() {
    document.getElementById("adRectangleTop").style.display = "none";
    document.getElementById("adRectangleBottom").style.display = "none";
    document.getElementById("adLeaderboardBottom").style.display = "none";
}

function refresh() {
    if (new Date() - lastRefreshTime < 500)
        return;
    lastRefreshTime = new Date();
    console.log("refresh");
}

window.onfocus = function () {
    refresh();
};
