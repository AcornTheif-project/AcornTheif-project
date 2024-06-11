document.addEventListener('DOMContentLoaded', () => {
    // Initial load, if needed
});

let photoAlbum = document.getElementById('photoAlbum');
let storyAlbum = document.getElementById('storyAlbum');
let modal = document.getElementById('photoModal');
let modalImg = document.getElementById('modalImage');

let currentIndex = 0;
let images = [];

function uploadPhoto() {
    let photoInput = document.getElementById('photoInput');
    let photoDescription = document.getElementById('photoDescription').value;
    if (photoInput.files && photoInput.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let photoId = Date.now();
            let photoHTML = `
            <div class="photo-item" data-id="${photoId}">
                <div class="photo-content">
                    <img src="${e.target.result}" alt="사진" onclick="openModal('${e.target.result}', ${photoId})">
                    <div class="description">${photoDescription}</div>
                    <button class="edit-btn" onclick="editDescription(${photoId}, 'photo')">수정</button>
</div>
<div class="actions">
    <button class="like-btn" onclick="likePhoto(${photoId}, this)">좋아요</button>
    <button class="delete-btn" onclick="deletePhoto(${photoId})">삭제</button>
</div>
<div class="comment-section">
    <textarea placeholder="댓글을 입력하세요"></textarea>
    <button onclick="addComment(${photoId}, this)">댓글 추가</button>
    <div class="comments" id="comments-${photoId}"></div>
</div>
</div>
`;
photoAlbum.insertAdjacentHTML('beforeend', photoHTML);
photoInput.value = '';
document.getElementById('photoDescription').value = '';
updateImages();
};
reader.readAsDataURL(photoInput.files[0]);
}
}
function uploadStory() {
let storyInput = document.getElementById('storyInput');
let storyDescription = document.getElementById('storyDescription').value;
if (storyInput.files && storyInput.files[0]) {
let reader = new FileReader();
reader.onload = function (e) {
let storyId = Date.now();
let storyHTML = `
<div class="story-item" data-id="${storyId}">
    <div class="photo-content">
        <img src="${e.target.result}" alt="사진" onclick="openModal('${e.target.result}', ${storyId})">
        <div class="description">${storyDescription}</div>
        <button class="edit-btn" onclick="editDescription(${storyId}, 'story')">수정</button>
    </div>
    <div class="actions">
        <button class="like-btn" onclick="likePhoto(${storyId}, this)">좋아요</button>
        <button class="delete-btn" onclick="deleteStory(${storyId}, false)">삭제</button>
    </div>
    <div class="comment-section">
        <textarea placeholder="댓글을 입력하세요"></textarea>
        <button onclick="addComment(${storyId}, this)">댓글 추가</button>
        <div class="comments" id="comments-${storyId}"></div>
    </div>
</div>
`;
storyAlbum.insertAdjacentHTML('beforeend', storyHTML);
storyInput.value = '';
document.getElementById('storyDescription').value = '';

// Set a timeout to automatically delete the story after 3 minutes (180000 milliseconds)
setTimeout(() => {
deleteStory(storyId, true); // 자동 삭제 시 confirm 없이
}, 180000);
updateImages();
};
reader.readAsDataURL(storyInput.files[0]);
}
}

function deleteStory(id, autoDelete = false) {
if (autoDelete || confirm("삭제하시겠습니까?")) {
let storyItem = document.querySelector(`.story-item[data-id="${id}"]`);
if (storyItem) {
storyItem.remove();
}
updateImages();
}
}

function likePhoto(id, btn) {
btn.classList.toggle('liked');
if (btn.classList.contains('liked')) {
btn.style.backgroundColor = "#55b2d4";
btn.style.color = "white";
} else {
btn.style.backgroundColor = "white";
btn.style.color = "#55b2d4";
}
}

function deletePhoto(id) {
if (confirm("삭제하시겠습니까?")) {
let photoItem = document.querySelector(`.photo-item[data-id="${id}"]`);
if (photoItem) {
photoItem.remove();
}
updateImages();
}
}

function addComment(photoId, btn) {
let commentSection = btn.parentElement;
let textarea = commentSection.querySelector('textarea');
let commentText = textarea.value;
let commentsDiv = document.getElementById(`comments-${photoId}`);
if (commentText) {
let commentHTML = `<div class="comment-item">${commentText}</div>`;
commentsDiv.insertAdjacentHTML('beforeend', commentHTML);
textarea.value = '';
}
}

function openModal(src, id) {
modal.style.display = "block";
modalImg.src = src;
currentIndex = images.findIndex(img => img.id === id);
}

function closeModal() {
modal.style.display = "none";
}

function changeModalImage(direction) {
currentIndex += direction;
if (currentIndex >= images.length) currentIndex = 0;
if (currentIndex < 0) currentIndex = images.length - 1;
modalImg.src = images[currentIndex].src;
}

function updateImages() {
images = [];
document.querySelectorAll('.photo-item img, .story-item img').forEach(img => {
images.push({
src: img.src,
id: parseInt(img.closest('[data-id]').getAttribute('data-id'))
});
});
}

function editDescription(id, type) {
let descriptionDiv = document.querySelector(`.${type}-item[data-id="${id}"] .description`);
let currentDescription = descriptionDiv.innerText;
descriptionDiv.innerHTML = `
<textarea class="edit-description">${currentDescription}</textarea>
<button onclick="saveDescription(${id}, '${type}')">저장</button>
`;
}

function saveDescription(id, type) {
let descriptionDiv = document.querySelector(`.${type}-item[data-id="${id}"] .description`);
let newDescription = descriptionDiv.querySelector('.edit-description').value;
descriptionDiv.innerHTML = newDescription;
}