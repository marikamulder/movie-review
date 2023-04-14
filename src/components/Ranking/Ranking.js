import React, { useState, useEffect } from "react";
import './Ranking.css';
import { ref, onValue } from 'firebase/database';
import { database } from '../Database/FirebaseConfig.js';

const Ranking = () => {

  // Get database reference
  const db = database;

  // Set global arrays
  const [topReviewed, setTopReviewed] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filteredStarList, setFilteredStarList] = useState([]);
  const [backwardStarList, setBackwardStarList] = useState([]);

  // Get reviews from database
  useEffect(() => {
    
    const dbRef = ref(db, '/reviews');
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      
      // Don't create doubles of items
      const topfound = topReviewed.some(el => el.id === childKey);
        if (!topfound) {
          // Add to topReviewed array
          setTopReviewed((topReviewed) => [ 
              ...topReviewed,
              {
                id: childData.id,
                imdbID: childData.imdbID,
                title: childData.title,
                review: childData.review,
                rating: childData.rating
              }
            ]);
        }
        
        // function to get unique items from an array
        const getUniques = (array, compareProp) => {
          let byId = {};
          let uniques = [];
        
          let i = 0;
          let item = {};
          
          for (i; i < array.length; i++) {
            item = array[i];

            // If the item’s property is already in the byId object, increment its count 
            if (byId[item[compareProp]]) {
              byId[item[compareProp]].count++;
            } else {

              // Otherwise, add it to the byId object and the uniques array with a count of 1 
              byId[item[compareProp]] = item;
              uniques.push(item);
              item.count = 1;
            }
          }
        
          return uniques;
        };

        // Filter duplicate reviews
        let filteredReviews = topReviewed.filter( (ele, ind) => ind === topReviewed.findIndex( elem => elem.reviewid === ele.reviewid && elem.id === ele.id))
        
        // Get unique items based on imdbID and sort by count in descending order
        let sortList = (getUniques(filteredReviews, 'imdbID'));
        sortList.sort((a, b) => b.count - a.count);
        
        // Get only the first three items of the sorted list
        setFilteredList(sortList.slice(0, 3));

        // Calculate the sum and total ammout of each rating
        const basketSum = filteredReviews.reduce((acc, curr) => {
          if (!acc[curr.imdbID]) {
            acc[curr.imdbID] = { ...curr, countInBaskets: 1, sum: parseFloat(curr.rating) };
            return acc;
          }
          acc[curr.imdbID].countInBaskets += 1;
          acc[curr.imdbID].sum += parseFloat(curr.rating);
      
          return acc;
        }, {});
        
        // Calculate the average of each movies rating
        const sortStarList = Object.keys(basketSum).map(imdbID => {
          const item = basketSum[imdbID];

          // Round to decimal place, unless whole number
          const convert = (numberWithDecimal) => String(
            Math.round(numberWithDecimal * 10) / 10 );

          return {
            imdbID: item.imdbID,
            title: item.title,
            averageRate: convert((item.sum / (item.countInBaskets * 5) * 5)),
            countInBaskets: item.countInBaskets,
            sum: item.sum
          };
        });
        
        // Sort the array by average rating in descending order
        sortStarList.sort((a, b) => b.averageRate - a.averageRate);

        // Set filteredStarList to the first three items
        setFilteredStarList(sortStarList.slice(0, 3));

        // Set backwardStarList to the last three items
        setBackwardStarList((sortStarList.slice(sortStarList.length -3, sortStarList.length)).sort((a, b) => a.averageRate - b.averageRate));

      });
      }, { onlyOnce: true });
  }, [topReviewed]);

  return (
    <div className="search">


      <div className="rankResults">
        <div className="rankBackground">
          <div>
            <h2>Top Reviewed Movies</h2>
          </div>
          <div className="rankItems">
            {filteredStarList ? filteredStarList.map((reviewedResult, index) => (
            <div className="podium-item" key={index} style={{ order: index === 0 ? 2 : index === 1 ? 1 : 3, height: index === 0 ? "300px" : index === 1 ? "250px" : "200px", }} >
            <div className="rankInfo">
              <div className="rankingTitles">
                <h5><b>Movie:</b> {reviewedResult.title}</h5>
              </div>
              <div className="rankingCount">
                <h5><b>Average Reviews:</b> {reviewedResult.averageRate}/5</h5>
              </div>
            </div>
            </div>)): null}
          </div>
        </div>
      </div>

      <div className="rankResults">
        <div className="rankBackground">
          <div>
            <h2>Most Reviewed Movies</h2>
          </div>
          <div className="rankItems">
            {filteredList ? filteredList.map((reviewedResult, index) => (
            <div className="podium-item" key={index} style={{ order: index === 0 ? 2 : index === 1 ? 1 : 3, height: index === 0 ? "300px" : index === 1 ? "250px" : "200px", }} >
              <div className="rankInfo">
                <div className="rankingTitles">
                  <h5><b>Movie:</b> {reviewedResult.title}</h5>
                </div>
                <div className="rankingCount">
                  <h5><b>Total Reviews:</b> {reviewedResult.count}</h5>
                </div>
              </div>
            </div>)): null}
          </div>
        </div>
      </div>

      <div className="rankResults">
        <div className="rankBackground">
          <div>
            <h2>Worst Reviewed Movies</h2>
          </div>
          <div className="rankItems">
            {backwardStarList ? backwardStarList.map((reviewedResult, index) => (
            <div className="podium-item" key={index} style={{ order: index === 0 ? 2 : index === 1 ? 1 : 3, height: index === 0 ? "300px" : index === 1 ? "250px" : "200px", }} >
            <div className="rankInfo">
              <div className="rankingTitles">
                <h5><b>Movie:</b> {reviewedResult.title}</h5>
              </div>
              <div className="rankingCount">
                <h5><b>Average Reviews:</b> {reviewedResult.averageRate}/5</h5>
              </div>
            </div>
            </div>)): null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;