import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { EmptyState } from './EmptyState'

describe('[Component]: EmptyState', () => {
  test('renders component with props', () => {
    render(<EmptyState title="My title" message="Message body" />)
    expect(screen.getByText('My title')).toBeDefined()
    expect(screen.getByText('Message body')).toBeDefined()
  })
})
