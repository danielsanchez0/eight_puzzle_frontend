import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

function Menu(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        {...args}
        style={{
          backgroundColor: "#ffc107",
        }}
      >
        <NavbarBrand href="/">Sistemas Inteligentes I</NavbarBrand>
      </Navbar>
    </div>
  );
}

export default Menu;
