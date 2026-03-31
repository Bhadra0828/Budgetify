var isLoginMode = true;

function loginpage() {
    isLoginMode = !isLoginMode;
    document.getElementById('authTitle').innerText = isLoginMode ? "Login" : "Sign Up";
    document.getElementById('authBtn').innerText = isLoginMode ? "Login" : "Register";
    document.getElementById('toggleMsg').innerText = isLoginMode ? "Don't have an account? Sign Up" : "Have an account? Login";
}

function handlelogin() {
    var user = document.getElementById('username').value;
    if (!user)
        return alert("Enter a username");
    document.getElementById('authPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'flex';
}

function showSection(id) {
    document.getElementById('expenseSection').style.display = 'none';
    document.getElementById('savingsSection').style.display = 'none';
    document.getElementById(id).style.display = 'block';
}

function createCategory() {
    var name = document.getElementById('catName').value;
    var budget = document.getElementById('catBudget').value;

    if (!name || !budget)
        return alert("Enter details");

    var grid = document.getElementById('expenseGrid');
    var card = document.createElement('div');
    card.className = 'card within-limit';

    card.setAttribute('data-budget', budget);
    card.setAttribute('data-spent', 0);

    card.innerHTML = `
        <h3>${name}</h3>
        <p>Budget: $<strong>${budget}</strong></p>
        <p>Total Spent: $<span class="spent-amt">0</span></p>
        <p class="status-msg" style="color: green; font-weight: bold;">Within Limit</p>
        <hr>
        <input type="number" class="amount-to-add" placeholder="Enter amount" style="width:70%; padding:8px; margin-bottom:10px;">
        <button onclick="addMoney(this)" style="width: 100%; padding: 10px; cursor: pointer; 
        background: #2563eb; color: white; border: none; border-radius: 4px;">Add Expense</button>
    `;

    grid.appendChild(card);
    document.getElementById('catName').value = '';
    document.getElementById('catBudget').value = '';
}

function addMoney(btn) {
    var card = btn.parentNode;
    var input = card.querySelector('.amount-to-add');
    var spentDisplay = card.querySelector('.spent-amt');
    var statusMsg = card.querySelector('.status-msg');

    var addAmount = parseFloat(input.value);
    if (isNaN(addAmount) || addAmount <= 0)
        return alert("Enter a valid amount");

    var budget = parseFloat(card.getAttribute('data-budget'));
    var currentSpent = parseFloat(card.getAttribute('data-spent'));

    currentSpent += addAmount;

    card.setAttribute('data-spent', currentSpent);
    spentDisplay.innerText = currentSpent;
    input.value = '';

    var percentUsed = (currentSpent / budget) * 100;

    var states = [
        { max: 80, text: "Within Limit", color: "green", className: "within-limit" },
        { max: 100, text: "Approaching Limit!", color: "#eab308", className: "within-limit" },
        { max: Infinity, text: "Over Limit!", color: "red", className: "over-limit" }
    ];

    for (var i = 0; i < states.length; i++) {
        if (percentUsed <= states[i].max) {
            card.className = 'card ' + states[i].className;
            statusMsg.innerText = states[i].text;
            statusMsg.style.color = states[i].color;
            break;
        }
    }
}


function updateSavingsCalc() {
    var val = document.getElementById('savingsSlider').value;
    document.getElementById('sliderValDisplay').innerText = val;
    var yearly = val * 365;
    document.getElementById('yearlyTotal').innerText = "$" + yearly.toLocaleString();

    var tip = document.getElementById('suggestionBar');
    if (yearly > 6000)
        tip.innerText = "You can afford a luxury trip!";
    else if (yearly > 3000)
        tip.innerText = "You can afford a nice road trip!";
    else
        tip.innerText = "Keep saving for your next adventure!";
}
