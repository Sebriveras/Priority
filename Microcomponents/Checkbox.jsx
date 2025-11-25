import { useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBoxOutlined";

export const Checkbox = ({clicked}) => {
  const [hover, setHover] = useState(false);

  const Icon = hover ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

  return (
    <Icon
      className="text-slate-500 cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={clicked}
    />
  );
};