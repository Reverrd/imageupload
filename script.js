// script.js
const dropArea = document.getElementById('drop-area');
const fileElement = document.getElementById('fileElement');
const gallery = document.getElementById('gallery');
const confirmDelete = document.getElementById('confirmDelete');
const cancelBtn = document.getElementById('cancelBtn');
const deleteBtn = document.getElementById('deleteBtn');

let filesArray = [];
let deleteIndex = null;

dropArea.addEventListener('click', () => {
    fileElement.click();
});

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('highlight');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileElement.addEventListener('change', (e) => {
    const files = e.target.files;
    handleFiles(files);
});

function handleFiles(files) {
    for (const file of files) {
        filesArray.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            const div = document.createElement('div');
            div.classList.add('uploaded-image');
            div.appendChild(img);
            const progressBar = document.createElement('div');
            progressBar.classList.add('progress-bar');
            progressBar.style.width = '100%';
            div.appendChild(progressBar);
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                showDeleteConfirmation(filesArray.length - 1);
            });
            div.appendChild(deleteBtn);
            gallery.appendChild(div);
        };
        reader.readAsDataURL(file);
    }
}

function showDeleteConfirmation(index) {
    deleteIndex = index;
    confirmDelete.classList.remove('hidden');
}

cancelBtn.addEventListener('click', () => {
    confirmDelete.classList.add('hidden');
});

deleteBtn.addEventListener('click', () => {
    filesArray.splice(deleteIndex, 1);
    gallery.removeChild(gallery.children[deleteIndex]);
    confirmDelete.classList.add('hidden');
    deleteIndex = null;
});
