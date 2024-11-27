import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://a599fafadc57b9b20d38b46f0631847d@o4508303155789824.ingest.de.sentry.io/4508303171125328',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: ['http://localhost:5173']
})
