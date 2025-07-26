// Initial Welcome Overlay
document.addEventListener("DOMContentLoaded", () => {
  const initialWelcomeOverlay = document.getElementById(
    "initial-welcome-overlay"
  );
  const enterSiteButton = document.getElementById("enter-site-button");
  const batSound = document.getElementById("bat-sound"); // Assuming this is your background music

  // --- IMPORTANT MODIFICATION FOR SOUND BUTTON VISIBILITY AND INITIAL SOUND STATE ---
  const soundOnIcon = document.getElementById("sound-on-icon");
  const soundOffIcon = document.getElementById("sound-off-icon");

  // Initial state: sound is ON
  isSoundOn = true; // Set isSoundOn to true globally

  // Ensure that soundOnIcon is visible and soundOffIcon is hidden on initial load
  if (soundOnIcon) soundOnIcon.style.display = "block"; // Show sound ON icon
  if (soundOffIcon) soundOffIcon.style.display = "none"; // Hide sound OFF icon

  // Attempt to play background sound (batSound) immediately on DOM load
  // Modern browsers might still require user interaction, but this is the correct place to try
  if (batSound) {
    batSound.volume = 0.3; // Set initial volume
    batSound.play().catch((e) => {
      console.error("Audio play failed on initial load (might require user interaction):", e);
      // If autoplay fails, hide sound on icon and show sound off icon
      // and set isSoundOn to false, so the user knows sound is off and can click to enable
      if (soundOnIcon) soundOnIcon.style.display = "none";
      if (soundOffIcon) soundOffIcon.style.display = "block";
      isSoundOn = false; // Reflect actual state if autoplay fails
    });
  }
  // --- END OF IMPORTANT MODIFICATION ---


  enterSiteButton.addEventListener("click", () => {
    initialWelcomeOverlay.classList.add("hidden");
    // No need to play batSound here anymore, it's handled on DOMContentLoaded
  });

  // Call the function to start the demo countdown when the DOM is loaded
  startDemoCountdown();
});


// Sound Toggle Button
const soundToggleButton = document.getElementById("sound-toggle-button");
const soundOnIcon = document.getElementById("sound-on-icon");
const soundOffIcon = document.getElementById("sound-off-icon");
const batSound = document.getElementById("bat-sound");
const chimeSound = document.getElementById("chime-sound");
const typingSound = document.getElementById("typing-sound");
const evilLaughSound = document.getElementById("evil-laugh-sound");
const wolfHowlSound = document.getElementById("wolf-howl-sound");

let isSoundOn = true; // Initial state: sound ON

soundToggleButton.addEventListener("click", () => {
  if (isSoundOn) {
    // Turn sound OFF
    if (batSound) batSound.pause();
    if (chimeSound) chimeSound.pause();
    if (typingSound) typingSound.pause();
    if (evilLaughSound) evilLaughSound.pause();
    if (wolfHowlSound) wolfHowlSound.pause();

    if (soundOnIcon) soundOnIcon.style.display = "none";
    if (soundOffIcon) soundOffIcon.style.display = "block";
  } else {
    // Turn sound ON
    if (batSound) batSound.play().catch((e) => console.error("Audio play failed:", e));

    if (soundOnIcon) soundOnIcon.style.display = "block";
    if (soundOffIcon) soundOffIcon.style.display = "none";
  }
  isSoundOn = !isSoundOn; // Toggle the state
});

// Bat animation
const batContainer = document.getElementById("bat-container");
const numBats = 5; // Number of bats

