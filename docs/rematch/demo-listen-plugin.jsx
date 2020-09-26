/**
 * title: basic usage
 * desc: notice `model.listen`
 */

import {init} from '@rematch/core'
import immerPlugin from '@rematch/immer'
import {Provider, useSelector, useDispatch} from 'react-redux'
import React, {useState} from 'react'
import {usePersistFn} from 'ahooks'

// 1.import
import {listenPlugin} from '@magicdawn/x/rematch'

const count = {
  state: {
    current: 0,
  },

  reducers: {
    setCurrent(state, payload) {
      return {...state, current: payload}
    },
  },

  // 2. add `listen` to subscribe other models actions
  listen: {
    'global/reset'() {
      this.setCurrent(0)
    },
  },

  effects: {
    increase(payload, rootState) {
      const newCurrent = rootState.count.current + 1
      this.setCurrent(newCurrent)
    },
    decrease(payload, rootState) {
      const newCurrent = rootState.count.current - 1
      this.setCurrent(newCurrent)
    },
  },
}

const store = init({
  models: {count: count},

  // 2.use this plugin
  plugins: [listenPlugin()],
})

function App() {
  const current = useSelector((state) => state.count.current)
  const dispatch = useDispatch()
  const {setState, increase, decrease} = dispatch.count

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
          increase
        </button>
        <button onClick={decrease} style={buttonStyle}>
          decrease
        </button>
      </div>

      <div className='row' {...rowStyle}>
        <p>under some conditions, U need trigger a global reset</p>
        <button
          style={buttonStyle}
          onClick={() => {
            dispatch({type: 'global/reset'})
          }}
        >
          global/reset
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
