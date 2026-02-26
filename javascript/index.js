
const WORDS = [
  'JAVASCRIPT',
  'PROGRAMMING',
  'COMPUTER',
  'KEYBOARD',
  'ALGORITHM',
  'DATABASE',
  'NETWORK',
  'SOFTWARE',
  'DEVELOPER',
  'FUNCTION',
  'VARIABLE',
  'INTERFACE',
  'COMPONENT',
  'FRAMEWORK',
  'APPLICATION',
  'DEBUGGING',
  'TERMINAL',
  'REPOSITORY',
  'ENGINEER',
  'CREATIVE'
];
const scrambledEl = document.getElementById('scrambled');
const letters = document.getElementById("letters")
const answer = document.getElementById("answer")
const checkBtn = document.getElementById("check-btn")
const attempt = document.getElementById("attempt")
const correct = document.getElementById("correct")
const accuracy = document.getElementById("accuracy")
const shuffle = document.getElementById("shuffle-btn")
const hint = document.getElementById("hint")
const skip = document.getElementById("skip")
const reset = document.getElementById("reset")
const answerState = document.getElementById("answer-state")


let attemptCount = 0;
let correctCount = 0;
let currentWord = null;

attempt.textContent = attemptCount;
correct.textContent = correctCount;


// Fisher-Yates Shuffle Algorithm. 
function wordScrambler(word) {
    const chars = word.split('');
    for(let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('')
}


// Display a scrambled word on the page.
function renderScrambledWord() {
    if (WORDS.length === 0) {
        scrambledEl.innerHTML = "<p class='text-2xl font-bold text-white'>Congratulations! You've completed the game.</p>";
        checkBtn.disabled = true;
        shuffle.disabled = true;
        return null;
    }
    scrambledEl.innerHTML = "";

    const randomIndex = Math.floor(Math.random() * WORDS.length);
    currentWord = WORDS[randomIndex];
    hint.textContent = `Hint: ${currentWord[0]}${currentWord[currentWord.length - 1]} - ${currentWord.length} letters`;
    const scrambled = wordScrambler(currentWord);
    const letters = scrambled.split('')
    letters.forEach((letter, index) => {
        setTimeout(() => {
            scrambledEl.innerHTML += `
            <p class="letter bg-white p-4 font-bold rounded-lg text-2xl">
            ${letter}
            </p>
            `

        }, 300 * index);
    })


}


// Check the user's answer and update the score and accuracy.
 checkBtn.addEventListener("click", () => {

    if(!currentWord) return;


    attemptCount++;
    attempt.textContent = attemptCount;

    if(answer.value.toUpperCase() === currentWord) {
        correctCount++;
        correct.textContent = correctCount;
        answerState.src = "images/correct.svg"
        setTimeout(() => {
            answerState.src = ""
        }, 1000);
        const index = WORDS.indexOf(currentWord);
        if (index !== -1) {
            WORDS.splice(index, 1);
        }
        renderScrambledWord();
    }else {

        answerState.src = "images/wrong.svg"
        setTimeout(() => {
            answerState.src = ""
        }, 1000);
        answer.classList.add("border-red-600")
        setTimeout(() => {
            answer.placeholder = "Type your answer here..."
            answer.classList.remove("border-red-600")    
        }, 1000);
        
    }
    accuracy.textContent = `${Math.floor(((correctCount / attemptCount) * 100))}%`;
    answer.value = ""
    
        })


shuffle.addEventListener("click", () => {
    if(!currentWord) return;
    scrambledEl.innerHTML = "";
    const scrambled = wordScrambler(currentWord);
    scrambled.split('').forEach((letter, index) => {
        setTimeout(() => {
            scrambledEl.innerHTML += `
            <p class="bg-white p-4 font-bold rounded-lg text-2xl">
            ${letter}
            </p>
            `
        }, 300 * index);
    })
})

reset.addEventListener("click", () => {
    attemptCount = 0;
    correctCount = 0;
    attempt.textContent = attemptCount;
    correct.textContent = correctCount;
    accuracy.textContent = "0%";
    answer.value = "";
    WORDS.push("SCRAMBLER", "JAVASCRIPT", "PROGRAMMING", "DEVELOPER", "ALGORITHM");
    renderScrambledWord();
})

skip.addEventListener("click", () => {
    if(!currentWord) return;

    const index = WORDS.indexOf(currentWord);
        if (index !== -1) {
            WORDS.splice(index, 1);
        }
        renderScrambledWord();
})


// Start game
renderScrambledWord();



