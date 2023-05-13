import { DetailHeader } from './Details';

export default function DetailReviews(props) {
    return (
        <>
            {props.data && (
                <div className='details__wrapper'>
                    <DetailHeader 
                        data={props.data}
                        showRate={true}
                        icon={require("../../../media/Details/detail_add_review_icon.png")}
                        onClickButton={props.onClickAddReview}
                    />
                    <div className="divisor"></div>
                    <DetailReviewsList data={props.data} />
                </div>
            )}
        </>
    );
}


function DetailReviewsList(props) {
    return (
        (props.data && props.data.rating) && (
            <ul className="review-list-container">
                <li className="review-list-container--item"><label>Localização inconveniente (12)</label></li>
                <li className="review-list-container--item"><label>Ruim (300)</label></li>
                <li className="review-list-container--item"><label>Localização inconveniente (152)</label></li>
                <li className="review-list-container--item"><label>Localização (132)</label></li>
                <li className="review-list-container--item"><label>Localização inconveniente (32)</label></li>
            </ul>
        )
    );
    
}