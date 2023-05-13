import LocalizationIcon from '../../media/localization/localization_icon.png';

export default function Localizator(props) {
    return (
        <button className='localizator enable-pointer' onClick={props.locateEvent} >
            <img className='localizator--img' src={LocalizationIcon} alt='' />
        </button>
    );
}