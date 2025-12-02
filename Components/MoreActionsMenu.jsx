import React, { useState, useRef, useEffect } from "react";
import { Menu } from "./Menu";
import { IconButton } from "../Microcomponents/IconButton";

export const MoreActionsMenu = ({onOptionClick}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = (state) => {
    setOpen(false);
    onOptionClick(state)
  }

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <div ref={buttonRef}>
        <IconButton
          icon="moreActions"
          type="default"
          onButtonClick={handleToggle}
        />
      </div>

      {open && (
        <div
          ref={menuRef}
          className="absolute top-0 right-full ml-2" // <-- aquí se coloca a la derecha del botón
        >
          <Menu onOptionClick={handleClose} />
        </div>
      )}
    </div>
  );
};
