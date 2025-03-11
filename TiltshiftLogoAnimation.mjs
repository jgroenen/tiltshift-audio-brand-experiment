export default function TiltshiftLogoAnimation(soundMachine) {
    var lastSeconds = 0;

    function bind(clickEl, fn) {
        document.querySelector(clickEl).addEventListener("click", fn);
    }

    function clock() {
        soundMachine.plok();
        const frame = document.querySelector(".blue-frame");
        frame.style.opacity = "1";

        const content = document.querySelector(".content");
        content.style.top = "50%";
        content.style.left = "50%";
        content.style.transform = "translate(-50%, -50%)";
        content.style.textAlign = "center";
        content.style.fontSize = "74px";
        
        updateTime();

        setInterval(() => { updateTime(true); }, 50);
    }

    function updateTime(tik = false) {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        // turn the frame element based on seconds
        if (seconds !== lastSeconds) {
            if (tik) soundMachine.tik();
            let frame = document.querySelector(".blue-frame");
            frame.style.transform = `rotate(${6 + seconds*6}deg) translate(20px, 7px)`;
            lastSeconds = seconds;
            document.querySelector(".content").textContent = seconds.toString().padStart(2, "0");
        }
    }

    function playBuzzAndPing() {
        soundMachine.plok();
        const frame = document.querySelector(".blue-frame");
        frame.style.opacity = "1";

        // Start geluid en animatie pas na de fade-in (1s vertraging)
        setTimeout(() => { startAnimationAndSound(); }, 1000); // Wacht 1 seconde tot de fade-in klaar is
    }

    function startAnimationAndSound() {
        document.querySelector(".tiltshift-animation").style.display = "block";
        document.getElementById("tiltshift-logo").style.display = "none";

        const time = 1300; // Tijd in ms voor de animatie en geluid
        soundMachine.buzz(time);
            
        let frame = document.querySelector(".blue-frame");
        let block = document.querySelector(".red-block");
        let energy = 1;
        let buzzInterval = setInterval(() => {
            energy++;
            let blockEnergyX = (Math.random() - 0.5) * energy;
            let blockEnergyY = (Math.random() - 0.5) * energy;
            let blockEnergyAngle = (Math.random() - 0.5) * energy/2;
            block.style.transform = `translate(${blockEnergyX}px, ${blockEnergyY}px) rotate(${blockEnergyAngle}deg)`;
            let frameEnergyX = (Math.random() - 0.5) * 10 * Math.floor(energy / 10);
            let frameEnergyY = (Math.random() - 0.5) * 7 * Math.floor(energy / 7);
            let frameEnergyAngle = (Math.random() - 0.5) * 6 * Math.floor(energy / 6);
            frame.style.transform = `translate(${frameEnergyX}px, ${frameEnergyY}px) rotate(${frameEnergyAngle}deg)`;
        }, 50);

        setTimeout(() => {
            clearInterval(buzzInterval);

            soundMachine.ping();

            // CSS-versie verbergen, echte logo tonen
            frame.style.transform = "rotate(6deg) translate(20px, 7px)";
            block.style.transform = "rotate(0) translate(0px, 0px)";
            document.querySelector(".tiltshift-animation").style.display = "none";
            document.getElementById("tiltshift-logo").style.display = "block";
        }, time);
    }

    return {
        bind,
        playBuzzAndPing,
        clock
    }
}