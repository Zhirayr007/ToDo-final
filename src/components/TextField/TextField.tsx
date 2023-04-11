import React, { memo } from 'react';
import { TextFieldProps } from './TextField.types';
import './TextField.css';

function TextFieldMemo({
  label,
  placeholder,
  containerClassName = '',
  inputType,
  value,
  onChange,
  errorText,
  onBlurValue,
}: TextFieldProps) {
  return (
    <div className={`mb-3 ${containerClassName}`}>
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <input
        onBlur={onBlurValue}
        type={inputType}
        className="form-control"
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errorText && <div className="invalid">{errorText}</div>}
    </div>
  );
}

export const TextField = memo(TextFieldMemo);
