//error when retrieving data from localStorage handled 
let checkoutSummary;
try {
    checkoutSummary = JSON.parse(localStorage.getItem("cart"));//valid json expected 
    if (!checkoutSummary) throw new Error("Cart is empty");
} catch (error) {
    alert("Error loading cart: " + error.message);
    window.location.href = 'index.html';
}

if (!checkoutSummary || checkoutSummary.length === 0) {
    window.location.href = 'index.html';
} else {
    const containerDiv = document.querySelector('.checkOut-div');
    const quantity = checkoutSummary.length;

    // heading once, outside loop
    containerDiv.innerHTML = `<h3>Order Summary (${quantity} items)</h3> `;

    for (let item of checkoutSummary) {
        const summaryHTML = document.createElement('div');
        summaryHTML.innerHTML = `
        <p>${item.name} - UGX ${item.price}</p>
    `;
        containerDiv.appendChild(summaryHTML);
    }
//GLOSH 
  const subTotalAmount = checkoutSummary.reduce((total, item) => total + item.price, 0);
    const taxAmount = 0.18 * subTotalAmount;
    containerDiv.innerHTML += `
    <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">
        <p><strong> Sub Total: UGX ${subTotalAmount}</strong></p>
         <p><strong>  Tax (18% VAT): UGX ${taxAmount}</strong></p>
          <p><strong> Order Total: UGX ${subTotalAmount + taxAmount}</strong></p>
    </div>
`;
   // console.log(totalAmount)

}



//grabbing inputs from input fileds 
document.querySelector('#checkout-form').addEventListener('submit', (e) => {
    //stops browser from sending http request allowing js handle the form submission
    e.preventDefault();

    try {
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const phone = document.querySelector('#phone').value;
        const address = document.querySelector('#address').value;

        // validate all fields filled
        if (!name || !email || !phone || !address) {
            throw new Error("All fields are required");
        }

        // validate email format
        if (!email.includes('@') || !email.includes('.')) {
            throw new Error("Invalid email format");
        }

        // validate phone - 10 digits
        if (!/^\d{10}$/.test(phone)) {
            throw new Error("Phone number must be 10 digits");
        }

        // validate cart not empty
        if (!checkoutSummary || checkoutSummary.length === 0) {
            throw new Error("Your cart is empty");
        }

        const customerDetails = {
            'user-name': name,
            'user-email': email,
            'user-phone': phone,
            'user-address': address,
            'cart-items': checkoutSummary
        }

        localStorage.setItem('savedUser', JSON.stringify(customerDetails));
        localStorage.removeItem('cart');
        alert("Order placed successfully!");
        window.location.href = 'index.html';

    } catch (error) {
        alert("Error: " + error.message);
    }
});
