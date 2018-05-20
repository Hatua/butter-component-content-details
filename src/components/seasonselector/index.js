import React from 'react'

import {RouterMenu} from 'butter-component-menu'
import {Item} from 'butter-component-list'

import style from './style.styl'

const EpisodeSelector = ({episodes = []}) => (
  <ul className={style.episodes}>
    {episodes.map((item, idx) => (
      <Item item={Object.assign({}, item, {title: `${idx} - ${item.title}`})} key={idx} />
    ))}
  </ul>
)

const SeasonSelector = ({seasons}) => (
  <div className={style['selector']}>
    <RouterMenu child={EpisodeSelector} items={seasons} fallback={
      <ul className={style.episodes}>
        <li>hello world</li>
      </ul>
    } />
  </div>
)

export {SeasonSelector as default}
