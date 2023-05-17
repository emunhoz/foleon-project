import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { Button } from './Button'

describe('[Component]: Button', () => {
  test('renders headline', () => {
    render(<Button onClick={console.log} label="My button" />)
    expect(screen.getByText('My button')).toBeDefined()
  })
})
