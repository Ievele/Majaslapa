var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

// Your code goes here! 

function MyKeyDownHandler(MyEvent) { 
    if (MyEvent.keyCode == 37 && bug_x > 0) {
        bug_x = bug_x - 10;  
    }
    if (MyEvent.keyCode == 39 && bug_x + BugImg.width < myCanvas.width) {
        bug_x = bug_x + 10;
    }
}

addEventListener("keydown", MyKeyDownHandler);

var bug_x = 0;
var bug_y = 0;
var BugImg = new Image();
BugImg.src = "https://cdn-icons-png.flaticon.com/128/5976/5976179.png";

var melon_x = 0;
var melon_y = 0;
var MelonImg = new Image();
MelonImg.src = "https://img.icons8.com/?size=64&id=FyXjszTftyGf&format=png";

var score = 0;

function ImagesTouching(x1, y1, img1, x2, y2, img2) {
    if (x1 >= x2 + img2.width || x1 + img1.width <= x2) return false;   // too far to the side
    if (y1 >= y2 + img2.height || y1 + img1.height <= y2) return false; // too far above/below
    return true;  // otherwise, overlap   
}

var time_remaining = 30;

function Do_a_Frame() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    ctx.fillStyle = "purple";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 0, 20);

    bug_y = myCanvas.height - BugImg.height;
    ctx.drawImage(BugImg, bug_x, bug_y);
    ctx.fillText("Time Remaining: " + Math.round(time_remaining), 0, 45);

    if (time_remaining <= 0) {
        ctx.fillStyle = "red";
        ctx.font = "bold 50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", myCanvas.width / 2, myCanvas.height / 2);
        ctx.textAlign = "left";
    } else {
        time_remaining = time_remaining - 1 / 40;

        melon_y = melon_y + 3;
        if (melon_y > myCanvas.height) {
            melon_y = 0;
            melon_x = Math.random() * (myCanvas.width - MelonImg.width);
        }   
    }
    ctx.drawImage(MelonImg, melon_x, melon_y);

    if (ImagesTouching(bug_x, bug_y, BugImg, melon_x, melon_y, MelonImg)) {
        score = score + 1;
        melon_x = -MelonImg.width;
    }
} 

setInterval(Do_a_Frame, 25);