function createBat() {
  const bat = document.createElement("img");
  bat.src = "halloween-flying-bat-sticker-u889c-x450.png"; // Make sure you have this image
  bat.className = "bat";
  batContainer.appendChild(bat);

  const startY = Math.random() * window.innerHeight;
  const endY = Math.random() * window.innerHeight;
  const midY = Math.random() * window.innerHeight; // For more varied paths

  bat.style.setProperty("--startY", `${startY}px`);
  bat.style.setProperty("--endY", `${endY}px`);
  bat.style.setProperty("--midY", `${midY}px`);

  const duration = 10 + Math.random() * 10; // 10-20 seconds
  bat.style.animationDuration = `${duration}s`;
  bat.style.animationIterationCount = "infinite";
  bat.style.left = `${-60}px`; // Start off-screen
  bat.style.top = `${startY}px`;

  // Randomly choose direction
  if (Math.random() > 0.5) {
    bat.style.animationName = "flyToRight";
  } else {
    bat.style.animationName = "flyToLeft";
  }

  // Restart animation when it ends
  bat.addEventListener("animationiteration", () => {
    bat.style.left = Math.random() > 0.5 ? `${-60}px` : `${window.innerWidth}px`;
    bat.style.top = `${Math.random() * window.innerHeight}px`;
    bat.style.animationName = Math.random() > 0.5 ? "flyToRight" : "flyToLeft";
    bat.style.setProperty("--startY", `${Math.random() * window.innerHeight}px`);
    bat.style.setProperty("--endY", `${Math.random() * window.innerHeight}px`);
    bat.style.setProperty("--midY", `${Math.random() * window.innerHeight}px`);
  });
}

for (let i = 0; i < numBats; i++) {
  createBat();
}

// Blood Drip Animation on Mouse Click
document.addEventListener("click", (e) => {
  const drop = document.createElement("div");
  drop.className = "blood-drop";
  drop.style.left = `${e.clientX}px`;
  drop.style.top = `${e.clientY}px`;
  document.body.appendChild(drop);

  if (isSoundOn) {
    const dripSound = document.getElementById("drip-sound");
    if (dripSound) {
      dripSound.currentTime = 0; // Rewind to start
      dripSound.play().catch((e) => console.error("Drip sound play failed:", e));
    }
  }

  drop.addEventListener("animationend", () => {
    drop.remove();
  });
});

// Mist Effect on Scroll
const mistOverlay = document.getElementById("mist-overlay");

window.addEventListener("scroll", () => {
  const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  mistOverlay.style.height = `${scrollPercentage * 100}vh`; // Adjust as needed
  mistOverlay.style.opacity = scrollPercentage * 0.7; // Adjust opacity
});

// Mouse Glow Effect
const mouseGlow = document.getElementById("mouse-glow");

document.addEventListener("mousemove", (e) => {
  mouseGlow.style.left = `${e.clientX}px`;
  mouseGlow.style.top = `${e.clientY}px`;
  mouseGlow.style.opacity = 1;
});

document.addEventListener("mouseleave", () => {
  mouseGlow.style.opacity = 0;
});


// Donor Registration and Letter Generation
const donors = JSON.parse(localStorage.getItem("transylvaniaDonors")) || [];
const bloodInventory = JSON.parse(localStorage.getItem("bloodInventory")) || {};

