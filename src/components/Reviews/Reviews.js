import Review from './Review/Review';
import './Reviews.css';

function Reviews({ reviews }) {  
    
    return (
        <div className='listedReviews'>
            {reviews.map(
                (review, index) => (
                    <Review
                    key={index}
                    review={review}
                    />
                )
            )}
        </div>
    );
}
    
export default Reviews;
    