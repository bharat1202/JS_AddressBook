const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Object to hold multiple Address Books
const addressBooks = {};

// Validation patterns
const namePattern = /^[A-Z][a-zA-Z]{2,}$/;
const addressPattern = /^.{4,}$/;
const zipPattern = /^\d{5}$/;
const phonePattern = /^\d{10}$/;
const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

// Function to validate contact fields
function validateContact(contact) {
    if (!namePattern.test(contact.firstName)) {
        throw new Error(" Invalid First Name: Should start with a capital letter and have at least 3 characters.");
    }
    if (!namePattern.test(contact.lastName)) {
        throw new Error(" Invalid Last Name: Should start with a capital letter and have at least 3 characters.");
    }
    if (!addressPattern.test(contact.address)) {
        throw new Error(" Invalid Address: Minimum 4 characters required.");
    }
    if (!addressPattern.test(contact.city)) {
        throw new Error(" Invalid City: Minimum 4 characters required.");
    }
    if (!addressPattern.test(contact.state)) {
        throw new Error(" Invalid State: Minimum 4 characters required.");
    }
    if (!zipPattern.test(contact.zip)) {
        throw new Error(" Invalid Zip: Must be a 5-digit number.");
    }
    if (!phonePattern.test(contact.phone)) {
        throw new Error(" Invalid Phone: Must be a 10-digit number.");
    }
    if (!emailPattern.test(contact.email)) {
        throw new Error(" Invalid Email: Must follow standard email format (e.g., example@domain.com).");
    }
}

// Function to create a new Address Book
function createAddressBook() {
    rl.question("Enter the name of the new Address Book: ", (name) => {
        if (addressBooks[name]) {
            console.log(` Address Book '${name}' already exists.`);
        } else {
            addressBooks[name] = [];
            console.log(` Address Book '${name}' created successfully!`);
        }
        showMenu(); // Return to menu
    });
}

// Function to add a contact to a specific Address Book
function addContactToAddressBook() {
    rl.question("Enter the Address Book name: ", (bookName) => {
        if (!addressBooks[bookName]) {
            console.log(` Address Book '${bookName}' does not exist.`);
            showMenu();
            return;
        }

        rl.question("Enter First Name: ", (firstName) => {
            rl.question("Enter Last Name: ", (lastName) => {
                rl.question("Enter Address: ", (address) => {
                    rl.question("Enter City: ", (city) => {
                        rl.question("Enter State: ", (state) => {
                            rl.question("Enter Zip: ", (zip) => {
                                rl.question("Enter Phone Number: ", (phone) => {
                                    rl.question("Enter Email: ", (email) => {
                                        try {
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

                                            // Validate the contact data
                                            validateContact(contact);

                                            // Add to specific address book if valid
                                            addressBooks[bookName].push(contact);
                                            console.log(` Contact added to '${bookName}' successfully!`);
                                        } catch (error) {
                                            console.error(`\n Error: ${error.message}`);
                                        }

                                        // Return to menu after adding
                                        showMenu();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

// Function to delete a contact from an Address Book
function deleteContact() {
    rl.question("Enter the Address Book name: ", (bookName) => {
        if (!addressBooks[bookName]) {
            console.log(` Address Book '${bookName}' does not exist.`);
            showMenu();
            return;
        }

        rl.question("Enter First Name of the contact: ", (firstName) => {
            rl.question("Enter Last Name of the contact: ", (lastName) => {
                const index = addressBooks[bookName].findIndex(
                    contact => contact.firstName === firstName && contact.lastName === lastName
                );

                if (index === -1) {
                    console.log(` Contact '${firstName} ${lastName}' not found in '${bookName}'.`);
                    showMenu();
                    return;
                }

                console.log(`\n Contact Found:`);
                console.log(`${firstName} ${lastName} - ${addressBooks[bookName][index].address}, ${addressBooks[bookName][index].city}, ${addressBooks[bookName][index].state}, ${addressBooks[bookName][index].zip} - ${addressBooks[bookName][index].phone} - ${addressBooks[bookName][index].email}`);
                
                rl.question("\nAre you sure you want to delete this contact? (yes/no): ", (confirmation) => {
                    if (confirmation.toLowerCase() === 'yes') {
                        addressBooks[bookName].splice(index, 1);
                        console.log(` Contact '${firstName} ${lastName}' deleted successfully from '${bookName}'!`);
                    } else {
                        console.log("Deletion cancelled.");
                    }
                    showMenu();
                });
            });
        });
    });
}

// Function to display all Address Books
function displayAllAddressBooks() {
    console.clear();
    const keys = Object.keys(addressBooks);

    if (keys.length === 0) {
        console.log(" No Address Books available.");
    } else {
        console.log("\n=== All Address Books ===");
        keys.forEach((book, index) => {
            console.log(`${index + 1}. ${book} (${addressBooks[book].length} contacts)`);
        });
    }
    showMenu();
}

// Function to display the menu
function showMenu() {
    console.log("\n=== Address Book Menu ===");
    console.log("1. Create New Address Book");
    console.log("2. Add Contact to Address Book");
    console.log("3. Delete Contact");
    console.log("4. Display All Address Books");
    console.log("5. Exit");

    rl.question("Enter your choice: ", (choice) => {
        switch (choice) {
            case '1':
                createAddressBook();
                break;
            case '2':
                addContactToAddressBook();
                break;
            case '3':
                deleteContact();
                break;
            case '4':
                displayAllAddressBooks();
                break;
            case '5':
                console.log(" Exiting Address Book. Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice. Please try again.");
                showMenu();
        }
    });
}

// Start the program
showMenu();