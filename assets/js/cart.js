let subtotal = 0;

const cartRecent = JSON.parse(localStorage.getItem('cart')) || [];

// Function to dynamically generate table rows based on cart data
function generateCheckoutRows() {
  const tableBody = document.querySelector('#checkoutTable tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  cartRecent.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="product-cart d-flex">
          <div class="product-thumb mr-10">
            <img src="${item.img1}" alt="Product">
          </div>
          <div class="product-content media-body">
            <h5 class="title">
              <a href="product-details-page.html">${item.title}</a>
            </h5>
            <span>${item.subtitle}</span>
          </div>
        </div>
      </td>
      <td>
        <div class="product-quantity d-inline-flex">
          <button type="button" class="sub"></button>
          <input type="number" value="${item.quantity}" min="1" class="quantityInput">
          <button type="button" class="add"></button>
        </div>
      </td>
      <td>
        <p class="price">${item.price}</p>
      </td>
      <td>
        <button type="button" class="deleteButton btn btn-outline-danger"><i class="fa-solid fa-trash" ></i></button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  // Update subtotal in the DOM
  updateTotal();

  

  // Add event listeners to quantity input fields
  const quantityInputs = document.querySelectorAll('.quantityInput');
  quantityInputs.forEach(input => {
    input.addEventListener('input', updateTotal);
  });

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll('.deleteButton');
  deleteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      deleteCartItem(cartRecent[index]);
    });
  });
}

// Function to update total when quantity changes
function updateTotal() {
  subtotal = 0;

  const quantityInputs = document.querySelectorAll('.quantityInput');
  quantityInputs.forEach((input, index) => {
    const quantity = parseInt(input.value);
    const price = cartRecent[index].price; // Get the price without attempting to replace

    // Check if price is defined and is a string before using the replace method
    if (typeof price === 'string') {
      subtotal += parseFloat(price.replace('$', '').trim()) * quantity;
    } else {
      console.error(`Invalid price format for item at index ${index}`);
    }
  });

  // Update subtotal in the DOM
  document.getElementById('subtotalPrice').textContent = `$${subtotal.toFixed(2)}`;
}

// Function to add an item to the cart or increment its quantity
function addToCart(itemToAdd) {
  const existingItemIndex = cartRecent.findIndex(item => item.title === itemToAdd.title);

  if (existingItemIndex !== -1) {
    // Item already exists in the cart, increment its quantity
    cartRecent[existingItemIndex].quantity += 1;
  } else {
    // Item does not exist in the cart, add it
    itemToAdd.quantity = 1;
    cartRecent.push(itemToAdd);
  }

  // Update the cart and regenerate checkout rows
  localStorage.setItem('cart', JSON.stringify(cartRecent));
  generateCheckoutRows();
}

// Function to delete a cart item
function deleteCartItem(itemToDelete) {
  const indexToDelete = cartRecent.findIndex(item => item === itemToDelete);

  if (indexToDelete !== -1) {
    cartRecent.splice(indexToDelete, 1);
    // Update the cart and regenerate checkout rows
    localStorage.setItem('cart', JSON.stringify(cartRecent));
    generateCheckoutRows();
  }
}





// Call the function to generate checkout rows
generateCheckoutRows();
