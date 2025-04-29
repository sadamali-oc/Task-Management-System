import BasicButton from '../basicButton';

const meta = {
  title: 'Atoms/BasicButton',
  component: BasicButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
    },
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

// Default story
export const Default = {
  args:{
    variant:"contained",
    color:'primary',
    children:'Click Me',
  },
};

// Disabled story
export const Disabled = {
  args:{
    variant:"outlined",
    color:"error",
    children:"Can't Click",
    disabled:true,
  },
};
