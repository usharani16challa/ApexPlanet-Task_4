// --- PROJECT DATA (For Filtering/Sorting) ---
const projects = [
    { name: "E-Commerce UI", category: "web", rating: 5 },
    { name: "Portfolio Template", category: "web", rating: 4 },
    { name: "Logo Branding", category: "design", rating: 3 },
    { name: "Mobile App Mockup", category: "design", rating: 5 }
];

function displayProjects(data) {
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = data.map(p => `
        <div class="project-card">
            <h3>${p.name}</h3>
            <p>Category: ${p.category.toUpperCase()}</p>
            <p>Rating: ${'⭐'.repeat(p.rating)}</p>
        </div>
    `).join('');
}

function filterProjects(cat) {
    const filtered = cat === 'all' ? projects : projects.filter(p => p.category === cat);
    displayProjects(filtered);
}

function sortProjects() {
    const val = document.getElementById('sortProjects').value;
    let sorted = [...projects];
    if (val === 'high') sorted.sort((a, b) => b.rating - a.rating);
    if (val === 'low') sorted.sort((a, b) => a.rating - b.rating);
    displayProjects(sorted);
}

// --- LOCAL STORAGE NOTES LOGIC ---
function addNote() {
    const input = document.getElementById('noteText');
    if (!input.value) return;

    const notes = JSON.parse(localStorage.getItem('myNotes') || "[]");
    notes.push(input.value);
    localStorage.setItem('myNotes', JSON.stringify(notes));
    
    input.value = "";
    loadNotes();
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('myNotes') || "[]");
    const container = document.getElementById('noteList');
    container.innerHTML = notes.map((note, index) => `
        <div class="note-item">
            ${note} <span class="delete-note" onclick="deleteNote(${index})">×</span>
        </div>
    `).join('');
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('myNotes'));
    notes.splice(index, 1);
    localStorage.setItem('myNotes', JSON.stringify(notes));
    loadNotes();
}

// Initial Load
displayProjects(projects);
loadNotes();