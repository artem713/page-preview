import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { PagePreviewComponent } from './src/page-preview.component'

ReactDOM.render(
  <div>
    {/* <PagePreviewComponent url="https://scotch.io/tutorials/learning-react-getting-started-and-concepts"/> */}
    <PagePreviewComponent url="https://devhints.io/react"/>
  </div>, document.querySelector('.app')
)