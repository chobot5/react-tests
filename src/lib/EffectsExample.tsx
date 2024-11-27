import {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useRecordState } from './react/useRecordState.ts'

const baseStyles: CSSProperties = {
  backgroundColor: 'cyan',
  display: 'inline-block'
}

function useRefWithCallback<Element extends HTMLElement>(
  onMount: (node: Element) => void,
  onUnmount: (node: Element) => void
) {
  const nodeRef = useRef<Element | null>(null)

  const setRef = useCallback(
    (node: Element) => {
      if (nodeRef.current) {
        onUnmount(nodeRef.current)
      }

      nodeRef.current = node

      if (nodeRef.current) {
        onMount(nodeRef.current)
      }
    },
    [onMount, onUnmount]
  )

  return setRef
}

export const EffectsExample = () => {
  const countRef = useRef(0)
  const [persist, setPersist] = useState(false)

  const textRef = useRefWithCallback<HTMLDivElement>(
    (node) => {
      if (persist) {
        return
      }

      const rect = node.getBoundingClientRect()
      node.style.left =
        rect.left < 0 ? '0px' : rect.left - 80 < 0 ? rect.left + 'px' : '-80px'
    },
    () => {}
  )

  const onMouseEnter = (node: HTMLDivElement) => () => {
    const textEl = node.childNodes[0] as HTMLDivElement
    textEl.setAttribute('aria-visible', 'true')
  }

  const onMouseLeave = (node: HTMLDivElement) => () => {
    if (persist) {
      return
    }

    const textEl = node.childNodes[0] as HTMLDivElement
    textEl.setAttribute('aria-visible', 'false')
  }

  const tipRef = useRefWithCallback<HTMLDivElement>(
    (node) => {
      node.addEventListener('mouseenter', onMouseEnter(node))
      node.addEventListener('mouseleave', onMouseLeave(node))
    },
    (node) => {
      node.removeEventListener('mouseenter', onMouseEnter(node))
      node.removeEventListener('mouseleave', onMouseLeave(node))
    }
  )

  useEffect(() => {}, [])

  useLayoutEffect(() => {}, [])

  const x = useMemo(() => {
    return 666
  }, [])

  countRef.current = countRef.current + 1

  return (
    <>
      <div></div>
      <div className={'tip-wrapper'}>
        <div
          className={'tip'}
          data-color={'white'}
          ref={tipRef}
          style={baseStyles}
          onClick={() => {
            setPersist(!persist)
          }}
        >
          <div className={'tip-text'} ref={textRef}>
            lorem ipusm
          </div>
          ?
        </div>
      </div>
    </>
  )
}
