import { shallowMount } from '@vue/test-utils'

import AttributeSelector from '@/components/AttributeSelector.vue'
import { attributeEnum } from '@/types'

const updateAttribute = jest.fn()

const wrapper = shallowMount(AttributeSelector, {
  propsData: {
    attribute: attributeEnum.SIZE,
    attrOptions: ['36', '38'],
    selectedValue: '36'
  },
  methods: {
    updateAttribute
  }
})

describe('AttributeSelector component', () => {
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.findAll('.button').length).toBe(2)
  })

  it('tests if only first button is selected', () => {
    expect(wrapper.findAll('.button').at(0).classes('button--selected')).toBe(true)
    expect(wrapper.findAll('.button').at(1).classes('button--selected')).toBe(false)
  })

  it('triggers updateAttribute method', async () => {
    await wrapper.find('.button').trigger('click')
    expect(updateAttribute).toHaveBeenCalled()
  })
})
