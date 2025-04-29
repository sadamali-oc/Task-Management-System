import React, { useState } from 'react';
import InputText from '../inputText';

export default {
  title: 'Atoms/InputText',
  component: InputText,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

const Template = (args) => {
  const [value, setValue] = useState(args.value || '');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return <InputText {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Enter your Name',
  value: 'Enter your Name',
};


