const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let score = 0;

// بارگذاری تصاویر
const backgroundImg = new Image();
backgroundImg.src = "assets/images/background.png";

const minerImg = new Image();
minerImg.src = "assets/images/miner.png";

const rockImg = new Image();
rockImg.src = "assets/images/rock.png";

// موقعیت معدن‌چی
const miner = {
    x: 350,
    y: 350,
    width: 100,
    height: 100
};

// موقعیت سنگ
const rock = {
    x: Math.random() * (canvas.width - 80),
    y: Math.random() * (canvas.height - 200),
    width: 80,
    height: 80
};

// رسم بازی
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // رسم پس‌زمینه
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    // رسم معدن‌چی
    ctx.drawImage(minerImg, miner.x, miner.y, miner.width, miner.height);

    // رسم سنگ
    ctx.drawImage(rockImg, rock.x, rock.y, rock.width, rock.height);

    // رسم امتیاز
    ctx.fillStyle = "red";
    ctx.font = "20px Arial";
    ctx.fillText("امتیاز: " + score, 10, 30);
}

// رویداد کلیک برای ضربه زدن به سنگ
canvas.addEventListener("click", function(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    if (mouseX > rock.x && mouseX < rock.x + rock.width &&
        mouseY > rock.y && mouseY < rock.y + rock.height) {
        score += 1; // افزایش امتیاز
        rock.x = Math.random() * (canvas.width - 80);  // تغییر مکان سنگ
        rock.y = Math.random() * (canvas.height - 200);
    }
});

// حلقه بازی
function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

// اجرا بعد از بارگذاری تصاویر
backgroundImg.onload = minerImg.onload = rockImg.onload = function() {
    gameLoop();
};
