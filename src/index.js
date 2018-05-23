import React from 'react'

import {Switch, Route} from 'react-router-dom'

import SeasonSelector from './components/seasonselector'
import Info from './components/info'

import style from './style.styl'

const Identity = (props) => (props)

const locationToSeasonURL = ({hash}) => hash.replace(/^#/, '')
  .replace(/\/s\/[0-9]+.*/, '')

const DetailSwitch = ({seasons = [], isFetching, goBack, ...props}) => {
  const baseUrl = locationToSeasonURL(location)
  const pathSeasons = seasons.map(
    (season, i) => Object.assign({}, props, season, {
      path: `${baseUrl}/s/${i + 1}`
    })
  )

  return (
    <div className={style.container}>
      <Switch>
        <Route path={`${baseUrl}/s/:sid/e/:eid`} render={({match, history}) => {
          const season = seasons[match.params.sid - 1] || {episodes: []}
          const episode = season.episodes[match.params.eid - 1] || {}
          episode.goBack = {
            title: seasons.length > 1 ? `${props.title} - ${season.title}` : goBack.title,
            action: history.goBack
          }
          return (
            <Info {...props} {...episode} />
          )
        }} />
        <Route path={`${baseUrl}/s/:sid`} render={({match, history}) => {
          const season = seasons[match.params.sid - 1] || {}
          season.goBack = {
            title: seasons.length > 1 ? props.title : goBack.title,
            action: history.goBack
          }
          return (
            <Info {...props} {...season} />
          )
        }} />
        <Route render={() => <Info {...props} />} />
      </Switch>
      {isFetching ? <p key='loader'>Loading</p> : null}
      {seasons ? <SeasonSelector seasons={pathSeasons} {...props} /> : null}
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
