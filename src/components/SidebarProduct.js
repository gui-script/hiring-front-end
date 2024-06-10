import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function SidebarProduct({
  id,
  avatar,
  name,
  price,
  removeProductFromCart,
  addToCartTotal,
}) {
  // Ensure price is a number
  const numericPrice = parseFloat(price.replace(",", "."));

  const [quantity, setQuantity] = useState(1);
  const [priceSum, setPriceSum] = useState(numericPrice);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) return;
    const newPriceSum = newQuantity * numericPrice;

    addToCartTotal(newPriceSum - priceSum);
    setQuantity(newQuantity);
    setPriceSum(newPriceSum);
  };

  const handleRemoveProduct = () => {
    removeProductFromCart(id);
    addToCartTotal(-priceSum);
  };

  return (
    <div className="sidebar-product">
      <div className="left-side">
        <button
          className="remove-product-btn"
          onClick={handleRemoveProduct}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="details">
          <h4>{name}</h4>
          <p>R$ {numericPrice.toFixed(2).replace(".", ",")}</p>
          <input
            type="number"
            min={1}
            max={100}
            value={quantity}
            onChange={handleQuantityChange}
          />
          {priceSum > numericPrice && (
            <p className="price-sum">
              <b>Soma: </b>
              R$ {priceSum.toFixed(2).replace(".", ",")}
            </p>
          )}
        </div>
      </div>

      <div className="right-side">
        <img src={avatar} alt={name} />
      </div>
    </div>
  );
}
