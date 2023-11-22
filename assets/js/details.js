// Function to render product details based on localStorage data
function renderProductDetails() {
    // Assuming the product details are stored in localStorage under the key 'selectedProduct'
    const selectedProduct = JSON.parse(localStorage.getItem('selectedItem')) || {};

    // Reference to HTML elements
    const productTitleElement = document.querySelector('.product-details-content h2.title');
    const subTitleElement = document.querySelector('.product-details-content p.sub-title');
    const priceElement = document.querySelector('.product-price p.sale-price');
    const regularPriceElement = document.querySelector('.product-price p.regular-price');
    
   const img1 =document.querySelector(".img1");
   const img2 =document.querySelector(".img2");
   const thumb1=document.querySelector(".thumb1")
   const thumb2=document.querySelector(".thumb2")
   img1.src=selectedProduct.img1
   img2.src=selectedProduct.img2
thumb1.src=selectedProduct.img1
thumb2.src=selectedProduct.img2

const revtitle =document.getElementById("revtitle");
const specTitle=document.getElementById("specTitle");
specTitle.textContent=selectedProduct.title
revtitle.textContent= selectedProduct.title
    // Populate HTML elements with product details
    productTitleElement.textContent = selectedProduct.title || '';
    subTitleElement.textContent = selectedProduct.subtitle || '';



   
    function updatecount(){
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemCount.textContent=cartItems.length
    }
    updatecount()
   
    

    // Populate price
    priceElement.textContent = selectedProduct.price || '';
    regularPriceElement.textContent = selectedProduct.regularPrice || '$170';
}

// Call the function to render product details
renderProductDetails();
function updatewish (){
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const whisItemcount =document.getElementById("whisItemcount");
    whisItemcount.textContent=wishlistItems.length
  }
  updatewish ()

  
  function addToCart(item) {
    // Get the existing cart items from local storage or initialize an empty array
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Check if the item is already in the cart
    const existingItem = cartItems.find(cartItem => cartItem.title === item.title);
  
    if (existingItem) {
      // If the item is already in the cart, update its quantity
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // If the item is not in the cart, add it with quantity set to 1
      item.quantity = 1;
      cartItems.push(item);
    }
  
    // Save the updated cart items back to local storage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  
    alert('Product added to cart!');
  
    // Update count
    updatecount();
  }
  const selectedProduct = JSON.parse(localStorage.getItem('selectedItem')) || {};
const addbtnn =document.getElementById("addbtnn");
addbtnn.addEventListener('click',()=>{
      addToCart(selectedProduct);
})
const buybtn=document.getElementById("buybtn");
buybtn.addEventListener('click',()=>{
    addToCart(selectedProduct);
    
})