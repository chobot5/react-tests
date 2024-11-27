import * as Sentry from '@sentry/react'
import { PropsWithChildren } from 'react'

function FallbackComponent() {
  return <div>An error has occurred</div>
}

const myFallback = <FallbackComponent />

const SentryBoundary = (props: PropsWithChildren<unknown>) => {
  return (
    <Sentry.ErrorBoundary
      fallback={myFallback}
      onError={(e) => console.log('this error', e)}
    >
      {props.children}
    </Sentry.ErrorBoundary>
  )
}

const ErroredComponent = () => {
  return (
    <div>
      <div>dsdasda</div>
      <button
        type={'button'}
        onClick={() => {
          Sentry.captureEvent({
            message: 'sadklasjdk ljsa ',
            level: 'warning',
            extra: {
              asdas: '1111'
            },
            tags: {
              form: 'nomination'
            }
          })
        }}
      >
        throw
      </button>
    </div>
  )
}

export const SentryComponent = () => {
  return (
    <SentryBoundary>
      <ErroredComponent />
    </SentryBoundary>
  )
}
