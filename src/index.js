import React, { Component } from 'react';
import { translate } from 'react-i18next';
import style from './style.styl';

import {Navbar, Dropdowns, Buttons, Stars} from 'butter-base-components';
import {RouterMenu} from 'butter-component-menu';
import {Item} from 'butter-component-list';
import ActionBar from './components/action-bar';

const {Dropdown} = Dropdowns
const {Button} = Buttons

const Identity = (props) => (props)
const goBack = () => ('/')

const ToolBar = ({}) => (
    <div>
        <Button title="Add to Bookmarks" icon="favorite"/>
        <Button title="Seen" icon="visibility"/>
        <Button title="Seen" icon="visibility"/>
        <Button title="Seen" icon="visibility"/>
    </div>
)

const LegendedButton = ({children, title}) => (
    <div>
        {children}
        <span>{title}</span>
    </div>
)

const PlayButton = () => (
    <i style={{fontSize: '2vw', margin: 'auto'}} className='material-icons'>play_arrow</i>
)

const PlayButtons = ({type, torrents, subtitles, actions, ...props}) => (
    <div className={style.playbuttons}>
        <LegendedButton title={`Play ${type}`}><Button title={<PlayButton/>} apply={actions.play}/></LegendedButton>
        <LegendedButton title="Subtitles"><Dropdown options={Object.keys(subtitles)}/></LegendedButton>
        <LegendedButton title="Quality"><Dropdown options={Object.keys(torrents)}/></LegendedButton>

        <LegendedButton title="Streamer"><Dropdown options={['butter', 'vlc', 'mpv']}/> </LegendedButton>
    </div>
)

PlayButtons.defaultProps = {
    actions: {
        play: () => console.log('play pressed')
    }
}

const InfoLine = ({year, runtime, genres, rating, ...props}) => (
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
            <Stars rating={Number(rating)}/>
        </span>
    </div>
)

const EpisodeSelector = ({items = {episodes: []}}) => (
    <ul className={style["episodes"]}>
        {items.episodes.map((item, idx) => (
            <Item item={Object.assign({}, item, {title: `${idx} - ${item.title}`})} key={idx}/>
        ))}
    </ul>
)

const hashStrip = (hash) => hash.replace(/^#/,'')
                                .replace(/\/s[0-9]+$/, '')

const SeasonSelector = ({seasons}) => (
    <div className={style["selector"]}>
        <RouterMenu child={EpisodeSelector} items={
            seasons.map(
                (season, i) => Object.assign(season, {
                    path: `${hashStrip(location.hash)}/s${i + 1}`
                })
            )
        }/>
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

class ContentDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, actions, ...props} = this.props

        dispatch(actions.DETAIL(props))
    }

    render() {
        const {
            title, synopsis, overview, poster, backdrop, seasons,
            goBack, ...props
        } = this.props

        return (
            <div>
                <div className={style["backdrop"]} style={{backgroundImage: `url(${backdrop})`}}></div>
                <div className={style.main}>
                    <div className={style.detail}>
                        <Navbar type='content-nav' goBack={goBack} right={<InfoBar/>}/>
                        <div className={style["container"]}>
                            <div className={style["info"]}>
                                <h1>{title}</h1>
                                <InfoLine {...props}/>
                                <p className="synopsis"> {synopsis || overview} </p>
                                <PlayButtons {...props}/>
                            </div>
                            <div className={style["cover"]}>
                                <img src={poster}/>
                            </div>
                        </div>
                    </div>
                    {seasons ? <SeasonSelector seasons={seasons}/> : null}
                </div>
            </div>
        )
    }
}

ContentDetails.defaultProps = {
    subtitles: {none: null},
    torrents: {Unknown: null},
    genres: ['none'],
    goBack: {action: Identity, title: "Go Back"},
    actions: {
        DETAIL: () => console.log('call DETAIL')
    },
    dispatch: a => a
}
export {
    ContentDetails as default
}
