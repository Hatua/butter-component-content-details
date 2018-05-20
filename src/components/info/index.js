import React from 'react'

import {Navbar, Stars} from 'butter-base-components'

import InfoBar from '../navbar'
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

class Synopsis extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      expanded: false
    }
  }

  toggleExpanded (e) {
    e.preventDefault()

    this.setState(state => ({
      expanded: !state.expanded
    }))
  }

  render () {
    const {text, trimLength} = this.props
    const {expanded} = this.state

    if (text.length < trimLength) {
      return (
        <p className='synopsis'> {text} </p>
      )
    }

    if (expanded) {
      return (
        <p className='synopsis'>
          {text}
          <a onClick={this.toggleExpanded.bind(this)} href='#'> LESS…</a>
        </p>
      )
    }

    return (
      <p className='synopsis'>
        {text.slice(0, trimLength)}
        <a onClick={this.toggleExpanded.bind(this)} href='#'> MORE…</a>
      </p>
    )
  }
}

Synopsis.defaultProps = {
  text: '',
  trimLength: 200
}

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
