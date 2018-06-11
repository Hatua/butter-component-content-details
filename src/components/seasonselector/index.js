import React from 'react'

import {RouterMenu, MenuSwitch} from 'butter-component-menu'
import {Item} from 'butter-component-list'

import style from './style.styl'

const EpisodeSelector = ({episodes = [], markers, path, history, ...props}) => (
  <ul className={style.episodes}>
      {episodes.map(({order, title, ...episode}) => {
         const item = Object.assign({}, episode, {
           title: `${order} - ${title}`,
         })

         const actions = {
           show: () => history.push(`${path}/e/${order}`),
           play: () => history.push(`${path}/e/${order}/play`)
         }

         return <Item key={order} {...props} item={item} actions={actions}/>
      })}
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
