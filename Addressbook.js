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

// Function to find and edit a contact
function editContact() {
    rl.question("Enter the Address Book name: ", (bookName) => {
        if (!addressBooks[bookName]) {
            console.log(` Address Book '${bookName}' does not exist.`);
            showMenu();
            return;
        }

        rl.question("Enter First Name of the contact: ", (firstName) => {
            rl.question("Enter Last Name of the contact: ", (lastName) => {
                const contact = addressBooks[bookName].find(
                    c => c.firstName === firstName && c.lastName === lastName
                );

                if (!contact) {
                    console.log(` Contact '${firstName} ${lastName}' not found in '${bookName}'.`);
                    showMenu();
                    return;
                }

                console.log("\nEditing Contact (Leave blank to keep existing value):");
                
                rl.question(`Enter New First Name (${contact.firstName}): `, (newFirstName) => {
                    rl.question(`Enter New Last Name (${contact.lastName}): `, (newLastName) => {
                        rl.question(`Enter New Address (${contact.address}): `, (newAddress) => {
                            rl.question(`Enter New City (${contact.city}): `, (newCity) => {
                                rl.question(`Enter New State (${contact.state}): `, (newState) => {
                                    rl.question(`Enter New Zip (${contact.zip}): `, (newZip) => {
                                        rl.question(`Enter New Phone (${contact.phone}): `, (newPhone) => {
                                            rl.question(`Enter New Email (${contact.email}): `, (newEmail) => {
                                                try {
                                                    const updatedContact = {
                                                        firstName: newFirstName || contact.firstName,
                                                        lastName: newLastName || contact.lastName,
                                                        address: newAddress || contact.address,
                                                        city: newCity || contact.city,
                                                        state: newState || contact.state,
                                                        zip: newZip || contact.zip,
                                                        phone: newPhone || contact.phone,
                                                        email: newEmail || contact.email
                                                    };

                                                    // Validate updated contact
                                                    validateContact(updatedContact);

                                                    // Update contact
                                                    Object.assign(contact, updatedContact);
                                                    console.log(`Contact '${firstName} ${lastName}' updated successfully!`);
                                                } catch (error) {
                                                    console.error(`\n Error: ${error.message}`);
                                                }

                                                showMenu(); // Return to menu
                                            });
                                        });
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

// Function to display the menu
function showMenu() {
    console.log("\n=== Address Book Menu ===");
    console.log("1. Create New Address Book");
    console.log("2. Add Contact to Address Book");
    console.log("3. Edit Contact");
    console.log("4. Exit");

    rl.question("Enter your choice: ", (choice) => {
        switch (choice) {
            case '1':
                createAddressBook();
                break;
            case '2':
                addContactToAddressBook();
                break;
            case '3':
                editContact();
                break;
            case '4':
                console.log("👋 Exiting Address Book. Goodbye!");
                rl.close(); // Close the input stream
                break;
            default:
                console.log("❌ Invalid choice. Please try again.");
                showMenu(); // Retry if input is invalid
        }
    });
}

// Start the program
showMenu();