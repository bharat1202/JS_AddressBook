const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Object to hold multiple Address Books
const addressBooks = {};

//  Function to check for duplicate contact
function isDuplicateContact(bookName, firstName, lastName) {
    return addressBooks[bookName].some(
        (contact) => contact.firstName === firstName && contact.lastName === lastName
    );
}

// Function to add a contact to an Address Book
function addContactToAddressBook() {
    rl.question("Enter the Address Book name: ", (bookName) => {
        if (!addressBooks[bookName]) {
            console.log(` Address Book '${bookName}' does not exist.`);
            showMenu();
            return;
        }

        rl.question("Enter First Name: ", (firstName) => {
            rl.question("Enter Last Name: ", (lastName) => {

                //  Check for duplicates using `some()`
                if (isDuplicateContact(bookName, firstName, lastName)) {
                    console.log(` Duplicate contact '${firstName} ${lastName}' already exists in '${bookName}'.`);
                    showMenu();
                    return;
                }

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

                                            //  Add contact if no duplicate is found
                                            addressBooks[bookName].push(contact);
                                            console.log(` Contact added to '${bookName}' successfully!`);
                                        } catch (error) {
                                            console.error(`\n Error: ${error.message}`);
                                        }
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

//  Function to view persons by city or state using `filter`, `map`, and `reduce`
function viewPersonsByLocation() {
    rl.question("Enter the Address Book name: ", (bookName) => {
        if (!addressBooks[bookName]) {
            console.log(` Address Book '${bookName}' does not exist.`);
            showMenu();
            return;
        }

        rl.question("View by (city/state): ", (searchType) => {
            if (searchType.toLowerCase() !== "city" && searchType.toLowerCase() !== "state") {
                console.log(` Invalid search type. Please enter 'city' or 'state'.`);
                showMenu();
                return;
            }

            const groupedData = addressBooks[bookName].reduce((acc, contact) => {
                const key = searchType === "city" ? contact.city : contact.state;

                if (!acc[key]) {
                    acc[key] = [];
                }

                acc[key].push(contact);
                return acc;
            }, {});

            const keys = Object.keys(groupedData);
            if (keys.length === 0) {
                console.log(` No contacts found in the selected ${searchType}.`);
            } else {
                console.log(`\n Persons grouped by ${searchType}:`);
                keys.forEach((key) => {
                    console.log(`\n ${key} (${groupedData[key].length} contact(s))`);
                    groupedData[key].map((contact) => {
                        console.log(
                            `  - ${contact.firstName} ${contact.lastName}, ${contact.address}, ${contact.city}, ${contact.state}, ${contact.zip}, ${contact.phone}, ${contact.email}`
                        );
                    });
                });
            }

            showMenu();
        });
    });
}

// Function to display the menu
function showMenu() {
    console.log("\n=== Address Book Menu ===");
    console.log("1. Create New Address Book");
    console.log("2. Add Contact to Address Book");
    console.log("3. View Persons by City/State");
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
                viewPersonsByLocation(); //  New Function
                break;
            case '4':
                console.log(" Exiting Address Book. Goodbye!");
                rl.close();
                break;               
            default:
                console.log(" Invalid choice. Please try again.");
                showMenu();
        }
    });
}

// Start the program
showMenu();