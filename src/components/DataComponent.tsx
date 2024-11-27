import { useDataState } from '../lib/react/useDataState.ts'

import * as stylex from '@stylexjs/stylex'
import { colors } from './styles.ts'

const styles = stylex.create({
  base: {
    fontSize: 16,
    lineHeight: 1.5,
    color: 'rgb(109, 45, 45)',
    backgroundColor: 'rgb(131, 101, 101)'
  },
  highlighted: {
    color: 'rgb(234, 221, 221)'
  },
  longList: {
    backgroundColor: 'rgb(79, 145, 154)'
  }
})

const buttonStyles = stylex.create({
  base: {
    fontSize: 16,
    lineHeight: 1.5,
    color: 'rgb(250, 250, 250)',
    backgroundColor: {
      default: '#836565',
      ':hover': '#5d4242'
    },
    border: 'none',
    margin: '10px 0',
    borderRadius: '4px'
  },
  blue: {
    backgroundColor: '#3b5998'
  },
  alert: {
    backgroundColor: '#dd4b39'
  }
})

export const DataComponent = () => {
  const data = useDataState()

  return (
    <div>
      <div
        {...stylex.props(
          styles.base,
          styles.highlighted,
          Object.keys(data).length > 3 && styles.longList
        )}
      >
        {Object.keys(data)
          .map((d) => d)
          .join('--')}
      </div>
      <button type='button' {...stylex.props(buttonStyles.base)}>
        Styled
      </button>
    </div>
  )
}
