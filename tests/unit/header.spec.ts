import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

const wrapper = shallowMount(Header)

describe('Header component', () => {
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('h2').exists()).toBe(true)
  })
})
