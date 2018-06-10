import React from 'react'
import ReactMarkdown from 'react-markdown'

import style from './style.styl'

class Synopsis extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      expanded: false
    }

    this.setRef = (element) => {
      this.mainref = element
    }
  }

  toggleExpanded (e) {
    e.preventDefault()

    this.setState(state => {
      state.expanded && this.mainref.scrollTo(0, 0)

      return {
        expanded: !state.expanded
      }
    })
  }

  render () {
    const {text} = this.props
    const {expanded} = this.state
    const moreText = expanded ? 'LESS' : '...MORE'

    return ([
      <div key='main' ref={this.setRef}
           className={[style.more, expanded ? style.expanded : ''].join(' ')}>
          <ReactMarkdown className='synopsis' source={text} />
      </div>,
      <a key='more' className={style.moreButton} onClick={this.toggleExpanded.bind(this)} href='#'>{moreText}</a>
    ])
  }
}

Synopsis.defaultProps = {
  text: ''
}

export {Synopsis as default}
