import React from 'react'

import {RouterMenu} from 'butter-component-menu'
import {Item} from 'butter-component-list'

import style from './style.styl'

const EpisodeSelector = ({episodes = [], path, history, ...props}) => (
  <ul className={style.episodes}>
    {episodes.map((item, idx) => (
      <Item key={idx} {...props} item={Object.assign({}, item, {
        title: `${idx + 1} - ${item.title}`,
        actions: {
          show: () => history.push(`${path}/e/${idx + 1}`),
          play: () => history.push(`${path}/e/${idx + 1}/play`)
        }
      })} />
    ))}
  </ul>
)

const SeasonSelector = ({seasons, ...props}) => (
  <div className={style['selector']}>
    <RouterMenu child={EpisodeSelector} {...props} items={seasons} fallback={
      <ul className={style.episodes}>
        <li>hello world</li>
      </ul>
    } />
  </div>
)

export {SeasonSelector as default}
