'use strict';

// function definitions
const rotateScene = function (event) {
    const constraint = 20;
    rX -= event.originalEvent.movementY / 2;
    rY += event.originalEvent.movementX / 2;
    console.log(rX);

    if (rY < 42 && rY > -42) {
        $scene.css('--rY', rY + 'deg');
        $kid.css('--rY', -rY + 'deg');
        $pirate.css('--rY', -rY + 'deg');
        $treasure.css('--rY', rY + 'deg');
        $teddy.css('--rY', -rY + 'deg');
        $tree.css('--rY', -rY + 'deg');
    }
    if (rX < 0 && rX > -30) {
        $scene.css('--rX', rX + 'deg');
    }
}

const listen = function (event) {
    speech.start();
}

const speechStart = function (event) {
    console.log('speech recognition start');
    $beep[0].play();

    $button
        .addClass('listening')
        .off('click', listen);

    window.speechSynthesis.cancel();

}

const speechEnd = function (event) {
    console.log('speech recognition ended');

    $button
        .removeClass('listening')
        .on('click', listen);

}

const processResult = function (event) {
    //console.log( event.originalEvent.results );
    let transcript = event.originalEvent.results[0][0].transcript;

    if (transcript == 'open') {
        $scene.addClass("open");
        $sandybeach[0].play();
        $sword[0].play();
    } else if (transcript == 'close') {
        $scene.removeClass("open");
        $sandybeach[0].pause();
        $sword[0].pause();
    }
}

function togglePlay() {
    return myAudio.paused ? myAudio.play() : myAudio.pause();
};

//variable declarations
let $window = $(window);
let $scene = $('.scene');
let rX = 0;
let rY = 0;

let speech = new webkitSpeechRecognition();
let response = new SpeechSynthesisUtterance();

let $body = $('body');
let $button = $('#button');
let $beep = $('#beep');
let $sandybeach = $('#sandy-beach');
let $sword = $('#swords')

let myAudio = document.getElementById("background-music");

let $kid = $('.kid');
let kid = document.querySelector('#kid');
let kidAnim = new rive.Rive({
    src: 'rive.riv',
    artboard: 'Kid',
    canvas: kid,
    autoplay: true,
    onLoad: () => {
        kidAnim.resizeDrawingSurfaceToCanvas();
    },
});

let $pirate = $('.pirate');
let pirate = document.querySelector('#pirate');
let pirateAnim = new rive.Rive({
    src: 'rive.riv',
    artboard: 'Pirate',
    canvas: pirate,
    autoplay: true,
    onLoad: () => {
        pirateAnim.resizeDrawingSurfaceToCanvas();
    }
});

let $treasure = $('.treasure');
let treasure = document.querySelector('#treasure');
let treasureAnim = new rive.Rive({
    src: 'rive.riv',
    artboard: 'Treasure.svg',
    canvas: treasure
});

let $teddy = $('.teddy');
let teddy = document.querySelector('#teddy');
let teddyAnim = new rive.Rive({
    src: 'rive.riv',
    artboard: 'Boat',
    canvas: teddy
});

let $tree = $('.palm-tree')


// script initialisation
$window.on('mousedown', function () {
    $window.on('mousemove', rotateScene)
});

$window.on('mouseup', function () {
    $window.off('mousemove', rotateScene)
});

$('.face').prop('draggable', false);

speech.lang = 'en-US';

$button.on('click', listen);

$(speech)
    .on('start', speechStart)
    .on('end', speechEnd)
    .on('result', processResult);

treasure.onmouseenter = (_) =>
    treasureAnim.play("Animation 1");

treasure.onmouseout = (_) =>
    treasureAnim.pause("Animation 1");

teddy.onmouseenter = (_) =>
    teddyAnim.play("Animation 1");

teddy.onmouseout = (_) =>
    teddyAnim.pause("Animation 1");



