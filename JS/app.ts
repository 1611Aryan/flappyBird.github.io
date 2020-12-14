const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
//?If insert is 1 a new pipe is inserted
let insert = 0;
let deletePipe = 0;
let stopGame = 0;

window.addEventListener('resize', () => {
    location.reload();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})
class Bird {
    x: number
    y: number
    radius: number
    color: string
    g: number
    jumpValue: number
    diffucultyFactor: number
    stop: boolean
    constructor() {
        this.x = (window.innerWidth) * 15 / 100;
        this.y = (window.innerHeight) / 2;
        this.radius = 40;
        if (window.innerHeight < 700) {
            this.radius = 30;
        }
        if (window.innerHeight < 400) {
            this.radius = 20;
        }
        this.color = "#ffff89";
        //?g is used for gravity
        this.g = 2;
        this.diffucultyFactor = 0.0005;
        // this.g = 0;
        this.jumpValue = 60;
        this.stop = true;
    }
    render = () => {
        // //?beak
        // c.beginPath();
        // c.moveTo(this.x + this.radius - 5, this.y + 15);
        // c.lineTo(this.x + this.radius - 5, this.y - 10);
        // c.lineTo(this.x + this.radius + 15, this.y + 5);
        // c.closePath();
        // c.fillStyle = 'black';
        // c.fill();
        //?body
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, (Math.PI) * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        // //?iris
        // c.beginPath();
        // c.ellipse(this.x + this.radius / 2, this.y - this.radius / 3, this.radius / 4, this.radius / 3, 0, (Math.PI) * 2, false);
        // c.strokeStyle = '#F1C27D';
        // c.stroke();
        // c.fillStyle = 'white';
        // c.fill();
        // c.closePath();
        // //?pupil
        // c.beginPath();
        // c.arc(this.x + this.radius / 2, this.y - this.radius / 3, this.radius / 15, 0, (Math.PI) * 2, false);
        // c.fillStyle = 'black';
        // c.fill();
        // c.closePath();
    }
    gravity = () => {
        //*the bird falls down
        // ?Dev purpose
        //this.y = mouse.y;
        this.g += this.diffucultyFactor
        this.y += this.g;
        this.render();
        if (this.y + this.radius >= window.innerHeight || this.y - this.radius <= 0) {
            stopGame = 1;
        }
    }
    jump = () => {
        //?the ball jumps up
        if (this.stop) {
            this.y -= this.jumpValue;
            this.render();
        }
    }
    stopGame = () => {
        this.stop = false;
    }
}

class Pipe {
    width: number
    x: number
    y: number
    gap: number
    speed: number
    color: string
    height1: number
    height2: number
    posY1: number
    posY2: number
    strokeColor: string;
    constructor() {
        this.width = window.innerWidth / 10;
        this.x = window.innerWidth - this.width;
        this.y = 0;
        this.gap = window.innerHeight / 3;
        this.speed = 4;
        //this.speed = 2;
        this.color = "#013220";
        //?For dev purpose
        //this.strokeColor = "black";
        this.init();
        this.render();
    }
    dimension = () => {
        //?Calculates the height of the pipes
        this.height1 = (window.innerHeight - this.gap) / ((Math.random() * 2) + 1);
        this.height2 = (window.innerHeight - this.gap) - this.height1;
    }
    init = () => {
        //?sets the height of the pipes
        this.dimension();
    }
    render = () => {
        //?top pipe
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height1);
        c.fillStyle = this.color;
        c.fill();
        //?For dev purpose
        // c.strokeStyle = this.strokeColor
        //c.stroke();
        c.closePath();

        //?bottom pipe
        c.beginPath();
        c.rect(this.x, window.innerHeight - this.height2, this.width, this.height2);
        c.fillStyle = this.color;
        c.fill();
        //?For dev purpose
        //c.strokeStyle = this.strokeColor
        //c.stroke();
        c.closePath();
    }
    move = () => {
        //?y cordinate remains same x cordinate is changed
        if (this.x <= window.innerWidth / 2 + this.speed / 2 && this.x >= window.innerWidth / 2 - this.speed / 2) {
            //?when the pipe crosses the center a new pipe is added
            //?+5 and -5 are added because the x cordinate is decremented in intervals of the value of speed
            insert = 1;
        }
        if ((this.x + this.width) + window.innerWidth / 2 < 0) {
            deletePipe = 1;
        }
        this.x -= this.speed;
        this.render();

    }
    collision = () => {
        if ((this.x <= bird.x + bird.radius && this.x + this.width >= bird.x - bird.radius) && (window.innerHeight - this.height2 <= bird.y + bird.radius || this.height1 >= bird.y - bird.radius)) {
            //?For dev purpose
            //this.strokeColor = "red";
            stopGame = 1;
        }
        else {
            //?For dev purpose
            //this.strokeColor = "black";
        }
    }
}

//?The bird is created
const bird = new Bird();
//?Array which holds the pipes is created

const pipes = [];
//?first pipe is created and pushed into the array;
const pipe = new Pipe();
pipes.push(pipe);

window.addEventListener('keydown', (e) => {
    if (e.key == " " || e.key == 'ArrowUp') {
        bird.jump();
    }
});
window.addEventListener('click', () => {
    bird.jump();
})
window.addEventListener('touchend', (e) => {
    bird.jump();
});

let numOfPipes = 1;

//?Inserts the next pipe
const newPipe = () => {
    let pipe = new Pipe();
    pipes.push(pipe);
    numOfPipes++;
};

const deletePipeFunc = () => {
    pipes.shift();
};

function animate() {
    let startGame = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    bird.gravity();
    pipes.forEach(pipe => {
        pipe.move();
        pipe.collision();
        if (insert == 1) {
            newPipe();
            insert = 0;
        }
        if (deletePipe == 1) {
            deletePipeFunc();
            numOfPipes--;
            deletePipe = 0;
        }
    })
    if (stopGame == 1) {
        bird.stopGame();
        cancelAnimationFrame(startGame);
    }
}
animate();
