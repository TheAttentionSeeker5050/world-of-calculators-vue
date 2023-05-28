// import { describe, it, expect } from 'vitest'

// import { mount } from '@vue/test-utils'
// // import HelloWorld from '../HelloWorld.vue'
// import App from  "../App.vue"

// describe('HelloWorld', () => {
//   it('renders properly', () => {
//     const wrapper = mount(App, { props: { msg: 'Hello Vitest' } })
//     expect(wrapper.text()).toContain('Hello Vitest')
//   })
// })

import { expect, it } from 'vitest'

// mock test
it('toUpperCase', () => {
  const result = 'foobar'.toUpperCase()
  expect(result).toBe("FOOBAR")
})