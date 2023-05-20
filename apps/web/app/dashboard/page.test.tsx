import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Dashboard from './page'

describe('[Page]: Dashboard `/dashboard`', () => {
  test('initial props', () => {
    render(<Dashboard />)

    expect(
      screen.getByRole('img', {
        name: /logo/i,
      })
    ).toBeTruthy()

    expect(
      screen.getByRole('button', {
        name: /logout/i,
      })
    )

    expect(
      screen.getByRole('searchbox', {
        name: /searchlist/i,
      })
    ).toBeTruthy()

    expect(screen.getByText(/total items:/i)).toBeTruthy()
    expect(screen.getByText(/items per page:/i)).toBeTruthy()

    screen.logTestingPlaygroundURL()
  })
})
