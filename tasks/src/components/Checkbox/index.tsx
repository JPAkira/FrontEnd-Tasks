import { useState } from "react";
import {
    FaCheck,
    FaCheckCircle,
    FaCheckDouble,
    FaCheckSquare,
    FaDropbox,
    FaFoursquare,
    FaRegSquare,
    FaToolbox
} from "react-icons/fa";
import {LabelInput} from "../LabelInput";

interface CheckboxProps {
  label: string;
}

const Checkbox = ({ label }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label>
      <span style={{cursor: "pointer"}} onClick={handleOnChange}>
        {isChecked && <FaCheckSquare />}
        {!isChecked && <FaRegSquare />}
          <LabelInput marginl="10px">{label}</LabelInput>
      </span>
    </label>
  );
};

export default Checkbox;