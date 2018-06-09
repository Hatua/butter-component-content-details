import React from 'react'

import {Dropdowns, Buttons} from 'butter-base-components'
import style from './style.styl'

const {Dropdown} = Dropdowns
const {Button} = Buttons

const LegendedButton = ({children, title}) => (
  <div>
    {children}
    <span>{title}</span>
  </div>
)

const PlayButton = () => (
  <i style={{fontSize: '2vw', margin: 'auto'}} className='material-icons'>play_arrow</i>
)

const PlayButtons = ({type, sources, subtitles, actions, ...props}) => (
  <div className={style.playbuttons}>
    <LegendedButton title={`Play ${type}`}>
      <Button title={<PlayButton />} apply={actions.play} />
    </LegendedButton>
    <LegendedButton title='Subtitles'>
      <Dropdown options={Object.keys(subtitles)} />
    </LegendedButton>
    <LegendedButton title='Quality'>
      <Dropdown options={Object.keys(sources)} />
    </LegendedButton>
    <LegendedButton title='Streamer'>
      <Dropdown options={['butter', 'vlc', 'mpv']} />
    </LegendedButton>
  </div>
)

PlayButtons.defaultProps = {
  type: 'content',
  sources: {},
  subtitles: {},
  actions: {
    play: () => console.log('play pressed')
  }
}

export {PlayButtons as default}
