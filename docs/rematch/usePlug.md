# usePlug

> need use with `statePlugin`

```js
import {usePlug} from '@magicdawn/x/rematch'
```

### API

```js
const {dispatch, effects, setState, state} = usePlug({
  nsp: '',
  namespace: '',
  state: ['key1', 'key2'],
})
```

- dispatch / effects / setState are model effects
- state.key1 / state.key2 can make two way binding

### demo

<code src="./demo-use-plug.jsx" />
