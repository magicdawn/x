/**
 * title: basic usage
 * desc:
 */

import {init} from '@rematch/core'
import {Provider, useSelector, useDispatch} from 'react-redux'

// 1.import plugin & hook
import {statePlugin, usePlug} from '@magicdawn/x/rematch'

const count = {
  state: {
    current: 0,
  },
}

const store = init({
  models: {count: count},

  // 2.use this plugin
  plugins: [statePlugin()],
})

function App() {
  const {state} = usePlug({nsp: 'count', state: ['current']})

  const rowStyle = {
    style: {
      marginTop: 10,
    },
  }
  const buttonStyle = {
    height: 25,
  }

  return (
    <div>
      <div className='row' {...rowStyle}>
        current count: {state.current}
      </div>

      <div className='row' {...rowStyle}>
        <button
          onClick={() => {
            // state.current += 1` -> `store.dispatch[nsp].setState({ current: newCurrent })
            state.current += 1
          }}
          style={buttonStyle}
        >
          increase
        </button>

        <button
          onClick={() => {
            state.current -= 1
          }}
          style={buttonStyle}
        >
          decrease
        </button>
      </div>
    </div>
  )
}

export default function Demo() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
