import React, {useMemo} from 'react'
import {withProps, shallowEqual} from 'recompose'
import {useSelector} from 'react-redux'
import _ from 'lodash'

let store
export function setStore(s) {
  store = s
}

/**
 * use as a react hoc
 */

export default function plug({namespace, state = []}) {
  if (!Array.isArray(state)) state = [state]

  const getStateProp = () => {
    let stateProp = {}

    for (let key of state) {
      Object.defineProperty(stateProp, key, {
        enumerable: true,
        configurable: true,
        get() {
          return _.get(store.getState(), `${namespace}.${key}`)
        },
        set(val) {
          store.dispatch[namespace]?.set({[key]: val})
        },
      })
    }

    return stateProp
  }

  const stateKeys = state

  const hoc = (BaseCompoennt) => {
    return function Plug(props) {
      // for update
      const storeState = useSelector((state) => {
        return _.pick(state[namespace], stateKeys)
      }, shallowEqual)

      const stateProp = useMemo(getStateProp, [])

      return <BaseCompoennt {...props} state={stateProp} effects={store.dispatch[namespace]} />
    }
  }

  return hoc
}
