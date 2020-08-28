# Things

## state-plugin

- use `this.state` & `this.setState` in effects
- `dispatch[nsp].setState` available

## `usePlug` & `plug`

### `usePlug`

```js
export default function Demo() {
  const {state, dispatch, effects, setState} = usePlug({nsp: 'demo', state: ['count']})

  // state changes when rerender, but the old reference still works
  const handleClick = useCallback(() => {
    state.count++
  }, [])

  // use setState
  const handleClick2 = useCallback(() => {
    // setState(fn), fn return nextstate
    setState(val => ({...val, count: count + 1}))

    // or setState(fn), fn modify state
    setState(val => {
      val.count++
    })
  }, [])

  // use effects.otherEffects()
  // use dispatch.otherNamespace.otherEffects()

  return <div onClick={handleClick}>{state.count}</div>
}
```

#### `get`

use `state.count`

#### `set`

- use `state.count++` setter
- use `setState` effects

### `plug`

plug is a hoc, use `usePlug` instead.
