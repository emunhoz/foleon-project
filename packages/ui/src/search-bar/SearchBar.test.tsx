import { describe, test, expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import { SearchBar } from './SearchBar'

describe('[Component]: SearchBar', () => {
  test('render initial component', () => {
    render(
      <SearchBar
        onChange={console.log}
        placeholder="Search your project..."
        labelName="search"
      />
    )

    expect(
      screen.queryByPlaceholderText(/search your project.../i)
    ).toBeTruthy()

    expect(screen.getByText(/search/i)).toBeTruthy()
    expect(screen.getByRole('searchbox', { name: /search/i })).toBeTruthy()
  })
})
