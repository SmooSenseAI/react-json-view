import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'

import CopyToClipboard from './../../../../src/js/components/CopyToClipboard'

describe('<CopyToClipboard />', function () {
  it('CopyToClipboard clipboard should exist', function () {
    const wrapper = shallow(
      <CopyToClipboard
        src={{ test: true }}
        theme='rjv-default'
        clickCallback
        hidden={false}
      />
    )
    expect(wrapper.find('.copy-to-clipboard-container')).to.have.length(1)
  })

  it('CopyToClipboard clipboard should be hidden', function () {
    const wrapper = shallow(
      <CopyToClipboard
        src={{ test: true }}
        theme='rjv-default'
        clickCallback
        hidden
      />
    )
    // not sure how to test css attribute
    expect(wrapper.find('.copy-to-clipboard-container')).to.have.length(1)
  })

  it('CopyToClipboard should handle server-side rendering gracefully', function () {
    // Mock server environment by temporarily removing document and navigator
    const originalDocument = global.document
    const originalNavigator = global.navigator
    
    delete global.document
    delete global.navigator

    const wrapper = shallow(
      <CopyToClipboard
        src={{ test: true }}
        theme='rjv-default'
        clickCallback={() => {}}
        hidden={false}
      />
    )

    // Should render without throwing errors
    expect(wrapper.find('.copy-to-clipboard-container')).to.have.length(1)

    // Restore global objects
    global.document = originalDocument
    global.navigator = originalNavigator
  })
})
