document.addEventListener("DOMContentLoaded", () => {
    const game = document.getElementById("game");
    const net = document.getElementById("net");
    const scoreDisplay = document.getElementById("score");
    let score = 0;

    const bugPuns = [
        "Don't bug me!",
        "What a buzzkill!",
        "You caught me, you little pest!",
        "Quit bugging me!",
        "I'm totally bugged out!",
        "You beetle-ieve it!",
        "You’re my best bud, bug!",
        "I'm bugging out!",
        "Catch you later, alligator!",
        "I'm feeling buggy!"
    ];

    let currentPunDisplay = null; // Add this variable

    function getRandomPosition() {
        const x = Math.floor(Math.random() * (game.clientWidth - 20));
        const y = Math.floor(Math.random() * (game.clientHeight - 20));
        return { x, y };
    }

    function createBug() {
        const bug = document.createElement("div");
        bug.className = "bug";
        bug.innerText = "🦟";
        const { x, y } = getRandomPosition();
        bug.style.left = `${x}px`;
        bug.style.top = `${y}px`;
        game.appendChild(bug);

        bug.addEventListener("click", () => {
            bug.remove();
            score++;
            scoreDisplay.innerText = `Score: ${score}`;

            // Remove the current pun display if it exists
            if (currentPunDisplay) {
                currentPunDisplay.remove();
            }

            // Display random bug pun
            const pun = bugPuns[Math.floor(Math.random() * bugPuns.length)];
            currentPunDisplay = document.createElement("div");
            currentPunDisplay.className = "pun";
            currentPunDisplay.innerText = pun;
            currentPunDisplay.style.position = "absolute";
            currentPunDisplay.style.left = `${x}px`;
            currentPunDisplay.style.top = `${y}px`;
            game.appendChild(currentPunDisplay);
        });


        setTimeout(() => {
            if (game.contains(bug)) {
                bug.remove();
            }
        }, 3000);
    }

    function moveNet(event) {
        const { clientX, clientY } = event;
        const gameRect = game.getBoundingClientRect();
        const x = clientX - gameRect.left;
        const y = clientY - gameRect.top;
        net.style.left = `${x - 10}px`;
        net.style.top = `${y - 10}px`;
    }

    game.addEventListener("mousemove", moveNet);

    setInterval(createBug, 1000);
});
