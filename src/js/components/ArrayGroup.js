import React from 'react'
import Theme from './../themes/getStyle'

import VariableMeta from './VariableMeta'
import ObjectName from './ObjectName'
import ObjectComponent from './DataTypes/Object'

// icons
import { CollapsedIcon, ExpandedIcon } from './ToggleIcons'

// single indent is 5px
const SINGLE_INDENT = 5

export default class extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      expanded: []
    }
  }

  toggleCollapsed = i => {
    const newExpanded = []
    for (const j in this.state.expanded) {
      newExpanded.push(this.state.expanded[j])
    }
    newExpanded[i] = !newExpanded[i]
    this.setState({
      expanded: newExpanded
    })
  }

  getExpandedIcon (i) {
    const { theme, iconStyle } = this.props

    if (this.state.expanded[i]) {
      return <ExpandedIcon {...{ theme, iconStyle }} />
    }

    return <CollapsedIcon {...{ theme, iconStyle }} />
  }

  render () {
    const {
      src,
      groupArraysAfterLength,
      numberOfArrayGroupsToDisplay,
      depth,
      name,
      theme,
      jsvRoot,
      namespace,
      parent_type,
      ...rest
    } = this.props

    let objectPaddingLeft = 0

    const arrayGroupPaddingLeft = this.props.indentWidth * SINGLE_INDENT

    if (!jsvRoot) {
      objectPaddingLeft = this.props.indentWidth * SINGLE_INDENT
    }

    const size = groupArraysAfterLength
    const groups = Math.ceil(src.length / size)
    const displayGroups = numberOfArrayGroupsToDisplay !== null && numberOfArrayGroupsToDisplay !== undefined ? Math.min(groups, numberOfArrayGroupsToDisplay) : groups
    const hasMoreGroups = groups > displayGroups

    return (
      <div
        className='object-key-val'
        {...Theme(theme, jsvRoot ? 'jsv-root' : 'objectKeyVal', {
          paddingLeft: objectPaddingLeft
        })}
      >
        <ObjectName {...this.props} />

        <span>
          <VariableMeta size={src.length} {...this.props} />
        </span>
        {[...Array(displayGroups)].map((_, i) => (
          <div
            key={i}
            className='object-key-val array-group'
            {...Theme(theme, 'objectKeyVal', {
              marginLeft: 6,
              paddingLeft: arrayGroupPaddingLeft
            })}
          >
            <span {...Theme(theme, 'brace-row')}>
              <div
                className='icon-container'
                {...Theme(theme, 'icon-container')}
                onClick={e => {
                  this.toggleCollapsed(i)
                }}
              >
                {this.getExpandedIcon(i)}
              </div>
              {this.state.expanded[i]
                ? (
                  <ObjectComponent
                    key={name + i}
                    depth={0}
                    name={false}
                    collapsed={false}
                    groupArraysAfterLength={size}
                    index_offset={i * size}
                    src={src.slice(i * size, i * size + size)}
                    namespace={namespace}
                    type='array'
                    parent_type='array_group'
                    theme={theme}
                    showComma={this.props.showComma}
                    isLast={i === displayGroups - 1 && !hasMoreGroups}
                    {...rest}
                  />
                  )
                : (
                  <span
                    {...Theme(theme, 'brace')}
                    onClick={e => {
                      this.toggleCollapsed(i)
                    }}
                    className='array-group-brace'
                  >
                    [
                    <div
                      {...Theme(theme, 'array-group-meta-data')}
                      className='array-group-meta-data'
                    >
                      <span className='object-size' {...Theme(theme, 'object-size')}>
                        {i * size}
                        {' - '}
                        {i * size + size > src.length
                          ? src.length
                          : i * size + size}
                      </span>
                    </div>
                    ]
                  </span>
                  )}
            </span>
          </div>
        ))}
        {hasMoreGroups && (
          <div
            className='object-key-val array-group-ellipsis'
            {...Theme(theme, 'objectKeyVal', {
              marginLeft: 6,
              paddingLeft: arrayGroupPaddingLeft
            })}
          >
            <span {...Theme(theme, 'brace-row')}>
              <span {...Theme(theme, 'brace')} className='array-group-ellipsis'>
                ...
              </span>
            </span>
          </div>
        )}
      </div>
    )
  }
}
