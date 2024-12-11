import { useCallback } from 'react'

interface NumberInputProps {
  value: number
  onChange: (value: number) => void
}

export const NumberInput = ({ value, onChange }: NumberInputProps) => {
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      minimumFractionDigits: 0
    }).format(value)
  }

  const removeFormat = (value: string) => value.replace(/\D/g, '')

  const inputRef = useCallback(
    (node: HTMLInputElement) => {
      if (!node) {
        return
      }

      const nodeNumValue = parseInt(removeFormat(node.value))

      if (value !== nodeNumValue) {
        node.value = formatValue(value)
      }

      node.onblur = () => {
        const formatted = formatValue(parseInt(node.value))
        node.value = formatted
        onChange(parseInt(removeFormat(node.value)))
      }

      node.onkeyup = (e: KeyboardEvent) => {
        if (e.code === 'Enter') {
          node.blur()
        }
      }

      node.onkeydown = (e: KeyboardEvent) => {
        if (
          e.code.startsWith('Digit') ||
          e.code === 'Backspace' ||
          e.code === 'Enter'
        ) {
          return
        }
        e.preventDefault()
      }
    },
    [value, onChange]
  )

  return (
    <div className='number-field'>
      <input
        type='text'
        inputMode='numeric'
        ref={inputRef}
        onChange={(e) => {
          if (isNaN(+e.target.value)) {
            e.preventDefault()
          }
        }}
      />
    </div>
  )
}
