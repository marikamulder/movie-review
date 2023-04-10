import { React, useState } from 'react';
import './AddReview.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function AddReview({ onAddReview }) {
    
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('1');
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleFormSubmission = (event) => {
        event.preventDefault();

        if (review === '') {
            setErrorMessage('Enter a review.');
        }
        else {
            onAddReview(review, rating);
            
            setReview('')
            setRating('1');
            setErrorMessage('Review Added!');
        } 
    }

    return (
    <Popup trigger={<button className="reviewButton">Place a review</button>} modal>
        {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          <b>&times;</b>
        </button>
        <div className="header"> Add Review </div>
        <div className="content">
        <form className="formReview" onSubmit={handleFormSubmission}>
            <h2>Add a new review:</h2>

            {errorMessage !== '' && (
                <div>{errorMessage}</div>
            )}
            <div className="formBox">
                <p><label>Review:</label></p>
                    <textarea  className="descriptInput"
                    value={review}
                    onChange={(event) => setReview(event.target.value)}
                    ></textarea>

                <div className="formBottomBox">
                    <label className="selectInput">
                    Rating:
                        <select
                            value={rating}
                            onChange={(event) => setRating(event.target.value)}
                        >
                        <option value={'1'}>1 Star</option>
                        <option value={'2'}>2 Star</option>
                        <option value={'3'}>3 Star</option>
                        <option value={'4'}>4 Star</option>
                        <option value={'5'}>5 Star</option>
                        </select>
                    </label>
                    <button className="closeButton">Add</button>
                </div>
            </div>
        </form>
        </div>
        <div className="actions">
          {/*<button
            className="closeButton"
            onClick={() => {
              close();
            }}
          >
            close modal
          </button>*/}
        </div>
      </div>
    )}
    </Popup>
    )
};

export default AddReview;