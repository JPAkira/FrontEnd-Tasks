import React, { useState } from 'react';
import {OptionInput, SelectInputStyle} from "./style";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectProps> = ({ options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <SelectInputStyle value={selectedValue} onChange={handleSelectChange}>
      {options.map((option) => (
        <OptionInput key={option.value} value={option.value}>
          {option.label}
        </OptionInput>
      ))}
    </SelectInputStyle>
  );
};

export default SelectInput;