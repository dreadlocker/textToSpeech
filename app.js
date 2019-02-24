window.onload = function () {
  let voicesArr = [];
  const msg = new SpeechSynthesisUtterance(); // insert text here, so you can hear it
  const voicesContainer = document.getElementById("voicesContainer");
  const rateOption = document.querySelector('[name="rate"]');
  const pitchOption = document.querySelector('[name="pitch"]');
  const textArea = document.getElementById("userText");
  const speakBtn = document.getElementById("speak");
  const stopBtn = document.getElementById("stop");

  function populateVoices() {
    voicesArr.push(...this.getVoices()); // get all voice choices
    voicesContainer.innerHTML += voicesArr // add them in the dropdown
      .map(voice => `<option value="${voice.name}">${voice.name}</option>`)
      .join("");
  }

  function setVoice() {
    msg.voice = voicesArr.find(voice => voice.name === this.value); // change voice type(language)
    speak();
  }

  function speak() {
    speechSynthesis.cancel(); // cancel msg
    msg.text = textArea.value; // get user text, insert it in msg
    speechSynthesis.speak(msg); // speak msg
  }

  function setOptions() {
    this.previousElementSibling.firstElementChild.textContent = this.value; // change label textContent
    msg[this.name] = this.value; // msg[rate] || msg[pitch]
    speak();
  }

  speechSynthesis.addEventListener("voiceschanged", populateVoices); // special event for speechSynthesis
  voicesContainer.addEventListener("change", setVoice);
  rateOption.addEventListener("change", setOptions);
  pitchOption.addEventListener("change", setOptions);
  speakBtn.addEventListener("click", speak);
  stopBtn.addEventListener("click", () => speechSynthesis.cancel());
}