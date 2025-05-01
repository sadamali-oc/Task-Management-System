import React from 'react'
import InputText from "../atoms/InputText";


const FormGroup = ({label,value,onChange,...props}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
    <InputText
      label={label}
      value={value}
      onChange={onChange}
      {...props}
    />
  </div>
  )
}

export default FormGroup