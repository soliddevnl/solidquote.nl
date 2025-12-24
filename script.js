let quotes = [];
let currentQuoteIndex = 0;

const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');
const quoteContainer = document.querySelector('.quote-container');

function updatePagination() {
  pageIndicator.textContent = `${currentQuoteIndex + 1}/${quotes.length}`;
}

function displayQuote() {
  const currentQuote = quotes[currentQuoteIndex];
  quoteElement.textContent = `"${currentQuote.text}"`;
  authorElement.textContent = `— ${currentQuote.author}`;
  updatePagination();
}

function nextQuote() {
  // Fade out
  quoteContainer.classList.add('fade-out');

  // Wait for fade out, then change quote and fade in
  setTimeout(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    displayQuote();
    quoteContainer.classList.remove('fade-out');
  }, 300);
}

async function loadQuotes() {
  try {
    const response = await fetch('quotes/daily.json');
    quotes = await response.json();
    displayQuote();
  } catch (error) {
    console.error('Failed to load quotes:', error);
    quoteElement.textContent = 'Failed to load quotes. Please refresh the page.';
  }
}

nextBtn.addEventListener('click', nextQuote);

loadQuotes();
