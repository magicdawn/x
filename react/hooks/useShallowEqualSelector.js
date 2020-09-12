import {useSelector, shallowEqual} from 'react-redux'

/**
 * https://react-redux.js.org/api/hooks#recipe-useshallowequalselector
 */

export default function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual)
}
