
async function fetchData() {
    try {
        const response = await fetch('shop.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function displayData() {
    try {
        const data = await fetchData();
        const dynamicProductContent = document.getElementById('dynamicProductContent');
        const productRow = document.getElementById('productRow');

        // Update the section heading dynamically

        data.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-sm-6';

            const productStyle = document.createElement('div');
            productStyle.className = 'product-style-1 mt-30';

            const productImage = document.createElement('div');
            productImage.className = 'product-image';

            if (item['text-icon'] !== 'none') {
                const iconText = document.createElement('span');
                iconText.className = 'icon-text text-style-1';
                iconText.innerText = item['text-icon'];
                productImage.appendChild(iconText);
            }

            const productActive = document.createElement('div');
            productActive.className = 'product-active';

            // Adjust this part based on the actual structure of your data
            const img1 = document.createElement('div');
            img1.className = 'product-item active';
            const img1Tag = document.createElement('img');
            img1Tag.src = item.img1;
            img1Tag.alt = 'product';
            img1.appendChild(img1Tag);

            const img2 = document.createElement('div');
            img2.className = 'product-item';
            const img2Tag = document.createElement('img');
            img2Tag.src = item.img2;
            img2Tag.alt = 'product';
            img2.appendChild(img2Tag);

            productActive.appendChild(img1);
            productActive.appendChild(img2);

            productImage.appendChild(productActive);

            const addWishlist = document.createElement('a');
            addWishlist.className = 'add-wishlist';
            addWishlist.href = 'javascript:void(0)';
            const heartIcon = document.createElement('i');
            heartIcon.className = 'mdi mdi-heart-outline';
            addWishlist.appendChild(heartIcon);

            productImage.appendChild(addWishlist);

            const productContent = document.createElement('div');
            productContent.className = 'product-content text-center';

            const title = document.createElement('h4');
            title.className = 'title';
            const titleLink = document.createElement('a');
            titleLink.href = 'product-details-page.html';
            titleLink.innerText = item.title;
            title.appendChild(titleLink);

            title.addEventListener('click',()=>{
                saveCartItem(item)
            })

            const subtitle = document.createElement('p');
            subtitle.innerText = item.subtitle;

            const priceLink = document.createElement('a');
            priceLink.href = 'javascript:void(0)';
            priceLink.className = 'main-btn secondary-1-btn';
            const priceImage = document.createElement('img');
            priceImage.src = 'assets/images/icon-svg/cart-7.svg';
            priceImage.alt = '';
            priceLink.appendChild(priceImage);
            priceLink.innerHTML += ` ${item.price}`;

            // Add event listener to the "Add to Cart" button
            priceLink.addEventListener('click', () => {
                addToCart(item); // Call function to add the item to the cart
                showAlert('Product added to cart!', 'alert-success');
                
               
            });

          
            
            addWishlist.addEventListener('click',(e)=>{
                console.log(e.target);
                console.log("A7a");
                addToWhislist(item)
            })

            productContent.appendChild(title);
            productContent.appendChild(subtitle);
            productContent.appendChild(priceLink);

            productStyle.appendChild(productImage);
            productStyle.appendChild(productContent);

            col.appendChild(productStyle);
            productRow.appendChild(col);
        });
    } catch (error) {
        console.error('Error displaying data:', error);
    }
}

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
  
  // Show Bootstrap alert


  
  
    // Update count
    updatecount();
    updatecountdesk();
  }
  

function addToWhislist(item) {
    // Get the existing cart items from local storage or initialize an empty array
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Add the selected item to the cart
    wishlistItems.push(item);

    // Save the updated cart items back to local storage
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    const cartItemCount =document.getElementById("cartItemCount");
    

    
    updatewish ()
    updatewishdesk ()
}
// Function to save a single object in localStorage
function saveCartItem(item) {
    const existingItem = JSON.parse(localStorage.getItem('selectedtItem')) || {};
    
    // Check if the new item is different from the existing one
    if (JSON.stringify(existingItem) !== JSON.stringify(item)) {
        localStorage.setItem('selectedItem', JSON.stringify(item));
        console.log('Selected item saved:', item);
    } else {
        console.log('Item is already selected:', item);
    }
}
// Call the async function to fetch and display data
displayData();

function updatecount(){
    const cartItemCount=document.getElementById("cartItemCount")
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
cartItemCount.textContent=cartItems.length
}
function updatecountdesk(){
    const cartItemCount=document.querySelector(".cartItemCount")
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
cartItemCount.textContent=cartItems.length
}
updatecountdesk()
updatecount()
function updatewish (){
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const whisItemcount =document.getElementById("whisItemcount");
    whisItemcount.textContent=wishlistItems.length
  }

  function updatewishdesk (){
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const whisItemcount =document.querySelector(".whisItemcount");
    whisItemcount.textContent=wishlistItems.length
  }
  updatewishdesk ()
  updatewish ()


  // show Bootstrap alert
function showAlert(message, alertClass) {
    const alertContainer = document.getElementById('alertContainer');
    
    // Create alert element
    const alertElement = document.createElement('div');
    alertElement.className = `alert ${alertClass} alert-dismissible fade show`;
    alertElement.setAttribute('role', 'alert');
    alertElement.innerHTML = `
      ${message}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    `;
  
   
    alertContainer.innerHTML=alertElement;
  
    // Automatically close the alert after 3 seconds
    setTimeout(() => {
      alertElement.remove();
    }, 3000);
}
const alertContainer = document.getElementById('alertContainer');
console.log(alertContainer);