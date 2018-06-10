import React from 'react'

import style from './style.styl'
import Circle from '../../icons/circle.svg'
import Magnet from '../../icons/magnet.svg'
import Eye from '../../icons/eye.svg'
import EyeOff from '../../icons/eye-off.svg'
import Heart from '../../icons/heart.svg'

const stopBubbles = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

const InfoBar = ({actions = {}, markers = {}, id}) => {
  const favouriteActions = actions.favourites || {toggle: () => {console.error('NOT IMPLEMENTED')}}
  const seenActions = actions.seen || {toggle: () => {console.error('NOT IMPLEMENTED')}}
  const favourites = markers.favourites || {}
  const seen = markers.seen || {}

  const getSeenIcon = () => {
    let element = EyeOff
    if (seen[id]) {
      element = Eye
    }

    return React.createElement(element, {
      style:{fill: 'var(--Font-color)'},
      onClick: (e) => {
        stopBubbles(e)
        favouriteActions.toggle(id)
      }
    })
  }

  return (
    <div className={style.infobar}>
        <Circle style={{fill: 'lightgreen'}}/>
        <Magnet style={{fill: 'var(--Font-color)'}}/>
        <Heart
          style={{fill: favourites[id] ?'var(--Secondary-color)':'var(--Font-color)'}}
          onClick={(e) => {
              stopBubbles(e)
              favouriteActions.toggle(id)
          }}/>
        {getSeenIcon()}
    </div>
  )
}

export {InfoBar as default}
