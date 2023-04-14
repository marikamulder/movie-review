import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './Search.css';
import AddReview from '../AddReview/AddReview';
import Reviews from '../Reviews/Reviews';
import { ref, push, set, onValue } from 'firebase/database';
import { database } from '../Database/FirebaseConfig.js';

const Search = () => {

  // Firebase reference
  const db = database;
  const listRef = ref(db, '/reviews');
  const pushRef = push(listRef);

  // State for storing the search term, movieId, and reviews
  const [term, setTerm] = useState("");
  const [movieId, setMovieId] = useState("");
  const [reviews, setReviews] = useState([]);

  // State for storing the search results
  let [results, setResults] = useState([]);

  const isFirstRender = useRef(true);
  let [showDetails, setShowDetails] = useState(false);


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

  // Adding a new review
  const handleAddReview = (review, rating) => {

    // Add to Reviews array
    setReviews([
    ...reviews,
      {
        id: pushRef.key,
        imdbID: movieId,
        review: review,
        rating: rating
      }
    ]);

    // Add to Reviews in firebase database
    const data = {id: pushRef.key, imdbID: movieId, title: results[0].Title, review: review, rating: rating };
    set(pushRef, data)
      .then(() => {
        console.log('Review successfully added:', pushRef.key);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  // Get reviews from database
  useEffect(() => {
    
    const dbRef = ref(db, '/reviews');
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();

      // Don't create doubles of items
      const found = reviews.some(el => el.id === childKey);
        if (!found) {
          if (movieId !== "undefined") {
            if (movieId === childData.imdbID) {
            // Add to Reviews array
            setReviews((reviews) => [ 
                ...reviews,
                {
                  id: childData.id,
                  imdbID: childData.imdbID,
                  review: childData.review,
                  rating: childData.rating
                }
              ]);
            }
          }
        }
      });
      }, { onlyOnce: true });
  }, [movieId]);

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
                  <p>Reviews: {reviews.length}</p>
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