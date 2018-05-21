import React from 'react'
import ReactMarkdown from 'react-markdown'

import style from './style.styl'

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
        const moreText = expanded ? 'LESS':'...MORE'

        return (
            <div className={style.more}>
                <ReactMarkdown className={`synopsis ${expanded?style.expanded:''}`} source={text}/>
                <a onClick={this.toggleExpanded.bind(this)} href='#'>{moreText}</a>
            </div>
        )
    }
}

Synopsis.defaultProps = {
  text: '',
}

export {Synopsis as default}
