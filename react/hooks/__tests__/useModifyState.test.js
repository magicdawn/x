import {act, renderHook, RenderHookResult} from '@testing-library/react-hooks'
import useModifyState from '../useModifyState'

describe('useModifyState', () => {
  test('modify object works', () => {
    const {result} = renderHook(() => useModifyState({}))
    const [obj, modifyObj] = result.current
    expect(obj).toEqual({})

    act(() => {
      modifyObj((o) => {
        o.testKey = 'testVal'
      })
    })
    expect(result.current[0].testKey).toBe('testVal')

    act(() => {
      modifyObj((o) => void (o.testKey = 'testVal2'))
    })
    expect(result.current[0].testKey).toBe('testVal2')

    act(() => {
      modifyObj((o) => {
        o.testKey = 'testVal3'
        return o
      })
    })
    expect(result.current[0].testKey).toBe('testVal3')

    act(() => {
      modifyObj((o) => {
        return {...o, testKey: 'testVal4'}
      })
    })
    expect(result.current[0].testKey).toBe('testVal4')
  })

  test('plain value works', () => {
    const {result} = renderHook(() => useModifyState(0))
    const [count, modifyCount] = result.current
    expect(count).toBe(0)

    act(() => {
      modifyCount((c) => ++c)
    })
    expect(result.current[0]).toBe(1)
  })
})
