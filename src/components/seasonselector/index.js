import React from 'react'

import {RouterMenu, MenuSwitch} from 'butter-component-menu'
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

const EmptySelector = () => (
  <ul className={style.episodes}>
    <li>hello world</li>
  </ul>
)

const SeasonSelector = ({seasons, ...props}) => {
  let Component
  const componentProps = {
    ...props,
    items: seasons,
    child: EpisodeSelector,
    fallback: new EmptySelector()
  }

  if (seasons.length > 1) {
    Component = new RouterMenu(componentProps)
  } else {
    Component = new MenuSwitch(componentProps)
  }

  return (
    <div className={style['selector']}>
      {Component}
    </div>)
}

export {SeasonSelector as default}
