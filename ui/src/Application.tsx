import React from 'react'
import './styles/index.sass'
import {Provider} from 'react-redux'
import {store} from './store'
import LayoutTemplate from './hoc/LayoutTemplate'
import {BrowserRouter} from 'react-router-dom'
import {SnackbarProvider} from 'notistack';

export const Application: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider maxSnack={1}>
          <LayoutTemplate />
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default Application
