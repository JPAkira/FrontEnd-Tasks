import React, { useState } from 'react';
import {DatetimeInputStyle} from "./style";

interface DatetimeInputProps {
  readonly width: string;
  onChange: (value: Date) => void;
}

const DatetimeInput: React.FC<DatetimeInputProps> = ({width, onChange}) => {
  const [datetime, setDatetime] = useState(new Date());

  const handleDatetimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDatetime = new Date(event.target.value);
    onChange(newDatetime);
    setDatetime(newDatetime)
  };

  return (
      <DatetimeInputStyle
        type="datetime-local"
        width={width}
        id="datetime"
        name="datetime"
        value={datetime.toISOString().slice(0, 16)}
        onChange={handleDatetimeChange}
      />
  );
};

export default DatetimeInput;