const jsonData = [
    {
        "userName": "Zahran",
        "email": "palastinearabia@gmail.com",
        "phone": "+20 109 2088 922",
        "address": "Company Inc., 8901 Marmora Road, Glasgow, D04 89GR.",
        "gender": "Male",
        "BD": "26 April 2002",
        "pPic": "assets/images/Zahran.jpg",
        "pCvr": "assets/images/Zahrancvr.jpg"
    },
    // ... (other objects in the array) ...
];

// Function to generate dynamic content based on JSON data
function generateDynamicContent(data) {
    return data.map(item => `
        <div class="single-details-item d-flex flex-wrap">
            <div class="details-title">
                <h6 class="title">${item.userName}</h6>
            </div>
            <div class="details-content media-body">
                <p>${item.email}</p>
                <p>${item.phone}</p>
                <p>${item.address}</p>
                <p>${item.gender}</p>
                <p>${item.BD}</p>
            </div>
        </div>
    `).join('');
}

// Get the elements where dynamic content will be inserted
const dynamicProfileDetails = document.getElementById('dynamic-profile-details');
const profilePhoto = document.getElementById('profile-photo');
const profileCoverPhoto = document.getElementById('profile-cover-photo');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');

// Generate and insert dynamic content into the HTML
dynamicProfileDetails.innerHTML = generateDynamicContent(jsonData);

// Set profile photo, cover photo, name, and email
profilePhoto.src = jsonData[0].pPic; // Assuming the first item in the array
profileCoverPhoto.style.backgroundImage = `url(${jsonData[0].pCvr})`;
profileName.textContent = jsonData[0].userName;
profileEmail.textContent = jsonData[0].email;


// ============== Validate user =====================

// Wait for the DOM to be ready
const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
document.getElementById('signInButton').addEventListener('click', function(event) {
    

    // Get the input values
    

    // Validate email and password
    if (email === 'palastinearabia@gmail.com' && password === '12345678') {
        // Set the href attribute dynamically
        document.getElementById('location').href='usraccount.html';
    } else {alert('Invalid email or password. Please try again.');
        // Display an error message or handle invalid credentials as needed
        
    }
});