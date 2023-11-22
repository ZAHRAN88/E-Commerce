
async function fetchDataRecent() {
    try {
        const response = await fetch('recent.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function displayDataRecent() {
    try {
        const data = await fetchDataRecent();
        const recentItemsRow = document.getElementById('recentItemsRow');

        data.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-lg-6';

            const productStyle = document.createElement('div');
            productStyle.className = 'product-style-7 mt-30';

            const productImage = document.createElement('div');
            productImage.className = 'product-image';

            if (item['icon-text'] !== 'none') {
                const iconText = document.createElement('span');
                iconText.className = 'icon-text text-style-1';
                iconText.innerText = item['icon-text'];
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

            const productContent = document.createElement('div');
            productContent.className = 'product-content';

            const productMeta = document.createElement('ul');
            productMeta.className = 'product-meta';

            const addToWishlist = document.createElement('li');
            const wishlistLink = document.createElement('a');
            wishlistLink.className = 'add-wishlist';
            wishlistLink.href = 'javascript:void(0)';
            const wishlistIcon = document.createElement('i');
            wishlistIcon.className = 'mdi mdi-heart-outline';
            wishlistLink.appendChild(wishlistIcon);
            wishlistLink.innerHTML += ' Add to Favorite';
            addToWishlist.appendChild(wishlistLink);

            const rating = document.createElement('li');
            const ratingSpan = document.createElement('span');
            const ratingIcon = document.createElement('i');
            ratingIcon.className = 'mdi mdi-star';
            ratingSpan.appendChild(ratingIcon);
            ratingSpan.innerHTML += ` ${item.rate}/5`;
            rating.appendChild(ratingSpan);

            productMeta.appendChild(addToWishlist);
            productMeta.appendChild(rating);

            const title = document.createElement('h4');
            title.className = 'title';
            const titleLink = document.createElement('a');
            titleLink.href = 'product-details-page.html';
            titleLink.innerText = item.title;
            title.appendChild(titleLink);

            const subtitle = document.createElement('p');
            subtitle.innerText = item.subtitle;

            const price = document.createElement('span');
            price.className = 'price';
            price.innerText = item.price;

            const addToCartBtn = document.createElement('a');
            addToCartBtn.href = 'javascript:void(0)';
            addToCartBtn.className = 'main-btn primary-btn';
            const cartImage = document.createElement('img');
            cartImage.src = 'assets/images/icon-svg/cart-4.svg';
            cartImage.alt = '';
            addToCartBtn.appendChild(cartImage);
            addToCartBtn.innerHTML += ' Add to Cart';

            // Add event listener to the "Add to Cart" button
            addToCartBtn.addEventListener('click', () => {
                addToCartRecent(item); // Call function to add the item to the cart
            });


            wishlistLink.addEventListener('click',()=>{
                addToWhishlistRecent(item)
            })
            title.addEventListener('click',()=>{
                saveCartItem(item)
            })


            productContent.appendChild(productMeta);
            productContent.appendChild(title);
            productContent.appendChild(subtitle);
            productContent.appendChild(price);
            productContent.appendChild(addToCartBtn);

            productStyle.appendChild(productImage);
            productStyle.appendChild(productContent);

            col.appendChild(productStyle);
            recentItemsRow.appendChild(col);
        });
          // Initialize Slick slider after dynamically adding items
        $('.product-active').slick({
            // Add your Slick slider configuration options here
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
        });
    } catch (error) {
        console.error('Error displaying data:', error);
    }
}

function addToCartRecent(item) {
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
  
   
  
    // Update count
    updatecount();
  }


function addToWhishlistRecent(item) {
    // Get the existing cart items from local storage or initialize an empty array
    const whishItems = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Add the selected item to the cart
    whishItems.push(item);

    // Save the updated cart items back to local storage
    localStorage.setItem('wishlist', JSON.stringify(whishItems));

   

    updatewish ()
}

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
displayDataRecent();

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