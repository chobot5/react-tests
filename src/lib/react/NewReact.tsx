import { NewReactContext } from './NewReactContext'
import { NewReactForm } from './NewReactForm'

export const NewReact = () => {
  return (
    <>
      <legend>context </legend>
      <NewReactContext />

      <legend>form</legend>
      <NewReactForm />
    </>
  )
}
