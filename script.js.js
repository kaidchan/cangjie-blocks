// 倉頡碼字典 (簡化版)
const cjDatabase = {
    "日": "a", "月": "b", "金": "c", "木": "d", "水": "e",
    "火": "f", "土": "g", "竹": "h", "戈": "i", "十": "j",
    "大": "k", "中": "l", "一": "m", "弓": "n", "人": "o",
    "心": "p", "手": "q", "口": "r", "尸": "s", "廿": "t",
    "山": "u", "女": "v", "田": "w", "卜": "y",
    "好": "vnd", "愛": "bbbe", "我": "hqi", "是": "amy"
};

// 遊戲變數
let currentChar, nextChar;
let score = 0;
let lives = 3;
let gameSpeed = 700;
let gameInterval;
const boardWidth = 300;
const boardHeight = 600;

// DOM 元素
const gameBoard = document.getElementById('game-board');
const cjInput = document.getElementById('cj-input');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const nextCharDisplay = document.getElementById('next-char');

// 初始化遊戲
function initGame() {
    score = 0;
    lives = 3;
    updateDisplay();
    generateNewCharacter();
    startCharacterFall();
}

// 生成新字元
function generateNewCharacter() {
    const chars = Object.keys(cjDatabase);
    currentChar = nextChar || chars[Math.floor(Math.random() * chars.length)];
    nextChar = chars[Math.floor(Math.random() * chars.length)];
    nextCharDisplay.textContent = nextChar;
    
    const charElement = document.createElement('div');
    charElement.className = 'character';
    charElement.id = 'falling-char';
    charElement.textContent = currentChar;
    charElement.style.left = `${Math.random() * (boardWidth - 30)}px`;
    charElement.style.top = '0px';
    gameBoard.appendChild(charElement);
}

// 開始字元下落
function startCharacterFall() {
    const charElement = document.getElementById('falling-char');
    let topPos = 0;
    
    gameInterval = setInterval(() => {
        topPos += 10;
        charElement.style.top = `${topPos}px`;
        
        if (topPos >= boardHeight - 30) {
            handleCharacterMissed();
        }
    }, gameSpeed);
}

// 處理輸入
cjInput.addEventListener('input', (e) => {
    if (e.target.value === cjDatabase[currentChar]) {
        handleCorrectInput();
    }
});

// 正確輸入處理
function handleCorrectInput() {
    clearInterval(gameInterval);
    document.getElementById('falling-char').remove();
    score += 10;
    cjInput.value = '';
    updateDisplay();
    generateNewCharacter();
    startCharacterFall();
}

// 更新顯示
function updateDisplay() {
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
}

// 啟動遊戲
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    gameSpeed = parseInt(document.getElementById('speed').value);
    initGame();
});