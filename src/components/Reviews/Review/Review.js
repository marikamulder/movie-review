import './Review.css';

function Review(props) {

    return (
        <div className='reviewBox'>
            <h3>{props.review.review}</h3>
            <div className='ratingScore'>
                Rating: {props.review.rating}/5
            </div>
        </div>
    );
}
    
export default Review;