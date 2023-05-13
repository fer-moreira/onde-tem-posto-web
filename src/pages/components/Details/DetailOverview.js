import { useEffect, useState } from 'react';
import { DetailHeader } from './Details';


export default function DetailOverview(props) {
    return (
        <>
            {props.data && (
                <div className='details__wrapper'>
                    <DetailHeader 
                        data={props.data}
                        showRate={true}
                        icon={require("../../../media/Details/detail_review_icon.png")}
                        onClickButton={props.onClickReview}
                    />
                    <LocationWidget data={props.data} />
                    <PanelsWidget data={props.data} />
                    <PricesWidget data={props.data} />
                </div>
            )}
        </>
    );
}

function LocationWidget(props) {
    return (
        (props.data.location) ? (
            <div className="location-container">
                <label className="location-container--label">Endereço</label>
                <span className="location-container--content">{props.data.location.short}</span>
            </div>
        ) : (
            <h1 style={{ color: 'red' }} >ERROR</h1>
        )
    );
}

function PanelsWidget(props) {
    return (
        (props.data.details) ? (
            <div className="panels">
                <div className="panels--button">
                    <img src={require("../../../media/Details/detail_distance_icon.png")} alt='' />
                    <div className="button-cont">
                        <label className="button-cont--label">Distancia</label>
                        <span className="button-cont--value">{props.data.details.distance} km</span>
                    </div>
                </div>
                <div className="panels--button">
                    <img src={require("../../../media/Details/detail_hour_icon.png")} alt='' />
                    <div className="button-cont">
                        <label className="button-cont--label">Horário</label>
                        <span className="button-cont--value">{props.data.details.active} hrs</span>
                    </div>
                </div>
            </div>
        ) : (
            <h1 style={{ color: 'red' }} >ERROR</h1>
        )
    );
}

function PricesWidget(props) {
    const [selectedFuelID, setSelectedFuelID] = useState(0);
    const [selectedFuel, setSelectedFuel] = useState({});


    const handleToggle = (key) => {
        setSelectedFuelID(key === selectedFuelID ? null : key);

        if (props.data.fuel_types) {
            setSelectedFuel(props.data.fuel_types.find(
                e => (e.key === key)
            ))
        }
    };

    useEffect(() => {
        if (props.data && props.data.fuel_types) {
            setSelectedFuelID(props.data.fuel_types[0].key)
            setSelectedFuel(props.data.fuel_types[0])
        }
    }, [props.data]);


    return (
        (props.data.fuel_types) ? (
            <div className="prices-container">
                <div className="prices-container__types">
                    <label className="prices-container__types--label">Combustíveis disponíveis</label>
                    <div className="prices-container__types--options">
                        {props.data.fuel_types.map(
                            (fuelType) => (
                                <button className={`type-option type-option--${fuelType.key === selectedFuelID ? 'selected' : 'inactive'}`}
                                    onClick={() => handleToggle(fuelType.key)}
                                    key={fuelType.key}
                                >
                                    {fuelType.name}
                                </button>
                            )
                        )}
                    </div>
                </div>
                <div className="prices-container__price">
                    <div className="prices-container__price--content">
                        <label>Preço</label>
                        <span>R$ {selectedFuel.price}/{selectedFuel.prefix}</span>
                    </div>
                    <button className="prices-container__price--routes">
                        <img src={require("../../../media/Details/detail_routes_icon.png")} alt='' />
                        Rotas
                    </button>
                </div>
            </div>
        ) : (
            <h1 style={{ color: 'red' }} >ERROR</h1>
        )
    );
}