import type { Meta, StoryObj } from '@storybook/react'
import { ListItem } from './ListItem'

const meta = {
  title: 'Components/ListItem',
  component: ListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof ListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    created_on: '01/01/2023',
    name: 'My list',
  },
}
