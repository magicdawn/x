import produce, {nothing} from 'immer'

export default (
  {state, setState, setStateAction} = {
    state: 'state',
    setState: 'setState',
    setStateAction: '__rematch_state_plugin_@@_set_state__',
  }
) => {
  return {
    onRootReducer(reducer, bag) {
      return (state, action) => {
        if (typeof state === 'object' && action && action.type === setStateAction) {
          const {nsp, payload} = action

          return produce(state, (draft) => {
            // invalid payload
            if (typeof payload === 'undefined') return
            if (payload === null) return

            if (typeof payload === 'object') {
              Object.assign(draft[nsp], payload)
              return
            }

            if (typeof payload === 'function') {
              const next = payload(draft[nsp])

              // the payload fn modify state
              if (typeof next === 'undefined') {
                return
              }

              // immer nothing
              else if (next === nothing) {
                draft[nsp] = undefined
                return
              }

              // return new state
              else {
                draft[nsp] = next
                return
              }
            }

            // others just replace with payload
            // number / string / boolean ...
            return payload
          })
        }

        return reducer(state, action)
      }
    },

    onModel(model, store) {
      const nsp = model.name
      const modelDispatch = store.dispatch[nsp]

      // this.state in effects
      Object.defineProperty(modelDispatch, state, {
        enumerable: false,
        get() {
          return store.getState()[nsp]
        },
      })

      // this.setState => dispatch nsp/setState
      modelDispatch[setState] = function (payload) {
        return store.dispatch({type: `${setStateAction}`, nsp, payload})
      }
    },
  }
}
