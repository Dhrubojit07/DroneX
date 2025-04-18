// razorpayPayment.js
import { updateCartPrices } from './calculatePrices.js';

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(window.Razorpay);
    };
    script.onerror = () => {
      resolve(null);
    };
    document.body.appendChild(script);
  });
};

export const handleRazorpayPayment = async () => {
  // Get final total with tax from calculatePrices
  const finalTotalElement = document.querySelector('.productFinalTotal');
  const finalTotal = parseFloat(
    finalTotalElement.textContent
      .replace(/[^0-9.-]+/g, '') // Remove currency symbols
  );

  const options = {
    key: 'rzp_test_J01Kbh9xdN0yoU',
    amount: Math.round(finalTotal * 100), // Convert to paise with tax
    currency: 'INR',
    name: 'DroneX Store',
    description: 'Drone Purchase',
    image: '/images/logo.png',
    handler: function(response) {
      alert(`Payment ID: ${response.razorpay_payment_id}`);
      localStorage.removeItem('cartProductLS');
      updateCartPrices(); // Refresh prices after clearing cart
    },
    prefill: {
      name: 'Test User',
      email: 'test@dronex.com',
      contact: '9999999999'
    },
    theme: {
      color: '#3399cc'
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  const Razorpay = await initializeRazorpay();
  if (!Razorpay) {
    console.error('Razorpay failed to load');
    return;
  }

  document.querySelector('.razorpay-payment-button').addEventListener('click', () => {
    // Ensure prices are updated before payment
    updateCartPrices();
    handleRazorpayPayment();
  });
});