import React from 'react'
import styled from '@emotion/styled'

const StyledButton = styled.button`
  padding: 32px;
  background: var(--color-brand-main);
  font-size: var(--size-font-base);
  border-radius: 4em;
  border: none;
  color: white;
  &:hover {
    background: var(--color-brand-main);
    color: black;
  }
`

export interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}
