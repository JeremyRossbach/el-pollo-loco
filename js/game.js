let keyboard = new Keyboard();
music = new Audio('audio/music.mp3');
run_sound = new Audio('audio/run.mp3');
jump_sound = new Audio('audio/jump.mp3');
hurt = new Audio('audio/hurt.mp3');
dead = new Audio('audio/lose.mp3');
let canvas;
let world;
let inFullscreen = false;
let fullscreen = document.getElementById('fullscreen');


/**
 * shows the introscreen
 */
function introScreen() {
    document.getElementById('jura').style.display = 'none';
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('howToPlayButton').style.display = 'none';
    document.getElementById('introScreen').style.display = 'flex';
    document.getElementById('previousNext').style.display = 'flex';
}


/**
 * shows the previous screen
 */
function goBack() {
    document.getElementById('jura').style.display = 'flex';
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('howToPlayButton').style.display = 'flex';
    document.getElementById('introScreen').style.display = 'none';
    document.getElementById('previousNext').style.display = 'none';
}


/**
 * starts te game
 */
function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('howToPlayButton').style.display = 'none';
    document.getElementById('introScreen').style.display = 'none';
    document.getElementById('previousNext').style.display = 'none';
    document.getElementById('h1').style.display = 'none';
    document.getElementById('canvas').style.display = 'flex';
    document.getElementById('buttons').style.display = 'flex';
    music.play();
    music.muted = false;
    initLevel();
    init();
}


/**
 * initializes the canvas and sets the world
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/**
 * checks if game is muted
 */
function checkMute() {
    if (music.muted === false) {
        mute();
    } else {
        unmute();
    }
}


/**
 * mutes thhe game
 */
function mute() {
    this.music.muted = 'true';
    this.run_sound.muted = 'true';
    this.jump_sound.muted = 'true';
    this.hurt.muted = 'true';
    this.dead.muted = 'true';
    music.muted = true;
    document.getElementById('muteButton').style.backgroundImage = 'url(img/mute.png)';
}


/**
 * unmmutes the game
 */
function unmute() {
    this.music.muted = 'false';
    this.run_sound.muted = 'false';
    this.jump_sound.muted = 'false';
    this.hurt.muted = 'false';
    this.dead.muted = 'false';
    music.muted = false;
    document.getElementById('muteButton').style.backgroundImage = 'url(img/unmute.png)';
}


/**
 * restarts the game
 */
function restart() {
    location.reload();
}


/**
 * checks if fullscreen is activ
 */
function checkScreen() {
    if (!inFullscreen) {
        inFullscreen = true;
        enterFullscreen(this.fullscreen);
    } else {
        inFullscreen = false;
        exitFullscreen();
    }
}


/**
 * enters fullscreen
 * 
 * @param {*} element 
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}


/**
 * exits fullscreen
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


/**
 * stops the game
 */
function gameDone() {
    stopMove();
    mute();
}


/**
 * stops character movements
 */
function stopMove() {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
    world.keyboard.RIGHT = false;
    world.keyboard.LEFT = false;
    world.gamePaused = true;
}


/**
 * shows game over screen
 */
function gameOver() {
    document.getElementById('gameOverScreen').style.display = 'flex';
}


/**
 * shows game won screen
 */
function gameWon() {
    document.getElementById('gameWonScreen').style.display = 'flex';
}


window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);


/**
 * sets a certain variable on true if specific key is pressed down
 * 
 * @param {string} e - event (keydown/keyup)
 */
function handleKeyDown(e) {


    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }

    if (e.keyCode == 70) {
        keyboard.F = true;
    }
};


/**
 * sets a certain variable on fasle if specific key is no longer pressed down
 * 
 * @param {string} e - event (keydown/keyup)
 */
function handleKeyUp(e) {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }

    if (e.keyCode == 70) {
        keyboard.F = true;
    }
};


document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
});

document.getElementById('btnLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
});

document.getElementById('btnRight').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
});

document.getElementById('btnRight').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
});

document.getElementById('btnJump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
});

document.getElementById('btnJump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
});

document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
});

document.getElementById('btnThrow').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
});