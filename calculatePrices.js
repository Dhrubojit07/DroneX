import { getCartProductFromLS } from "./getCartProducts";

export function updateCartPrices() {
  const cartProducts = getCartProductFromLS();
  const subtotal = cartProducts.reduce((acc, cur) => acc + cur.price, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  document.querySelector('.productSubTotal').textContent = 
    subtotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  document.querySelector('.productTax').textContent = 
    tax.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  document.querySelector('.productFinalTotal').textContent = 
    total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
}

// Initialize prices when page loads
document.addEventListener('DOMContentLoaded', () => {
  updateCartPrices();
});