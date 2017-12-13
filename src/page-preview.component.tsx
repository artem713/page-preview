import * as React from 'react'
import * as classNames from 'classnames/bind'
import * as metadataResolver from 'html-metadata-resolver'
import { IWebpageMetadata } from './webpage-metadata.interface'
import { toOGMetadata, OGMetadataKeys } from './og-metadata.utils'

const c = classNames.bind(require('./page-preview.styles.less'))

export interface PagePreviewComponentProps {
  url: string
}

export interface PagePreviewComponentState {
  metadata: IWebpageMetadata
}

export class PagePreviewComponent extends React.Component<PagePreviewComponentProps, PagePreviewComponentState> {
  componentDidMount() {
    fetch(this.props.url)
      .then(toText)
      .then(metadataResolver.resolveMetadata)
      .then(toOGMetadata)
      .then(this.storeMetadata)
      .catch(err => console.error(`Failed to fetch ${this.props.url}: ${err}`))
  }

  render() {
    if (!this.state || !this.state.metadata) {
      return null
    }
    
    const { metadata } = this.state
    
    return (
      <div className={c('container')}>
        <div className={c('container-header')}>
          <div>{metadata[OGMetadataKeys.title]}</div>
          <div>{metadata[OGMetadataKeys.description]}</div>
        </div>
        <img
          className={c('container-image')}
          src={metadata[OGMetadataKeys.image]}
          alt={metadata[OGMetadataKeys.title]}
        />
      </div>
    )
  }

  private storeMetadata = (metadata: IWebpageMetadata) => {
    this.setState({
      metadata
    })
  }
}

function toText(response: Response): Promise<string> {
  return response.text()
}

