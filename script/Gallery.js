document.addEventListener('DOMContentLoaded', () => {
    // Initial load, if needed
});

let photoAlbum = document.getElementById('photoAlbum');
let storyAlbum = document.getElementById('storyAlbum');

function uploadPhoto() {
    let photoInput = document.getElementById('photoInput');
    let photoDescription = document.getElementById('photoDescription').value;

    if (photoInput.files && photoInput.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let photoId = Date.now();
            let photoHTML = `
                <div class="photo-item" data-id="${photoId}">
                    <img src="${e.target.result}" alt="사진">
                    <div class="description">${photoDescription}</div>
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
                    <img src="${e.target.result}" alt="사진">
                    <div class="description">${storyDescription}</div>
                    <div class="actions">
                        <button class="like-btn" onclick="likePhoto(${storyId}, this)">좋아요</button>
                        <button class="delete-btn" onclick="deletePhoto(${storyId})">삭제</button>
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
        };
        reader.readAsDataURL(storyInput.files[0]);
    }
}

function likePhoto(id, btn) {
    btn.classList.toggle('liked');
}

function deletePhoto(id) {
    let photoItem = document.querySelector(`.photo-item[data-id="${id}"]`);
    if (photoItem) {
        photoItem.remove();
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
