const form = document.getElementById("bookingForm");

if (form) {

    const departure = document.getElementById("departure");
    const returnDate = document.getElementById("return");

    const modal = document.getElementById("bookingModal");
    const details = document.getElementById("bookingDetails");
    const close = document.querySelector(".close");
    const closeBtn = document.getElementById("closeBtn");

    
    const today = new Date().toISOString().split("T")[0];
    departure.min = today;

    departure.addEventListener("change", function () {

        returnDate.min = departure.value;

        if (returnDate.value < departure.value) {
            returnDate.value = "";
        }

    });

    
    const prices = {
        "maldives": 45000,
        "paris": 90000,
        "switzerland": 120000,
        "thailand": 55000,
        "tokyo": 110000,
        "7 wonders": 180000,
        "dubai": 70000,
        "goa": 25000,
        "kashmir": 35000,
        "kerala": 30000,
        "bali": 65000
    };

    
    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let fullname = document.getElementById("fullname").value.trim();
        let phone = document.getElementById("phonenumber").value.trim();
        let email = document.getElementById("email").value.trim();
        let destination = document.getElementById("destination").value;
        let travelers = document.getElementById("Nooftravelers").value;
        let departureDate = departure.value;
        let returning = returnDate.value;
        let request = document.getElementById("request").value.trim();
        let agree = document.getElementById("agree").checked;


        if (
            fullname === "" ||
            phone === "" ||
            email === "" ||
            destination === "" ||
            departureDate === ""
        ) {
            alert("Please fill all the required fields.");
            return;
        }

        
        if (phone.length !== 10 || isNaN(phone)) {
            alert("Enter a valid 10-digit phone number.");
            return;
        }

        
        if (returning !== "" && new Date(returning) < new Date(departureDate)) {
            alert("Return date cannot be before Departure date.");
            return;
        }

        
        if (!agree) {
            alert("Please accept the Terms & Conditions.");
            return;
        }

        
        let duration = "Not Selected";

        if (returning !== "") {

            let d1 = new Date(departureDate);
            let d2 = new Date(returning);

            let diff = d2 - d1;

            duration = Math.ceil(diff / (1000 * 60 * 60 * 24)) + " Days";

        }

    
        let pricePerPerson = prices[destination] || 0;

        let people;

        if (travelers === "10+") {
            people = 10;
        }

        else if (travelers === "6-10") {
            people = 6;
        }

        else {
            people = parseInt(travelers);
        }

        let total = pricePerPerson * people;

        
        let bookingID = "MITA" + Math.floor(Math.random() * 90000 + 10000);

        
        details.innerHTML = `

        <p><strong>Booking ID :</strong> ${bookingID}</p>

        <hr>

        <p><strong>Name :</strong> ${fullname}</p>

        <p><strong>Phone :</strong> ${phone}</p>

        <p><strong>Email :</strong> ${email}</p>

        <p><strong>Destination :</strong> ${destination}</p>

        <p><strong>Travelers :</strong> ${travelers}</p>

        <p><strong>Departure :</strong> ${departureDate}</p>

        <p><strong>Return :</strong> ${returning || "Not Selected"}</p>

        <p><strong>Trip Duration :</strong> ${duration}</p>

        <p><strong>Estimated Cost :</strong> ₹${total.toLocaleString()}</p>

        <p><strong>Special Requests :</strong> ${request || "None"}</p>

        <hr>

        <h3 style="color:green;">
        ✅ Booking Submitted Successfully
        </h3>

        <p>
        Thank you for choosing
        <strong>MITA - MANTRA International Travel Agency</strong>.
        <br><br>
        Our travel experts will contact you shortly.
        </p>

        `;

        modal.style.display = "block";

        form.reset();

        returnDate.min = "";

    });


    close.onclick = function () {
        modal.style.display = "none";
    };

    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

}

function filterGallery(category){

    let items = document.querySelectorAll(".gallery-item");

    items.forEach(function(item){

        if(category === "all"){

            item.style.display = "block";

        }

        else if(item.classList.contains(category)){

            item.style.display = "block";

        }

        else{

            item.style.display = "none";

        }

    });

}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

if(lightbox){

    const images = document.querySelectorAll(".gallery-item img");

    images.forEach(function(image){

        image.addEventListener("click", function(){

            lightbox.style.display = "flex";

            lightboxImage.src = this.src;

            lightboxImage.alt = this.alt;

        });

    });

    closeLightbox.onclick = function(){

        lightbox.style.display = "none";

    }

    lightbox.onclick = function(event){

        if(event.target === lightbox){

            lightbox.style.display = "none";

        }

    }

}