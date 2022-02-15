let x = 0;
let y = 0;
let screen_width = 0;
let screen_height = 0;
let apple;
let speak_data;
let to_number;

function preload() {
    apple = loadImage('apple.png');
}

let draw_apple = "";
const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function start() {
    document.getElementById("status").innerHTML = "System is listening please speak";
    recognition.start();
}

recognition.onresult = function(event) {
    console.log(event);
    let content = event.results[0][0].transcript;
    document.getElementById("status").innerHTML = "The speech has been recognized: ";
    to_number = Number(content);
    if (Number.isInteger(to_number)) {
        draw_apple = "set";
        document.getElementById("status").innerHTML = "Started Drawing Apples";
    } else {
        document.getElementById("status").innerHTML = "the speach has not recognised a number";
    }

}

function setup() {
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
    console.log(screen_height, screen_width);
    createCanvas(screen_width, screen_height - 150);
}

function draw() {
    if (draw_apple == "set") {
        for (var i = 1; i < to_number + 1; i++) {
            x = Math.random() * (screen_width - 50);
            y = Math.random() * (screen_height - 200);
            image(apple, x, y, 50, 50);
        }
        document.getElementById("status").innerHTML = to_number + " Apples drawn";
        speak_data = to_number + "Apples drawn";
        speak();
        draw_apple = "";
    }
}

function speak() {
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}