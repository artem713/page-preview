import * as React from 'react'
import * as classNames from 'classnames/bind'

const c = classNames.bind(require('./page-preview.styles.less'))

export interface PagePreviewComponentProps {
  url: string
}

export class PagePreviewComponent extends React.Component<PagePreviewComponentProps> {
  render() {
    return (
      <div className={c('container')}>
        <div className={c('container-header')}>
        </div>
        <img className={c('container-image')}
        />
      </div>
    )
  }
}
