import React from 'react'

import {RouterMenu} from 'butter-component-menu'
import {Item} from 'butter-component-list'

import style from './style.styl'

const EpisodeSelector = ({episodes = [], path, history}) => (
  <ul className={style.episodes}>
    {episodes.map((item, idx) => (
      <Item key={idx} item={Object.assign({}, item, {
        title: `${idx} - ${item.title}`,
        actions: {
          show: () => history.push(`${path}/e/${idx + 1}`),
          play: () => history.push(`${path}/e/${idx + 1}/play`)
        }
      })} />
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
