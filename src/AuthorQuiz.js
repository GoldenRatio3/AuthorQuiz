import React from "react";
import "./App.css";
import "./bootstrap.min.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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

function Turn({ author, books, highlight, onAnswerSelected }) {
  function highlightToBgColour(highlight) {
    const mapping = {
      none: "",
      correct: "green",
      wrong: "red"
    };

    return mapping[highlight];
  }

  return (
    <div
      className="row turn"
      style={{ backgroundColor: highlightToBgColour(highlight) }}
    >
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorImage" alt="Author" />
      </div>
      <div className="col-6">
        {books.map(title => (
          <Book title={title} key={title} onClick={onAnswerSelected} />
        ))}
      </div>
    </div>
  );
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

function Book({ title, onClick }) {
  return (
    <div
      className="answer"
      onClick={() => {
        onClick(title);
      }}
    >
      <h4>{title}</h4>
    </div>
  );
}

function Score({ rightAnswerCount, totalAnswerCount }) {
  return (
    <React.Fragment>
      {totalAnswerCount !== 0 && (
        <div className="col-11">
          <div className="float-right score">
            {rightAnswerCount}/{totalAnswerCount}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

function Continue({ show, onContinue }) {
  return (
    <div className="row continue">
      {show ? (
        <div className="col-11">
          <button
            className="btn btn-primary btn-lg float-right"
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">All images are from Google</p>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight,
    rightAnswerCount: state.rightAnswerCount,
    totalAnswerCount: state.totalAnswerCount
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAnswerSelected: answer => {
      dispatch({ type: "ANSWER_SELECTED", answer });
    },
    onContinue: () => {
      dispatch({ type: "CONTINUE" });
    }
  };
}

const AuthorQuiz = connect(
  mapStateToProps,
  mapDispatchToProps
)(function({
  turnData,
  highlight,
  rightAnswerCount,
  totalAnswerCount,
  onAnswerSelected,
  onContinue
}) {
  return (
    <div className="container-fluid">
      <Hero />
      <Score
        rightAnswerCount={rightAnswerCount}
        totalAnswerCount={totalAnswerCount}
      />
      <Turn
        {...turnData}
        highlight={highlight}
        onAnswerSelected={onAnswerSelected}
      />
      <Continue show={highlight === "correct"} onContinue={onContinue} />
      <p>
        <Link to="/add">Add an Author</Link>
      </p>
      <Footer />
    </div>
  );
});

export default AuthorQuiz;
