import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import PublicationInfoId from './page'

describe('[Page]: PublicationInfoId `/dashboard/:id`', () => {
  test('initial props', () => {
    render(<PublicationInfoId params={{ id: 1234 }} />)

    expect(
      screen.getByRole('heading', { name: /project id: 1234/i })
    ).toBeTruthy()
  })
})
