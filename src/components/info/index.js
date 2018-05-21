import React from 'react'

import {Navbar, Stars} from 'butter-base-components'

import InfoBar from '../navbar'
import Synopsis from '../synopsis'
import PlayButtons from '../playbuttons'

import style from './style.styl'

const InfoLine = ({year, runtime, genres, rating, ...props}) => (
  <div className={style.infoline}>
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
      <Stars rating={Number(rating)} />
    </span>
  </div>
)

const Info = ({id, goBack, title, synopsis, overview, poster, ...props}) => ([
  <Navbar key={`detail-navbar-${id}`} type='content-nav' goBack={goBack} right={<InfoBar />} />,
  <div key={`details-${id}`}className={style.detail}>
    <div className={style.info}>
      <h1>{title}</h1>
      <InfoLine {...props} />
      <Synopsis text={overview || synopsis} />
      <PlayButtons {...props} />
    </div>
    <div className={style.cover}>
      <img src={poster} />
    </div>
  </div>
])

export {Info as default}
