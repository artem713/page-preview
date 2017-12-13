import * as React from 'react'
import * as classNames from 'classnames/bind'
import './declarations'

const c = classNames.bind(require('./page-preview.styles.less'))

export interface PagePreviewComponentProps {
  url: string
}

export interface ILinkPreviewMetadata {
  title: string
  description: string
  image: string
}

export interface PagePreviewComponentState {
  metadata: ILinkPreviewMetadata
}

export class PagePreviewComponent extends React.Component<PagePreviewComponentProps, PagePreviewComponentState> {
  public readonly state: PagePreviewComponentState

  componentDidMount() {
    fetch(this.linkPreviewUrl)
      .then(toJSON)
      .then(this.storeMetadata)
      .catch(console.error)
  }

  render() {
    
    if (!this.state || !this.state.metadata) {
      return null
    }
    
    const {metadata: {title, description, image}} = this.state

    return (
      <div className={c('container')}>
        <div className={c('header')}>
          <a className={c('link')} href={this.props.url}>{this.props.url}</a>
          <img className={c('preview')} src={image}/>
        </div>
        <div className={c('footer')}>
          <div className={c('title')}>{title}</div>
          <div className={c('description')}>{description}</div>
        </div>
      </div>
    )
  }

  private get linkPreviewUrl() {
    return `http://api.linkpreview.net/?key=${LINK_PREVIEW_API_KEY}&q=${this.props.url}`
  }

  private storeMetadata = (metadata: any) => {
    const {title, description, image}: ILinkPreviewMetadata = metadata

    this.setState({
      metadata: {
        title,
        description,
        image
      }
    })
  }
}

function toJSON(response: Response) {
  return response.json()
}