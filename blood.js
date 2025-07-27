// =============================================
// COMPLETE TRANSYLVANIA BLOOD NETWORK CODE
// =============================================

// 1. SOUND MANAGER (for entire site)
const soundManager = {
  sounds: {
    bat: document.getElementById("bat-sound"),
    drip: document.getElementById("drip-sound"),
    chime: document.getElementById("chime-sound"),
    typing: document.getElementById("typing-sound"),
    wolf: document.getElementById("wolf-howl-sound"),
    laugh: document.getElementById("evil-laugh-sound"),
  },
  isSoundOn: false,

  init() {
    const soundToggleButton = document.getElementById("sound-toggle-button");
    soundToggleButton.addEventListener("click", this.toggle.bind(this));
  },

  toggle() {
    this.isSoundOn = !this.isSoundOn;
    document.getElementById("sound-on-icon").style.display = this.isSoundOn
      ? "block"
      : "none";
    document.getElementById("sound-off-icon").style.display = this.isSoundOn
      ? "none"
      : "block";

    if (this.isSoundOn) {
      this.play("bat", 0.3, true);
    } else {
      this.stopAll();
    }
  },

  play(soundName, volume = 1, loop = false) {
    if (!this.isSoundOn || !this.sounds[soundName]) return;
    const sound = this.sounds[soundName];
    sound.volume = volume;
    sound.loop = loop;
    sound.currentTime = 0;
    sound.play().catch((e) => console.error(`Sound error: ${e}`));
  },

  stopAll() {
    Object.values(this.sounds).forEach((sound) => {
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    });
  },
};

// 2. WELCOME OVERLAY
function initWelcomeOverlay() {
  const initialWelcomeOverlay = document.getElementById(
    "initial-welcome-overlay"
  );
  const enterSiteButton = document.getElementById("enter-site-button");

  enterSiteButton.addEventListener("click", () => {
    initialWelcomeOverlay.classList.add("hidden");
    soundManager.play("bat", 0.3, true);
  });
}

// 3. BAT ANIMATION SYSTEM
function initBatAnimation() {
  const batContainer = document.getElementById("bat-container");

  const createBat = () => {
    const bat = document.createElement("img");
    bat.src = "halloween-flying-bat-sticker-u889c-x450.png";
    bat.alt = "bat";
    bat.classList.add("bat");
    batContainer.appendChild(bat);

    const startY = Math.random() * (window.innerHeight * 0.8);
    const midY = Math.random() * (window.innerHeight * 0.8);
    const endY = Math.random() * (window.innerHeight * 0.8);
    const duration = Math.random() * 10 + 5;
    const direction = Math.random() > 0.5 ? "right" : "left";

    bat.style.setProperty("--startY", `${startY}px`);
    bat.style.setProperty("--midY", `${midY}px`);
    bat.style.setProperty("--endY", `${endY}px`);
    bat.style.animation = `${
      direction === "right" ? "flyToRight" : "flyToLeft"
    } ${duration}s linear forwards`;

    bat.addEventListener("animationend", () => {
      bat.remove();
      createBat();
    });
  };

  for (let i = 0; i < 5; i++) {
    createBat();
  }
}

// 4. MOUSE EFFECTS
function initMouseEffects() {
  const mouseGlow = document.getElementById("mouse-glow");
  document.addEventListener("mousemove", (e) => {
    mouseGlow.style.left = `${e.clientX}px`;
    mouseGlow.style.top = `${e.clientY}px`;
    mouseGlow.style.opacity = 1;
  });

  document.addEventListener("mouseleave", () => {
    mouseGlow.style.opacity = 0;
  });
}

// 5. BLOOD DRIP EFFECT
function initBloodDrips() {
  document.addEventListener("click", (e) => {
    soundManager.play("drip");

    const drop = document.createElement("div");
    drop.classList.add("blood-drop");
    drop.style.left = `${e.clientX}px`;
    drop.style.top = `${e.clientY}px`;
    document.body.appendChild(drop);

    drop.addEventListener("animationend", () => {
      drop.remove();
    });
  });
}

// 6. MIST SCROLL EFFECT
function initMistEffect() {
  document.addEventListener("scroll", () => {
    const mistOverlay = document.getElementById("mist-overlay");
    const scrollPercentage = Math.min(
      1,
      window.scrollY / (document.body.scrollHeight - window.innerHeight)
    );
    mistOverlay.style.height = `${scrollPercentage * 100}%`;
  });
}

