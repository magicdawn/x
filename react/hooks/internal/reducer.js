import produce from 'immer'

const reducer = produce((draft, payload) => {
  // invalid payload
  if (typeof payload === 'undefined') return

  if (typeof payload === 'object') {
    Object.assign(draft, payload)
    return
  }

  if (typeof payload === 'function') {
    return payload(draft)
  }

  // others just replace with payload
  // number / string / boolean / null ...
  return payload
})

export default reducer
