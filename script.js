// Initialize an empty array for transactions
let transactions = [];

// Attach the form submit event to the addTransaction function
document.getElementById('expForm').addEventListener('submit', addTransaction);

// Function to add a transaction when the form is submitted
function addTransaction(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get values from the form fields
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;

    // Validate the form fields
    if (type !== 'chooseOne' && name.length > 0 && amount > 0) {
        // Create a new transaction object
        let transaction = {
            type: type,
            name: name,
            amount: parseFloat(amount),
            id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1
        };
        transactions.push(transaction);
    }
    document.getElementById('expForm').reset();
    showTransactions();
    updateBalance();
}
function showTransactions() {
    let transactionTable = document.getElementById('transactionTable');
    transactionTable.innerHTML = '';
    for (let i = 0; i < transactions.length; i++) {
        let transaction = transactions[i];
        let row = `
            <tr>
                <td>${transaction.type}</td>
                <td>${transaction.name}</td>
                <td>$${transaction.amount}</td>
                <td><a class="deleteButton" onclick="deleteTransaction(${transaction.id})">Delete</a></td>
            </tr>
        `;
        transactionTable.innerHTML += row;
    }
}
function deleteTransaction(id) {
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id === id) {
            transactions.splice(i, 1);
            break;
        }
    }
    showTransactions();
    updateBalance();
}
function updateBalance() {
    let balance = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'income') {
            balance += parseFloat(transactions[i].amount);
        } else if (transactions[i].type === 'expense') {
            balance -= parseFloat(transactions[i].amount);
        }
    }
    document.querySelector('.balance').textContent = balance;
}
showTransactions();
updateBalance();
