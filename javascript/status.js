
const statusModal = document.getElementById('statusModal');
const updateButton = document.getElementById('updateButton');
const statusButton = document.getElementById('status-editor-button');
const closeStatusButton = document.getElementById('closeStatusButton');

// Button on main page that opens the status editor modal
statusButton.addEventListener('click', (event) => {
    event.preventDefault();
    statusModal.classList.add("active");
    statusModal.classList.add("open");
    statusModal.style.display = "block";
})

// Button on status editor modal that "submits" or updates the user's status
updateButton.addEventListener('click', () => {
    statusModal.classList.remove("open");
    statusModal.style.display = "none";
    updateStatus();
})

// Button on status editor modal that closes the model
closeStatusButton.addEventListener('click', () => {
    statusModal.classList.remove("open");
    statusModal.style.display = "none";
})


// Updates the status with the user's input
function updateStatus(){
    const statusInput = document.getElementById('status-input').value;
    const status = document.getElementById('status')
    status.innerText = 'Currently Reading "' + statusInput + '"';
}