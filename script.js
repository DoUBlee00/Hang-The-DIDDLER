const playNowHeading = document.querySelector('.play-now-heading');

 window.addEventListener('scroll', () => {
  const playNowSection = document.querySelector('#PlayNow');
  const sectionTop = playNowSection.getBoundingClientRect().top;
  const sectionHeight = playNowSection.offsetHeight;
  const windowHeight = window.innerHeight;

   if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
    playNowHeading.classList.add('visible'); 
  } else {
    playNowHeading.classList.remove('visible'); 
  }
});



window.addEventListener('DOMContentLoaded', () => {
   const homeLink = document.querySelector('a[href="#Home"]');
  const playNowLink = document.querySelector('a[href="#PlayNow"]');
  const navLinks = document.querySelectorAll('.nav-elements li a');  

   function resetStyles() {
      navLinks.forEach(link => {
          link.style.textDecoration = '';  
          link.parentElement.style.borderBottom = '';  
      });
  }

   function highlightSection() {
      resetStyles();

       const currentSection = window.location.hash;

       if (currentSection === '#Home') {
          homeLink.parentElement.style.borderBottom = '2px solid white'; 
      } else if (currentSection === '#PlayNow') {
          playNowLink.parentElement.style.borderBottom = '2px solid white';  
      }
  }

   highlightSection();

   window.addEventListener('hashchange', () => {
      highlightSection();
  });
});

const words = ["javascript", "hangman", "website", "programming", "developer"];
const hangmanImages = [
  "images/hangman0.png",
  "images/hangman1.png",
  "images/hangman2.png",
  "images/hangman3.png",
  "images/hangman4.png",
  "images/hangman5.png",
  "images/hangman6.png"
];

let chosenWord = '';
let displayWord = [];
let incorrectGuesses = 0;
let guessedLetters = [];

 function resetGame() {
  incorrectGuesses = 0;
  guessedLetters = [];
  chosenWord = words[Math.floor(Math.random() * words.length)];
  displayWord = Array(chosenWord.length).fill('_');

  document.getElementById('word-display').textContent = displayWord.join(' ');
  document.getElementById('incorrect-guesses').textContent = incorrectGuesses;
  document.getElementById('hangman-image').src = hangmanImages[0];

  const lettersContainer = document.getElementById('letters-container');
  lettersContainer.innerHTML = '';

   for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement('button');
    button.textContent = letter;
    button.onclick = () => makeGuess(letter);
    lettersContainer.appendChild(button);
  }
}

 function makeGuess(letter) {
  if (guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);
  const indices = [];

   for (let i = 0; i < chosenWord.length; i++) {
    if (chosenWord[i].toLowerCase() === letter.toLowerCase()) {
      indices.push(i);
    }
  }

  if (indices.length > 0) {
    indices.forEach(index => {
      displayWord[index] = chosenWord[index];
    });
    document.getElementById('word-display').textContent = displayWord.join(' ');

     if (!displayWord.includes('_')) {
      setTimeout(() => {
        alert('Congratulations! You guessed the word!');
        disableAllButtons();
      }, 100);
    }
  } else {
     incorrectGuesses++;
    document.getElementById('incorrect-guesses').textContent = incorrectGuesses;
    document.getElementById('hangman-image').src = hangmanImages[incorrectGuesses];

     if (incorrectGuesses === 6) {
      setTimeout(() => {
        alert('Game Over! The word was: ' + chosenWord);
        disableAllButtons();
      }, 100);
    }
  }
}

 function disableAllButtons() {
  const buttons = document.querySelectorAll('#letters-container button');
  buttons.forEach(button => button.disabled = true);
}

 resetGame();

 document.getElementById('reset-button').addEventListener('click', resetGame);


 const raysist = document.getElementById('raysist');

 const message = document.createElement('div');
message.textContent = 'This mf did nothing on this project tho';
message.style.position = 'absolute';
message.style.backgroundColor = 'white';
message.style.color = 'black';
message.style.padding = '5px';
message.style.borderRadius = '0px';  
message.style.visibility = 'hidden';  
message.style.opacity = '0';  
message.style.transition = 'opacity 0.3s ease, transform 0.3s ease';  
message.style.transform = 'translateY(10px)';  

 document.body.appendChild(message);

 raysist.addEventListener('mouseenter', () => {
   const rect = raysist.getBoundingClientRect();
  message.style.left = `${rect.left + rect.width / 2 - message.offsetWidth / 2}px`;  
  message.style.top = `${rect.top - message.offsetHeight - 10}px`;  
  message.style.visibility = 'visible';
  message.style.opacity = '1';  
  message.style.transform = 'translateY(0)'; 
});

raysist.addEventListener('mouseleave', () => {
   message.style.visibility = 'hidden';
  message.style.opacity = '0';  
  message.style.transform = 'translateY(10px)'; 
});

