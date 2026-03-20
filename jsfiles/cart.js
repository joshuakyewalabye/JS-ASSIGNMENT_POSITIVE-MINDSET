let pickedCart = JSON.parse(localStorage.getItem("cart"));

//ensure each cart item has a quantity property
if (pickedCart) {
    pickedCart = pickedCart.map(item => ({ ...item, quantity: item.quantity || 1 }));
}

//returning items if true and retutning user back to product page if empty
if (!pickedCart) {
    alert("Your cart is empty...you will be redirected back to product page");
    //callback that runs the function after a set time t
    setTimeout(() => {
        window.location.href = "index.html";
    }, 5000); // 5 seconds delay
} else {
    //new div to store the items
    const htmlContainer = document.querySelector(".cart-item-div");

    //loops thru picked cart array and picks the objects
    for (let cartItemChosen of pickedCart) {
        const newHTMLCartItem = document.createElement("div");
        newHTMLCartItem.innerHTML = `<div class="product-card">
        <img src="${cartItemChosen.image}" alt="${cartItemChosen.name}" class="cart-img">
        <h3>${cartItemChosen.name}</h3>
        <p>UGX ${cartItemChosen.price}</p>
        <p>${cartItemChosen.category}</p>
        <div class="qty-controls">
            <button class="qty-btn minus">-</button>
            <span class="qty-display">${cartItemChosen.quantity}</span>
            <button class="qty-btn plus">+</button>
        </div>
        <button id="remove-item"> Remove</button>
    </div>`;
        htmlContainer.appendChild(newHTMLCartItem);

        const removeBtn = newHTMLCartItem.querySelector("#remove-item");
        removeBtn.addEventListener("click", () => {
            //picking out items that dont match the "removed"
            const updatedCart = pickedCart.filter(
                (itemTrashed) => itemTrashed.id !== cartItemChosen.id,
            );
            const savedCart = JSON.stringify(updatedCart);
            localStorage.setItem("cart", savedCart);
            //removing the element from DOM
            newHTMLCartItem.remove();
            //update the summary
            pickedCart = updatedCart;
            const newTotal = pickedCart.reduce(
                (total, item) => total + (item.price * item.quantity),
                0,
            );
            const tax = newTotal * 0.18;
            let orderCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0); //picks new length of cart
            document.querySelector("#order-summary").innerHTML = `
    <h3>Order Summary</h3>
     <p>Total Items :  (${orderCount})</p>
    <p>Items total: UGX ${newTotal}</p>
    <p>Tax (18%): UGX ${Math.round(tax)}</p>
    <p>Order total: UGX ${Math.round(newTotal + tax)}</p>
`;
            //on clearing whole cart redirect
            if (updatedCart.length === 0) {
                alert(
                    "You have removed all items from cart ...redirecting to product page ",
                );
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 4000);
            }
        });

        //increase quantity
        newHTMLCartItem.querySelector('.plus').addEventListener('click', () => {
            cartItemChosen.quantity += 1;
            newHTMLCartItem.querySelector('.qty-display').textContent = cartItemChosen.quantity;
            localStorage.setItem("cart", JSON.stringify(pickedCart));
            updateSummary();
        });

        //decrease quantity
        newHTMLCartItem.querySelector('.minus').addEventListener('click', () => {
            if (cartItemChosen.quantity > 1) {
                cartItemChosen.quantity -= 1;
                newHTMLCartItem.querySelector('.qty-display').textContent = cartItemChosen.quantity;
                localStorage.setItem("cart", JSON.stringify(pickedCart));
                updateSummary();
            }
        });
    }

    // total is the accumulator, it keeps the running sum
    //item is each product in array
    //0 is the start
    let totalCost = pickedCart.reduce((total, item) => total + (item.price * item.quantity), 0);
    let tax = 0.18;
    let taxAmountPayable = tax * totalCost;
    const summaryDiv = document.createElement("div");
    summaryDiv.id = "order-summary"; //give id to div 
    //count of orders in cart
    let orderCount = pickedCart.reduce((sum, item) => sum + item.quantity, 0);
    summaryDiv.innerHTML = `
    <h3>Order Summary</h3>
    <p>Total Items :  (${orderCount})</p>
    <p>Items Cost : UGX ${totalCost}</p>
    <p>Tax (18%) : UGX ${Math.round(taxAmountPayable)}</p>
    <p>Order total : UGX ${Math.round(totalCost + taxAmountPayable)}</p>
`;
    htmlContainer.appendChild(summaryDiv);

    //reusable function to update order summary dynamically
    function updateSummary() {
        const newTotal = pickedCart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = newTotal * 0.18;
        const itemCount = pickedCart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('#order-summary').innerHTML = `
    <h3>Order Summary</h3>
    <p>Total Items :  (${itemCount})</p>
    <p>Items Cost : UGX ${newTotal}</p>
    <p>Tax (18%) : UGX ${Math.round(tax)}</p>
    <p>Order total : UGX ${Math.round(newTotal + tax)}</p>
`;
    }
}

console.log(pickedCart);
