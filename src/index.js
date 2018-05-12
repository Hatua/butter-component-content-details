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

let InfoLine = ({year, runtime, genres, rating, ...props}) => (
    <div className={style.info} className={style["infoline"]}>
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

const InfoBar = () => (
    <div className={style.infobar}>
        <i className='material-icons'>fiber_manual_record</i>
        <i className='material-icons'>share</i>
        <i className='material-icons'>favorite</i>
        <i className='material-icons'>visibilty</i>
    </div>
)

const ContentDetails = ({
    title, synopsis, cover, backdrop, seasons, goBack={}, toolbar, ...props}) => (
        <div>
            <div className={style["backdrop"]} style={{backgroundImage: `url(${backdrop})`}}></div>
            <div className={style.detail}>
                <Navbar key='main_nav' goBack={goBack} right={<InfoBar/>}/>
                <div className={style["container"]}>
                    <div className={style["info"]}>
                        <h1>{title}</h1>
                        <InfoLine {...props}/>
                        <p className="synopsis"> {synopsis} </p>
                        <PlayButtons {...props}/>
                    </div>
                    <div className={style["cover"]}>
                        <img src={cover}/>
                    </div>
                </div>
                {seasons ? <SeasonSelector seasons={seasons}/> : null}
            </div>
        </div>
    )

ContentDetails.defaultProps = {
    subtitles: {none: null},
    torrents: {Unknown: null},
    genres: ['none'],
}
export {
    ContentDetails as default
}
