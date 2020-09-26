# useShallowEqualSelector

> same to react-redux useShallowEqualSelector, https://react-redux.js.org/api/hooks#recipe-useshallowequalselector

```js
import {useSelector, shallowEqual} from 'react-redux'

export default function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual)
}
```
