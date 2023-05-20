import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './page'

describe('[Page]: Home `/`', () => {
  test('initial props', () => {
    render(<Home />)

    expect(
      screen.getByRole('img', {
        name: /logo/i,
      })
    ).toBeTruthy()

    expect(
      screen.getByRole('heading', {
        name: /hey there! 👋/i,
      })
    )

    expect(screen.getByText('Login')).toBeTruthy()
    expect(screen.getByText('Login to continue')).toBeTruthy()
  })
})
