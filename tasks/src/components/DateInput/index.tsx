import React, { useState } from 'react';
import {DatetimeInputStyle} from "./style";

interface DatetimeInputProps {
  readonly width: string;
}

const DatetimeInput: React.FC<DatetimeInputProps> = (props) => {
  const [datetime, setDatetime] = useState(new Date());

  const handleDatetimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDatetime = new Date(event.target.value);
    setDatetime(newDatetime);
  };

  return (
      <DatetimeInputStyle
        type="datetime-local"
        width={props.width}
        id="datetime"
        name="datetime"
        value={datetime.toISOString().slice(0, 16)}
        onChange={handleDatetimeChange}
      />
  );
};

export default DatetimeInput;