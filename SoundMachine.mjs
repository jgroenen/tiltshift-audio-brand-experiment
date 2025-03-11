export default function SoundMachine() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const volume = 0.5;
    const referenceFrequency = 466.2;

    // Plok-geluid maken (lichte klik)
    function tik() {
        const tikOscillator = audioContext.createOscillator();
        const tikGain = audioContext.createGain();

        tikOscillator.type = "sine"; // Simpele, zachte toon
        tikOscillator.frequency.setValueAtTime(referenceFrequency*4, audioContext.currentTime); // Lage, subtiele toon
        tikGain.gain.setValueAtTime(volume/50, audioContext.currentTime);
        //tikGain.gain.exponentialRampToValueAtTime(volume/100, audioContext.currentTime + 0.05); // Snelle fade-out

        tikOscillator.connect(tikGain);
        tikGain.connect(audioContext.destination);
        tikOscillator.start();
        tikOscillator.stop(audioContext.currentTime + 0.005); // Kort en subtiel
    }

    // Plok-geluid maken (lichte klik)
    function plok() {
        const plokOscillator = audioContext.createOscillator();
        const plokGain = audioContext.createGain();

        plokOscillator.type = "sine"; // Simpele, zachte toon
        plokOscillator.frequency.setValueAtTime(referenceFrequency/4, audioContext.currentTime); // Lage, subtiele toon
        plokGain.gain.setValueAtTime(volume*4, audioContext.currentTime);
        plokGain.gain.exponentialRampToValueAtTime(volume/10, audioContext.currentTime + 0.05); // Snelle fade-out

        plokOscillator.connect(plokGain);
        plokGain.connect(audioContext.destination);
        plokOscillator.start();
        plokOscillator.stop(audioContext.currentTime + 0.05); // Kort en subtiel
    }

    // BUZZ geluid met glijdende toon (Tiiiiiiiilt)
    function buzz(time) {
        const buzzOscillator = audioContext.createOscillator();
        buzzOscillator.type = "sawtooth"; // Ruwere toon, meer magnetron-achtig
        buzzOscillator.frequency.setValueAtTime(referenceFrequency/8, audioContext.currentTime);
        //buzzOscillator.frequency.exponentialRampToValueAtTime(referenceFrequency/2, audioContext.currentTime + 0.5); // Glide omhoog
        
        const buzzGain = audioContext.createGain();
        buzzGain.gain.setValueAtTime(volume/100, audioContext.currentTime);
        buzzGain.gain.exponentialRampToValueAtTime(volume/2, audioContext.currentTime + 0.5);
        
        buzzOscillator.connect(buzzGain);
        buzzGain.connect(audioContext.destination);
        buzzOscillator.start();
        setTimeout(() => { buzzOscillator.stop(); }, time);
    }

    // PING geluid met scherpe frequentiesprong (Shift!)
    function ping() {
        const pingOscillator = audioContext.createOscillator();
        pingOscillator.type = "triangle"; // Zachter, maar duidelijker
        pingOscillator.frequency.setValueAtTime(referenceFrequency*2+40, audioContext.currentTime);
        pingOscillator.frequency.exponentialRampToValueAtTime(referenceFrequency*2+40, audioContext.currentTime + 0.1); // Scherpe shift omhoog

        const pingGain = audioContext.createGain();
        pingGain.gain.setValueAtTime(volume*4, audioContext.currentTime);
        pingGain.gain.exponentialRampToValueAtTime(volume/10, audioContext.currentTime + 0.2);
        pingGain.gain.exponentialRampToValueAtTime(volume/1000, audioContext.currentTime + 0.75);

        pingOscillator.connect(pingGain);
        pingGain.connect(audioContext.destination);
        pingOscillator.start();
        pingOscillator.stop(audioContext.currentTime + 0.75);
    }

    return {
        tik,
        plok,
        buzz,
        ping
    }
}