import React from 'react'

import {MenuSwitch} from 'butter-component-menu'

import SeasonSelector from './components/seasonselector'
import Info from './components/info'

import style from './style.styl'

const Identity = (props) => (props)

const locationToSeasonURL = ({hash}) => hash.replace(/^#/, '')
  .replace(/\/s[0-9]+$/, '')

class ContentDetails extends React.Component {
  componentDidMount () {
    const {dispatch, actions, ...props} = this.props

    dispatch(actions.DETAIL(props))
  }

  render () {
    const {backdrop, seasons, ...props} = this.props
    const pathSeasons = seasons.map(
      (season, i) => Object.assign({}, props, season, {
        goBack: Object.assign({}, props.goBack, {title: props.title}),
        path: `${locationToSeasonURL(location)}/s${i + 1}`
      })
    )

    return (
      <div>
        <div className={style.backdrop} style={{backgroundImage: `url(${backdrop})`}} />
        <div className={style.container}>
          <MenuSwitch items={pathSeasons} child={Info} fallback={<Info {...props} />} />
          {seasons ? <SeasonSelector seasons={pathSeasons} /> : null}
        </div>
      </div>
    )
  }
}

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
