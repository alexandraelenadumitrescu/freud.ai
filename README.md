#  Transylvania Blood Network

Welcome to the Transylvania Blood Network — a web experience that fuses vampire lore with real-world awareness about blood donation. Born during a 48h hackathon by a team of beginner developers from Romania, this project is equal parts eerie and educational.

## About the Project

"Saving lives is just a click (and a prick) away!"

This web app simulates a dark and playful world where users can:
- Register as blood donors
- Learn about blood types and transfusion compatibility
- Discover vampire secrets and cravings
- Play mini-games like "Catch Vlad" and "How Much Vampire Are You?"
- Experience a fully animated 3D Transfusion Lab

Inspired by Romanian folklore and gothic aesthetic, we aim to make people more aware of the importance of blood donation, in an unforgettable setting.

## Features

### Donor Registration
- Custom name & blood group
- Generates a themed letter of commitment
- Stores data in browser local storage

### Registered Donors & Inventory
- Displays donor list and current blood group availability

### Secrets & Cravings
- Reveals fun vampire facts
- Shows cravings based on selected blood type

### Games
- Catch Vlad! — Click Vlad before time runs out
- How Much Vampire Are You? — A dark 10-question personality quiz

### 3D Transfusion Lab
An interactive simulation:
1. Extract virtual blood with a syringe
2. Drop blood on anti-sera slides (Anti-A, Anti-B, Anti-Rh)
3. Analyze results to identify blood type
4. Choose the correct blood bag for transfusion

### Transformation Countdown
- Real countdown to the next possible donation (every 2 months)

### Contact Form
- Send a "raven message" — themed contact form with Name, Email, and Message

---

## Technologies Used

- HTML5 / CSS3
- JavaScript (vanilla)
- 3D interaction logic in `blood.js`
- Sound & image assets for full immersion
- No external libraries used — fully custom

---

## Assets & Media

- Background music: `Toccata-and-fugue-in-d-minor.mp3`
- Sound effects:  
  - `evil-laugh-89423.mp3`  
  - `female-vampire-bite-218083.mp3`  
  - `spooky-chimes-359878.mp3`
- Dracula artwork: `Vlad_Tepes_002.jpg`, `dracula.jpeg`
- Stickers and icons for gothic UI

---

## File Structure
index.html        # Main landing page  
game.html         # Catch Vlad! game  
blood.js          # Main logic for site interactivity: sound system, animations, donor system, quiz, games, countdown, and 3D transfusion lab  
blood.css         # Themed CSS  
README.md         # This file  
*.mp3, *.png, *.jpeg  # Sound & image assets  


