import { useEffect, useState } from 'react';
import station_detail from "../../../media/station_data.json"

import DetailOverview from './DetailOverview';
import DetailReviews from './DetailReview';
import DetailAddReview from './DetailAddReview';

export default function StationDetails(props) {
    const [currentState, setCurrentState] = useState("DETAIL");
    const [loadingData, setLoadingData] = useState(false);
    const [stationData, setStationData] = useState({});

    useEffect(() => {
        if (props.show) {
            console.log(loadingData);
            setCurrentState("DETAIL");
            setLoadingData(false);
            setStationData(station_detail);
        }
    }, [props.show]);

    return (
        <div className={`detail-container ${props.show ? "enable-pointer show_details" : "disable-pointer hide_details"}`}>
            <div className="navigation">
                <button className="navigation--button" onClick={currentState === 'DETAIL' ? props.backEvent : () => { setCurrentState('DETAIL') }}>
                    <img src={require("../../../media/Details/detail_nav_return_icon.png")} alt='' />
                </button>
                {/* <button className="navigation--button" onClick={props.locateEvent}>
                    <img src={require("../../../media/Details/detail_nav_localize_icon.png")} alt='' />
                </button> */}
            </div>

            <div className="details">
                {currentState === 'DETAIL' && (
                    <DetailOverview
                        data={stationData}
                        onClickReview={() => { setCurrentState("SEE_REVIEWS") }}
                    />
                )}

                {currentState === 'SEE_REVIEWS' && (
                    <DetailReviews
                        data={stationData}
                        onClickAddReview={() => { setCurrentState("ADD_REVIEW") }}
                    />
                )}

                {currentState === 'ADD_REVIEW' && (
                    <DetailAddReview
                        data={stationData}
                        onClickReview={() => { setCurrentState("SEE_REVIEWS") }}
                    />
                )}
            </div>
        </div>
    );
}



export function DetailHeader(props) {
    return (
        (props.data && props.data.rating && props.icon) ? (
            <div className="detail-header">
                <div className="detail-header--title">
                    <div className="title-container">
                        <img className="title-container--img" src={props.data.icon} alt={`station logo for ${props.data.name}`} />
                        <h1 className="title-container--header">{props.data.name}</h1>
                    </div>
                    { props.showRate && (
                            <div className="stars-container">
                                <img className="stars-container--star" src={require("../../../media/Details/detail_star_icon.png")} alt='' />
                                <span className="stars-container--rate">{props.data.rating.stars}</span>
                                <span className="stars-container--total">({props.data.rating.total})</span>
                            </div>
                        )
                    }
                </div>
                <button className="detail-header--button" onClick={props.onClickButton}>
                    <img src={props.icon} alt='' />
                </button>
            </div>
        ) : (
            <h1 style={{ color: 'red' }} >ERROR</h1>
        )
    );
}
