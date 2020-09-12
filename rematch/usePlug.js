import assert from 'assert'
import {useMemo} from 'react'
import {shallowEqual} from 'recompose'
import {useStore, useSelector} from 'react-redux'
import {get, pick} from 'lodash'

/**
 * a react custom hook
 */

export default function usePlug({nsp, state = [], ...extraOptions}) {
  nsp = nsp || extraOptions.namespace
  assert(nsp, 'nsp(aka namespace) can not be empty')

  const store = useStore()
  const dispatch = store.dispatch
  const effects = dispatch[nsp]
  const setState = effects.setState

  const stateKeys = Array.isArray(state) ? state : [state]

  // for update
  const selectedState = useSelector(state => {
    return pick(state[nsp], stateKeys)
  }, shallowEqual)

  const stateProp = useMemo(() => {
    let stateProp = {}
    for (let key of stateKeys) {
      Object.defineProperty(stateProp, key, {
        enumerable: true,
        configurable: true,
        get() {
          return get(store.getState(), `${nsp}.${key}`)
        },
        set(val) {
          setState({[key]: val})
        },
      })
    }
    return stateProp
  }, [stateKeys, store])

  return {
    // static
    store,
    dispatch,
    setState,

    // change
    selectedState,

    // useful
    effects,
    state: stateProp,
  }
}
