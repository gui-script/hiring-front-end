import React from "react";
import logoIcon from "../img/icons/logo.svg"

export default function Footer() {
  return (
    <footer>
        <img src={logoIcon} className="logo-footer" />

        <p className="copyright">
          GuiScript - Copyright 2024 - Alguns Direitos Reservados
        </p>
    </footer>
  );
}
