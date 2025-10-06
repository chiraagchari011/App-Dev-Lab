const prompt = require("prompt-sync")();

let items = [];

while (true) {
    console.log("\n--- Menu ---");
    console.log("1. Create (Add Item)");
    console.log("2. Read (View Items)");
    console.log("3. Update (Modify Item)");
    console.log("4. Delete (Remove Item)");
    console.log("5. Exit");

    const choice = prompt("Enter your choice: "); 

    switch (choice) {
        case "1":
            const newItem = prompt("Enter item to add: ");
            items.push(newItem);
            console.log("Item added successfully!");
            break;

        case "2":
            console.log("Current Items:", items);
            break;

        case "3":
            const updateIndex = prompt("Enter index to update: ");
            if (updateIndex >= 0 && updateIndex < items.length) {
                const updatedItem = prompt("Enter new value: ");
                items[updateIndex] = updatedItem;
                console.log("Item updated successfully!");
            } else {
                console.log("Invalid index!");
            }
            break;

        case "4":
            const deleteIndex = prompt("Enter index to delete: ");
            if (deleteIndex >= 0 && deleteIndex < items.length) {
                items.splice(deleteIndex, 1);
                console.log("Item deleted successfully!");
            } else {
                console.log("Invalid index!");
            }
            break;

        case "5":
            console.log("Exiting program...");
            process.exit();

        default:
            console.log("Invalid choice, please try again.");
    }
}
