const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const popup = document.getElementById("popupMsg");

const messages = [
  "Seriously? You're breaking my heart 😭",
  "Okay okay... but think again 🥺",
  "You can’t say no to this much love 💗",
  "It’s destiny calling 📞",
  "You're too cute to reject this 💘",
  "Let's be soulmates 😍"
];

let hoverCount = 0;
let yesSize = 1;
let allowClickNo = false;
let resetProcess = false;

function randomPosition() {
  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 100;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function showPopup(message) {
  popup.innerText = message;
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 3500); // Pop-up stays on screen for 3.5 seconds
}

noBtn.addEventListener("mouseover", () => {
  if (!allowClickNo && !resetProcess) {
    randomPosition();
    hoverCount++;
    const msg = messages[Math.floor(Math.random() * messages.length)];
    showPopup(msg);

    if (hoverCount >= 5) {
      allowClickNo = true;
      noBtn.innerText = "Okay... No 😔";
      showPopup("You can click No... if you really must.");
    }
  }
});

noBtn.addEventListener("click", () => {
  if (allowClickNo) {
    hoverCount = 0;
    allowClickNo = false;
    noBtn.innerText = "No 😢";
    showPopup("Wait... just think about it once more? 😭");
    randomPosition();
    yesSize += 0.5;
    yesBtn.style.transform = `scale(${yesSize})`;

    // Reset process after multiple attempts
    if (yesSize > 5) {
      resetProcess = true;
      yesSize = 1; // Reset yes button size
      yesBtn.style.transform = `scale(${yesSize})`; // Reset yes button size
      allowClickNo = false; // Allow the user to click No again
      noBtn.innerText = "No 😢"; // Reset No button text
      setTimeout(() => {
        resetProcess = false; // Allow the process to restart with a bigger Yes button
      }, 2000); // Allow the reset to happen after 2 seconds
    }
  } else {
    randomPosition();
  }
});

yesBtn.addEventListener("mouseover", () => {
  yesSize += 0.1;
  yesBtn.style.transform = `scale(${yesSize})`;
  if (yesSize > 4) {
    document.body.innerHTML = `<h1 style="color: #28a745; font-size: 2.5rem; padding: 2rem;">Yay! I knew you'd say Yes! 💖</h1>`;
  }
});

yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `<h1 style="color: #28a745; font-size: 2.5rem; padding: 2rem;">Yay! I knew you'd say Yes! 💖</h1>`;
});

// Start with random No button position
randomPosition();
