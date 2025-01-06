let form = document.getElementById("form");
let list = document.getElementById("list");

let api_url = "https://crudcrud.com/api/64c789258a374c52b173699b1e96ca3e/stockmgmt";

// Fetch and display existing data
async function fetchData() {
    try {
        const response = await axios.get(api_url);
        response.data.forEach(item => listItem(item));
    } catch (error) {
        console.log(error);
    }
}

// Handle form submission
async function onFormSubmit(event) {
    event.preventDefault();

    let name = document.getElementById("c-name").value;
    let des = document.getElementById("des").value;
    let price = document.getElementById("price").value;
    let number = parseInt(document.getElementById("number").value);

    let data = { name, des, price, number };

    try {
        let response = await axios.post(api_url, data);
        console.log(response.data);  // Log the response data for debugging
        listItem(response.data);
        form.reset();
    } catch (error) {
        console.log(error);
    }
}


// Create a list item with buttons and functionality
function listItem(item) {
    let li = document.createElement("li");
    li.textContent = `${item.name} - ${item.des} - ${item.price} - ${item.number}`;

    // Create Buy One button
    let buyOne = document.createElement("button");
    buyOne.textContent = "Buy One";
    buyOne.onclick = () => updateQuantity(item, 1);

    // Create Buy Two button
    let buyTwo = document.createElement("button");
    buyTwo.textContent = "Buy Two";
    buyTwo.onclick = () => updateQuantity(item, 2);

    // Create Buy Three button
    let buyThree = document.createElement("button");
    buyThree.textContent = "Buy Three";
    buyThree.onclick = () => updateQuantity(item, 3);

    // Append buttons to the list item
    li.appendChild(buyOne);
    li.appendChild(buyTwo);
    li.appendChild(buyThree);

    list.appendChild(li);
}

// Update the quantity in the backend and UI
async function updateQuantity(item, quantityToBuy) {
    // Ensure the item has stock
    if (item.number >= quantityToBuy) {
        item.number -= quantityToBuy; // Reduce the quantity locally

        try {
            // Update the item in the backend
            await axios.put(`${api_url}/${item._id}`, { 
                name: item.name, 
                des: item.des, 
                price: item.price, 
                number: item.number 
            });

            // Update the UI
            list.innerHTML = ""; // Clear existing items
            fetchData();         // Reload updated data
        } catch (error) {
            console.log("Error updating item:", error);
        }
    } else {
        alert("Not enough stock available!");
    }
}


// Fetch existing data on page load
fetchData();

form.addEventListener("submit",onFormSubmit)
