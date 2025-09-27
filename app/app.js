let current = INITIAL_CURRENT;
let writingInt = null;
const writingSpeed = 100;
let isRan = false;

function init() {
  console.log(`# of slides: ${SLIDES.length}`);
  current = INITIAL_CURRENT;
  showSlide();
}
function next() {
  console.log('next');
  if(current < SLIDES.length - 1) {
    current++;
  }
  showSlide();
}
function previous() {
  console.log("previous");
  if(current > 0) {
    current--;
  }
  showSlide();
}
function onKeydown(event) {
  if (event.key === "Enter") {
    if (isRan) {
      next();
      return;
    }
    run();
  } else if (event.key === "ArrowRight") {
    next();
  } else if (event.key === "ArrowLeft") {
    previous();
  } else if (event.key === "Escape") {
    init();
  }
}
function write(container, text, speed = writingSpeed, cssClass = "cli") {
  const CLI = document.createElement("div");
  let charIndex = 0;
  container.appendChild(CLI);
  CLI.classList.add(cssClass);

  (function go() {
    if (charIndex < text.length) {
      CLI.textContent += text[charIndex];
      charIndex++;
      writingInt = setTimeout(go, speed);
    } else {
      clearTimeout(writingInt);
      writingInt = null;
    }
  })();
}
function showSlide() {
  console.log(`showSlide ${current}`);
  isRan = false;
  clearTimeout(writingInt);
  document.body.classList.remove('ran');

  const root = $("#app");
  root.innerHTML = '';

  setTimeout(() => {
    write(root, SLIDES[current][0]);
  }, 0);
}
function run() {
  console.log(`run ${current}`);
  const root = $("#app");
  const code = SLIDES[current][0];
  try {
    const result = (new Function(`return ${code}`))();
    write(root, `${result}`, 0, 'result');
    document.body.classList.add('ran');
  } catch(err) {
    console.error(err);
  }
  isRan = true;
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