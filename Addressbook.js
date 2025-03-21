const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const addressBook = [];

//  Function to format contact as a string
class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }

    //  Override toString() method
    toString() {
        return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zip}, ${this.phone}, ${this.email}`;
    }
}

//  Function to add a new contact
function addContact() {
    rl.question("Enter First Name: ", (firstName) => {
        rl.question("Enter Last Name: ", (lastName) => {
            rl.question("Enter Address: ", (address) => {
                rl.question("Enter City: ", (city) => {
                    rl.question("Enter State: ", (state) => {
                        rl.question("Enter Zip: ", (zip) => {
                            rl.question("Enter Phone Number: ", (phone) => {
                                rl.question("Enter Email: ", (email) => {
                                    const contact = new Contact(firstName, lastName, address, city, state, zip, phone, email);
                                    addressBook.push(contact);
                                    console.log(` Contact '${firstName} ${lastName}' added successfully.`);
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
        console.log(`${index + 1}. ${contact.toString()}`);
    });
}

// Function to sort contacts alphabetically by Person’s name
function sortByName() {
    if (addressBook.length === 0) {
        console.log(" No contacts available to sort.");
        showMenu();
        return;
    }

    console.log("\n Contacts sorted alphabetically by name:");
    
    // Use `sort()` and `localeCompare()` for alphabetical sorting
    addressBook
        .slice() // Create a copy to avoid modifying the original
        .sort((a, b) => (a.firstName + " " + a.lastName).localeCompare(b.firstName + " " + b.lastName))
        .forEach(contact => console.log(contact.toString()));

    showMenu();
}

function showMenu() {
    console.log("\n=== Address Book Menu ===");
    console.log("1. Add Contact");
    console.log("2. Display Contacts");
    console.log("3. Sort Contacts by Name");
    console.log("4. Exit");

    rl.question("Enter your choice: ", (choice) => {
        switch (choice) {
            case '1':
                addContact();
                break;
            case '2':
                displayContacts();
                break;
            case '3':
                sortByName();
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

showMenu();