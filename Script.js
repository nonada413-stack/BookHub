function enterLibrary() {
    window.location.href = "library.html";
}


function bookTicket(timeSlot) {

    const ticketElement =
        document.getElementById("tickets" + timeSlot);

    let tickets =
        Number(ticketElement.textContent);


    if (tickets > 0) {

        tickets--;

        ticketElement.textContent = tickets;


        // Show BOOKED message

        showBookingMessage();


        // Get the selected time

        const card =
            ticketElement.closest(".ticket-card");

        const time =
            card.querySelector("h2").textContent;


        // Create QR Code

        showQR(time);


        // Disable button when tickets finish

        if (tickets === 0) {

            const button =
                card.querySelector("button");

            button.textContent = "FULLY BOOKED";

            button.disabled = true;
        }
    }
}


/* BOOKED Message */

function showBookingMessage() {

    const message =
        document.getElementById("bookingMessage");

    message.classList.add("show");


    setTimeout(function() {

        message.classList.remove("show");

    }, 2000);
}


/* QR Code */

function showQR(time) {

    const popup =
        document.getElementById("qrPopup");

    const qrContainer =
        document.getElementById("qrcode");

    const qrTime =
        document.getElementById("qrTime");


    // Remove old QR code

    qrContainer.innerHTML = "";


    // Create a unique booking ID

    const bookingID =
        "BH-" +
        time.replace(/[^0-9]/g, "") +
        "-" +
        Math.floor(Math.random() * 100000);


    // Text stored inside QR

    const qrData =
        "Book Hub | " +
        "Time: " +
        time +
        " | Booking ID: " +
        bookingID;


    qrTime.textContent =
        "Time: " + time;


    // Generate QR Code

    new QRCode(qrContainer, {

        text: qrData,

        width: 200,

        height: 200

    });


    // Show popup

    popup.classList.add("show");
}


/* Close QR */

function closeQR() {

    const popup =
        document.getElementById("qrPopup");

    popup.classList.remove("show");
}
/* Available Books */

const books = [
    {
        name: "The Great Gatsby",
        available: true,
        shelf: "A12"
    },

    {
        name: "Pride and Prejudice",
        available: true,
        shelf: "B05"
    },

    {
        name: "1984",
        available: false,
        shelf: ""
    },

    {
        name: "The Hobbit",
        available: true,
        shelf: "C03"
    },

    {
        name: "Crime and Punishment",
        available: true,
        shelf: "D07"
    }
];


function searchBook() {

    const searchInput =
        document.getElementById("bookSearch");

    const result =
        document.getElementById("bookResult");


    const searchText =
        searchInput.value.trim().toLowerCase();


    if (searchText === "") {

        result.innerHTML = `
            <div class="book-result-card">
                <p>Please enter a book name.</p>
            </div>
        `;

        return;
    }


    const book =
        books.find(function(book) {

            return book.name
                .toLowerCase()
                .includes(searchText);

        });


    if (book) {

        if (book.available) {

            result.innerHTML = `
                <div class="book-result-card">

                    <h2>${book.name}</h2>

                    <p>
                        Status:
                        <span class="available">
                            Available
                        </span>
                    </p>

                    <p>
                        Shelf:
                        <strong>${book.shelf}</strong>
                    </p>

                </div>
            `;

        } else {

            result.innerHTML = `
                <div class="book-result-card">

                    <h2>${book.name}</h2>

                    <p>
                        Status:
                        <span class="not-available">
                            Not Available
                        </span>
                    </p>

                </div>
            `;
        }

    } else {

        result.innerHTML = `
            <div class="book-result-card">

                <h2>Book Not Found</h2>

                <p>
                    This book is not available in our library.
                </p>

            </div>
        `;
    }
}