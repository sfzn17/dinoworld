// script.js

const dinosaurSpecies = [
    { name: "Allosaurus", imageSrc: "PLACEHOLDER_A" },
    { name: "Brachiosaurus", imageSrc: "PLACEHOLDER_B" },
    { name: "Compsognathus", imageSrc: "PLACEHOLDER_C" },
    { name: "Dilophosaurus", imageSrc: "PLACEHOLDER_D" },
    { name: "Edmontosaurus", imageSrc: "PLACEHOLDER_E" },
    { name: "Fabrosaurus", imageSrc: "PLACEHOLDER_F" },
    { name: "Gallimimus", imageSrc: "PLACEHOLDER_G" },
    { name: "Hadrosaurus", imageSrc: "PLACEHOLDER_H" },
    { name: "Iguanodon", imageSrc: "PLACEHOLDER_I" },
    { name: "Jaxartosaurus", imageSrc: "PLACEHOLDER_J" },
    { name: "Kentrosaurus", imageSrc: "PLACEHOLDER_K" },
    { name: "Lambeosaurus", imageSrc: "PLACEHOLDER_L" },
    { name: "Megalosaurus", imageSrc: "PLACEHOLDER_M" },
    { name: "Nodosaurus", imageSrc: "PLACEHOLDER_N" },
    { name: "Ornithomimus", imageSrc: "PLACEHOLDER_O" },
    { name: "Pachycephalosaurus", imageSrc: "PLACEHOLDER_P" },
    { name: "Quaesitosaurus", imageSrc: "PLACEHOLDER_Q" },
    { name: "Rhabdodon", imageSrc: "PLACEHOLDER_R" },
    { name: "Stegosaurus", imageSrc: "https://publicdomainvectors.org/download.php?file=Stegosaurus-.svg" },
    { name: "Triceratops", imageSrc: "https://publicdomainvectors.org/download.php?file=1398894814.svg" },
    { name: "Utahraptor", imageSrc: "PLACEHOLDER_U" },
    { name: "Velociraptor", imageSrc: "PLACEHOLDER_V" },
    { name: "Wuerhosaurus", imageSrc: "PLACEHOLDER_W" },
    { name: "Xenotarsosaurus", imageSrc: "PLACEHOLDER_X" },
    { name: "Yinlong", imageSrc: "PLACEHOLDER_Y" },
    { name: "Zuniceratops", imageSrc: "PLACEHOLDER_Z" }
];

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('dinoCanvas');
    const ctx = canvas.getContext('2d');

    // Adjust canvas to screen size
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.7;

    let dinosaurs = [];

    class Dinosaur {
        constructor(x, y, width, height, color, speciesIndex) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color; // Used for placeholder background or if image fails
            this.dx = (Math.random() * 2 - 1) * 0.5; // Initial random speed
            this.dy = (Math.random() * 2 - 1) * 0.5; // Initial random speed
            this.isPaused = false;
            this.pauseEndTime = 0;

            this.currentSpeciesIndex = speciesIndex;
            this.speciesName = dinosaurSpecies[speciesIndex].name;
            this.imageSrc = dinosaurSpecies[speciesIndex].imageSrc;
            this.isPlaceholder = this.imageSrc.startsWith("PLACEHOLDER_");
            this.image = new Image();
            this.imageLoaded = false;

            if (!this.isPlaceholder) {
                this.image.onload = () => { this.imageLoaded = true; };
                this.image.onerror = () => { 
                    this.isPlaceholder = true; // Fallback to placeholder on error
                    console.error('Failed to load image:', this.imageSrc); 
                };
                this.image.src = this.imageSrc;
            }
        }

        draw() {
            if (this.isPlaceholder) {
                // Draw placeholder rectangle
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
                // Draw placeholder letter
                const letter = this.imageSrc.split('_')[1];
                ctx.fillStyle = 'black';
                ctx.font = Math.min(this.width, this.height) * 0.7 + 'px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(letter, this.x + this.width / 2, this.y + this.height / 2);
            } else if (this.imageLoaded) {
                // Draw the loaded image
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            } else {
                // Fallback: Still loading or failed, draw colored rectangle
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }

            // Draw the species name below the dinosaur
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(this.speciesName, this.x + this.width / 2, this.y + this.height + 5);
        }
        
        changeSpecies(newSpeciesIndex) {
            this.currentSpeciesIndex = newSpeciesIndex;
            const newSpecies = dinosaurSpecies[newSpeciesIndex];
            this.speciesName = newSpecies.name;
            this.imageSrc = newSpecies.imageSrc;
            this.isPlaceholder = this.imageSrc.startsWith("PLACEHOLDER_");
            this.imageLoaded = false; // Reset loading flag

            if (!this.isPlaceholder) {
                this.image.onload = () => { this.imageLoaded = true; };
                this.image.onerror = () => {
                    this.isPlaceholder = true; // Fallback to placeholder
                    this.imageLoaded = false; // Ensure it's marked as not loaded
                    console.error('Failed to load image for new species:', this.imageSrc);
                };
                this.image.src = this.imageSrc;
            }
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
            const speciesIndex = i % dinosaurSpecies.length; // Cycle through species
            dinosaurs.push(new Dinosaur(x, y, width, height, randomColor, speciesIndex));
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

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        dinosaurs.forEach(dino => {
            if (clickX >= dino.x && clickX <= dino.x + dino.width &&
                clickY >= dino.y && clickY <= dino.y + dino.height) {
                
                let newSpeciesIndex;
                if (dinosaurSpecies.length > 1) {
                    do {
                        newSpeciesIndex = Math.floor(Math.random() * dinosaurSpecies.length);
                    } while (newSpeciesIndex === dino.currentSpeciesIndex);
                    dino.changeSpecies(newSpeciesIndex);
                }
                // If only one species type, no change will occur.
            }
        });
    });
});
