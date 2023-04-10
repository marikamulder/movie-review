import React, { useState } from "react";
import axios from "axios";
import './Title.css';
import AddReview from '../AddReview/AddReview';
import Reviews from '../Reviews/Reviews';

const Title = () => {
  // State for storing the search term
  const [term, setTerm] = useState("");

  const [reviews, setReviews] = useState([]);

  const [totalReviews, setTotalReviews] = useState(0);

  // State for storing the search results
  let [results, setResults] = useState([]);

  // Function for handling input change
  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  // Function for handling form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the API with axios
    axios
      .get("https://www.omdbapi.com/?t=" + term + "&apikey=e792af79")
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
      setReviews([]);
  };

  if (!Array.isArray(results)) {
    results = [results];
  }

  const handleAddReview = (review, rating) => {
    setReviews([
    ...reviews,
      {
        id: results.imdbID,
        review: review,
        rating: rating
      }
    ]);
    /*const data = { id: results.imdbID, review: review, rating: rating };
    /*set(pushRef, data)
      .then(() => {
        console.log('Review successfully added:', results.imdbID);
      })
      .catch((error) => {
        console.log('Error:', error);
      });*/
      setTotalReviews(totalReviews + 1);
  }

  return (
    <div className="search">
      <h1>Search for one specific movie</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={term} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <div className="resultsTitleSearch">
        {results ? results.map((result) => (
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
        )): <p>Unfortunately, no results were found with your search.  Change the search parameters & try again...</p> }
      </div>
    </div>
  );
};

export default Title;