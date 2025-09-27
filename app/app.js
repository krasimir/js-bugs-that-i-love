let current = 0;
let writingInt = null;
const writingSpeed = 50;

function init() {
  console.log(`# of bugs: ${BUGS.length}`)
  current = 0;
  showTheBugCase();
}
function next() {
  console.log('next');
  if(current < BUGS.length - 1) {
    current++;
  }
  showTheBugCase();
}
function previous() {
  console.log("previous");
  if(current > 0) {
    current--;
  }
  showTheBugCase();
}
function onKeydown(event) {
  if (event.key === "Enter") {
    run();
  } else if (event.key === "ArrowRight") {
    next();
  } else if (event.key === "ArrowLeft") {
    previous();
  } else if (event.key === "Escape") {
    init();
  }
}
function showTheBugCase() {
  console.log(`showTheBugCase ${current}`);
  const bug = BUGS[current];

  const root = $("#app");
  root.innerHTML = '';

  setTimeout(() => {
    const CLI = document.createElement("div");
    root.adppendChild(CLI);
  }, 0);
}
function run() {
  console.log(`run ${current}`);
  const root = $("#app");
}

window.addEventListener('load', init);
window.addEventListener('keydown', onKeydown);

// utilities ------------------------------------------------------------

function $(selector) {
  return document.querySelector(selector);
}
function $$(selector) {
  return document.querySelectorAll(selector);
}