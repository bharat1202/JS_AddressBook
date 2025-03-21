const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const addressBook = [];

function addContact() {
    rl.question("Enter First Name: ", (firstName) => {
        rl.question("Enter Last Name: ", (lastName) => {
            rl.question("Enter Address: ", (address) => {
                rl.question("Enter City: ", (city) => {
                    rl.question("Enter State: ", (state) => {
                        rl.question("Enter Zip: ", (zip) => {
                            rl.question("Enter Phone Number: ", (phone) => {
                                rl.question("Enter Email: ", (email) => {
                                    const contact = {
                                        firstName,
                                        lastName,
                                        address,
                                        city,
                                        state,
                                        zip,
                                        phone,
                                        email
                                    };

                                    addressBook.push(contact);
                                    console.log(` Contact '${firstName} ${lastName}' added successfully!`);
                                    showMenu();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

//  Function to display all contacts
function displayContacts() {
    if (addressBook.length === 0) {
        console.log(" No contacts available.");
        showMenu();
        return;
    }
    console.log("\n=== Address Book ===");
    addressBook.forEach((contact, index) => {
        console.log(
            `${index + 1}. ${contact.firstName} ${contact.lastName}, ${contact.address}, ${contact.city}, ${contact.state}, ${contact.zip}, ${contact.phone}, ${contact.email}`
        );
    });
}

//  Function to sort by City
function sortByCity() {
    if (addressBook.length === 0) {
        console.log(" No contacts available to sort.");
        showMenu();
        return;
    }

    console.log("\n Contacts sorted by City:");
    addressBook
        .slice() // Create a copy to avoid modifying original
        .sort((a, b) => a.city.localeCompare(b.city))
        .forEach(contact => console.log(`${contact.firstName} ${contact.lastName} - ${contact.city}`));

    showMenu();
}

//  Function to sort by State
function sortByState() {
    if (addressBook.length === 0) {
        console.log(" No contacts available to sort.");
        showMenu();
        return;
    }

    console.log("\n Contacts sorted by State:");
    addressBook
        .slice()
        .sort((a, b) => a.state.localeCompare(b.state))
        .forEach(contact => console.log(`${contact.firstName} ${contact.lastName} - ${contact.state}`));

    showMenu();
}

//  Function to sort by Zip
function sortByZip() {
    if (addressBook.length === 0) {
        console.log(" No contacts available to sort.");
        showMenu();
        return;
    }

    console.log("\n Contacts sorted by Zip:");
    addressBook
        .slice()
        .sort((a, b) => a.zip.localeCompare(b.zip))
        .forEach(contact => console.log(`${contact.firstName} ${contact.lastName} - ${contact.zip}`));

    showMenu();
}

function showMenu() {
    console.log("\n=== Address Book Menu ===");
    console.log("1. Add Contact");
    console.log("2. Display Contacts");
    console.log("3. Sort Contacts by City");
    console.log("4. Sort Contacts by State");
    console.log("5. Sort Contacts by Zip");
    console.log("6. Exit");

    rl.question("Enter your choice: ", (choice) => {
        switch (choice) {
            case '1':
                addContact();
                break;
            case '2':
                displayContacts();
                break;
            case '3':
                sortByCity();
                break;
            case '4':
                sortByState();
                break;
            case '5':
                sortByZip();
                break;
            case '6':
                console.log(" Exiting Address Book. Goodbye!");
                rl.close();
                break;
            default:
                console.log(" Invalid choice. Please try again.");
                showMenu();
        }
    });
}

showMenu();