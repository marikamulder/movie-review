import React, { useState, useEffect } from "react";
import axios from "axios";
import './Title.css';
import AddReview from '../AddReview/AddReview';
import Reviews from '../Reviews/Reviews';
import { ref, push, set, onValue } from 'firebase/database';
import { database } from '../Database/FirebaseConfig.js';

const Title = () => {

  // Firebase reference
  const db = database;
  const listRef = ref(db, '/reviews');
  const pushRef = push(listRef);

  // State for storing the search term, reviews, and movieId
  const [term, setTerm] = useState("");
  const [reviews, setReviews] = useState([]);
  const [movieId, setMovieId] = useState("");

  // State for storing the search results
  let [results, setResults] = useState([]);

  // Function for handling input change
  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  // Function for handling form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setReviews([]);
    // Call the API with axios
    axios
      .get("https://www.omdbapi.com/?t=" + term + "&apikey=e792af79")
      .then((response) => {
        // Check if there are any results
        if (response.data.Response === "True") {
          // Update the state with the results
          setResults(response.data);
          console.log(response.data);
          setMovieId(response.data.imdbID);
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
        imdbID: results[0].imdbID,
        review: review,
        rating: rating
      }
    ]);

    // Add to Reviews in firebase database
    const data = {id: pushRef.key, imdbID: results[0].imdbID, title: results[0].Title, review: review, rating: rating };
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
                  {/*<p>Reviews: {totalReviews}</p>*/}
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
        )): <p>Unfortunately, no results were found with your search.  Change the search parameters & try again...</p> }
      </div>
    </div>
  );
};

export default Title;