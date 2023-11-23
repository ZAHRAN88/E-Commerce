const jsonData = 
    [
        {
            "userName":"Mohamed Zahran",
            "surname":"Zahran",
            "email":"palastinearabia@gmail.com",
            "phone":"+20 109 2088 922",
            "address":"Company Inc., 8901 Marmora Road, Glasgow, D04 89GR.",
            "gender":"Male",
            "bd": "26 April 2002",
            "pPic":"assets/images/Zahran.jpg",
            "pCvr":"assets/images/Zahrancvr.jpg",
            "id":"Zahran77",
            "Password":"12345678"
            
    
                   
        },
        {
            "userName":"Assem Omar",
            "surname":"Boza",
    
            "email":"Boza@gmail.com",
            "phone":"+20 109 691 7704",
            "address":"Company Inc., 8901 Marmora Road, Glasgow, D04 89GR.",
            "gender":"Male",
            "bd": "16 October 2002",
            "pPic":"assets/images/Assem.jpg",
            "pCvr":"assets/images/Assemcvr.jpg",
            "id":"Zahran77",
            "Password":"12345678"
                   
        },
        {
            "userName":"Mohamed Nashaat",
            "surname":"Nashaat",
    
            "email":"Nashaat@gmail.com",
            "phone":"+20 10 969 17 704",
            "address":"Company Inc., 8901 Marmora Road, Glasgow, D04 89GR.",
            "gender":"Male",
            "bd": "27 March 2003",
            "pPic":"assets/images/Nashaat.jpg",
            "pCvr":"assets/images/Nashaatcvr.jpg",
            "id":"Zahran77",
            "Password":"123456789"
                   
        }
        ,
        {
            "userName":"Mohamed Barakat",
            "surname":"ملك الفرونت",
    
            "email":"Barakat@gmail.com",
            "phone":"+20 115 678 0904",
            "address":"Company Inc., 8901 Marmora Road, Glasgow, D04 89GR.",
            "gender":"Male",
            "bd": "01 November 1993",
            "pPic":"assets/images/profile-photo.jpg",
            "pCvr":"assets/images/barakatcvr.jpg",
            "id":"Zahran77",
            "Password":"123456789"
                   
        }
    ]
;


// ============== Validate user =====================



function validate() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Iterate over the user data array
  for (const user of jsonData) {
    if (user.email === email && user.Password === password) {
      // Match found, store user data in local storage
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Redirect to usraccount.html
      window.location.href = "usraccount.html";
      return; // Exit the function
    }
  }

  // If the loop completes without finding a match, display an error message
  alert("Invalid email or password. Please try again.");
}

// save usr to LS if email name founded in data json

// get usr details

// Retrieve the user object from local storage
const userJSON = localStorage.getItem("currentUser");

// Parse the JSON string to get the user object
const usr = JSON.parse(userJSON) || {};

// Check if usr is not null and contains expected properties
if (usr) {
    const crntusrcvr = document.getElementById("crntusrcvr");
    const crntusrpic = document.getElementById("crntusrpic");
    const namee = document.getElementById("crntusrName");
    const usrmail = document.querySelector("#crntusrEmail");
    const usrmaill = document.querySelector("#crntusrEmaill");
    const surName = document.getElementById("crntusrSurname");
    const num = document.getElementById("crntusrno");
    const adrs = document.getElementById("crntusraddrs");
    const gndr = document.getElementById("crntusrgndr");
    const birthdate = document.getElementById("crntusrbd");

    // Update HTML elements with user data
    crntusrcvr.style.backgroundImage = `url(${usr.pCvr})`;
    crntusrpic.src = usr.pPic;
    namee.textContent = usr.userName;
    usrmail.textContent = usr.email;
    usrmaill.textContent = usr.email;
    surName.textContent = usr.surname;
    num.textContent = usr.phone;
    adrs.textContent = usr.address;
    gndr.textContent = usr.gender;
    birthdate.textContent = usr.bd;
} else {
    // Handle the case where the user object is not found or doesn't have expected properties
    console.error('User object not found or invalid.');
}
