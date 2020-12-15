export default class Bird {
    constructor() {
        this.render = () => {
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
        };
        this.gravity = () => {
            //*the bird falls down
            // ?Dev purpose
            //this.y = mouse.y;
            this.g += this.diffucultyFactor;
            this.y += this.g;
            this.render();
            if (this.y + this.radius >= window.innerHeight || this.y - this.radius <= 0) {
                stopGame = 1;
            }
        };
        this.jump = () => {
            //?the ball jumps up
            if (this.stop) {
                this.y -= this.jumpValue;
                this.render();
            }
        };
        this.stopGame = () => {
            this.stop = false;
        };
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
}
