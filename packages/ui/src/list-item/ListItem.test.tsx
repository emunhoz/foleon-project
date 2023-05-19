import { describe, test, expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import { ListItem } from './ListItem'

describe('[Component]: ListItem', () => {
  test('render initial component', () => {
    render(<ListItem created_on="19/06/2023" name="My project" />)

    screen.logTestingPlaygroundURL()
    expect(screen.getByText(/my project/i)).toBeDefined()
    expect(screen.getByText(/19\/06\/2023/i)).toBeDefined()
  })
})