// 7. DONOR MANAGEMENT SYSTEM
const donorManager = {
  donors: JSON.parse(localStorage.getItem("donors")) || [],
  bloodInventory: JSON.parse(localStorage.getItem("bloodInventory")) || {},

  init() {
    this.updateDonorList();
    this.updateBloodInventory();

    document.getElementById("donate").addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitDonor();
    });

    document.getElementById("clear-donors").addEventListener("click", () => {
      this.clearAllDonors();
    });
  },

  submitDonor() {
    const nameInput = document.getElementById("name");
    const groupSelect = document.getElementById("group");
    const outputDiv = document.getElementById("output");
    const donationConfirmationBox = document.getElementById(
      "donation-confirmation-box"
    );

    const donorName = nameInput.value.trim();
    const bloodGroup = groupSelect.value;

    if (donorName) {
      const newDonor = { name: donorName, group: bloodGroup };
      this.donors.push(newDonor);
      this.saveDonors();
      this.updateDonorList();

      this.bloodInventory[bloodGroup] =
        (this.bloodInventory[bloodGroup] || 0) + 1;
      this.saveBloodInventory();
      this.updateBloodInventory();

      soundManager.play("chime");
      donationConfirmationBox.classList.add("show");
      setTimeout(() => {
        donationConfirmationBox.classList.remove("show");
      }, 4000);

      this.generateLetter(donorName);
      nameInput.value = "";
    } else {
      alert("Please enter your name to become a donor.");
    }
  },

  generateLetter(donorName) {
    const outputDiv = document.getElementById("output");
    const letterContent = `Dear ${donorName},\n\nWe extend our deepest gratitude for your generous contribution to the Transylvania Blood Network. Your vital essence flows through our ancient veins, nourishing the very spirit of our land. Your courage is truly admirable, and your donation ensures the continuation of life, both seen and unseen.\n\nMay your nights be long and your dreams... eternal.\n\nWith profound appreciation,\nThe Transylvania Blood Network`;

    outputDiv.innerHTML = "";
    let i = 0;
    const typingInterval = 50;

    soundManager.play("typing");

    const typeWriter = () => {
      if (i < letterContent.length) {
        outputDiv.innerHTML += letterContent.charAt(i);
        i++;
        setTimeout(typeWriter, typingInterval);
      } else {
        soundManager.sounds.typing.pause();
        outputDiv.classList.remove("typing-cursor");
      }
    };
    outputDiv.classList.add("typing-cursor");
    typeWriter();
  },

  updateDonorList() {
    const donorList = document.getElementById("donor-list");
    const noDonorsMessage = document.getElementById("no-donors-message");
    donorList.innerHTML = "";

    if (this.donors.length === 0) {
      noDonorsMessage.style.display = "block";
    } else {
      noDonorsMessage.style.display = "none";
      this.donors.forEach((donor) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${donor.name}</strong> (${donor.group})`;
        donorList.appendChild(listItem);
      });
    }
  },

  updateBloodInventory() {
    const inventorySummary = document.getElementById("inventory-summary");
    let summaryText = "";
    let isEmpty = true;

    for (const group in this.bloodInventory) {
      if (this.bloodInventory[group] > 0) {
        summaryText += `${group}: ${this.bloodInventory[group]} units<br>`;
        isEmpty = false;
      }
    }

    inventorySummary.innerHTML = isEmpty
      ? "No blood data available."
      : summaryText;
  },

  clearAllDonors() {
    if (confirm("Are you sure you want to clear all donor data?")) {
      this.donors = [];
      this.bloodInventory = {};
      this.saveDonors();
      this.saveBloodInventory();
      this.updateDonorList();
      this.updateBloodInventory();
      alert("All local donor data has been cleared.");
    }
  },

  saveDonors() {
    localStorage.setItem("donors", JSON.stringify(this.donors));
  },

  saveBloodInventory() {
    localStorage.setItem("bloodInventory", JSON.stringify(this.bloodInventory));
  },
};

// 8. VAMPIRE FACTS SYSTEM
function initVampireFacts() {
  const vampireFacts = [
    "Vampires are mythical beings who subsist by feeding on the life essence (generally in the form of blood) of living creatures.",
    "The most famous vampire is Count Dracula from Bram Stoker's 1897 novel 'Dracula'.",
    "Vampires are often depicted as immortal, able to transform into bats or mist, and possessing superhuman strength.",
    "Garlic, holy water, sunlight, and a wooden stake through the heart are common weaknesses of vampires.",
    "The word 'vampire' entered the English language in 1734, after a wave of vampire hysteria in Eastern Europe.",
  ];

  document.getElementById("reveal-fact").addEventListener("click", () => {
    const factOutput = document.getElementById("vampire-fact-output");
    const randomIndex = Math.floor(Math.random() * vampireFacts.length);
    factOutput.textContent = vampireFacts[randomIndex];
  });
}

// 9. BLOOD CRAVINGS SYSTEM
function initBloodCravings() {
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

  document.getElementById("discover-cravings").addEventListener("click", () => {
    const cravingGroup = document.getElementById("craving-group").value;
    const cravingOutput = document.getElementById("craving-output");
    cravingOutput.textContent = bloodCravings[cravingGroup];
  });
}

// 10. VLAD TEPES GAME
function initVladGame() {
  const gameArea = document.getElementById("game-area");
  const scoreDisplay = document.getElementById("score-display");
  const timerDisplay = document.getElementById("timer-display");
  const gameStartButton = document.getElementById("game-start-button");

  let score = 0;
  let timeLeft = 30;
  let gameTimer;
  let vladInterval;
  let isGameRunning = false;

  const spawnVlad = () => {
    if (!isGameRunning) return;

    const vlad = document.createElement("img");
    vlad.src = "Vlad_Tepes_002.jpg";
    vlad.alt = "Vlad Tepes";
    vlad.classList.add("game-bat");
    gameArea.appendChild(vlad);

    const maxX = gameArea.clientWidth - vlad.offsetWidth;
    const maxY = gameArea.clientHeight - vlad.offsetHeight;

    const randomX = Math.max(0, Math.min(Math.random() * maxX, maxX));
    const randomY = Math.max(0, Math.min(Math.random() * maxY, maxY));

    vlad.style.left = `${randomX}px`;
    vlad.style.top = `${randomY}px`;

    vlad.onclick = () => {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      vlad.remove();
      soundManager.play("wolf");
    };

    setTimeout(() => {
      if (vlad.parentNode === gameArea) {
        vlad.remove();
      }
    }, 1500);
  };

  const startGame = () => {
    score = 0;
    timeLeft = 30;
    isGameRunning = true;
    scoreDisplay.textContent = "Score: 0";
    timerDisplay.textContent = "Time: 30s";
    gameArea.innerHTML = "";
    gameStartButton.disabled = true;
    gameStartButton.classList.add("disabled");
    soundManager.play("laugh");

    gameTimer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `Time: ${timeLeft}s`;
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);

    vladInterval = setInterval(spawnVlad, 800);
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
}

// 11. VAMPIRE QUIZ SYSTEM
function initVampireQuiz() {
  const quizQuestions = [
    {
      question: "What is a traditional weakness of vampires?",
      options: ["Sunlight", "Chocolate", "Loud noises", "Warm blankets"],
      answer: "Sunlight",
    },
    {
      question:
        "Which country is most commonly associated with vampire folklore?",
      options: ["France", "Romania", "Egypt", "Brazil"],
      answer: "Romania",
    },
    {
      question: "What animal is a vampire often depicted transforming into?",
      options: ["Wolf", "Owl", "Bat", "Cat"],
      answer: "Bat",
    },
  ];

  let currentQuestionIndex = 0;
  let userAnswers = Array(quizQuestions.length).fill(null);

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
                ${
                  userAnswers[currentQuestionIndex] === option ? "checked" : ""
                }>
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
    prevQuestionBtn.style.display =
      currentQuestionIndex === 0 ? "none" : "block";
    nextQuestionBtn.style.display =
      currentQuestionIndex === quizQuestions.length - 1 ? "none" : "block";
    submitQuizBtn.style.display =
      currentQuestionIndex === quizQuestions.length - 1 ? "block" : "none";

    quizContainer
      .querySelectorAll(`input[name="question${currentQuestionIndex}"]`)
      .forEach((radio) => {
        radio.addEventListener("change", (e) => {
          userAnswers[currentQuestionIndex] = e.target.value;
        });
      });
  };

  const nextQuestion = () => {
    const selectedOption = document.querySelector(
      `input[name="question${currentQuestionIndex}"]:checked`
    );
    if (selectedOption)
      userAnswers[currentQuestionIndex] = selectedOption.value;
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    }
  };

  const prevQuestion = () => {
    const selectedOption = document.querySelector(
      `input[name="question${currentQuestionIndex}"]:checked`
    );
    if (selectedOption)
      userAnswers[currentQuestionIndex] = selectedOption.value;
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadQuestion();
    }
  };

  const submitQuiz = () => {
    const selectedOption = document.querySelector(
      `input[name="question${currentQuestionIndex}"]:checked`
    );
    if (selectedOption)
      userAnswers[currentQuestionIndex] = selectedOption.value;

    let correctAnswers = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
      if (userAnswers[i] === quizQuestions[i].answer) correctAnswers++;
    }

    const scorePercentage = (correctAnswers / quizQuestions.length) * 100;
    let resultText = `You answered ${correctAnswers} out of ${quizQuestions.length} questions correctly.`;
    let descriptionText = "";

    if (scorePercentage >= 90)
      descriptionText =
        "You are a true creature of the night! A master vampire!";
    else if (scorePercentage >= 70)
      descriptionText = "You have strong vampire tendencies. Beware the sun!";
    else if (scorePercentage >= 40)
      descriptionText =
        "You're a human with a peculiar interest in the occult. Keep learning!";
    else
      descriptionText = "You're definitely human. Perhaps too much sunlight?";

    quizResultDiv.textContent = resultText;
    resultDescriptionDiv.textContent = descriptionText;
    soundManager.play("chime");
  };

  prevQuestionBtn.addEventListener("click", prevQuestion);
  nextQuestionBtn.addEventListener("click", nextQuestion);
  submitQuizBtn.addEventListener("click", submitQuiz);
  loadQuestion();
}

// 12. COUNTDOWN TIMER SYSTEM
function initCountdownTimer() {
  const daysSpan = document.getElementById("days");
  const hoursSpan = document.getElementById("hours");
  const minutesSpan = document.getElementById("minutes");
  const secondsSpan = document.getElementById("seconds");
  const countdownMessage = document.getElementById("countdown-message");
  let countdownInterval;

  document.getElementById("start-countdown").addEventListener("click", () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(targetDate.getHours() + 5);
    targetDate.setMinutes(targetDate.getMinutes() + 10);
    targetDate.setSeconds(targetDate.getSeconds() + 30);

    countdownMessage.textContent = "Your transformation countdown has begun...";
    if (countdownInterval) clearInterval(countdownInterval);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(countdownInterval);
        countdownMessage.textContent =
          "The blood moon rises! Transformation complete!";
        countdownMessage.classList.add("countdown-finished");
        daysSpan.textContent = "00";
        hoursSpan.textContent = "00";
        minutesSpan.textContent = "00";
        secondsSpan.textContent = "00";
        soundManager.play("laugh");
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

    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
  });
}

// 13. CONTACT FORM SYSTEM
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const contactSuccessMessage = document.getElementById(
    "contact-success-message"
  );

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactSuccessMessage.textContent = "Your raven message has been sent!";
    contactSuccessMessage.style.display = "block";
    contactForm.reset();
    soundManager.play("chime");

    setTimeout(() => {
      contactSuccessMessage.style.display = "none";
    }, 5000);
  });
}

// 14. TRANSYLVANIA MAP SYSTEM
function initTransylvaniaMap() {
  const mapSection = document.createElement("section");
  mapSection.id = "transylvania-map";
  mapSection.innerHTML = `
    <h2>Blood Donation Centers in Transylvania</h2>
    <div id="map"></div>
    <button class="close-btn" id="close-map">×</button>
  `;
  mapSection.style.display = "none";
  document.body.insertBefore(mapSection, document.querySelector("section"));

  document
    .querySelector('nav a[href="#transylvania-map"]')
    .addEventListener("click", (e) => {
      e.preventDefault();
      if (mapSection.style.display === "none") {
        mapSection.style.display = "block";
        initMap();
      } else {
        mapSection.style.display = "none";
      }
    });

  document.getElementById("close-map").addEventListener("click", () => {
    mapSection.style.display = "none";
  });

  function initMap() {
    const map = L.map("map").setView([46.7712, 23.6236], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const centers = [
      {
        city: "Cluj-Napoca",
        coords: [46.7712, 23.6236],
        details: "Centrul Regional de Transfuzie Sanguină Cluj",
      },
      {
        city: "Târgu Mureș",
        coords: [46.5428, 24.5586],
        details: "Centrul de Transfuzie Mureș",
      },
      {
        city: "Sibiu",
        coords: [45.7928, 24.1521],
        details: "Centrul de Transfuzie Sanguină Sibiu",
      },
    ];

    centers.forEach((center) => {
      L.marker(center.coords)
        .addTo(map)
        .bindPopup(`<strong>${center.city}</strong><br>${center.details}`);
    });
  }
}

// 15. 3D BLOOD LAB SYSTEM
// 1. Adaugă acest cod în fișierul tău JS principal (înlocuiește secțiunea existentă pentru Blood Lab)
// 15. 3D BLOOD LAB SYSTEM
const bloodLab = {
  scene: null,
  camera: null,
  renderer: null,
  syringe: null,
  arm: null,
  isDragging: false,
  raycaster: new THREE.Raycaster(),
  mouse: new THREE.Vector2(),
  currentPatient: 0,
  patients: [
    { bloodType: "A+", position: { x: 0, y: -1.5, z: -3 } },
    { bloodType: "B-", position: { x: 1.5, y: -1.5, z: -3 } },
    { bloodType: "O+", position: { x: -1.5, y: -1.5, z: -3 } },
  ],

  init() {
    // Inițializare scenă Three.js
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);

    // Camera mai apropiată pentru o vizualizare mai bună
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 5);

    // Renderer cu gestionare redimensionare
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(
      document.getElementById("lab-canvas-container").clientWidth,
      document.getElementById("lab-canvas-container").clientHeight
    );
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";
    document
      .getElementById("lab-canvas-container")
      .appendChild(this.renderer.domElement);

    // Lumini îmbunătățite
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    this.scene.add(directionalLight);

    // Creare obiecte 3D
    this.createSyringe();
    this.createArm();
    this.setupControls();
    this.loadCurrentPatient();

    // Gestionare redimensionare fereastră
    window.addEventListener("resize", this.onWindowResize.bind(this));

    // Pornire animație
    this.animate();
  },

  createSyringe() {
    // Seringă mai detaliată
    const geometry = new THREE.CylinderGeometry(0.15, 0.05, 1, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0xdddddd,
      specular: 0x111111,
      shininess: 30,
    });
    this.syringe = new THREE.Mesh(geometry, material);
    this.syringe.position.set(0, 0, 0);
    this.syringe.rotation.x = Math.PI / 2; // Oriconționaliză seringa
    this.scene.add(this.syringe);
  },

  createArm() {
    // Mână mai realistă
    const armGeometry = new THREE.BoxGeometry(1, 0.3, 0.5);
    const handGeometry = new THREE.SphereGeometry(0.4, 32, 32);

    const material = new THREE.MeshPhongMaterial({
      color: 0xffaaaa,
      specular: 0x111111,
      shininess: 10,
    });

    this.arm = new THREE.Group();

    const armPart = new THREE.Mesh(armGeometry, material);
    armPart.position.set(0, -1.5, -3);

    const handPart = new THREE.Mesh(handGeometry, material);
    handPart.position.set(0, -1.5, -2.75);

    this.arm.add(armPart);
    this.arm.add(handPart);
    this.scene.add(this.arm);
  },

  setupControls() {
    const container = this.renderer.domElement;

    container.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.isDragging = true;
      soundManager.play("drip");
    });

    container.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;

      // Calculează poziția mouse-ului în coordonate normalizate (-1 to +1)
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Actualizează poziția seringii
      this.syringe.position.x = this.mouse.x * 3;
      this.syringe.position.y = this.mouse.y * 3;

      // Verifică coliziunea
      if (this.checkCollision()) {
        this.handleSuccessfulCollection();
      }
    });

    container.addEventListener("mouseup", () => {
      this.isDragging = false;
    });

    container.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.isDragging = true;
      soundManager.play("drip");
    });

    container.addEventListener("touchmove", (e) => {
      if (!this.isDragging) return;
      const touch = e.touches[0];

      this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

      this.syringe.position.x = this.mouse.x * 3;
      this.syringe.position.y = this.mouse.y * 3;

      if (this.checkCollision()) {
        this.handleSuccessfulCollection();
      }
    });

    container.addEventListener("touchend", () => {
      this.isDragging = false;
    });
  },

  checkCollision() {
    // Verifică distanța dintre seringă și braț
    const syringePos = new THREE.Vector3();
    this.syringe.getWorldPosition(syringePos);

    const armPos = new THREE.Vector3();
    this.arm.children[0].getWorldPosition(armPos);

    return syringePos.distanceTo(armPos) < 0.8;
  },

  handleSuccessfulCollection() {
    soundManager.play("chime");
    this.showFeedback(true);

    // Actualizează inventarul
    const bloodType = this.patients[this.currentPatient].bloodType;
    let bloodInventory =
      JSON.parse(localStorage.getItem("bloodInventory")) || {};
    bloodInventory[bloodType] = (bloodInventory[bloodType] || 0) + 1;
    localStorage.setItem("bloodInventory", JSON.stringify(bloodInventory));

    // Afișează selecția tipului de sânge
    document.getElementById("blood-type-select").innerHTML = "";
    bloodLab.ALL_BLOOD_TYPES.forEach((type) => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      document.getElementById("blood-type-select").appendChild(option);
    });

    document.getElementById("confirmation-wrapper").classList.remove("hidden");
  },

  showFeedback(isSuccess) {
    const feedback = document.getElementById("final-feedback-overlay");
    feedback.classList.remove("hidden");
    feedback.className = isSuccess ? "success" : "error";

    const text = document.getElementById("final-feedback-text");
    text.textContent = isSuccess ? "Blood Collected!" : "Try Again";
  },

  loadCurrentPatient() {
    const patient = this.patients[this.currentPatient];
    document.getElementById(
      "lab-instructions"
    ).textContent = `Collect blood sample from patient with ${patient.bloodType} blood type`;

    // Poziționează brațul pacientului curent
    this.arm.position.set(
      patient.position.x,
      patient.position.y,
      patient.position.z
    );
  },

  nextPatient() {
    this.currentPatient = (this.currentPatient + 1) % this.patients.length;
    document.getElementById("confirmation-wrapper").classList.add("hidden");
    document.getElementById("final-feedback-overlay").classList.add("hidden");
    this.loadCurrentPatient();
  },

  onWindowResize() {
    this.camera.aspect =
      document.getElementById("lab-canvas-container").clientWidth /
      document.getElementById("lab-canvas-container").clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      document.getElementById("lab-canvas-container").clientWidth,
      document.getElementById("lab-canvas-container").clientHeight
    );
  },

  animate() {
    requestAnimationFrame(() => this.animate());

    // Rotire ușoară a brațului pentru efect mai dinamic
    if (this.arm) {
      this.arm.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
    }

    this.renderer.render(this.scene, this.camera);
  },
};

// 4. Inițializare în codul principal:
document.getElementById("open-lab").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("lab-container").style.display = "block";
  bloodLab.init();
});

document.getElementById("close-lab").addEventListener("click", function () {
  document.getElementById("lab-container").style.display = "none";
  // Opțional: distrugere scenă Three.js pentru eliberare memorie
  if (bloodLab.renderer) {
    bloodLab.renderer.dispose();
  }
});

document
  .getElementById("confirm-type-button")
  .addEventListener("click", function () {
    const selectedType = document.getElementById("blood-type-select").value;
    const patientType = bloodLab.patients[bloodLab.currentPatient].bloodType;

    const isCompatible =
      bloodLab.COMPATIBILITY_MAP[selectedType]?.includes(patientType);

    if (isCompatible) {
      soundManager.play("chime");
      alert(`Correct! ${selectedType} is compatible with ${patientType}`);
    } else {
      soundManager.play("laugh");
      alert(`Incompatible! ${selectedType} cannot donate to ${patientType}`);
    }

    bloodLab.nextPatient();
  });

document
  .getElementById("next-patient-button")
  .addEventListener("click", function () {
    bloodLab.nextPatient();
  });
