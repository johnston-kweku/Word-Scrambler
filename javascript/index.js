const PROGRAMMING = [
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
  'CREATIVE',
  'COMPILER',
  'API',
  'SERVER',
  'ENCRYPTION'
]

const PROGRAMMINGLANGUAGE = [
  'JAVASCRIPT',
  'PYTHON',
  'JAVA',
  'CPLUSPLUS',
  'RUBY',
  'PHP',
  'SWIFT',
  'GOLANG',
  'TYPESCRIPT',
  'KOTLIN',
  'SCALA',
  'RUST',
  'DART',
  'ELIXIR',
  'HASKELL',
]

const FRONTEND = [
  'REACT',
  'VUE',
  'ANGULAR',
  'SVELTE',
  'BOOTSTRAP',
  'TAILWIND',
  'JQUERY',
  'WEBPACK',
  'HOOK',
  'COMPONENT',
  'PROPS',
  'STATE',
  'ROUTER',
]


const COMPUTERHARDWARE = [
    'PROCESSOR',
    'MOTHERBOARD',
    'MONITOR',
    'KEYBOARD',
    'MOUSE',
    'HARDDRIVE',
    'MEMORY',
    'GRAPHICS',
    'BATTERY',
    'PRINTER',
]

const SCIENCE = [
    'PHYSICS',
    'CHEMISTRY',
    'BIOLOGY',
    'ASTRONOMY',
    'GEOLOGY',
    'ECOLOGY',
    'GENETICS',
    'NEUROSCIENCE',
    'MICROBIOLOGY',
    'ZOOLOGY',
    'GRAVITY',
    'ATOM',
    'ENERGY',
    'MOLECULE',
    'EVOLUTION',
    'RADIATION',
    'ECOSYSTEM',
]

const MATHEMATICS = [
    'CALCULUS',
    'GEOMETRY',
    'ALGEBRA',
    'TRIGONOMETRY',
    'STATISTICS',
    'PROBABILITY',
    'VECTOR',
    'MATRIX',
    'INTEGRAL',
    'DERIVATIVE',
]

const COUNTRIES = [
    'GHANA',
    'CANADA',
    'BRAZIL',
    'GERMANY',
    'FRANCE',
    'JAPAN',
    'MEXICO',
    'INDIA',
    'KENYA',
    'ITALY',
]

const ASTROLOGY = [
    'GALAXY',
    'PLANET',
    'ASTEROID',
    'COMET',
    'NEBULA',
    'SATELLITE',
    'ORBIT',
    'TELESCOPE',
    'COSMOS',
    'SUPERNOVA',
]

const SPORTS = [
    'FOOTBALL',
    'BASKETBALL',
    'CRICKET',
    'TENNIS',
    'BASEBALL',
    'GOLF',
    'SWIMMING',
    'CYCLING',
    'RUNNING',
    'BOXING',
]

const BUSINESS = [
    'MARKETING',
    'FINANCE',
    'ENTREPRENEUR',
    'INVESTMENT',
    'STRATEGY',
    'LEADERSHIP',
    'MANAGEMENT',
    'ECONOMICS',
    'INNOVATION',
    'STARTUP',
    'PORTFOLIO',
]





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
const menuBtn = document.getElementById("category-menu")
const showWord = document.getElementById("show-word")
const currentCategory = document.getElementById("current-category")




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

const CATEGORIES = [
    { name: "Programming", words: PROGRAMMING },
    { name: "Programming Languages", words: PROGRAMMINGLANGUAGE },
    { name: "Frontend", words: FRONTEND },
    { name: "Hardware", words: COMPUTERHARDWARE },
    { name: "Science", words: SCIENCE },
    { name: "Sports", words: SPORTS },
    { name: "Business", words: BUSINESS },
    { name: "Astrology", words: ASTROLOGY },
    { name: "Countries", words: COUNTRIES },
    { name: "Mathematics", words: MATHEMATICS },
];

let activeCategory = CATEGORIES[0]; // default category
let activeWords = [...activeCategory.words]
currentCategory.textContent = `Current Category: ${activeCategory.name}`

