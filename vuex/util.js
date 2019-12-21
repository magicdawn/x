import assert from 'assert'
import _ from 'lodash'

/**
 * set the store instance
 */

let $store
export function setStore(s) {
  $store = s
}

/**
 * namespace = a/b
 */
const assertNamespace = namespace => {
  assert(namespace, 'namespace can not be empty')
  assert(typeof namespace === 'string', 'namespace must be a string')
}

/**
 * get props
 */

export function propsFactory({namespace, keys}) {
  if (!Array.isArray(keys)) keys = [keys]
  assertNamespace(namespace)

  const ret = {}
  for (let key of keys) {
    ret[key] = propFactory({namespace, key})
  }
  return ret
}

/**
 * get a single prop
 */

export function propFactory({namespace, key}) {
  assertNamespace(namespace)
  return {
    get: getterFactory({namespace, key}),
    set: setterFactory({namespace, key}),
  }
}

/**
 * get getters
 */

export function gettersFactory({namespace, keys}) {
  if (!Array.isArray(keys)) keys = [keys]
  assertNamespace(namespace)
  // debugger

  const ret = {}
  for (let key of keys) {
    ret[key] = getterFactory({namespace, key})
  }
  return ret
}

/**
 * get a single getter
 */

export function getterFactory({namespace, key}) {
  assertNamespace(namespace)
  return function() {
    // debugger
    const state = $store.state
    namespace = namespace.replace(/\//g, '.') // a/b -> a.b
    return _.get(state, `${namespace}.${key}`)
  }
}

/**
 * get a single setter
 */

export function setterFactory({namespace, key}) {
  assertNamespace(namespace)
  return function(val) {
    const mutation = `${namespace}/save`
    $store.commit(mutation, {[key]: val})
  }
}
