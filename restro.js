let form = document.getElementById("form");
let list1 = document.getElementById("list1");
let list2 = document.getElementById("list2");
let list3 = document.getElementById("list3");

let api = "https://crudcrud.com/api/10f7a872bec144669d5ee67b464d284f/table";

// Fetch and display data on page load
window.onload = fetchData;

// Handle form submission
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form data
    let price = document.getElementById("price").value.trim();
    let dish = document.getElementById("dish").value.trim();
    let table = document.getElementById("table").value;

    // Prepare the data object
    let order = { price, dish, table };

    // Send data to the API
    try {
        let response = await axios.post(api, order);
        listItem({ ...order, _id: response.data._id }); // Include the returned ID
        form.reset(); // Reset the form
    } catch (error) {
        console.error("Error saving data:", error);
    }
});

// Fetch data from the API and display it
async function fetchData() {
    try {
        let response = await axios.get(api);
        response.data.forEach(item => listItem(item));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Display an item in the corresponding table list
function listItem(order) {
    let li = document.createElement("li");
    li.textContent = `Dish: ${order.dish}, Price: ${order.price}`;
    li.style.marginBottom = "5px";

    // Add a delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = () => deleteItem(order._id, li);

    li.appendChild(deleteBtn);

    // Append to the correct table
    if (order.table === "t1") {
        list1.appendChild(li);
    } else if (order.table === "t2") {
        list2.appendChild(li);
    } else if (order.table === "t3") {
        list3.appendChild(li);
    }
}

// Delete an item from the API and remove it from the DOM
async function deleteItem(id, li) {
    try {
        await axios.delete(`${api}/${id}`);
        li.remove();
    } catch (error) {
        console.error("Error deleting item:", error);
    }
}
