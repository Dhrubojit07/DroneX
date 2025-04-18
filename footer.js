const footerHTML = `
  <footer class="section-footer">
      <div class="footer-container container">
        <div class="content_1">
          <img src="./images/logo.png" alt="DroneX logo" />
          <p>
            Welcome to DroneX, your premier destination for cutting-edge drones<br> 
            and professional-grade aerial solutions!
          </p>
          <img src="https://i.postimg.cc/Nj9dgJ98/cards.png" alt="payment methods" />
        </div>
        <div class="content_2">
          <h4>DRONE SOLUTIONS</h4>
          <a href="#">Consumer Drones</a>
          <a href="#">Professional Drones</a>
          <a href="#">FPV Racing Kits</a>
          <a href="#">Bundle Offers</a>
        </div>
        <div class="content_3">
          <h4>SUPPORT</h4>
          <a href="./contact.html">Contact Our Pilots</a>
          <a href="#">Warranty & Services</a>
          <a href="#">Shipping Policy</a>
          <a href="#">FAQ Section</a>
        </div>
        <div class="content_4">
          <h4>FLY WITH US</h4>
          <p>Get exclusive updates on new drone<br>models and member discounts!</p>
          <div class="f-mail">
            <input type="email" placeholder="Enter your pilot email" />
            <i class="bx bx-envelope"></i>
          </div>
          <hr />
        </div>
      </div>
      <div class="f-design">
        <div class="f-design-txt">
          <p>Designed and Developed by Dhrubojit Chowdhury</p>
        </div>
      </div>
    </footer>`;

const footerElem = document.querySelector(".section-footer");
footerElem.insertAdjacentHTML("afterbegin", footerHTML);
