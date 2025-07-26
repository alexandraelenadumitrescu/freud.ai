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
const soundOnIcon = document.getElementById("sound-on-icon"); // Re-declare for scope within this block if needed, or use global
const soundOffIcon = document.getElementById("sound-off-icon"); // Re-declare for scope within this block if needed, or use global
const batSound = document.getElementById("bat-sound"); // Get the bat sound element again
const chimeSound = document.getElementById("chime-sound"); // Get the chime sound element
const typingSound = document.getElementById("typing-sound"); // Get the typing sound element
const evilLaughSound = document.getElementById("evil-laugh-sound"); // Get evil laugh sound
const wolfHowlSound = document.getElementById("wolf-howl-sound"); // Get wolf howl sound


let isSoundOn = true; // --- IMPORTANT: Initial state: sound ON ---

soundToggleButton.addEventListener("click", () => {
  if (isSoundOn) {
    // --- IMPORTANT: Turn sound OFF (user clicked when sound was ON) ---
    if (batSound) batSound.pause();
    if (chimeSound) chimeSound.pause();
    if (typingSound) typingSound.pause();
    if (evilLaughSound) evilLaughSound.pause();
    if (wolfHowlSound) wolfHowlSound.pause();

    soundOnIcon.style.display = "none"; // Hide sound ON icon
    soundOffIcon.style.display = "block"; // Show sound OFF icon
  } else {
    // --- IMPORTANT: Turn sound ON (user clicked when sound was OFF) ---
    // Only play batSound if it's explicitly the main background sound
    if (batSound) {
      batSound.play().catch((e) => console.error("Audio play failed:", e));
    }
    // You might also want to play other sounds if they were paused
    // if (chimeSound) chimeSound.play().catch((e) => console.error("Chime sound play failed:", e)); // Example
    soundOnIcon.style.display = "block"; // Show sound ON icon
    soundOffIcon.style.display = "none"; // Hide sound OFF icon
  }
  isSoundOn = !isSoundOn; // Toggle the state
});

// Bat animation
const batContainer = document.getElementById("bat-container");

const createBat = () => {
  const bat = document.createElement("img");
  bat.src = "halloween-flying-bat-sticker-u889c-x450.png"; // Make sure this path is correct
  bat.alt = "bat";
  bat.classList.add("bat");
  batContainer.appendChild(bat);

  const startY = Math.random() * (window.innerHeight * 0.8); // 80% of viewport height
  const midY = Math.random() * (window.innerHeight * 0.8);
  const endY = Math.random() * (window.innerHeight * 0.8);
  const duration = Math.random() * 10 + 5; // 5 to 15 seconds
  const direction = Math.random() > 0.5 ? "right" : "left";

  bat.style.setProperty("--startY", `${startY}px`);
  bat.style.setProperty("--midY", `${midY}px`);
  bat.style.setProperty("--endY", `${endY}px`);
  bat.style.animation = `${
    direction === "right" ? "flyToRight" : "flyToLeft"
  } ${duration}s linear forwards`;

  bat.addEventListener("animationend", () => {
    bat.remove();
    createBat(); // Create a new bat when one finishes flying
  });
};

for (let i = 0; i < 5; i++) {
  // Create 5 bats
  createBat();
}

// Mouse Glow Effect
const mouseGlow = document.getElementById("mouse-glow");
document.addEventListener("mousemove", (e) => {
  mouseGlow.style.left = `${e.clientX}px`;
  mouseGlow.style.top = `${e.clientY}px`;
  mouseGlow.style.opacity = 1; // Show glow when mouse moves
});

document.addEventListener("mouseleave", () => {
  mouseGlow.style.opacity = 0; // Hide glow when mouse leaves document
});

// Blood Drip on click
document.addEventListener("click", (e) => {
  const dripSound = document.getElementById("drip-sound");
  if (dripSound && isSoundOn) { // Check if sound is on before playing
    dripSound.currentTime = 0; // Rewind to start
    dripSound.play().catch((e) => console.error("Drip sound play failed:", e));
  }

  const drop = document.createElement("div");
  drop.classList.add("blood-drop");
  drop.style.left = `${e.clientX}px`;
  drop.style.top = `${e.clientY}px`;
  document.body.appendChild(drop);

  drop.addEventListener("animationend", () => {
    drop.remove();
  });
});

