import * as React from 'react'

/**
 * Props for the `<If>` conditional component.
 */
export interface IfProps {
  /** The boolean condition determining which child or fallback to render. */
  condition: boolean | (() => boolean)
  /** Optional fallback content rendered when `condition` is false. */
  fallback?: React.ReactNode
  /** Primary content rendered when `condition` is true. */
  children: React.ReactNode | (() => React.ReactNode)
}

/**
 * Declarative conditional rendering component.
 *
 * @param {IfProps} props - Component props.
 * @returns {React.ReactNode} The rendered element based on the condition.
 *
 * @example
 * <If condition={isLoggedIn} fallback={<LoginButton />}>
 *   <UserProfile />
 * </If>
 *
 * @example
 * <If condition={() => user.role === 'admin'}>
 *   {() => <AdminDashboard data={computeHeavyData()} />}
 * </If>
 */
export function If({ condition, fallback = null, children }: IfProps): React.ReactNode {
  const isTrue = typeof condition === 'function' ? condition() : condition

  if (isTrue) {
    return typeof children === 'function' ? (children as () => React.ReactNode)() : children
  }

  return fallback
}
