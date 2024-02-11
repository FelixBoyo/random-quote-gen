
document.addEventListener('DOMContentLoaded', function(){
    const url = 'https://type.fit/api/quotes';
    
    async function fetchQuote(){
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data[Math.floor(Math.random() * data.length)]; // Select a random quote from the array
        } catch (error) {
            console.error(error);
        }  
    }
    
    function displayQuote() {
        fetchQuote().then(quote => {
            const quoteTextElement = document.getElementById('quote-text');
            const quoteAuthorElement = document.getElementById('quote-author');
            quoteTextElement.textContent = quote.text; // Access the 'text' property for quote content
            
            // Extract only the author's name before the comma
            let author = quote.author.split(',')[0];
            
            // If author is "type.fit", set it to "Unknown"
            if (author.toLowerCase() === 'type.fit') {
                author = 'Unknown';
            }
            
            quoteAuthorElement.textContent = `- ${author}`; // Display the modified author name
        });
    }
    
    const newQuoteBtn = document.getElementById('new-quote-btn');
    newQuoteBtn.addEventListener('click', displayQuote);
    
    displayQuote();
});

const tweetButton = document.getElementById('tweet-button');
tweetButton.addEventListener('click', function() {

    const quoteText = document.getElementById('quote-text').textContent;
    const quoteAuthor = document.getElementById('quote-author').textContent;

    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quoteText}" - ${quoteAuthor}`)}`;
    
    window.open(tweetURL, '_blank');
});
