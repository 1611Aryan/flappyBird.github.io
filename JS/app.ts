const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
//?If insert is 1 a new pipe is inserted
let insert = 0;
let deletePipe = 0;
window.addEventListener('resize', () => {
    location.reload();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const Bird = function () {
    this.x = (window.innerWidth) * 15 / 100;
    this.y = (window.innerHeight) / 2;
    this.radius = 40;
    this.color = "navy"
    //?g is used for gravity
    this.g = 3;
    this.render = () => {
        //?A circle is drawn
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, (Math.PI) * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    this.gravity = () => {
        //?the bird falls down
        if (this.y + this.radius >= window.innerHeight) {
            this.y = this.radius;
        }
        else {
            this.y += this.g;
        }
        this.render();
    }
    this.jump = () => {
        //?the ball jumps up
        this.y -= 50;
        this.render();
    }
}

const Pipe = function () {
    this.width = window.innerWidth / 10;
    this.x = window.innerWidth - this.width;
    this.y = 0;
    this.gap = window.innerHeight / 3;
    this.speed = 8;
    this.color = "green";

    this.dimension = () => {
        //?Calculates the height of the pipes
        this.height1 = (window.innerHeight - this.gap) / ((Math.random() * 2) + 1);
        this.height2 = (window.innerHeight - this.gap) - this.height1;
    }
    this.init = () => {
        //?sets the height of the pipes
        this.dimension();
    }
    this.render = () => {
        //?top pipe
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height1)
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        //?bottom pipe
        c.beginPath();
        c.rect(this.x, window.innerHeight - this.height2, this.width, this.height2)
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    this.move = () => {
        //?y cordinate remains same x cordinate is changed
        if (this.x <= window.innerWidth / 2 + this.speed / 2 && this.x >= window.innerWidth / 2 - this.speed / 2) {
            //?when the pipe crosses the center a new pipe is added
            //?+5 and -5 are added because the x cordinate is decremented in intervals of the value of speed
            insert = 1;
        }
        if ((this.x + this.width) + window.innerWidth < 0) {

            deletePipe = 1;
        }
        this.x -= this.speed;
        this.render();
    }

    this.init();
    this.render();

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
})

window.addEventListener('touch', (e) => {

    bird.jump();

})
let numOfPipes = 1;

//?Inserts the next pipe
const newPipe = () => {
    let pipe = new Pipe();
    pipes.push(pipe);
    numOfPipes++;
}

const deletePipeFunc = () => {
    pipes.shift();
    console.log(pipes.length)
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    bird.gravity();

    for (var i = 0; i < numOfPipes; i++) {
        pipes[i].move();
        if (insert == 1) {
            newPipe();
            insert = 0;
        }
        if (deletePipe == 1) {
            deletePipeFunc();
            numOfPipes--;
            deletePipe = 0;
        }
    }




}
animate();