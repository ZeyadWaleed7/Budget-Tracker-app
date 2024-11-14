let incomeList = [];
let expenseList = [];
function addIncome() {
    const source = document.getElementById('incomeSource').value;
    const amount = parseFloat(document.getElementById('incomeAmount').value);

    if (source && amount) {
        incomeList.push({ source, amount });
        displayIncome();
        calculateTotals();
    }

    document.getElementById('incomeSource').value = '';
    document.getElementById('incomeAmount').value = '';
}
function displayIncome() {
    const incomeListElement = document.getElementById('incomeList');
    incomeListElement.innerHTML = '';
    incomeList.forEach((income, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${income.source}: ${income.amount} EGP`;
        incomeListElement.appendChild(listItem);
    });
}
function addExpense() {
    const category = document.getElementById('expenseCategory').value;
    const description = document.getElementById('expenseDescription').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);

    if (category && description && amount) {
        expenseList.push({ category, description, amount });
        displayExpenses();
        calculateTotals();
    }

    document.getElementById('expenseCategory').value = '';
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseAmount').value = '';
}
function displayExpenses(filteredExpenses = expenseList) {
    const expenseListElement = document.getElementById('expenseList');
    expenseListElement.innerHTML = '';
    filteredExpenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.category} - ${expense.description}: ${expense.amount} EGP`;
        expenseListElement.appendChild(listItem);
    });
}
function filterExpenses() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredExpenses = selectedCategory === 'all'
        ? expenseList
        : expenseList.filter(expense => expense.category === selectedCategory);
    displayExpenses(filteredExpenses);
}
function calculateTotals() {
    const totalIncome = incomeList.reduce((acc, income) => acc + income.amount, 0);
    const totalExpenses = expenseList.reduce((acc, expense) => acc + expense.amount, 0);
    const remainingBalance = totalIncome - totalExpenses;

    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('remainingBalance').textContent = remainingBalance.toFixed(2);
}

function applyBudget() {
    const budget = parseFloat(document.getElementById('monthlyBudget').value);
    const totalExpenses = expenseList.reduce((acc, expense) => acc + expense.amount, 0);

    if (budget && totalExpenses > budget) {
        alert('Warning: You have exceeded your monthly budget!');
    }
}

function displaySummary() {
    calculateTotals();
    document.getElementById('summary').style.display = 'block';
}
document.getElementById('summary').style.display = 'none';
function toggleSummary() {
    const summary = document.getElementById('summary');
    summary.style.display = summary.style.display === 'none' ? 'block' : 'none';
}
