import React, { Component } from 'react';
import { translate } from 'react-i18next';
import style from './style.styl';

import {Navbar, Dropdowns, Buttons, Stars} from 'butter-base-components';
import {StateMenu} from 'butter-component-menu';
import ActionBar from './components/action-bar';

let {Dropdown} = Dropdowns
let {Button} = Buttons

let CloseButton = (props) => (props)
let goBack = () => ('/')

let ToolBar = ({}) => (
    <div>
        <Button title="Add to Bookmarks" icon="favorite"/>
        <Button title="Seen" icon="visibility"/>
        <Button title="Seen" icon="visibility"/>
        <Button title="Seen" icon="visibility"/>
    </div>
)

let LegendedButton = ({children, title}) => (
    <div>
        {children}
        <span>{title}</span>
    </div>
)

let PlayButton = () => (
    <i style={{fontSize: '2vw', margin: 'auto'}} className='material-icons'>play_arrow</i>
)

let PlayButtons = ({type, torrents, subtitles, ...props}) => (
    <div className={style.playbuttons}>
        <LegendedButton title={`Play ${type}`}><Button title={<PlayButton/>} /></LegendedButton>
        <LegendedButton title="Subtitles"><Dropdown options={Object.keys(subtitles)}/></LegendedButton>
        <LegendedButton title="Quality"><Dropdown options={Object.keys(torrents)}/></LegendedButton>

        <LegendedButton title="Streamer"><Dropdown options={['butter', 'vlc', 'mpv']}/> </LegendedButton>
    </div>
)

let InfoBar = ({year, runtime, genres, rating, ...props}) => (
    <div className={style.info} className={style["infobar"]}>
        <span>
            {year}
        </span>
        <span>
            {runtime} mins
        </span>
        <span>
            {genres[0]}
        </span>
        <span>
            <Stars rating={rating}/>
        </span>
    </div>
)

const EpisodeSelector = ({items = {episodes: []}}) => (
    <ul className={style["episodes"]}>
        {items.episodes.map(({img, title, markers = {}}, key) => (
            <li className={Object.keys(markers).join(' ')} key={key}>
                <div>
                    <img src={img}/>
                    <h2>{key} - {title}</h2>
                </div>
            </li>
        ))}
    </ul>
)

const SeasonSelector = ({seasons}) => (
    <div className={style["selector"]}>
        <StateMenu items={seasons} child={EpisodeSelector}/>
    </div>
)

let ContentDetails = ({title, synopsis, cover, backdrop, episodes, ...props}) => (
    <div>
        <div className={style["backdrop"]} style={{backgroundImage: `url(${backdrop})`}}></div>
        <div className={style.detail}>
            <Navbar goBack={goBack} right={<ToolBar/>}/>
            <div className={style["container"]}>
                <div className={style["info"]}>
                    <h1>{title}</h1>
                    <InfoBar {...props}/>
                    <p className="synopsis"> {synopsis} </p>
                    <PlayButtons {...props}/>
                </div>
                <div className={style["cover"]}>
                    <img src={cover}/>
                </div>
                {seasons ? <SeasonSelector seasons={seasons}/> : null}
            </div>
        </div>
    </div>
)

ContentDetails.defaultProps = {
    subtitles: {none: null},
    torrents: {Unknown: null},
    genres: ['none'],
    episodes: [{
        img: "http://www.cap-that.com/bloodties/101/images/101_cap013.jpg",
        title: 'Words To live By',
        markers: {seen: true}
    }, {
        img: "http://www.cap-that.com/bloodties/102/images/102_cap013.jpg",
        title: "The Science Of Superstitions",
        seen:true
    }, {
        img: "http://www.cap-that.com/bloodties/103/images/103_cap013.jpg",
        title: 'Philosophy As A Science',
        markers: {seen: true, active: true},
    }, {
        img: "http://www.cap-that.com/bloodties/104/images/104_cap013.jpg",
        title: 'The Emerald Buddha',
        markers: {seen: true}
    }, {
        img: "http://www.cap-that.com/bloodties/105/images/105_cap013.jpg",
        title: 'Always Look On The Bright Side Of Life'
    }, {
        img: "http://www.cap-that.com/bloodties/106/images/106_cap013.jpg",
        title: 'Make Funny Titles For Testing Purposes'
    }, {
        img: "http://www.cap-that.com/bloodties/107/images/107_cap013.jpg",
        title: 'I Guess GOT got you hooked'
    }, {
        img: "http://www.cap-that.com/bloodties/108/images/108_cap013.jpg",
        title: 'It is fascism, isn\'t it ?'
    }
    ]
}
export {
    ContentDetails as default
}
