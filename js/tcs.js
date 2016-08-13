var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var food = {
    x: 0,
    y: 0,
    w: 40,
    h: 40,
    color: "orange"
};
food.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
};

food.setPosition = function() {

    while(true) {
        var x = rand(0, (canvas.width - this.w) / this.w) * this.w;
        var y = rand(0, (canvas.height - this.h) / this.h) * this.h;
        //遍历身体上的点，如果当前随机生成的店与蛇重合，跳出循环，册当前的i不等于snake.body.length.跳出while循环
        for(var i = 0; i < snake.bodys.length; i++) {
            if(x == snake.bodys[i].x && this.y == snake.bodys[i].y) {
                break;
            }
        }
        //之前的遍历没有找到重合点跳出循环
        if(i == snake.bodys.length) {
            this.x = x;
            this.y = y;
            break;
        }

    }
};
var snake = {
    x: 40,
    y: 40,
    w: 40,
    h: 40,

    headColor: "#808080",
    bodyColor: "#6ff",
    top: false,
    bottom: false,
    left: false,
    right: true,
    bodys: [],
    bool: true
};
snake.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.headColor;
    ctx.fillRect(this.x, this.y, this.w, this.h);
};
snake.move = function() {
    if(this.left) {
        this.x -= this.w;
    } else if(this.right) {
        this.x += this.w;
    } else if(this.top) {
        this.y -= this.h;
    } else if(this.bottom) {
        this.y += this.h;
    }
    snake.draw();
    snake.drawBody();
    snake.savePosition();

};
snake.savePosition = function() {
    this.bodys.push({
        x: this.x,
        y: this.y,
        w: this.w,
        h: this.h
    });
    if(this.bodys.length > 4 && this.bool) {
        //arr.shift（）删除数组第一个元素
        this.bodys.shift();
    } else {
        this.bool = true;
    }
};
snake.drawBody = function() {
    for(var i = 0; i < this.bodys.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.bodyColor;
        ctx.fillRect(this.bodys[i].x, this.bodys[i].y, this.bodys[i].w, this.bodys[i].h);
    }

};

food.setPosition();
snake.draw();

function checkP(obj1, obj2) {
    return (Math.abs(obj1.x + obj1.w / 2 - (obj2.x + obj2.w / 2)) < obj1.w / 2 + obj2.w / 2 && Math.abs(obj1.y + obj1.h / 2 - (obj2.y + obj2.h / 2)) < obj1.h / 2 + obj2.h / 2)

}
setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    food.draw();
    snake.move();
    if(checkP(food, snake)) {
        food.setPosition();
        food.draw();
        snake.bool = false;
    }

}, 200);
document.onkeydown = function(e) {
    var ev = e || window.event;
    switch(ev.keyCode) {
        case 37:
            if(!snake.right) {
                snake.left = true;
                snake.right = false;
                snake.top = false;
                snake.bottom = false;
            }
            break;

        case 38:
            if(!snake.bottom) {
                snake.left = false;
                snake.right = false;
                snake.top = true;
                snake.bottom = false;
            }
            break;
        case 39:
            if(!snake.left) {
                snake.left = false;
                snake.right = true;
                snake.top = false;
                snake.bottom = false;
            }
            break;
        case 40:
            if(!snake.top) {
                snake.left = false;
                snake.right = false;
                snake.top = false;
                snake.bottom = true;
            }

            break;
    }
};