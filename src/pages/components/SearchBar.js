import icon_settings from "../../media/searchbar/searchbox_icon_settings.png"
import icon_micro from "../../media/searchbar/searchbox_icon_micro.png"

export default function Searchbar (props) {
    return (
        <div className="searchbox enable-pointer" role="search" id="searchbox">
            <button className="searchbox__button searchbox__button--settings">
                <img src={icon_settings} />
            </button>

            <input className="searchbox__input" placeholder="Pesquisar" />

            <button className="searchbox__button searchbox__button--microphone">
                <img src={icon_micro} />
            </button>
        </div>
    );
}