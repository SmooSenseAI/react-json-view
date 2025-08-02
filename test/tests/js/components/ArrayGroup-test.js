import React from 'react'
import { render, shallow, mount } from 'enzyme'
import { expect } from 'chai'

import ArrayGroup from './../../../../src/js/components/ArrayGroup'
import JsonObject from './../../../../src/js/components/DataTypes/Object'
import JsonString from './../../../../src/js/components/DataTypes/String'

describe('<ArrayGroup />', function () {
  const largeArray = new Array(15).fill('test')

  it('ArrayGroup mount', function () {
    const wrapper = render(
      <ArrayGroup
        groupArraysAfterLength={5}
        namespace='test'
        name='test'
        src={largeArray}
        theme='rjv-default'
        jsvRoot={false}
        indentWidth={4}
      />
    )

    expect(wrapper.find('.array-group').length).to.equal(3)
  })

  it('ArrayGroup expands and collapses', function () {
    const wrapper = shallow(
      <ArrayGroup
        groupArraysAfterLength={5}
        namespace={['test']}
        name='test'
        src={largeArray}
        theme='rjv-default'
        jsvRoot={false}
        indentWidth={4}
      />
    )

    wrapper.find('.array-group-brace').first().simulate('click')

    expect(wrapper.state().expanded[0]).to.equal(true)

    wrapper
      .find('.array-group')
      .first()
      .find('.icon-container')
      .simulate('click')

    expect(wrapper.state().expanded[0]).to.equal(false)
  })

  it('ArrayGroup displays arrays on expansion', function () {
    const wrapper = mount(
      <ArrayGroup
        groupArraysAfterLength={5}
        namespace={['test']}
        name='test'
        src={largeArray}
        theme='rjv-default'
        jsvRoot={false}
        indentWidth={4}
      />
    )

    wrapper.setState({ expanded: { 0: true } })

    expect(wrapper.find(JsonObject).length).to.equal(1)

    expect(wrapper.find(JsonObject).find(JsonString).length).to.equal(5)
  })

  it('ArrayGroup paginates groups accurately', function () {
    const testArray = new Array(17).fill('test')

    const wrapper = mount(
      <ArrayGroup
        groupArraysAfterLength={5}
        namespace={['test']}
        name='test'
        src={testArray}
        theme='rjv-default'
        jsvRoot={false}
        indentWidth={4}
      />
    )

    expect(wrapper.find('.array-group').length).to.equal(4)

    wrapper.setState({ expanded: { 3: true } })

    expect(
      wrapper.find('.array-group').last().find(JsonString).length
    ).to.equal(2)
  })

  it('ArrayGroup renders at root', function () {
    const wrapper = render(
      <ArrayGroup
        groupArraysAfterLength={5}
        namespace={['test']}
        name='test'
        src={largeArray}
        theme='rjv-default'
        jsvRoot
        indentWidth={4}
      />
    )

    expect(wrapper.find('.array-group').length).to.equal(3)
  })

  it('ArrayGroup limits displayed groups with numberOfArrayGroupsToDisplay', function () {
    const testArray = new Array(25).fill('test')

    const wrapper = render(
      <ArrayGroup
        groupArraysAfterLength={5}
        numberOfArrayGroupsToDisplay={2}
        namespace={['test']}
        name='test'
        src={testArray}
        theme='rjv-default'
        jsvRoot={false}
        indentWidth={4}
      />
    )

    // Should only display 2 groups instead of 5
    expect(wrapper.find('.array-group').length).to.equal(2)

    // Should show ellipsis
    expect(wrapper.find('.object-key-val.array-group-ellipsis').length).to.equal(1)
  })

  it('ArrayGroup shows no ellipsis when all groups are displayed', function () {
    const testArray = new Array(10).fill('test')

    const wrapper = render(
      <ArrayGroup
        groupArraysAfterLength={5}
        numberOfArrayGroupsToDisplay={3}
        namespace={['test']}
        name='test'
        src={testArray}
        theme='rjv-default'
        jsvRoot={false}
        indentWidth={4}
      />
    )

    // Should display all 2 groups
    expect(wrapper.find('.array-group').length).to.equal(2)

    // Should not show ellipsis
    expect(wrapper.find('.object-key-val.array-group-ellipsis').length).to.equal(0)
  })

  it('ArrayGroup shows all groups when numberOfArrayGroupsToDisplay is null (default behavior)', function () {
    const testArray = new Array(25).fill('test')

    const wrapper = render(
      <ArrayGroup
        groupArraysAfterLength={5}
        numberOfArrayGroupsToDisplay={null}
        namespace={['test']}
        name='test'
        src={testArray}
        theme='rjv-default'
        jsvRoot={false}
        indentWidth={4}
      />
    )

    // Should display all 5 groups
    expect(wrapper.find('.array-group').length).to.equal(5)

    // Should not show ellipsis
    expect(wrapper.find('.object-key-val.array-group-ellipsis').length).to.equal(0)
  })


})
