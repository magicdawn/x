# useModifyState

> use `immer` to modify and create a new state

### API

```js
const [state, modifyState] = useModifyState(initialState)
```

### demo

```jsx
import React, {useCallback} from 'react'
import {useModifyState} from '@magicdawn/x/react/hooks'

export default () => {
  const [user, setUser] = useModifyState({name: 'zhangsan', age: 18})

  const onNameChange = useCallback((e) => {
    const name = e.target.value
    setUser((u) => void (u.name = name))
  }, [])

  const onAgeChange = useCallback((e) => {
    const age = e.target.value
    setUser({age})
  }, [])

  return (
    <div>
      <p>current user: {JSON.stringify(user)}</p>
      <div className='row'>
        name: <input type='text' value={user.name} onChange={onNameChange} />
      </div>
      <div className='row'>
        age: <input type='range' min='0' max='100' value={user.age} onChange={onAgeChange} />
      </div>
    </div>
  )
}
```