menuBtn.addEventListener("click", () => {
    let existingMenu = document.querySelector("#category-menu-popup");
    if (existingMenu) {
        existingMenu.remove();
        return;
    }
    
    const menu = document.createElement("div");
    menu.id = "category-menu-popup";
    menu.classList.add("absolute", "top-16", "right-4", "bg-white", "shadow-lg", "rounded-lg", "p-4", "w-48", "z-10");
    menu.innerHTML = `
    <p class="font-bold text-gray-800 mb-2">Select Category</p>
    ${CATEGORIES.map(cat => `<p class="cursor-pointer hover:bg-gray-100 p-2 rounded">${cat.name} - ${cat.words.length} words</p>`).join('')}
    `;
    document.body.appendChild(menu);
    
    menu.querySelectorAll("p").forEach((p, i) => {
        if(i === 0) return; // skip the title
        p.addEventListener("click", () => {
            activeCategory = CATEGORIES[i - 1];
            activeWords = [...activeCategory.words];
            currentCategory.textContent = `Current Category: ${activeCategory.name}`
            
            resetGame();
            menu.remove();
        });
    });
});



// Display a scrambled word on the page.
function renderScrambledWord() {
    if (activeWords.length === 0) {
        scrambledEl.innerHTML = "<p class='text-2xl font-bold text-white'>Congratulations! You've completed the game.</p>";
        checkBtn.disabled = true;
        shuffle.disabled = true;
        return null;
    }
    scrambledEl.innerHTML = "";
    
    const randomIndex = Math.floor(Math.random() * activeWords.length);
    currentWord = activeWords[randomIndex];
    hint.textContent = `Hint: ${currentWord[0]}${currentWord[currentWord.length - 1]} - ${currentWord.length} letters`;
    const scrambled = wordScrambler(currentWord);
    const scrambledLetters = scrambled.split('')
    scrambledLetters.forEach((letter, index) => {
        setTimeout(() => {
            scrambledEl.innerHTML += `
            <p class="letter bg-white p-3 sm:p-4 font-bold rounded-lg text-sm sm:text-2xl">
            ${letter}
            </p>
            `

        }, 150 * index);
    })

    
}


// Check the user's answer and update the score and accuracy.
checkBtn.addEventListener("click", () => {
    
    if(!currentWord) return;
    
    
    attemptCount++;
    attempt.textContent = attemptCount;
    
    if(answer.value.toUpperCase().trim() === currentWord) {
        correctCount++;
        correct.textContent = correctCount;
        answerState.src = "/images/correct.svg"
        setTimeout(() => {
            answerState.src = ""
        }, 2000);
        const index = activeWords.indexOf(currentWord);
        if (index !== -1) {
            activeWords.splice(index, 1);
        }
        renderScrambledWord();
    }else {
        
        answerState.src = "/images/wrong.svg"
        setTimeout(() => {
            answerState.src = ""
        }, 2000);
        answer.classList.add("border-red-600")
        setTimeout(() => {
            answer.placeholder = "Type your answer here..."
            answer.classList.remove("border-red-600")    
        }, 1000);
        
    }
    // Set accuracy
    accuracy.textContent = `${Math.floor(((correctCount / attemptCount) * 100))}%`;
    answer.value = ""
    
})



// Reshuffle the current scrambled word.
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
        }, 150 * index);
    })
})

// Show word
showWord.addEventListener("click", () => {
    currentWord.split().forEach((letter, index) => {
        scrambledEl.innerHTML = "";
        setTimeout(() => {
            scrambledEl.innerHTML += `
           <p class="letter bg-white p-4 font-bold rounded-lg text-sm sm:text-2xl">
           ${letter}
           </p>
           `
        }, 150 * index)
    })
})




// Reset game state and start a new game.
function resetGame() {
    attemptCount = 0;
    correctCount = 0;
    attempt.textContent = attemptCount;
    correct.textContent = correctCount;
    accuracy.textContent = "0%";
    answer.value = "";
    activeWords = [...activeCategory.words];
    checkBtn.disabled = false;
    shuffle.disabled = false;
    renderScrambledWord();
}
reset.addEventListener("click", resetGame)




// Skip current word
skip.addEventListener("click", () => {
    if(!currentWord) return;

    const index = activeWords.indexOf(currentWord);
        if (index !== -1) {
            activeWords.splice(index, 1);
        }
        renderScrambledWord();
})


// Start game
renderScrambledWord();



