import React from 'react'

import {Navbar, Stars} from 'butter-base-components'

import InfoBar from '../navbar'
import Synopsis from '../synopsis'
import PlayButtons from '../playbuttons'
import SeasonSelector from '../seasonselector'

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

const Info = ({id, isFetching, seasons, goBack, title, synopsis, overview, poster, ...props}) => {
  return ([
    <Navbar key={`detail-navbar-${id}`} type='content-nav' goBack={goBack} right={<InfoBar />} />,
    <div key={`details-${id}`} className={style.detail}>
        <div className={style.detailFixed}>
            <div className={style.info}>
                <h1>{title}</h1>
                <InfoLine {...props} />
            </div>
            <div className={style.cover}>
                <img src={poster} />
            </div>
        </div>
        <div className={style.scrollInfo}>

            <Synopsis text={overview || synopsis} />
            <PlayButtons {...props} />

            {isFetching ? <p key='loader'>Loading</p> : null}
            {seasons ? <SeasonSelector seasons={seasons} {...props} /> : null}
        </div>
    </div>
  ])
}

export {Info as default}
