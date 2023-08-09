const changeColorBtn = document.querySelector('[data-start]');
const stopChangeColorBtn = document.querySelector('[data-stop]');
changeColorBtn.addEventListener('click', changeColor);
stopChangeColorBtn.addEventListener('click', stopChangeColor);
// let intervalId = ();
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let intervalId = setInterval(() => {
  document.body.style.backgroundColor = getRandomHexColor();
}, 1000);
function changeColor() {
  changeColorBtn.disabled = true;
  stopChangeColorBtn.disabled = false;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function stopChangeColor() {
  changeColorBtn.disabled = false;
  stopChangeColorBtn.disabled = true;
  clearInterval(intervalId);
}
