import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './page'

test('[Page]: Home', () => {
  render(<Home />)

  expect(
    screen.getByRole('button', {
      name: /hello there/i,
    })
  ).toBeTruthy()
})
