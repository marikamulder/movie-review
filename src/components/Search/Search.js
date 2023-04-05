import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './Search.css';
import AddReview from '../AddReview/AddReview';
import Reviews from '../Reviews/Reviews';

const Search = () => {
  // State for storing the search term
  const [term, setTerm] = useState("");
  const [movieId, setMovieId] = useState("");

  const [reviews, setReviews] = useState([]);

  const [totalReviews, setTotalReviews] = useState(0);

  const isFirstRender = useRef(true);

  let [showDetails, setShowDetails] = useState(false);

  // State for storing the search results
  let [results, setResults] = useState([]);

  // Function for handling input change
  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  // Function for handling form submit
  const handleSubmit = (e) => {
    setShowDetails(false);
    e.preventDefault();
    // Call the API with axios
    axios
      .get("https://www.omdbapi.com/?s=" + term + "&apikey=e792af79")
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
      setReviews([]);
  };

  // Function for getting the id for more details
  const handleId = (keyId) => {
    setMovieId(keyId);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // return early if initial render
    }

    // Call the API with axios
    if (movieId !== '') {
      axios
      .get("https://www.omdbapi.com/?i=" + movieId + "&apikey=e792af79")
      .then((response) => {
        // Check if there are any results
        if (response.data.Response === "True") {
          // Update the state with the results
          setResults(response.data);
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
      setShowDetails(true);
    }
  }, [movieId]);

  if (!Array.isArray(results)) {
    results = [results];
  }

  const handleAddReview = (review, rating) => {
    setReviews([
    ...reviews,
      {
        id: movieId,
        review: review,
        rating: rating
      }
    ]);
    /*const data = { id: movieId, review: review, rating: rating };
    /*set(pushRef, data)
      .then(() => {
        console.log('Review successfully added:', movieId);
      })
      .catch((error) => {
        console.log('Error:', error);
      });*/
      setTotalReviews(totalReviews + 1);
  }

  return (
    <div className="search">
      <h1>Search for movies</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={term} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <div className="results">
        {showDetails ? results.map((result) => (
          <div className="resultTitleSearch" key={result.imdbID}>
            <div className="fullDetailsTitleSearch">
              <div>
                <img src={result.Poster} alt={result.Title} />
                <div className="basicDetailsTitleSearch">
                  <h3>Title: {result.Title}</h3>
                </div>
                <div className="basicDetailsTitleSearch">
                  <p>Genre: {result.Genre}</p>
                  <p>Length: {result.Runtime}</p>
                </div>
                <div className="basicDetailsTitleSearch">
                  <p>Released: {result.Year}</p>
                  <p>Rating: {result.imdbRating}/10</p>
                </div>
                <div className="basicDetailsTitleSearch">
                  <p>Actors: {result.Actors}</p>
                </div>
              </div>
              <div className="rightTitleSearch">
                <div className="plotTitleSearch">
                  <p>Plot: {result.Plot}</p>
                  <p>Reviews: {totalReviews}</p>
                  <div className="reviewSection">
                    <Reviews
                      reviews={reviews}/>
                  </div>
                </div>
                  <AddReview onAddReview={handleAddReview}/>
              </div>
            </div>
          </div>
        ))
        : null }
        {!showDetails ?  results.map((result) => (
          <div className="result" key={result.imdbID}>
            <div>
              <img src={result.Poster} alt={result.Title} className="posterImg"/>
              <div className="basicDetails">
                <h3>{result.Title}</h3>
                <p>{result.Year}</p>
              </div>
            </div>
            <button className="detailsButton" onClick={() => handleId(result.imdbID)}>More details</button>
          </div>
        )): null }
      </div>
    </div>
  );
};

export default Search;