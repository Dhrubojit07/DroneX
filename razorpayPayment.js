export const initializeRazorpayPayment = () => {
    // Get cart total
    const totalAmount = document.querySelector(".productFinalTotal").textContent;
    const numericAmount = Number(totalAmount.replace(/[^0-9.-]+/g, "")) * 100; // Convert to paise
  
    const options = {
      key: "rzp_test_J01Kbh9xdN0yoU", // From Razorpay Dashboard
      amount: numericAmount,
      currency: "INR",
      name: "DroneX",
      description: "Drone Purchase",
      image: "/public/images/logo.png",
      handler: function(response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
        // Clear cart
        localStorage.removeItem("cartProductLS");
        window.location.href = "/";
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#3399cc"
      }
    };
  
    const rzp = new Razorpay(options);
    rzp.open();
  };