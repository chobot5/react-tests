import React, { ReactNode } from 'react'

export class ErrorBoundary extends React.Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI.

    return { hasError: true }
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // Log error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when an error occurs
      return <div>Error</div>
    }
    return this.props.children
  }
}
