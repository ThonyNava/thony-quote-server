import React from "react";

const Quotes = (props) => {
  if (props.quotesArr) {
    return props.quotesArr.map((element, i) => {
      return (
        <div key={i}>
          <blockquote className="blockquote text-center border border-info rounded p-4 mt-4">
            <p className="mb-0">{element.quote}</p>
            <footer className="blockquote-footer" />
            <cite title="Source Title"> {element.author}</cite>
          </blockquote>
        </div>
      );
    });
  } else {
    return <p className="text-center">loading...</p>;
  }
};

export default Quotes;