function updateDonorList() {
  const donorList = document.getElementById("donor-list");
  const noDonorsMessage = document.getElementById("no-donors-message");
  donorList.innerHTML = ""; // Clear existing list

  if (donors.length === 0) {
    noDonorsMessage.style.display = "block";
  } else {
    noDonorsMessage.style.display = "none";
    donors.forEach((donor, index) => {
      const listItem = document.createElement("li");
      listItem.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px dashed #550000;
            `;
      listItem.innerHTML = `
                <span style="color: #f5f5f5;"><i class="fas fa-user-circle" style="color: #e60000; margin-right: 8px;"></i>${donor.name} (${donor.group})</span>
                <button onclick="removeDonor(${index})" style="background-color: #770000; width: auto; padding: 5px 10px; margin-top: 0; font-size: 0.8em;">Remove</button>
            `;
      donorList.appendChild(listItem);
    });
  }
}

function updateBloodInventory() {
  const inventorySummary = document.getElementById("inventory-summary");
  let summaryText = "";
  let hasData = false;

  for (const group in bloodInventory) {
    if (bloodInventory[group] > 0) {
      summaryText += `${group}: ${bloodInventory[group]} units<br>`;
      hasData = true;
    }
  }

  if (!hasData) {
    inventorySummary.textContent = "No blood data available.";
  } else {
    inventorySummary.innerHTML = summaryText;
  }
}

function removeDonor(index) {
  const removedDonorGroup = donors[index].group;
  donors.splice(index, 1);
  localStorage.setItem("transylvaniaDonors", JSON.stringify(donors));

  // Decrease blood count in inventory
  if (bloodInventory[removedDonorGroup]) {
    bloodInventory[removedDonorGroup]--;
    if (bloodInventory[removedDonorGroup] < 0) {
      bloodInventory[removedDonorGroup] = 0; // Prevent negative
    }
    localStorage.setItem("bloodInventory", JSON.stringify(bloodInventory));
  }

  updateDonorList();
  updateBloodInventory();
}

function clearAllDonors() {
  if (confirm("Are you sure you want to clear all registered donors and blood inventory? This action cannot be undone.")) {
    localStorage.removeItem("transylvaniaDonors");
    localStorage.removeItem("bloodInventory");
    donors.length = 0; // Clear the array reference
    for (const group in bloodInventory) {
      delete bloodInventory[group]; // Clear inventory object
    }
    updateDonorList();
    updateBloodInventory();
  }
}

// Function to simulate typing effect
function typeWriterEffect(element, text, speed) {
  let i = 0;
  element.textContent = ""; // Clear existing content
  element.classList.add("typing-cursor"); // Add typing cursor

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      if (isSoundOn) {
        // Play typing sound only if it's not already playing or has finished
        if (typingSound.paused || typingSound.ended) {
          typingSound.currentTime = 0; // Rewind to start
          typingSound.play().catch((e) => console.error("Typing sound play failed:", e));
        }
      }
      setTimeout(type, speed);
    } else {
      element.classList.remove("typing-cursor"); // Remove cursor
      if (typingSound) typingSound.pause(); // Stop typing sound when done
    }
  }
  type();
}


function submitDonor() {
  const nameInput = document.getElementById("name");
  const groupSelect = document.getElementById("group");
  const name = nameInput.value.trim();
  const group = groupSelect.value;
  const outputDiv = document.getElementById("output");
  const letterSection = document.getElementById("letter"); // Get the letter section

  if (name && group) {
    const newDonor = { name: name, group: group };
    donors.push(newDonor);
    localStorage.setItem("transylvaniaDonors", JSON.stringify(donors));

    // Update blood inventory
    bloodInventory[group] = (bloodInventory[group] || 0) + 1;
    localStorage.setItem("bloodInventory", JSON.stringify(bloodInventory));

    updateDonorList();
    updateBloodInventory();

    const letterContent = `Dearest ${name},

The crimson moon beckons, and your generosity resonates through the ancient halls of Transylvania. Your offering of ${group} blood is a vital essence to our network, ensuring the continued vitality of those who dwell in the shadows and light.

Your courage is noted, and your spirit, truly... *bloodylicious*.

We await your next benevolent visit under the shroud of night.

With eternal gratitude and a thirst for more,

Count Vladislaus and The Transylvania Blood Network`;

    typeWriterEffect(outputDiv, letterContent, 50);

    // Show confirmation box
    const confirmationBox = document.getElementById("donation-confirmation-box");
    confirmationBox.classList.add("show");
    setTimeout(() => {
      confirmationBox.classList.remove("show");
    }, 5000); // Hide after 5 seconds

    // Play chime sound
    if (isSoundOn) {
      if (chimeSound) {
        chimeSound.currentTime = 0;
        chimeSound.play().catch((e) => console.error("Chime sound play failed:", e));
      }
    }

    // Scroll to the letter section
    letterSection.scrollIntoView({ behavior: "smooth" });

    // Clear input fields after submission
    nameInput.value = "";
    groupSelect.value = "A+"; // Reset to default
  } else {
    outputDiv.textContent = "Please enter your name and select your blood group to generate your letter.";
  }
}

// Initial load for donor list and inventory
updateDonorList();
updateBloodInventory();


// Transylvanian Secrets & Cravings (Facts & Compatibility)
const vampireFacts = [
  "Vampires are often depicted as having a strong aversion to garlic.",
  "The word 'vampire' first appeared in English in 1734.",
  "Some folklore suggests vampires can only enter a home if invited.",
  "Bram Stoker's Dracula was published in 1897.",
  "In many cultures, a stake through the heart is a traditional way to kill a vampire.",
  "Vampires are typically nocturnal creatures, avoiding sunlight.",
  "The bat is a common animal associated with vampires, due to their nocturnal nature and blood-feeding habits (in some species).",
  "Before the word 'vampire' became popular, creatures like the 'strigoi' (Romania) or 'upyr' (Slavic) were known.",
  "Reflections in mirrors are said to not appear for vampires.",
  "Vlad the Impaler, a historical figure, is often associated with the inspiration for Dracula.",
];

function displayRandomVampireFact() {
  const factOutput = document.getElementById("vampire-fact-output");
  const randomIndex = Math.floor(Math.random() * vampireFacts.length);
  const fact = vampireFacts[randomIndex];
  factOutput.textContent = fact;

  if (isSoundOn) {
    if (chimeSound) {
      chimeSound.currentTime = 0; // Rewind to start
      chimeSound.play().catch((e) => console.error("Chime sound play failed:", e));
    }
  }
}

const bloodCravingCompatibility = {
  "A+": "Craves sophisticated, well-balanced meals. Pairs well with a fine chianti.",
  "A-": "Prefers rare, earthy flavors. A robust, gamey taste will satisfy.",
  "B+": "Enjoys exotic and spicy concoctions. A hint of adventure is key.",
  "B-": "Desires something unique and often misunderstood. A bit of bitterness can be intriguing.",
  "AB+": "An adaptable palate, can enjoy almost anything. Perhaps a touch of metallic tang for variety.",
  "AB-": "A mysterious craving for the unconventional. Hints of the supernatural often accompany this desire.",
  "O+": "A universal hunger for rich, hearty sustenance. Comforting and familiar is often best.",
  "O-": "The most ancient craving, pure and unadulterated. The essence of life itself.",
};

function getBloodCraving() {
  const cravingGroup = document.getElementById("craving-group").value;
  const cravingOutput = document.getElementById("craving-output");
  cravingOutput.textContent = bloodCravingCompatibility[cravingGroup] || "No specific craving known for this type.";

  if (isSoundOn) {
    if (chimeSound) {
      chimeSound.currentTime = 0; // Rewind to start
      chimeSound.play().catch((e) => console.error("Chime sound play failed:", e));
    }
  }
}

// Bat Catcher Game
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score-display");
const timerDisplay = document.getElementById("timer-display");
const gameStartButton = document.getElementById("game-start-button");

let score = 0;
let timeLeft = 30;
let gameInterval;
let batTimeout;
let isGameRunning = false;

function createVlad() {
  if (!isGameRunning) return;

  const vlad = document.createElement("img");
  vlad.src = "Vlad_Tepes_002.jpg"; // Your Vlad image
  vlad.className = "game-bat";
  gameArea.appendChild(vlad);

  const maxX = gameArea.clientWidth - vlad.offsetWidth;
  const maxY = gameArea.clientHeight - vlad.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  vlad.style.left = `${randomX}px`;
  vlad.style.top = `${randomY}px`;

  vlad.addEventListener("click", () => {
    if (isGameRunning) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      vlad.remove(); // Remove clicked Vlad
      clearTimeout(batTimeout); // Clear timeout for current Vlad
      spawnNewVlad(); // Immediately spawn a new one
    }
  });

  // Remove Vlad if not clicked within a time (makes game harder)
  batTimeout = setTimeout(() => {
    if (vlad.parentNode === gameArea) {
      vlad.remove();
      spawnNewVlad(); // Spawn a new one even if not clicked
    }
  }, 1500 - (score * 10)); // Make it faster as score increases, min 500ms
}

function spawnNewVlad() {
  const existingVlad = gameArea.querySelector(".game-bat");
  if (existingVlad) {
    existingVlad.remove();
  }
  createVlad();
}

function startGame() {
  score = 0;
  timeLeft = 30;
  isGameRunning = true;
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time: ${timeLeft}s`;
  gameStartButton.textContent = "Game In Progress...";
  gameStartButton.classList.add("disabled");
  gameStartButton.disabled = true;

  if (isSoundOn && wolfHowlSound) {
    wolfHowlSound.currentTime = 0;
    wolfHowlSound.play().catch((e) => console.error("Wolf howl sound play failed:", e));
  }


  spawnNewVlad();

  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(gameInterval);
  clearTimeout(batTimeout);
  isGameRunning = false;
  gameArea.innerHTML = ""; // Clear any remaining Vlads
  gameStartButton.textContent = "Start Game!";
  gameStartButton.classList.remove("disabled");
  gameStartButton.disabled = false;
  timerDisplay.textContent = `Game Over! Final Score: ${score}`;

  if (isSoundOn && evilLaughSound) {
    evilLaughSound.currentTime = 0;
    evilLaughSound.play().catch((e) => console.error("Evil laugh sound play failed:", e));
  }
}

gameStartButton.addEventListener("click", startGame);


// Contact Form Submission
const contactForm = document.getElementById("contact-form");
const contactSuccessMessage = document.getElementById("contact-success-message");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission

  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const message = document.getElementById("contact-message").value;

  // In a real application, you would send this data to a server
  console.log("Contact Form Submission:");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);

  contactSuccessMessage.textContent = `Thank you, ${name}! Your raven message has been sent to the Count. He will respond in due time... or perhaps, in the dead of night.`;
  contactSuccessMessage.style.display = "block";

  if (isSoundOn && chimeSound) {
    chimeSound.currentTime = 0;
    chimeSound.play().catch((e) => console.error("Chime sound play failed:", e));
  }

  contactForm.reset(); // Clear the form
  setTimeout(() => {
    contactSuccessMessage.style.display = "none";
  }, 7000); // Hide message after 7 seconds
});


