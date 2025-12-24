const fs = require('fs');
const path = require('path');

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function selectDailyQuotes(pool, count = 5) {
  const shuffled = shuffle(pool);
  return shuffled.slice(0, count);
}

function readQuotesFromFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeQuotesToFile(filePath, quotes) {
  fs.writeFileSync(filePath, JSON.stringify(quotes, null, 2));
}

function main() {
  const poolPath = path.join(__dirname, 'pool.json');
  const dailyPath = path.join(__dirname, 'daily.json');
  
  const pool = readQuotesFromFile(poolPath);
  const dailyQuotes = selectDailyQuotes(pool);
  
  writeQuotesToFile(dailyPath, dailyQuotes);
  
  console.log('Selected 5 daily quotes:');
  dailyQuotes.forEach((quote, index) => {
    console.log(`${index + 1}. "${quote.text}" - ${quote.author}`);
  });
  
  return dailyQuotes;
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = {
  shuffle,
  selectDailyQuotes,
  readQuotesFromFile,
  writeQuotesToFile,
  main
};