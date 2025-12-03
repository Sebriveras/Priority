import { useState, useEffect } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBoxOutlined";

export const Checkbox = ({ isClicked, isChecked }) => {
  const [checked, setChecked] = useState(isChecked);

  // Sincroniza checked visual cuando isChecked cambie desde afuera
  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  // Seleccionar componente dinámico
  const Icon = checked ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

  return (
    <div className="flex items-center justify-center w-8 h-8">
      <Icon
      className="text-slate-500 dark:text-slate-400 cursor-pointer"
      onMouseEnter={() => setChecked(!isChecked)} // ← invertir estado inicial
      onMouseLeave={() => setChecked(isChecked)}   // ← regresar al estado inicial
      onClick={isClicked}/>
    </div>

  );
};
