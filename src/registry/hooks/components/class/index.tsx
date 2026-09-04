import * as React from 'react'

/**
 * Props for the `<Class>` className-injection component.
 */
export interface ClassProps {
  /** The CSS class name(s) to clone and merge onto the child element. */
  className: string
  /** Single React child element to receive the className. */
  children: React.ReactElement<{ className?: string }>
}

/**
 * Injects or merges classNames directly onto a single child React element.
 *
 * @param {ClassProps} props - Component props.
 * @returns {React.ReactElement} The cloned child element with merged classNames.
 *
 * @example
 * <Class className="hover:scale-105 transition-transform">
 *   <Button variant="primary">Click Me</Button>
 * </Class>
 */
export function Class({ className, children }: ClassProps): React.ReactElement {
  if (!React.isValidElement(children)) {
    return children
  }

  const existingClassName = children.props.className || ''
  const mergedClassName = existingClassName ? `${existingClassName} ${className}` : className

  return React.cloneElement(children, {
    className: mergedClassName,
  })
}
