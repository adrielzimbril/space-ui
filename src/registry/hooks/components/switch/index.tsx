import * as React from 'react'

/**
 * Props for the `<Case>` branch component.
 */
export interface CaseProps {
  /** The condition for this branch to match. */
  condition: boolean | (() => boolean)
  /** The content to render if this branch is matched. */
  children: React.ReactNode
}

/**
 * Individual conditional branch used inside a `<Switch>` container.
 *
 * @param {CaseProps} props - Component props.
 */
export function Case({ children }: CaseProps): React.ReactNode {
  return <>{children}</>
}

/**
 * Props for the `<Default>` fallback branch component.
 */
export interface DefaultProps {
  /** Fallback content to render when no `<Case>` matches. */
  children: React.ReactNode
}

/**
 * Fallback branch rendered inside a `<Switch>` container when no `<Case>` matches.
 *
 * @param {DefaultProps} props - Component props.
 */
export function Default({ children }: DefaultProps): React.ReactNode {
  return <>{children}</>
}

/**
 * Props for the `<Switch>` container component.
 */
export interface SwitchProps {
  /** Child elements containing `<Case>` and optional `<Default>` branches. */
  children: React.ReactNode
}

/**
 * Declarative pattern-matching switch-case container component.
 *
 * @param {SwitchProps} props - Component props.
 * @returns {React.ReactNode} The first matching branch or default fallback.
 *
 * @example
 * <Switch>
 *   <Case condition={status === 'loading'}><Spinner /></Case>
 *   <Case condition={status === 'error'}><ErrorMessage /></Case>
 *   <Case condition={status === 'success'}><Dashboard /></Case>
 *   <Default><Placeholder /></Default>
 * </Switch>
 */
export function Switch({ children }: SwitchProps): React.ReactNode {
  let defaultChild: React.ReactNode = null
  const childArray = React.Children.toArray(children)

  for (const child of childArray) {
    if (!React.isValidElement(child)) continue

    if (child.type === Default) {
      defaultChild = child
      continue
    }

    if (child.type === Case) {
      const condition = (child.props as CaseProps).condition
      const isMatch = typeof condition === 'function' ? condition() : condition
      if (isMatch) {
        return child
      }
    }
  }

  return defaultChild
}