// Vampire Quiz
const quizQuestions = [
  {
    question: "What is a common weakness of vampires in folklore?",
    options: ["Sunlight", "Chocolate", "Loud noises", "Bright colors"],
    answer: "Sunlight"
  },
  {
    question: "Which of these is NOT a traditional way to ward off a vampire?",
    options: ["Garlic", "Holy water", "Wooden stake", "Silver bullet"],
    answer: "Silver bullet"
  },
  {
    question: "Where is Transylvania, the setting for many vampire legends?",
    options: ["Romania", "Germany", "Ireland", "Italy"],
    answer: "Romania"
  },
  {
    question: "What animal is often associated with vampires due to its blood-feeding habits?",
    options: ["Wolf", "Bat", "Owl", "Spider"],
    answer: "Bat"
  },
  {
    question: "According to some legends, vampires cannot cross running water unless...",
    options: ["They are carried", "It's moonlight", "They have a human guide", "They are transformed"],
    answer: "They are carried"
  },
  {
    question: "What does the word 'nosferatu' often refer to in vampire lore?",
    options: ["Undead", "Bloodlust", "Shadow creature", "Night dweller"],
    answer: "Undead"
  },
  {
    question: "Which of these is a famous vampire hunter?",
    options: ["Van Helsing", "Sherlock Holmes", "Indiana Jones", "James Bond"],
    answer: "Van Helsing"
  },
  {
    question: "Vampires are typically active during which time of day?",
    options: ["Night", "Morning", "Afternoon", "Dawn"],
    answer: "Night"
  },
  {
    question: "What kind of stake is traditionally used to pierce a vampire's heart?",
    options: ["Oak", "Ash", "Maple", "Cedar"],
    answer: "Ash"
  },
  {
    question: "What is the primary sustenance for a vampire?",
    options: ["Blood", "Human food", "Souls", "Sunlight"],
    answer: "Blood"
  }
];

