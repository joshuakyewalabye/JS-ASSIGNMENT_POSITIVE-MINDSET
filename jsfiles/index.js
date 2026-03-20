//global scope cart to store selected products 
const cart = [];

//product array holding product objects 
const products = [
    { id: 1, name: "Laptop", price: 559000, category: "Electronics", image: "resources/laptop.jpg" },
    { id: 2, name: "iPhone 14 Pro Max", price: 2140000, category: "Electronics", image: "resources/iphone.jpg" },
    { id: 3, name: "Shoes", price: 33700, category: "Fashion", image: "resources/shoes.jpg" },
    { id: 4, name: "T-Shirt", price: 25000, category: "Clothing", image: "resources/tshirt.jpg" },
    { id: 5, name: "Headphones", price: 36100, category: "Electronics", image: "resources/headphones.jpg" },
    { id: 6, name: "Counter Book", price: 25000, category: "Books", image: "resources/book.jpg" },
    { id: 7, name: "Hisense 4K UHD TV", price: 1480000, category: "Television & Video", image: "resources/tv.jpg" },
    { id: 8, name: "PlayStation 4 Standard Edition with Free FIFA game", price: 950000, category: "Gaming", image: "resources/ps4.jpg" },
    { id: 9, name: "Hisense 270 L Double Door Defrost Refrigerator with Water Dispenser", price: 1249992, category: "Appliances", image: "resources/fridge.jpg" },
    { id: 10, name: "Exercise Bike Machine", price: 1200000, category: "Sporting Goods", image: "resources/bike.jpg" }
]

// a function called displayProducts that takes the array as a parameter, loops through it, and for each product creates an HTML card and adds it to that container.
function displayProducts(items) {
    //getting the constainer div by id
    const containerDivForProducts = document.querySelector("#product-container");
    for (let item of items) {
        //create a new element 
        let htmlElement = document.createElement("div");
        //add content 
        htmlElement.innerHTML = ` <div class="product-card">
        <img src="${item.image}" alt="${item.name}" class="product-img">
        <h3>${item.name}</h3>
        <p>UGX ${item.price}</p>
        <p>${item.category}</p>
        <button class="add-to-cart"> Add to Cart</button>
    </div>`
        //adding the created html to the original product container
        containerDivForProducts.append(htmlElement)
        //adding logic to the button ,select it first
        const cartButton = htmlElement.querySelector('button')
        cartButton.addEventListener('click', () => {
            //before pushing to local storage prevent duplicates
            const existingItem = cart.find((cartItem) => cartItem.id === item.id);
            if (!existingItem) {
                cart.push(item);
                alert("Your cart has been updated successfully");
                //saving cart to local storage 
                const savedCart = JSON.stringify(cart);
                localStorage.setItem("cart", savedCart);
            } else {
                alert("Item already exists");
            }
        })
    }
}
displayProducts(products);

//filtering items by category by first creating a list of categories
function filterByCategory(products) {
    const allCategories = products.map((pickedCategory) => pickedCategory.category);
    // storing the picked categories in a set to remove dupes 
    const uniqueCategories = Array.from(new Set(allCategories)); //Array.from(makes an iterable an array)

    //building dropdown options using dom 
    const dropdownChoice = document.getElementById('optionsFiltered');

    //default option 
    let defaultOption = document.createElement('option');
    dropdownChoice.appendChild(defaultOption);
    defaultOption.textContent = 'All Products';

    //build the rest of the category options
    for (let uniqueCategory of uniqueCategories) {
        let optionHTML = document.createElement('option');
        //add option content to the html tag
        optionHTML.textContent = uniqueCategory;
        dropdownChoice.appendChild(optionHTML);
    }

    //listen for dropdown selection change
    dropdownChoice.addEventListener('change', () => {
        const selectedCategory = dropdownChoice.value;
        //clear div before calling function 
        const containerDivForProducts = document.querySelector("#product-container");
        containerDivForProducts.innerHTML = "";

        if (selectedCategory === "All Products") {
            //show all products
            displayProducts(products);
        } else {
            //filter products by selected category
            const matchedResults = products.filter((matched) => matched.category === selectedCategory);
            //return matched results by running the display product function
            displayProducts(matchedResults);
        }
    })
}
filterByCategory(products)






