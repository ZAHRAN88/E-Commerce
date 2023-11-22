 // Fetch wishlist data from local storage
 const wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];
console.log(wishlistData);
 // Function to generate wishlist items dynamically
 function generateWishlistItems() {
   const wishlistContainer = document.getElementById('wishlistContainer');

   wishlistData.forEach(item => {
     const wishlistItem = document.createElement('div');
     wishlistItem.className = 'wishlist-item card';
     wishlistItem.innerHTML = `
       <img class="card-img-top" src="${item.img1}" alt="${item.title} Image">
       <div class="wishlist-item-content">
         <div class="wishlist-item-title">${item.title}</div>
         <div class="wishlist-item-description">${item.subtitle}</div>
         <div class="wishlist-item-price">$${item.price}</div>
       </div>
       <div class="wishlist-item-actions">
         <button class="btn btn-primary addbtn" id="adbtn">Add to Cart</button>
         <button class="btn btn-danger" onclick="removeFromWishlist('${item.title}')">Remove</button>
       </div>
     `;

     wishlistContainer.appendChild(wishlistItem);

   
   const btn=document.getElementById("adbtn");
   console.log(btn);
   btn.addEventListener('click',()=>{
    addToCart(item)
   })
   
    });
 }

 // Function to add item to cart
 function addToCart(item) {
    // Get the existing cart items from local storage or initialize an empty array
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the selected item to the cart
    cartItems.push(item);

    // Save the updated cart items back to local storage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    alert('Product added to cart!');
}

 // Function to remove item from wishlist
 function removeFromWishlist(title) {
   const updatedWishlist = wishlistData.filter(item => item.title !== title);
   localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
   location.reload(); // Refresh the page after removing an item
 }
 function updatecount(){
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
cartItemCount.textContent=cartItems.length
}
updatecount()


 function updatewish (){
  const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
  const whisItemcount =document.getElementById("whisItemcount");
  whisItemcount.textContent=wishlistItems.length
}
updatewish ()
 // Call the function to generate wishlist items
 generateWishlistItems();