// Mist Effect on Scroll
document.addEventListener("scroll", () => {
  const mistOverlay = document.getElementById("mist-overlay");
  // Calculate scroll percentage. Ensure it doesn't exceed 100% or go below 0%.
  const scrollPercentage = Math.min(
    1,
    window.scrollY / (document.body.scrollHeight - window.innerHeight)
  );
  mistOverlay.style.height = `${scrollPercentage * 100}%`;
});

// Local Storage for Donors
let registeredDonors = JSON.parse(localStorage.getItem("donors")) || [];
let bloodInventory = JSON.parse(localStorage.getItem("bloodInventory")) || {};

const saveDonors = () => {
  localStorage.setItem("donors", JSON.stringify(registeredDonors));
};

const saveBloodInventory = () => {
  localStorage.setItem("bloodInventory", JSON.stringify(bloodInventory));
};

const updateDonorList = () => {
  const donorList = document.getElementById("donor-list");
  const noDonorsMessage = document.getElementById("no-donors-message");
  donorList.innerHTML = ""; // Clear existing list

  if (registeredDonors.length === 0) {
    noDonorsMessage.style.display = "block";
  } else {
    noDonorsMessage.style.display = "none";
    registeredDonors.forEach((donor) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${donor.name}</strong> (${donor.group})`;
      donorList.appendChild(listItem);
    });
  }
};

const updateBloodInventory = () => {
  const inventorySummary = document.getElementById("inventory-summary");
  let summaryText = "";
  let isEmpty = true;

  for (const group in bloodInventory) {
    if (bloodInventory[group] > 0) {
      summaryText += `${group}: ${bloodInventory[group]} units<br>`;
      isEmpty = false;
    }
  }

  if (isEmpty) {
    inventorySummary.innerHTML = "No blood data available.";
  } else {
    inventorySummary.innerHTML = summaryText;
  }
};

const clearAllDonors = () => {
  if (confirm("Are you sure you want to clear all donor data?")) {
    registeredDonors = [];
    bloodInventory = {};
    saveDonors();
    saveBloodInventory();
    updateDonorList();
    updateBloodInventory();
    alert("All local donor data has been cleared.");
  }
};

// Modified submitDonor function
const submitDonor = () => {
  const nameInput = document.getElementById("name");
  const groupSelect = document.getElementById("group");
  const outputDiv = document.getElementById("output");
  const donationConfirmationBox = document.getElementById(
    "donation-confirmation-box"
  );
  const letterSection = document.getElementById("letter"); // Get the letter section

  const donorName = nameInput.value.trim();
  const bloodGroup = groupSelect.value;

  if (donorName) {
    const newDonor = { name: donorName, group: bloodGroup };
    registeredDonors.push(newDonor);
    saveDonors();
    updateDonorList();

    // Update blood inventory
    bloodInventory[bloodGroup] = (bloodInventory[bloodGroup] || 0) + 1;
    saveBloodInventory();
    updateBloodInventory();

    // Show "YOU ARE VERY BLOODYLICIOUS" message
    if (chimeSound && isSoundOn) {
      chimeSound.currentTime = 0;
      chimeSound.play().catch((e) => console.error("Chime sound play failed:", e));
    }
    donationConfirmationBox.classList.add("show");
    setTimeout(() => {
      donationConfirmationBox.classList.remove("show");
    }, 4000); // Hide after 4 seconds

    // Construct and display the letter with typing effect
    const letterContent = `Dear ${donorName},\n\nWe extend our deepest gratitude for your generous contribution to the Transylvania Blood Network. Your vital essence flows through our ancient veins, nourishing the very spirit of our land. Your courage is truly admirable, and your donation ensures the continuation of life, both seen and unseen.\n\nMay your nights be long and your dreams... eternal.\n\nWith profound appreciation,\nThe Transylvania Blood Network`;

    outputDiv.innerHTML = ""; // Clear previous content
    let i = 0;
    const typingInterval = 50; // Milliseconds per character

    if (typingSound && isSoundOn) {
      typingSound.currentTime = 0;
      typingSound.play().catch((e) => console.error("Typing sound play failed:", e));
    }

    const typeWriter = () => {
      if (i < letterContent.length) {
        outputDiv.innerHTML += letterContent.charAt(i);
        i++;
        setTimeout(typeWriter, typingInterval);
      } else {
        if (typingSound) typingSound.pause(); // Stop typing sound when done
        outputDiv.classList.remove("typing-cursor");
      }
    };
    outputDiv.classList.add("typing-cursor"); // Add cursor class
    typeWriter();

    // Scroll to the letter section
    letterSection.scrollView({ behavior: "smooth" });

    nameInput.value = ""; // Clear the input field after submission
  } else {
    alert("Please enter your name to become a donor.");
  }
};

// Initialize donor list and blood inventory on page load
document.addEventListener("DOMContentLoaded", () => {
  updateDonorList();
  updateBloodInventory();
});

// Vampire Facts
const vampireFacts = [
  "Vampires are mythical beings who subsist by feeding on the life essence (generally in the form of blood) of living creatures.",
  "The most famous vampire is Count Dracula from Bram Stoker's 1897 novel 'Dracula'.",
  "Vampires are often depicted as immortal, able to transform into bats or mist, and possessing superhuman strength.",
  "Garlic, holy water, sunlight, and a wooden stake through the heart are common weaknesses of vampires.",
  "The word 'vampire' entered the English language in 1734, after a wave of vampire hysteria in Eastern Europe.",
  "Some folklore suggests vampires cannot cross running water or enter a home without an invitation.",
  "The first recorded vampire stories date back to ancient Mesopotamian and Hebrew mythologies.",
  "In some cultures, a 'vampire' could be a revenant, a deceased person returning to harm the living.",
  "The pallid appearance of vampires in folklore might stem from observations of decaying corpses.",
];

const displayRandomVampireFact = () => {
  const factOutput = document.getElementById("vampire-fact-output");
  const randomIndex = Math.floor(Math.random() * vampireFacts.length);
  factOutput.textContent = vampireFacts[randomIndex];
};

// Blood Craving Compatibility
const bloodCravings = {
  "A+": "Craves clarity and intellectual stimulation.",
  "A-": "Desires solitude and deep contemplation.",
  "B+": "Longs for adventure and new experiences.",
  "B-": "Seeks independence and unconventional paths.",
  "AB+": "A balanced hunger for knowledge and connection.",
  "AB-": "A mysterious craving for the unknown and hidden truths.",
  "O+": "Yearns for strength and leadership.",
  "O-": "Pines for universal understanding and ancient power.",
};

const getBloodCraving = () => {
  const cravingGroup = document.getElementById("craving-group").value;
  const cravingOutput = document.getElementById("craving-output");
  cravingOutput.textContent = bloodCravings[cravingGroup];
};

// Catch Vlad Game
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score-display");
const timerDisplay = document.getElementById("timer-display");
const gameStartButton = document.getElementById("game-start-button");
// evilLaughSound and wolfHowlSound are already defined globally

let score = 0;
let timeLeft = 30;
let gameTimer;
let vladInterval;
let isGameRunning = false;

const vladImageSrc = "Vlad_Tepes_002.jpg"; // Make sure you have this image in your project folder

const spawnVlad = () => {
  if (!isGameRunning) return;

  const vlad = document.createElement("img");
  vlad.src = vladImageSrc;
  vlad.alt = "Vlad Tepes";
  vlad.classList.add("game-bat");
  gameArea.appendChild(vlad);

  const maxX = gameArea.clientWidth - vlad.offsetWidth;
  const maxY = gameArea.clientHeight - vlad.offsetHeight;

  // Ensure Vlad is within bounds and not too close to edges
  let randomX = Math.random() * maxX;
  let randomY = Math.random() * maxY;

  // Add a small buffer from edges if necessary
  randomX = Math.max(0, Math.min(randomX, maxX));
  randomY = Math.max(0, Math.min(randomY, maxY));

  vlad.style.left = `${randomX}px`;
  vlad.style.top = `${randomY}px`;

  vlad.onclick = () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    vlad.remove(); // Remove Vlad immediately after being clicked
    if (isSoundOn && wolfHowlSound) {
      wolfHowlSound.currentTime = 0;
      wolfHowlSound.play().catch((e) => console.error("Wolf howl sound play failed:", e));
    }
  };

  // Remove Vlad after a short time if not clicked
  setTimeout(() => {
    if (vlad.parentNode === gameArea) {
      vlad.remove();
    }
  }, 1500); // Vlad stays for 1.5 seconds
};

const startGame = () => {
  score = 0;
  timeLeft = 30;
  isGameRunning = true;
  scoreDisplay.textContent = "Score: 0";
  timerDisplay.textContent = "Time: 30s";
  gameArea.innerHTML = ""; // Clear any existing Vlads
  gameStartButton.disabled = true;
  gameStartButton.classList.add("disabled");
  if (isSoundOn && evilLaughSound) {
    evilLaughSound.currentTime = 0;
    evilLaughSound.play().catch((e) => console.error("Evil laugh sound play failed:", e));
  }

  gameTimer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  vladInterval = setInterval(spawnVlad, 800); // Spawn Vlad every 0.8 seconds
};

const endGame = () => {
  clearInterval(gameTimer);
  clearInterval(vladInterval);
  isGameRunning = false;
  gameStartButton.disabled = false;
  gameStartButton.classList.remove("disabled");
  timerDisplay.textContent = `Time: 0s - Game Over!`;
  alert(`Game Over! Your final score is: ${score}`);
};

gameStartButton.addEventListener("click", startGame);

// Vampire Quiz
const quizQuestions = [
  {
    question: "What is a traditional weakness of vampires?",
    options: ["Sunlight", "Chocolate", "Loud noises", "Warm blankets"],
    answer: "Sunlight",
  },
  {
    question: "Which country is most commonly associated with vampire folklore?",
    options: ["France", "Romania", "Egypt", "Brazil"],
    answer: "Romania",
  },
  {
    question: "What animal is a vampire often depicted transforming into?",
    options: ["Wolf", "Owl", "Bat", "Cat"],
    answer: "Bat",
  },
  {
    question: "What is the name of the famous vampire hunter?",
    options: ["Van Helsing", "Sherlock Holmes", "James Bond", "Indiana Jones"],
    answer: "Van Helsing",
  },
  {
    question: "What does a vampire typically drink?",
    options: ["Water", "Coffee", "Blood", "Milk"],
    answer: "Blood",
  },
  {
    question: "Which of these is NOT a common way to kill a vampire in folklore?",
    options: ["Wooden stake through the heart", "Decapitation", "Silver bullet", "Holy water"],
    answer: "Silver bullet", // Silver bullets are for werewolves
  },
  {
    question: "What time of day are vampires typically most powerful?",
    options: ["Morning", "Noon", "Dusk", "Night"],
    answer: "Night",
  },
  {
    question: "What food is said to repel vampires?",
    options: ["Garlic", "Onions", "Potatoes", "Apples"],
    answer: "Garlic",
  },
  {
    question: "In some legends, what must a vampire be invited to do to enter a home?",
    options: ["Sing a song", "Knock three times", "Be invited", "Bring a gift"],
    answer: "Be invited",
  },
  {
    question: "What famous historical figure is often linked to the Dracula legend?",
    options: ["Vlad the Impaler", "Genghis Khan", "Julius Caesar", "Cleopatra"],
    answer: "Vlad the Impaler",
  },
];

let currentQuestionIndex = 0;
let userAnswers = Array(quizQuestions.length).fill(null); // To store user's selected answers

const quizContainer = document.getElementById("quiz-container");
const quizProgress = document.getElementById("quiz-progress");
const prevQuestionBtn = document.getElementById("prev-question");
const nextQuestionBtn = document.getElementById("next-question");
const submitQuizBtn = document.getElementById("submit-quiz");
const quizResultDiv = document.getElementById("quiz-result");
const resultDescriptionDiv = document.getElementById("result-description");

const loadQuestion = () => {
  const q = quizQuestions[currentQuestionIndex];
  quizContainer.innerHTML = `
        <div class="quiz-question">
            <p>${q.question}</p>
            <div class="quiz-options">
                ${q.options
                  .map(
                    (option) => `
                    <label>
                        <input type="radio" name="question${currentQuestionIndex}" value="${option}"
                            ${userAnswers[currentQuestionIndex] === option ? "checked" : ""}>
                        ${option}
                    </label>
                `
                  )
                  .join("")}
            </div>
        </div>
    `;

  quizProgress.textContent = `Question ${currentQuestionIndex + 1} of ${
    quizQuestions.length
  }`;

  prevQuestionBtn.style.display = currentQuestionIndex === 0 ? "none" : "block";
  nextQuestionBtn.style.display =
    currentQuestionIndex === quizQuestions.length - 1 ? "none" : "block";
  submitQuizBtn.style.display =
    currentQuestionIndex === quizQuestions.length - 1 ? "block" : "none";

  // Add event listeners to radio buttons to save answer immediately
  quizContainer.querySelectorAll(`input[name="question${currentQuestionIndex}"]`).forEach(radio => {
    radio.addEventListener('change', (e) => {
        userAnswers[currentQuestionIndex] = e.target.value;
    });
  });
};

const nextQuestion = () => {
  // Save the current answer before moving
  const selectedOption = document.querySelector(
    `input[name="question${currentQuestionIndex}"]:checked`
  );
  if (selectedOption) {
    userAnswers[currentQuestionIndex] = selectedOption.value;
  }

  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
};

const prevQuestion = () => {
  // Save the current answer before moving back
  const selectedOption = document.querySelector(
    `input[name="question${currentQuestionIndex}"]:checked`
  );
  if (selectedOption) {
    userAnswers[currentQuestionIndex] = selectedOption.value;
  }

  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
};

const submitQuiz = () => {
    // Ensure the last answer is saved
    const selectedOption = document.querySelector(
        `input[name="question${currentQuestionIndex}"]:checked`
    );
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.value;
    }

  let correctAnswers = 0;
  for (let i = 0; i < quizQuestions.length; i++) {
    if (userAnswers[i] === quizQuestions[i].answer) {
      correctAnswers++;
    }
  }

  const scorePercentage = (correctAnswers / quizQuestions.length) * 100;
  let resultText = `You answered ${correctAnswers} out of ${quizQuestions.length} questions correctly.`;
  let descriptionText = "";

  if (scorePercentage >= 90) {
    descriptionText = "You are a true creature of the night! A master vampire!";
  } else if (scorePercentage >= 70) {
    descriptionText = "You have strong vampire tendencies. Beware the sun!";
  } else if (scorePercentage >= 40) {
    descriptionText =
      "You're a human with a peculiar interest in the occult. Keep learning!";
  } else {
    descriptionText = "You're definitely human. Perhaps too much sunlight?";
  }

  quizResultDiv.textContent = resultText;
  resultDescriptionDiv.textContent = descriptionText;
};

// Event listeners for quiz navigation
prevQuestionBtn.addEventListener("click", prevQuestion);
nextQuestionBtn.addEventListener("click", nextQuestion);
submitQuizBtn.addEventListener("click", submitQuiz);

// Load the first question when the page loads
document.addEventListener("DOMContentLoaded", loadQuestion);

// Countdown Timer
const daysSpan = document.getElementById("days");
const hoursSpan = document.getElementById("hours");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");
const countdownMessage = document.getElementById("countdown-message");

let countdownInterval;
let targetDate; // This will be set for the actual countdown

// Demo function for countdown (for testing)
const startDemoCountdown = () => {
  // Set target date to 3 days from now for demonstration
  targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3); // 3 days from now
  targetDate.setHours(targetDate.getHours() + 5); // Plus 5 hours
  targetDate.setMinutes(targetDate.getMinutes() + 10); // Plus 10 minutes
  targetDate.setSeconds(targetDate.getSeconds() + 30); // Plus 30 seconds

  countdownMessage.textContent = "Your transformation countdown has begun...";
  if (countdownInterval) clearInterval(countdownInterval); // Clear any existing interval

  countdownInterval = setInterval(updateCountdown, 1000);
};

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    clearInterval(countdownInterval);
    countdownMessage.textContent = "The blood moon rises! Transformation complete!";
    countdownMessage.classList.add('countdown-finished');
    daysSpan.textContent = "00";
    hoursSpan.textContent = "00";
    minutesSpan.textContent = "00";
    secondsSpan.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysSpan.textContent = String(days).padStart(2, "0");
  hoursSpan.textContent = String(hours).padStart(2, "0");
  minutesSpan.textContent = String(minutes).padStart(2, "0");
  secondsSpan.textContent = String(seconds).padStart(2, "0");
};

// Contact Form
const contactForm = document.getElementById("contact-form");
const contactSuccessMessage = document.getElementById("contact-success-message");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission

  // In a real application, you would send this data to a server
  // For this demo, we'll just show a success message
  contactSuccessMessage.textContent = "Your raven message has been sent!";
  contactSuccessMessage.style.display = "block";

  // Clear the form
  contactForm.reset();

  // Hide the message after a few seconds
  setTimeout(() => {
    contactSuccessMessage.style.display = "none";
  }, 5000);
});
