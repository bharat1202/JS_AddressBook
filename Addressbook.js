const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Address Book Array
const contacts = [];

// Function to add a contact
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

                                    contacts.push(contact);
                                    console.log(" Contact Added Successfully!");
                                    showMenu(); // Return to menu after adding
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

// Function to display all contacts
function displayContacts() {
    console.clear();
    if (contacts.length === 0) {
        console.log("No contacts available.");
    } else {
        console.log("\n=== Address Book ===");
        contacts.forEach((contact, index) => {
            console.log(
                `${index + 1}. ${contact.firstName} ${contact.lastName} - ` +
                `${contact.address}, ${contact.city}, ${contact.state}, ${contact.zip} - ` +
                `${contact.phone} - ${contact.email}`
            );
        });
    }
    showMenu(); // Return to menu after displaying
}

// Function to handle menu
function showMenu() {
    console.log("\n=== Address Book Menu ===");
    console.log("1. Add Contact");
    console.log("2. Display Contacts");
    console.log("3. Exit");

    rl.question("Enter your choice: ", (choice) => {
        switch (choice) {
            case '1':
                addContact();
                break;
            case '2':
                displayContacts();
                break;
            case '3':
                console.log(" Exiting Address Book. Goodbye!");
                rl.close(); // Close the input stream
                break;
            default:
                console.log(" Invalid choice. Please try again.");
                showMenu(); // Retry if input is invalid
        }
    });
}

// Start the program
showMenu();