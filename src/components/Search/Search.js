import React, { useState, useEffect } from "react";
import axios from "axios";
import './Search.css';

const Search = () => {
  // State for storing the search term
  const [term, setTerm] = useState("");

  // State for storing the search results
  const [results, setResults] = useState([]);

  // Function for handling input change
  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  // Function for handling form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the API with axios
    axios
      .get(`http://www.omdbapi.com/?s=${term}&apikey=e792af79`)
      .then((response) => {
        // Check if there are any results
        if (response.data.Response === "True") {
          // Update the state with the results
          setResults(response.data.Search);
          console.log(response.data.Search);
          console.log(response.data);
        } else {
          // Handle errors
          alert(response.data.Error);
        }
      })
      .catch((error) => {
        // Handle errors
        console.log(error);
      });
  };

  return (
    <div className="search">
      <h1>Search for movies</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={term} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <div className="results">
        {results ? results.map((result) => (
          <div className="result" key={result.imdbID}>
            <img src={result.Poster} alt={result.Title} />
            <div className="basicDetails">
              <h3>{result.Title}</h3>
              <p>{result.Year}</p>
            </div>
            <a className="detailsButton" href="#">More details</a>
          </div>
        )): <p>Unfortunately, no results were found with your search.  Change the search parameters & try again...</p> }
      </div>
    </div>
  );
};

export default Search;