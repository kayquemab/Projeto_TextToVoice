let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector("select");

// Função para popular as vozes
function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    
    if (voices.length > 0) {
        speech.voice = voices[0];
        voiceSelect.innerHTML = '';
        voices.forEach((voice, i) => {
            voiceSelect.options[i] = new Option(voice.name, i);
        });
    }
}

// Carrega vozes quando disponível
window.speechSynthesis.onvoiceschanged = populateVoices;

// Tenta carregar vozes imediatamente (algumas engines já carregam)
populateVoices();

// Fallback: tenta carregar novamente após 1 segundo se não tiver vozes
setTimeout(() => {
    if (voices.length === 0) {
        populateVoices();
    }
}, 1000);

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});