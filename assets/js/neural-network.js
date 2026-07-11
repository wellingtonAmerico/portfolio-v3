/* Background */
const canvas = document.getElementById("neural-network");
const ctx = canvas.getContext("2d");

/* Canvas size */
function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;;
}

resizeCanvas();

/* Config */
const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 170;
const particles = [];

/* Particle class */
class Particle{
    constructor(){
        this.reset();
    }
    reset(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = 1 + Math.random() * 2;

        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;

        this.opacity = 0.2 + Math.random() * 0.6;
    }
    draw(){
        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = `rgba(0, 200, 83, ${this.opacity})`;

        ctx.shadowColor = "#00C853";
        ctx.shadowBlur = 8;

        ctx.fill();

        ctx.closePath();
    }
    update(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.x < 0 || this.x > canvas.width){
            this.vx *= -1
        }
        if(this.y <0 || this.y > canvas.height){
            this.vy *= -1;
        }
    }
    attractToMouse(){
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const radius = 180;

        if(distance < radius){
            const force = (radius - distance) / radius;

            this.x -= dx * force * 0.015;
            this.y -= dy * force * 0.015;
        }
    }
}

/* Create Particles */
function createParticles(){
    particles.length = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++){
        particles.push(new Particle());
    }
}

createParticles();

/* Particulas */
function drawParticles(){
    particles.forEach((particle) => {
        particle.update();
        particle.attractToMouse();
        particle.draw();
    })
}

/* Conexões */
function drawConnections(){
    for(let i = 0; i < particles.length; i++){
        for(let j = i + 1; j < particles.length; j++){
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < CONNECTION_DISTANCE){
                const opacity = 1 - (distance / CONNECTION_DISTANCE);

                ctx.beginPath();
                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );
                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );
                ctx.strokeStyle = `rgba(0, 200, 83, ${opacity * 0.18})`;
                ctx.lineWidth = opacity * 1.1;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function clearCanvas(){
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}

window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
});

function animateNeuralNetwork(){
    clearCanvas();
    drawConnections();
    drawParticles();
    requestAnimationFrame(animateNeuralNetwork);
}

/* Detect mouse */
const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

animateNeuralNetwork();