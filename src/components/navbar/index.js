import React from 'react'

import style from './style.styl'

const InfoBar = () => (
  <div className={style.infobar}>
    <i className='material-icons'>fiber_manual_record</i>
    <i className='material-icons'>share</i>
    <i className='material-icons'>favorite</i>
    <i className='material-icons'>visibilty</i>
  </div>
)

export {InfoBar as default}
