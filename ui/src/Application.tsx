import React from 'react'
import './styles/index.sass'
import { Provider } from 'react-redux'
import { store } from './store'
import LayoutTemplate from './hoc/LayoutTemplate'
import { BrowserRouter } from 'react-router-dom'

export const Application: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <LayoutTemplate />
      </Provider>
    </BrowserRouter>
  )
}

export default Application
