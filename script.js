// --- 1. CORE UTILITIES & FEEDBACK ---

// Stricter Feedback Logic (Per your request)
function getFeedback(actual, goal, type) {
    if (!goal || goal === "") return "No goal set";
    const a = parseFloat(actual);
    const g = parseFloat(goal);

    // Everything must match exactly or be better to get "Goal Met"
    if (type === 'calories') {
        return a === g ? "✅ Goal Met" : "❌ Not as Goal";
    }
    if (type === 'protein' || type === 'sleep') {
        return a >= g ? "✅ Goal Met" : "❌ Not as Goal";
    }
    if (type === 'exercise') {
        return actual === goal ? "✅ Goal Met" : "❌ Not as Goal";
    }
}

// Save Daily Goals (The hardcoded values)
function saveGoals() {
    const goals = {
        calories: document.getElementById('goal-calories').value,
        protein: document.getElementById('goal-protein').value,
        sleep: document.getElementById('goal-sleep').value,
        exercise: document.getElementById('goal-exercise').value
    };
    localStorage.setItem('fitGoals', JSON.stringify(goals));
    displayData(); // Refresh the table feedback immediately
}

// --- 2. PAGE SPECIFIC FUNCTIONS ---

// [FOR INDEX.HTML] Display the Table
function displayData() {
    const tableBody = document.getElementById('table-body');
    if (!tableBody) return; // Stop if we aren't on the Log page

    const history = JSON.parse(localStorage.getItem('fitData')) || [];
    const goals = JSON.parse(localStorage.getItem('fitGoals')) || {};

    // Sync input fields with saved goals
    if(goals.calories) document.getElementById('goal-calories').value = goals.calories;
    if(goals.protein) document.getElementById('goal-protein').value = goals.protein;
    if(goals.sleep) document.getElementById('goal-sleep').value = goals.sleep;
    if(goals.exercise) document.getElementById('goal-exercise').value = goals.exercise;

    tableBody.innerHTML = history.map(item => `
        <tr>
            <td>${item.date}</td>
            <td>${item.calories} <br><small>${getFeedback(item.calories, goals.calories, 'calories')}</small></td>
            <td>${item.protein} <br><small>${getFeedback(item.protein, goals.protein, 'protein')}</small></td>
            <td>${item.sleep}h <br><small>${getFeedback(item.sleep, goals.sleep, 'sleep')}</small></td>
            <td>${item.exercise} <br><small>${getFeedback(item.exercise, goals.exercise, 'exercise')}</small></td>
        </tr>
    `).join('');
}

// [FOR STATS.HTML] Analytics & Charts
function renderStatsPage() {
    const history = JSON.parse(localStorage.getItem('fitData')) || [];
    const goals = JSON.parse(localStorage.getItem('fitGoals')) || {};
    const summaryDiv = document.getElementById('analytics-summary');

    if (history.length === 0 || !summaryDiv) return;

    // 1. Calculate Averages across ALL entries
    const totalDays = history.length;
    const avgCal = (history.reduce((acc, curr) => acc + Number(curr.calories), 0) / totalDays).toFixed(1);
    const avgProt = (history.reduce((acc, curr) => acc + Number(curr.protein), 0) / totalDays).toFixed(1);
    const avgSleep = (history.reduce((acc, curr) => acc + Number(curr.sleep), 0) / totalDays).toFixed(1);

    // 2. Update the Text Summary
    summaryDiv.innerHTML = `
        <div class="stats-card">
            <p><strong>Entries Logged:</strong> ${totalDays} days</p>
            <p><strong>Calories:</strong> Avg ${avgCal} (Goal: ${goals.calories || 0})</p>
            <p><strong>Protein:</strong> Avg ${avgProt}g (Goal: ${goals.protein || 0}g)</p>
            <p><strong>Sleep:</strong> Avg ${avgSleep}h (Goal: ${goals.sleep || 0}h)</p>
        </div>
    `;

    // 3. Chart Setup: Comparing AVERAGE vs GOAL
    const setupComparisonChart = (canvasId, label, averageValue, goalValue, color) => {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Your Avg', 'Your Goal'],
                datasets: [{
                    label: label,
                    data: [averageValue, goalValue],
                    backgroundColor: [color, '#cbd5e1'] // Primary color for Avg, Gray for Goal
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    };

    // Initialize Charts using Averages
    setupComparisonChart('calChart', 'Calories', avgCal, goals.calories, '#4f46e5');
    setupComparisonChart('protChart', 'Protein (g)', avgProt, goals.protein, '#06b6d4');
    setupComparisonChart('sleepChart', 'Sleep (hrs)', avgSleep, goals.sleep, '#8b5cf6');
}

// --- 3. EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Always try to display data (if table exists)
    displayData();
    
    // 2. Always try to render stats (if analytics div exists)
    renderStatsPage();

    // 3. Set default date
    const dateInput = document.getElementById('date');
    if(dateInput) dateInput.valueAsDate = new Date();
});

// Form Submission (Save Entry)
const trackerForm = document.getElementById('tracker-form');
trackerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const entry = {
        date: document.getElementById('date').value,
        calories: document.getElementById('calories').value,
        protein: document.getElementById('protein').value,
        sleep: document.getElementById('sleep').value,
        exercise: document.getElementById('exercise').value
    };

    let history = JSON.parse(localStorage.getItem('fitData')) || [];
    history.unshift(entry); // Add new data to top
    localStorage.setItem('fitData', JSON.stringify(history));
    
    location.reload(); // Refresh to update Table and Averages
});

// Copy Feature
async function copyDataToClipboard() {
    const data = localStorage.getItem('fitData');
    if (!data) return alert("No data to copy!");
    await navigator.clipboard.writeText(data);
    alert("Data copied to clipboard!");
}


// --- PWA INSTALLATION LOGIC ---

let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    // 1. Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // 2. Stash the event so it can be triggered later.
    deferredPrompt = e;
    // 3. Update UI to notify the user they can install the PWA
    if (installBtn) {
        installBtn.style.display = 'block';
    }
});

installBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);

    // We've used the prompt, so we can't use it again; throw it away
    deferredPrompt = null;

    // Hide the install button
    installBtn.style.display = 'none';
});

// Hide the button if the app is already installed
window.addEventListener('appinstalled', () => {
    if (installBtn) installBtn.style.display = 'none';
    deferredPrompt = null;
    console.log('PWA was installed');

});



// ---------------- CHATBOT UI ----------------

const chatBtn = document.getElementById("chat-float-btn");
const chatOverlay = document.getElementById("chat-overlay");
const chatClose = document.getElementById("chat-close");
const openChatLink = document.getElementById("open-chat-link");

if(chatBtn){
  chatBtn.addEventListener("click", () => {
    chatOverlay.style.display = "block";
  });
}

if(chatClose){
  chatClose.addEventListener("click", () => {
    chatOverlay.style.display = "none";
  });
}

if(openChatLink){
  openChatLink.addEventListener("click", () => {
    window.location.href = "https://fitness-tracker-chatbot-3-0.onrender.com";
  });
}

