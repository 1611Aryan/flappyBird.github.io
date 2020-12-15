class Pipe {
    constructor() {
        this.dimension = () => {
            //?Calculates the height of the pipes
            this.height1 = (window.innerHeight - this.gap) / ((Math.random() * 2) + 1);
            this.height2 = (window.innerHeight - this.gap) - this.height1;
        };
        this.init = () => {
            //?sets the height of the pipes
            this.dimension();
        };
        this.render = () => {
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
        };
        this.move = () => {
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
        };
        this.collision = () => {
            if ((this.x <= bird.x + bird.radius && this.x + this.width >= bird.x - bird.radius) && (window.innerHeight - this.height2 <= bird.y + bird.radius || this.height1 >= bird.y - bird.radius)) {
                //?For dev purpose
                //this.strokeColor = "red";
                stopGame = 1;
            }
            else {
                //?For dev purpose
                //this.strokeColor = "black";
            }
        };
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
}
