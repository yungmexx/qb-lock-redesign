let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let W = canvas.width;
let H = canvas.height;
let degrees = 0;
let new_degrees = 0;
let time = 0;
let color = "#ff0000";
let txtcolor = "#ffffff";
let bgcolor = "rgba(10, 10, 10, 0.8)";
let bgcolor2 = "rgba(255, 255, 255, 0.8)";
let bgcolor3 = "#00ff00";
let g_start, g_end;
let animation_loop;


let gameEndTimeout; // Declare the global variable


let originalBgColor2 = bgcolor2; // Store the original bgcolor2 value

let needed = 4;
let streak = 0;


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function init() {

    // Clear the canvas every time a chart is drawn
    ctx.clearRect(0, 0, W, H);

    // Draw the filled background circle
    const backgroundRadius = 125; // Adjust the radius as needed
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)"; // Replace with your desired background color
    ctx.arc(W / 2, H / 2, backgroundRadius, 0, Math.PI * 2, false);
    ctx.fill();

    // Draw the stroke (outline) of the circle
    ctx.beginPath();
    ctx.strokeStyle = bgcolor;
    ctx.lineWidth = 15;
    ctx.arc(W / 2, H / 2, 100, 0, Math.PI * 2, false);
    ctx.stroke();

    // Green zone
    ctx.beginPath();
    ctx.strokeStyle = correct === true? bgcolor3 : bgcolor2;
    ctx.lineWidth = 25;
    ctx.arc(W / 2, H / 2, 98, g_start - 90 * Math.PI / 180, g_end - 90 * Math.PI / 180, false);
    ctx.stroke();

    // Angle in radians = angle in degrees * PI / 180
    let radians = degrees * Math.PI / 180;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 40;
    ctx.arc(W / 2, H / 2, 90, radians - 0.08 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
    ctx.stroke();
}


function draw(time) {
    if (typeof animation_loop !== undefined) clearInterval(animation_loop);
    g_start = getRandomInt(20,40) / 10;
    g_end = getRandomInt(5,10) / 10;
    g_end = g_start + g_end;
    degrees = 0;
    new_degrees = 360;
    time = time;
    animation_loop = setInterval(animate_to, time);
            
}

function animate_to() {
    if (degrees >= new_degrees) {
        wrong();
        return;
    }
    degrees+=2;
    init();
}

function correct() {
    streak += 1;
    clearInterval(animation_loop); // Stop the animation immediately

    if (streak == needed) {
    // Change bgcolor2 to green
        bgcolor2 = "rgba(0, 255, 0, 0.8)";
        init();

        endGame(true);

        $('.spacebar-wrapper').hide();
        $('.unlock').css('opacity', '100%');
        $('.unlock').show();
    } else {
        draw(time);
    }
}

function wrong() {
    // Change bgcolor2 to red
    bgcolor2 = "rgba(255, 0, 0, 0.8)";
    init();

    clearInterval(animation_loop);

    $('.spacebar-wrapper').hide();
    // Show the lock icon using jQuery
    $('.lock').css('opacity', '100%');
    $('.lock').show();

    endGame(false);
}


document.addEventListener("keydown", function(ev) {
    if (ev.key === ' ' || ev.code === 'Space') {
        let d_start = (180 / Math.PI) * g_start;
        let d_end = (180 / Math.PI) * g_end;
        if (degrees < d_start) {
            wrong();
        } else if (degrees > d_end) {
            wrong();
        } else {
            correct();
        }
    }
});


function startGame(time){
    clearTimeout(gameEndTimeout); // Clear the previous timeout
    $('.lock').hide(); // Hide the lock element
    $('.unlock').hide(); // Hide the unlock element
    $('.spacebar-wrapper').hide(); // Hide the spacebar-wrapper element
    $('#canvas').show();
    
    // Reset bgcolor2 to its original color
    bgcolor2 = originalBgColor2;
    
    draw(time);
}

function endGame(status) {
    var xhr = new XMLHttpRequest();
    let u = "fail";
    if (status)
        u = "success";

    xhr.open("POST", `http://qb-lock/${u}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({}));
    streak = 0;
    needed = 4;

    // Set a timeout and assign it to the global variable
    gameEndTimeout = setTimeout(function () {
        $('.spacebar-wrapper').hide();
        $('.lock').hide();
        $('.unlock').hide();
        $('#canvas').hide();

        // Reset bgcolor2 and redraw the background with the original bgcolor2
        bgcolor2 = originalBgColor2;
        init();
    }, 1100);
}

  
  window.addEventListener("message", (event) => {
    if(event.data.action == "start"){
        if(event.data.value != null ){
            needed = event.data.value
        }else{
            needed = 4
        }
        if(event.data.time != null ){
            time = event.data.time
        }else{
            time = 2
        }
		console.log(event.data.time)

        startGame(time)
        $('#canvas').show();
        $('.spacebar-wrapper').css('opacity', '100%');
        $('.spacebar-wrapper').show();

    }
  })

