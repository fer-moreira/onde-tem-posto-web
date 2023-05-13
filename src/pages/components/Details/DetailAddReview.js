import React, { useState } from 'react';
import { DetailHeader } from './Details';

import { ReactComponent as StarIcon } from '../../../media/Details/detail_star_svg.svg';
import reviewTexts from '../../../media/review_text_data.json';

export default function DetailAddReview(props) {
    const [selectedIds, setSelectedIds] = useState([]);
    const [maxSelected, setMaxSelected] = useState(0);

    const handleSelectedButtons = (ids) => { setSelectedIds(ids) };

    const handleSelectedStarNumber = (number) => {
        if (number !== maxSelected) {
            setSelectedIds([]);
            setMaxSelected(number);
        }
    }

    return (
        <div className='details__wrapper'>
            <DetailHeader
                data={props.data}
                showRate={false}
                icon={require("../../../media/Details/detail_see_review_icon.png")}
                onClickButton={props.onClickReview}
            />

            <RateSelectionWidget data={props.data} onSelectedStarChange={handleSelectedStarNumber} onSelectedButtonsChange={handleSelectedButtons} />
            <SubmitReview 
                data={props.data} 
                isDisabled={(selectedIds.length === 0) || (maxSelected === 0)} 
                onSubmitReview={() => { console.log(selectedIds); }} 
            />
        </div>
    );
}


function RateSelectionWidget(props) {
    const [starsCount] = useState([1, 2, 3, 4, 5]);
    const [maxSelected, setMaxSelected] = useState(0);
    const [selectedIds, setSelectedIds] = useState([]);


    const handleStarClick = (number) => {
        if (maxSelected !== number) {
            setMaxSelected(number);
            props.onSelectedStarChange(number);

            setSelectedIds([]);
            props.onSelectedButtonsChange([]);
        }
    };

    const handleButtonClick = (buttonId) => {

        var newIds = (
            selectedIds.includes(buttonId) ?
                selectedIds.filter(id => id !== buttonId) :
                [...selectedIds, buttonId]
        );

        setSelectedIds(newIds);
        props.onSelectedButtonsChange(newIds);
    };

    return (
        <>
            <div className="select-stars-container">
                <span className="select-stars-container--label">O que você achou do posto ?</span>
                <div className="select-stars-container__stars">
                    {starsCount.map(id => (
                        <button key={id} className={"star-button " + (maxSelected > id - 1 ? "star-button--selected" : "")}
                            onClick={(e) => { handleStarClick(id) }}
                        >
                            <StarIcon />
                        </button>
                    ))}
                </div>
            </div>
            <div className="divisor"></div>
            {
                maxSelected > 0 ? (
                    <div className="comments-bubble-wrapper">
                        {reviewTexts[maxSelected].map((value) => (
                            <button
                                key={value.id}
                                className={`comments-bubble-wrapper--bubble ${selectedIds.includes(value.id) ? 'selected' : ''}`}
                                onClick={() => handleButtonClick(value.id)}
                            >
                                { value.content }
                            </button>
                        ))}
                    </div>
                ) : (<></>)
            }
        </>
    );
}

function SubmitReview(props) {
    return (
        <div className="submit-review">
            <button className="submit-review--button" disabled={props.isDisabled} onClick={props.onSubmitReview}>Enviar</button>
        </div>
    );
}