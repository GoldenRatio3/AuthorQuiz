import React from "react";
import "./App.css";
import "./bootstrap.min.css";

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}

function Turn({ author, books }) {
  return (
    <div className="row turn" style={{ backgroundColor: "white" }}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorImage" alt="Author" />
      </div>
      <div className="col-6">
        {books.map(title => (
          <Book title={title} key={title} />
        ))}
      </div>
    </div>
  );
}

function Book({ title }) {
  return (
    <div className="answer">
      <h4>{title}</h4>
    </div>
  );
}

function Continue() {
  return <div />;
}

function AuthorQuiz({ turnData }) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...shuffle(turnData)} />
      <Continue />
    </div>
  );
}

function shuffle(a) {
  var books = a.books;
  for (let i = books.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [books[i], books[j]] = [books[j], books[i]];
  }
  return a;
}

export default AuthorQuiz;
