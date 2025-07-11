class PongGame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.canvas = document.createElement("canvas");
        this.canvas.width = 400;
        this.canvas.height = 300;
        this.shadowRoot.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.ball = { x: 200, y: 150, radius: 5, dx: 2, dy: 2 };
        this.paddle1 = { x: 10, y: 100, width: 10, height: 50 };
        this.paddle2 = { x: 380, y: 100, width: 10, height: 50 };
        this.keys = {};

        this.animate = this.animate.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    connectedCallback() {
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
        requestAnimationFrame(this.animate);
    }

    disconnectedCallback() {
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("keyup", this.handleKeyUp);
    }

    handleKeyDown(e) {
        this.keys[e.key] = true;
    }

    handleKeyUp(e) {
        this.keys[e.key] = false;
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(this.animate);
    }

    update() {
        if (this.keys["w"]) this.paddle1.y -= 4;
        if (this.keys["s"]) this.paddle1.y += 4;
        if (this.keys["ArrowUp"]) this.paddle2.y -= 4;
        if (this.keys["ArrowDown"]) this.paddle2.y += 4;

        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;

        if (this.ball.y < 0 || this.ball.y > this.canvas.height) this.ball.dy *= -1;

        const hitPaddle1 = this.ball.x < this.paddle1.x + this.paddle1.width &&
                           this.ball.y > this.paddle1.y &&
                           this.ball.y < this.paddle1.y + this.paddle1.height;
        const hitPaddle2 = this.ball.x > this.paddle2.x &&
                           this.ball.y > this.paddle2.y &&
                           this.ball.y < this.paddle2.y + this.paddle2.height;

        if (hitPaddle1 || hitPaddle2) this.ball.dx *= -1;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillRect(this.paddle1.x, this.paddle1.y, this.paddle1.width, this.paddle1.height);
        this.ctx.fillRect(this.paddle2.x, this.paddle2.y, this.paddle2.width, this.paddle2.height);
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

customElements.define("com-example-pong", PongGame);
