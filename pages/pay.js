const amtBox = document.querySelector(".payment-amt");
const finalAmt = localStorage.getItem("orderTotal");

if (finalAmt !== null) {
    amtBox.innerHTML = `<h4>Total Amount paid Rs. ${finalAmt}</h4>`;
} else {
    amtBox.innerHTML = `<h4>No items found.</h4>`;
}
