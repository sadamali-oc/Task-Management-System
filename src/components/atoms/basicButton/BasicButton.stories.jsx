import BasicButton from '../basicButton';
import React from 'react';


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
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],  
    },
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

// Default story
export const Default = {
  args:{
    variant:'contained',
    color:'info',
    size:"large",  
    children:'Login',
  },
};

// Disabled story
export const Disabled = {
  args: {
    variant: 'outlined',
    color: 'error',
    size: 'medium',  
    children: "Can't Click",
    disabled: true,
  },
};
