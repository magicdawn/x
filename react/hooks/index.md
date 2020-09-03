---
nav:
  title: React
  path: /react
---

# React Hooks

## useModifyState

> use `immer` to modify and create a new state

### API

```js
const [state, modifyState] = useModifyState(initialState)
```

### demo

```jsx
import {useModifyState} from '@magicdawn/x/react/hooks'
import React, {useCallback} from 'react'

export default () => {
  const [user, modifyUser] = useModifyState({name: 'zhangsan', age: 18})

  const onNameChange = useCallback((e) => {
    const name = e.target.value
    modifyUser((u) => void (u.name = name))
  }, [])

  const onAgeChange = useCallback((e) => {
    const age = e.target.value
    modifyUser((u) => {
      u.age = age
    })
  })

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
