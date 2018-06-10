import React from 'react'

import style from './style.styl'
import Circle from '../../icons/circle.svg'
import Magnet from '../../icons/magnet.svg'
import Eye from '../../icons/eye.svg'
import EyeOff from '../../icons/eye-off.svg'
import Heart from '../../icons/heart.svg'

const InfoBar = () => (
  <div className={style.infobar}>
      <Circle style={{fill: 'lightgreen'}}/>
      <Magnet style={{fill: 'var(--Font-color)'}}/>
      <Heart style={{fill: 'var(--Secondary-color)'}}/>
      <EyeOff style={{fill: 'var(--Font-color)'}}/>
  </div>
)

export {InfoBar as default}
