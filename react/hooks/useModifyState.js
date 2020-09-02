import {useState, useCallback} from 'react'
import produce from 'immer'

/**
 * this will wrap the modify fn with immer produce,
 * then provide to setState
 *
 * e.g
 * const [count, modifyCount] = useModifyState(0)
 *
 * // count++
 * const add = useCallback(() => modifyCount(count => ++count), [modifyCount])
 */

export default function useModifyState(initialState) {
  const [state, setState] = useState(initialState)
  const modifyState = useCallback((fn) => setState(produce(fn)), [setState])
  return [state, modifyState]
}
