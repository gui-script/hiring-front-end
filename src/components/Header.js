import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import imageIntro from "../img/ilustraIntro.png";

export default function Header() {
  return (
    <header>
      <div className="inner-content">
        <div className="left-side">
          <h2>Aproveite o nosso saldão com as maiores pechinchas!</h2>
          <p>
            Descubra ofertas incríveis e os melhores preços em uma variedade de
            produtos. Economizar nunca foi tão fácil e divertido. Aproveite
            nossas promoções exclusivas e faça suas compras inteligentes hoje
            mesmo!
          </p>
          <Link to="/products" className="see-more-btn">
            <span>Comprar Agora</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
        <div className="right-side">
          <img src={imageIntro} alt="Products" />
        </div>
      </div>
    </header>
  );
}
