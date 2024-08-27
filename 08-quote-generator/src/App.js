import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  return (
    <div className="body">
      <QuoteCard currentQuoteIndex={currentQuoteIndex} />
      <Button onClick={() => setCurrentQuoteIndex((c) => c - 1)}>Prev</Button>
      <Button onClick={() => setCurrentQuoteIndex((c) => c + 1)}>Next</Button>
    </div>
  );
}

function QuoteCard({ currentQuoteIndex }) {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("/quotes.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setQuotes(data.quotes);
      })
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error)
      );
  }, []);

  if (quotes.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div className="quote-container">
      <p>Quote of the day: {currentQuote.quote}</p>
      <div className="author">
        <h4>
          <b>{currentQuote.author}</b>
        </h4>
      </div>
    </div>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

export default App;
