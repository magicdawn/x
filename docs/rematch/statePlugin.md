# statePlugin

```js
import {statePlugin} from '@magicdawn/x/rematch'
```

## purpose

- will add `dispatch[nsp].state` to local state, this means you can use `this.state` in model effects
- will add `dispatch[nsp].setState`, same to `[_, setState] = useModifyState(...)`, this means you can use `this.setState` in model effects

## demo

<code src="./demo-state-plugin.jsx" />
