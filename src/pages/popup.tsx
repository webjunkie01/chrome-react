import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Store} from 'react-chrome-redux'
import {TOKENS} from './constants'
import {MemoryRouter} from "react-router-dom";
import './index.css'
import App from './app'


const store = new Store({
  portName: TOKENS
})

store.ready().then(() => {
  const mountNode = document.createElement('div') as HTMLElement
  document.body.appendChild(mountNode)

  ReactDOM.render(

        <Provider store={store}>
        <MemoryRouter>
          <div>
            <App />
          </div>
        </MemoryRouter>
        </Provider>,
    mountNode
  )
})