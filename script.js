// address array to show different addresses
let address = [
  {
    name: "Tanay Raikuwar",
    number: 9999433454,
    pinCode: 444654,
    Address: "Near Government Polytechnic, Gadge Nagar",
    city: "Amravati",
    state: "Maharashtra",
  },
  {
    name: "Ritesh Deshmukh",
    number: 999999998,
    pinCode: 443232,
    Address: "Near Tekwani Store, Main Road",
    city: "Patna",
    state: "Uttar Pradesh",
  },
  {
    name: "Yogi Patil",
    number: 9943439998,
    pinCode: 444545,
    Address: "Shirbahte Nagar, Hadapsar",
    city: "Pune",
    state: "Maharashtra",
  },
];

// array to show quantity of products
let cart = {
  arduinoUno: {
    quantity: 1,
  },
  BbcMicroBit: {
    quantity: 1,
  },
};

let TotalMoney; //Variable initialization to store Total money value

let { arduinoUno, BbcMicroBit } = cart; //Distructure cart object
const form = document.getElementById("creditForm"); //To access credit form tag
let cartContainer = document.getElementsByClassName("main-container")[0]; //To access Cart container div
let paymentSection = document.getElementsByClassName("paymentSection")[0]; //To access Payment section div

// function to update cart
let updateCart = () => {
  let productTotal = {
    arduinoUno: {
      total: 1500 * arduinoUno.quantity,
    },
    BbcMicroBit: {
      total: 600 * BbcMicroBit.quantity,
    },
  };
  let product1Total = document.getElementById("product1_Total");
  let product1Quantity = document.getElementById("product1_Quantity");
  let product2Total = document.getElementById("product2_Total");
  let product2Quantity = document.getElementById("product2_Quantity");

  let allTotal = document.getElementById("allTotal");

  product1Quantity.innerText = arduinoUno.quantity;
  product1Total.innerText = productTotal.arduinoUno.total;

  product2Quantity.innerText = BbcMicroBit.quantity;
  product2Total.innerText = productTotal.BbcMicroBit.total;
  TotalMoney = productTotal.arduinoUno.total + productTotal.BbcMicroBit.total;
  allTotal.innerText = TotalMoney;

  let payButton = document.getElementById("payButton");
  payButton.innerHTML = `<button type="submit" class="btn btn-primary">Pay ₹${TotalMoney}</button>`;
};

// function to add product to cart
let addToCart = (productName) => {
  let quantity = cart[productName].quantity;
  cart[productName].quantity = quantity + 1;
  Toastify({
    text: "New Item Added!",
    duration: 3000, // Duration in milliseconds
    gravity: "top", // Position of toast notification
    position: "center", // Position of toast notification
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Background color of toast notification
    stopOnFocus: true, // Stop timer if notification is clicked
  }).showToast();
  updateCart();
};

// function to remove product from cart
let removeFromCart = (productName) => {
  let quantity = cart[productName].quantity;
  if (quantity === 0) {
    alert("This Product Cart is Already Empty!");
    return;
  } else if (window.confirm("Are you sure want to remove this item?")) {
    cart[productName].quantity = quantity - 1;
    updateCart();
  }
};

// function to disable cart and go to Shipping address section
let disableCart = () => {
  if (arduinoUno.quantity === 0 && BbcMicroBit.quantity === 0) {
    alert("Cart is empty! Please add some product.");
    return;
  } else {
    cartContainer.classList.remove("active");
    paymentSection.classList.add("active");
    updateAddress();
  }
};

// function to go one step back to home page
let goPrev = () => {
  paymentSection.classList.remove("active");
  cartContainer.classList.add("active");
};

// function to update address and add three addresses
let updateAddress = () => {
  let addresses = document.getElementById("radio-group");
  let innerData = "";
  for (let i = 0; i < address.length; i++) {
    innerData += `<div id="radio-group">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="addressRadio"
            id="flexRadioDefault${i + 1}"
            value=${i}
            ${i == 0 ? "checked" : ""}
          />
          <label class="form-check-label" for="flexRadioDefault${i + 1}">
            <strong>${address[i].name}, ${address[i].number}</strong>, ${
      address[i].Address
    }, ${address[i].city}, ${address[i].state}, ${address[i].pinCode}
          </label>
        </div>`;
  }
  addresses.innerHTML = innerData;
};

// function to open credit card section to pay money
let proceedToPayment = () => {
  let paymentDiv = document.getElementsByClassName("section-creditCard")[0];
  paymentDiv.classList.add("active");
};

// function to close credit cart form section
let closeCreditSection = () => {
  let paymentDiv = document.getElementsByClassName("section-creditCard")[0];
  paymentDiv.classList.remove("active");
};

// This function is used at success message section to go Home cart and product section
let goToHomePayment = () => {
  location.reload();
};

//This submit event listner is used to pay amount through credit card
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let cardNumber = "";
  let ccNumber = document.getElementById("cc-number");
  let ccExpiration = document.getElementById("cc-expiration");
  let ccCvv = document.getElementById("cc-cvv");

  const formData = new FormData(form);

  const data = {};

  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  console.log(data);
  cardNumber = data.ccNumber;
  console.log(data.ccNumber);

  if (
    ccNumber.value.length < 16 ||
    ccExpiration.value.lenght < 5 ||
    ccCvv.value.length < 3
  ) {
    alert(
      "Please fill form carefully. Some fields may fill incorrectly or form is empty! "
    );
  } else {
    paymentSection.classList.remove("active");
    let paymentSuccess = document.getElementsByClassName("paymentSuccess")[0];
    paymentSuccess.classList.add("active");
    let successText = document.getElementById("successText");
    let element = document.getElementsByName("addressRadio");

    for (i = 0; i < element.length; i++) {
      if (element[i].checked) {
        let myAddress = address[element[i].value];
        successText.innerHTML = `<p> Order will be delivered to <strong>${
          myAddress.name
        }</strong> and payment is done through <strong>Credit Card</strong> with ending number **** ${cardNumber.slice(
          -4
        )} </p>`;
      }
    }
  }

  form.reset();
});

if (!navigator.onLine)
  alert("Device is not connected to internet! Application may misbehave. ");

if (document.getElementsByClassName("main-container")[0]) {
  updateCart();
}
