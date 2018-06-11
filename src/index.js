import React from 'react'

import {Switch, Route} from 'react-router-dom'

import Info from './components/info'

import style from './style.styl'

const Identity = (props) => (props)

const locationToSeasonURL = ({hash}) => hash.replace(/^#/, '')
  .replace(/\/s\/[0-9]+.*/, '')

const getOrder = (array, order) => (
  array.filter(element => Number(element.order) === Number(order))[0]
)

const DetailSwitch = (props) => {
  const baseUrl = locationToSeasonURL(location)
  let {goBack, seasons = []} = props

  const pathSeasons = seasons.map(
    (season) => Object.assign({}, props, season, {
      path: `${baseUrl}/s/${season.order}`
    })
  )

  return (
    <div className={style.container}>
      <Switch>
        <Route path={`${baseUrl}/s/:sid/e/:eid`} render={({match, history}) => {
          const season = getOrder(seasons, match.params.sid)
          const episode = getOrder(season.episodes, match.params.eid) || {}
          goBack = {
            title: seasons.length > 1 ? `${props.title} - ${season.title}` : goBack.title,
            action: history.goBack
          }
          return (
            <Info {...props} {...episode} seasons={pathSeasons} goBack={goBack} />
          )
        }} />
        <Route path={`${baseUrl}/s/:sid`} render={({match, history}) => {
          const season = getOrder(seasons, match.params.sid)
          goBack = {
            title: seasons.length > 1 ? props.title : goBack.title,
            action: history.goBack
          }
          return (
            <Info {...props} {...season} seasons={pathSeasons} goBack={goBack} />
          )
        }} />
        <Route render={() => <Info {...props} seasons={pathSeasons} goBack={goBack} />} />
      </Switch>
    </div>
  )
}

const ContentDetails = ({backdrop, ...props}) => ([
  <div key='content-navbar' className={style.backdrop} style={{backgroundImage: `url(${backdrop})`}} />,
  <DetailSwitch key={`switch-${props.id}`} {...props} />
])

ContentDetails.defaultProps = {
  subtitles: {none: null},
  torrents: {Unknown: null},
  genres: ['none'],
  goBack: {action: Identity, title: 'Go Back'},
  actions: {
    DETAIL: () => console.log('call DETAIL')
  },
  dispatch: a => a
}

export {
  ContentDetails as default
}
