import './Review.css';

function Review(props) {

    return (
        <div className='reviewBox'>
            <h4>{props.review.review}</h4>
            <div className='ratingScore'>
                Rating: {props.review.rating}/5
            </div>
        </div>
    );
}
    
export default Review;