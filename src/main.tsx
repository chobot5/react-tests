import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import './lib/sentryInstance'

import { Example } from './lib/react/doomed-store/Example.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>
)
