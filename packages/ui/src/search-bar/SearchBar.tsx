import { ChangeEvent, InputHTMLAttributes } from 'react'
import './SearchBar.css'

type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
  disabled?: boolean
  /**
   * Input value
   */
  value?: string
  /**
   * Placeholder for input
   */
  placeholder?: string
  /**
   * Label for input
   */
  labelName?: string
  /**
   * onChange callback
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export function SearchBar({
  value,
  placeholder,
  disabled,
  labelName,
}: SearchBarProps) {
  return (
    <div className="searchBar">
      <label className="searchBarLabel" htmlFor={labelName}>
        {labelName}
      </label>
      <div className="searchBarIcon">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 20L15.8033 15.8033C15.8033 15.8033 14 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 11.0137 17.9484 11.5153 17.85 12"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <input
        type="search"
        className="searchBarInput"
        id={labelName}
        name={labelName}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  )
}
