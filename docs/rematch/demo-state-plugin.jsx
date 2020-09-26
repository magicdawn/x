/**
 * title: basic usage
 * desc: notice `this.state` & `this.setState` in `effects`, and `setState` supports partialState or fn
 */

import {init} from '@rematch/core'
import immerPlugin from '@rematch/immer'
import {Provider, useSelector, useDispatch} from 'react-redux'
import React, {useState} from 'react'
import {usePersistFn} from 'ahooks'

// 1.import
import {statePlugin} from '@magicdawn/x/rematch'

const count = {
  state: {
    current: 0,
  },
  reducers: {},
  effects: {
    // 3. use `this.state` / `this.setState` in models or views
    add(num) {
      this.setState({current: this.state.current + num})
    },
    minus(num) {
      this.setState((draft) => {
        draft.current -= num
      })
    },
    increase() {
      this.setState((draft) => {
        draft.current++
      })
    },
    decrease() {
      this.setState({current: this.state.current - 1})
    },
  },
}

const store = init({
  models: {count: count},

  // 2.use this plugin
  plugins: [statePlugin()],
})

function App() {
  const current = useSelector((state) => state.count.current)
  const {setState, increase, decrease, add, minus} = useDispatch().count

  const [val2, setVal2] = useState(0)
  const [val3, setVal3] = useState(0)

  const onAdd = usePersistFn(() => {
    if (!val2) return
    const num = Number(val2)
    add(num)
  })

  const onMinus = usePersistFn(() => {
    if (!val3) return
    const num = Number(val3)
    minus(num)
  })

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
        current count: {current}
      </div>

      <div className='row' {...rowStyle}>
        <button onClick={increase} style={buttonStyle}>
          increase via effects.increase -> setState(fn)
        </button>

        <button onClick={decrease} style={buttonStyle}>
          decrease via effects.decrease -> setState(partialState)
        </button>
      </div>

      <div className='row' {...rowStyle}>
        <input
          type='text'
          value={val2}
          onChange={(e) => setVal2(e.target.value)}
          style={{marginRight: 10}}
        />
        <button onClick={onAdd} style={buttonStyle}>
          Add (onAdd -> effects.add -> setState(partialState))
        </button>
      </div>

      <div className='row' {...rowStyle}>
        <input
          type='text'
          value={val3}
          onChange={(e) => setVal3(e.target.value)}
          style={{marginRight: 10}}
        />
        <button onClick={onMinus} style={buttonStyle}>
          Minus (onMinus -> effects.minus -> setState(fn))
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
