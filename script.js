// script.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('dinoCanvas');
    const ctx = canvas.getContext('2d');

    // Adjust canvas to screen size
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.7;

    let dinosaurs = [];

    class Dinosaur {
        constructor(x, y, width, height, color) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.dx = (Math.random() * 2 - 1) * 0.5; // Initial random speed between -0.5 and 0.5
            this.dy = (Math.random() * 2 - 1) * 0.5; // Initial random speed between -0.5 and 0.5
            this.isPaused = false;
            this.pauseEndTime = 0;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        update() {
            // Handle pausing
            if (this.isPaused) {
                if (Date.now() > this.pauseEndTime) {
                    this.isPaused = false;
                    // Resume with new random direction
                    this.dx = (Math.random() * 2 - 1) * (Math.random() < 0.5 ? 0.5 : 1); // Max speed of 1 or 0.5
                    this.dy = (Math.random() * 2 - 1) * (Math.random() < 0.5 ? 0.5 : 1);
                } else {
                    // Still paused, do nothing else for movement
                    return;
                }
            }

            // Chance to pause
            if (!this.isPaused && Math.random() < 0.005) { // 0.5% chance to pause
                this.isPaused = true;
                this.dx = 0;
                this.dy = 0;
                this.pauseEndTime = Date.now() + (Math.random() * 2000 + 1000); // Pause for 1-3 seconds
                return; // Exit update early as it's now paused
            }

            // Chance to change direction randomly
            if (!this.isPaused && Math.random() < 0.01) { // 1% chance to change direction
                this.dx = (Math.random() * 2 - 1) * (Math.random() < 0.5 ? 0.5 : 1); // Max speed of 1 or 0.5
                this.dy = (Math.random() * 2 - 1) * (Math.random() < 0.5 ? 0.5 : 1);
            }

            // Actual movement
            this.x += this.dx;
            this.y += this.dy;

            // Boundary checks (bounce off edges)
            if (this.x + this.width > canvas.width) {
                this.x = canvas.width - this.width;
                this.dx *= -1;
            } else if (this.x < 0) {
                this.x = 0;
                this.dx *= -1;
            }

            if (this.y + this.height > canvas.height) {
                this.y = canvas.height - this.height;
                this.dy *= -1;
            } else if (this.y < 0) {
                this.y = 0;
                this.dy *= -1;
            }
        }
    }

    function initDinos() {
        const numDinos = Math.floor(Math.random() * 6) + 10; // Random number of dinos between 10 and 15
        const colors = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'];
        const margin = 10; // Margin from canvas edges

        for (let i = 0; i < numDinos; i++) {
            const width = Math.random() * (40 - 20) + 20; // Random width between 20 and 40
            const height = Math.random() * (60 - 30) + 30; // Random height between 30 and 60

            // Ensure dinos are spawned within canvas boundaries, considering their size and margin
            const x = Math.random() * (canvas.width - width - 2 * margin) + margin;
            const y = Math.random() * (canvas.height - height - 2 * margin) + margin;

            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            dinosaurs.push(new Dinosaur(x, y, width, height, randomColor));
        }
    }

    function gameLoop() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw all dinosaurs
        dinosaurs.forEach(dino => {
            dino.update();
            dino.draw();
        });

        requestAnimationFrame(gameLoop);
    }

    // Initialize dinosaurs and start the animation loop
    initDinos();
    gameLoop();
});
