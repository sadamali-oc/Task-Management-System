import React from 'react';
import BasicLabel from '../basicLabel';

export default {
  title: 'Atoms/Label',  
  component: BasicLabel,    
};

export const Default = () => <BasicLabel htmlFor="email">Email Address</BasicLabel>;

export const WithCustomStyles = () => (
  <BasicLabel htmlFor="email" style={{ fontWeight: 'bold', color: 'blue' }}>
    Email Address
  </BasicLabel>
);

export const WithRequiredText = () => (
  <BasicLabel htmlFor="email">
    Email Address <span style={{ color: 'red' }}>*</span>
  </BasicLabel>
);
