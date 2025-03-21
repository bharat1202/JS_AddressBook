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

//  Function to count contacts by city and state using `reduce`
function countContactsByLocation() {
    rl.question("Enter the Address Book name: ", (bookName) => {
        if (!addressBooks[bookName]) {
            console.log(` Address Book '${bookName}' does not exist.`);
            showMenu();
            return;
        }

        //  Count by city
        const cityCount = addressBooks[bookName].reduce((acc, contact) => {
            acc[contact.city] = (acc[contact.city] || 0) + 1;
            return acc;
        }, {});

        //  Count by state
        const stateCount = addressBooks[bookName].reduce((acc, contact) => {
            acc[contact.state] = (acc[contact.state] || 0) + 1;
            return acc;
        }, {});

        // Display count by city
        console.log("\n Number of contacts by City:");
        Object.keys(cityCount).forEach(city => {
            console.log(`${city}: ${cityCount[city]}`);
        });

        //  Display count by state
        console.log("\n Number of contacts by State:");
        Object.keys(stateCount).forEach(state => {
            console.log(` ${state}: ${stateCount[state]}`);
        });

        showMenu();
    });
}

// Function to display the menu
function showMenu() {
    console.log("\n=== Address Book Menu ===");
    console.log("1. Create New Address Book");
    console.log("2. Add Contact to Address Book");
    console.log("3. Count Contacts by City/State"); 
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
                countContactsByLocation(); 
                break;
            case '4':
                console.log("Exiting Address Book. Goodbye!");
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