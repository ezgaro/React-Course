import "./index.css";

function App() {
  return (
    <div className="body">
        <QuoteCard />
        <Button>Prev</Button>
        <Button>Next</Button>
    </div>
  );
}

function QuoteCard() {
  return (
    <div className="quote-container">
      <p>Quote of the day: I love you !</p>
      <div className="author">
        <h4>
          <b>John Doe</b>
        </h4>
      </div>
    </div>
  );
}

function Button({children}) {
  return (
    <button>{children}</button>
  );
}

export default App;
