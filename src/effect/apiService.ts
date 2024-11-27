import * as Http from '@effect/platform/HttpClient'
import { NodeRuntime } from '@effect/platform-node'
import { flatMap, map, andThen, runPromise, Effect } from 'effect/Effect'
import { HttpClientError } from '@effect/platform/Http/ClientError'
import { Console } from 'effect'
import { Console } from 'effect/Predicate'

export const apiService = () => {
  const apiCall = () => {
    const getPostAsJson = Http.request
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .pipe(Http.client.fetch(), Http.response.json)

    NodeRuntime.runMain(
      getPostAsJson.pipe(
        Effect.andThen((post) => Console.log(typeof post, post))
      )
    )
  }

  return {
    getData: apiCall()
  }
}
