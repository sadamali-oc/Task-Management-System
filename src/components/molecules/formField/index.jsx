import React from 'react'
import InputText from '../../atoms/inputText';
import ErrorMessage from '../../atoms/ErrorMessage';

const FormField = ({ label, value, onChange, error, multiline = false }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <InputText label={label} value={value} onChange={onChange} error={error} multiline={multiline} />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default FormField;