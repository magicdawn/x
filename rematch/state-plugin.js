import produce from 'immer'

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
          return produce(state, draft => {
            Object.assign(draft[nsp], payload)
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
      modelDispatch[setState] = function(payload) {
        return store.dispatch({type: `${setStateAction}`, nsp, payload})
      }
    },
  }
}
