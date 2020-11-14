import React, { useState, useEffect } from "react";
import Quotes from "./Quotes";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [request, setRequest] = useState("");
  const [quotesArr, setQuotesArr] = useState([]);

  const api = "https://thony-server-api.glitch.me/quotes/";

  const handleSearchInput = (event) => {
    return setSearchInput(event.target.value);
  };

  const randomHandler = (event) => {
    event.preventDefault();
    setRequest(`${api}random`);
  };
  const searchHandler = (event) => {
    event.preventDefault();
    setRequest(`${api}search?term=${searchInput}`);
    setSearchInput("");
  };

  useEffect(() => {
    if (request !== "" || request !== "none") {
      fetch(request)
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            throw new Error(
              `Encountered something unexpected: ${response.status} ${response.statusText}`
            );
          }
        })
        .then((data) => {
          // console.log(data);
          setRequest("none");
          setQuotesArr(data);
        })
        .catch((error) => {
          console.log(`🔥 We got the error ${error} 🔥`);
        });
    }
  }, [request]);

  return (
    <div className="container mt-4">
      <div className="jumbotron text-center mt-4 mb-0">
        <h1 className="display-4">Hello, Quotes World!</h1>
        <p className="lead">Search for amazing inspirational quotes!</p>
        <p className="lead">
          <button className="btn btn-info btn-lg px-4" onClick={randomHandler}>
            Best Random Quote
          </button>
        </p>
      </div>
      <nav className="navbar navbar-light bg-light m-0">
        <form className="form-inline justify-content-center text-center m-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            aria-label="Search"
            placeholder="Term, Author..."
            value={searchInput}
            onChange={handleSearchInput}
          />
          <button
            className="btn btn-outline-info my-2 my-sm-0"
            onClick={searchHandler}
          >
            Search
          </button>
        </form>
      </nav>
      {request && <Quotes quotesArr={quotesArr} />}
    </div>
  );
}

export default App;
