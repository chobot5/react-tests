import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { NewReact } from './lib/react/NewReact'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NewReact />
  </React.StrictMode>
)