let currentQuestionIndex = 0;
let userAnswers = [];

const quizContainer = document.getElementById("quiz-container");
const quizResult = document.getElementById("quiz-result");
const resultDescription = document.getElementById("result-description");
const prevQuestionBtn = document.getElementById("prev-question");
const nextQuestionBtn = document.getElementById("next-question");
const submitQuizBtn = document.getElementById("submit-quiz");
const quizProgress = document.getElementById("quiz-progress");


function loadQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  quizContainer.innerHTML = `
        <div class="quiz-question">
            <p>${q.question}</p>
            <div class="quiz-options">
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="question${currentQuestionIndex}" value="${option}" ${userAnswers[currentQuestionIndex] === option ? 'checked' : ''}>
                        ${option}
                    </label>
                `).join('')}
            </div>
        </div>
    `;
  updateNavigationButtons();
  updateQuizProgress();
}

function updateNavigationButtons() {
  prevQuestionBtn.style.display = currentQuestionIndex > 0 ? "block" : "none";
  nextQuestionBtn.style.display = currentQuestionIndex < quizQuestions.length - 1 ? "block" : "none";
  submitQuizBtn.style.display = currentQuestionIndex === quizQuestions.length - 1 ? "block" : "none";
}

function updateQuizProgress() {
  quizProgress.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
}

function collectAnswer() {
  const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
  if (selectedOption) {
    userAnswers[currentQuestionIndex] = selectedOption.value;
  }
}

nextQuestionBtn.addEventListener("click", () => {
  collectAnswer();
  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
});

prevQuestionBtn.addEventListener("click", () => {
  collectAnswer();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
});

submitQuizBtn.addEventListener("click", () => {
  collectAnswer(); // Collect answer for the last question
  let correctAnswers = 0;
  for (let i = 0; i < quizQuestions.length; i++) {
    if (userAnswers[i] === quizQuestions[i].answer) {
      correctAnswers++;
    }
  }

  const scorePercentage = (correctAnswers / quizQuestions.length) * 100;
  quizResult.textContent = `You answered ${correctAnswers} out of ${quizQuestions.length} questions correctly! (${scorePercentage.toFixed(0)}%)`;

  let description = "";
  if (scorePercentage >= 90) {
    description = "You are a true child of the night, a master of vampire lore! Count Dracula would be proud.";
    if (isSoundOn && evilLaughSound) {
      evilLaughSound.currentTime = 0;
      evilLaughSound.play().catch((e) => console.error("Evil laugh sound play failed:", e));
    }
  } else if (scorePercentage >= 70) {
    description = "You possess a good understanding of vampire ways. Perhaps a distant relative of the noble bloodlines?";
  } else if (scorePercentage >= 50) {
    description = "You're learning the ropes of the nocturnal world. Keep exploring the shadows!";
  } else {
    description = "Beware the darkness, young one. Your vampire knowledge needs much more... blood and research!";
  }
  resultDescription.textContent = description;

  // Hide navigation and submit buttons after quiz submission
  prevQuestionBtn.style.display = "none";
  nextQuestionBtn.style.display = "none";
  submitQuizBtn.style.display = "none";

  if (isSoundOn && chimeSound) {
    chimeSound.currentTime = 0;
    chimeSound.play().catch((e) => console.error("Chime sound play failed:", e));
  }
});

loadQuestion(); // Load the first question when the page loads

// Transformation Countdown
const daysSpan = document.getElementById("days");
const hoursSpan = document.getElementById("hours");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");
const countdownMessage = document.getElementById("countdown-message");

let countdownInterval;
let targetDate; // Will be set by startDemoCountdown or a real mechanism

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    clearInterval(countdownInterval);
    countdownMessage.textContent = "The Blood Moon is upon us! Transformation complete!";
    countdownMessage.classList.add("countdown-finished");
    daysSpan.textContent = "00";
    hoursSpan.textContent = "00";
    minutesSpan.textContent = "00";
    secondsSpan.textContent = "00";

    if (isSoundOn && evilLaughSound) {
      evilLaughSound.currentTime = 0;
      evilLaughSound.play().catch((e) => console.error("Evil laugh sound play failed:", e));
    }
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysSpan.textContent = String(days).padStart(2, '0');
  hoursSpan.textContent = String(hours).padStart(2, '0');
  minutesSpan.textContent = String(minutes).padStart(2, '0');
  secondsSpan.textContent = String(seconds).padStart(2, '0');

  countdownMessage.textContent = "Register as a donor to begin your mystical transformation countdown...";
  countdownMessage.classList.remove("countdown-finished");
}

function startDemoCountdown() {
  // Set a target date, e.g., 3 days from now
  const now = new Date();
  targetDate = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000) + (5 * 60 * 1000)); // 3 days and 5 minutes for demo

  clearInterval(countdownInterval); // Clear any existing interval
  countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown(); // Call immediately to avoid 1-second delay
}

// Ensure that startDemoCountdown is called on DOMContentLoaded
// It's already called in the DOMContentLoaded listener at the top of the file.
