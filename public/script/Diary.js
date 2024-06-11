document.addEventListener('DOMContentLoaded', () => {
    loadDiaryEntries(); // 다이어리 글 불러오기
    load24hStories(); // 24시간 스토리 불러오기
});

function postDiaryEntry() {
    const newPost = document.getElementById('newPost').value;
    if (newPost) {
        const diaryEntries = document.getElementById('diaryEntries');
        const li = document.createElement('li');
        li.textContent = newPost;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = () => li.remove();
        li.appendChild(deleteBtn);
        diaryEntries.appendChild(li);
        document.getElementById('newPost').value = '';
    }
}

function accessMyDiary() {
    const password = document.getElementById('myDiaryPassword').value;
    if (validatePassword(password)) {
        document.getElementById('myDiaryContent').style.display = 'block'; // 비밀번호가 맞으면 콘텐츠 표시
    } else {
        alert('비밀번호가 유효하지 않습니다.');
    }
}

function accessFriendDiary() {
    const password = document.getElementById('friendDiaryPassword').value;
    if (validatePassword(password)) {
        document.getElementById('friendDiaryContent').style.display = 'block'; // 비밀번호가 맞으면 콘텐츠 표시
        loadFriendDiaryEntries(); // 친구 다이어리 글 불러오기
    } else {
        alert('비밀번호가 유효하지 않습니다.');
    }
}

function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,13}$/;
    return regex.test(password); // 비밀번호 유효성 검사
}

function post24hStory() {
    const newStory = document.getElementById('newStory').value;
    if (newStory) {
        const storyEntries = document.getElementById('storyEntries');
        const div = document.createElement('div');
        div.textContent = newStory;
        const likeBtn = document.createElement('button');
        likeBtn.textContent = '좋아요';
        likeBtn.onclick = () => alert('좋아요를 눌렀습니다.');
        div.appendChild(likeBtn);
        storyEntries.appendChild(div);
        document.getElementById('newStory').value = '';
    }
}

function loadDiaryEntries() {
    // 서버에서 다이어리 글을 불러오는 로직
    const entries = [
        "다이어리 글 1",
        "다이어리 글 2"
    ];
    const diaryEntries = document.getElementById('diaryEntries');
    entries.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = () => li.remove();
        li.appendChild(deleteBtn);
        diaryEntries.appendChild(li);
    });
}

function loadFriendDiaryEntries() {
    // 서버에서 친구 다이어리 글을 불러오는 로직
    const entries = [
        "친구 다이어리 글 1",
        "친구 다이어리 글 2"
    ];
    const friendDiaryEntries = document.getElementById('friendDiaryEntries');
    entries.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        friendDiaryEntries.appendChild(li);
    });
}

function load24hStories() {
    // 서버에서 24시간 게시물을 불러오는 로직
    const stories = [
        "Story 1",
        "Story 2"
    ];
    const storyEntries = document.getElementById('storyEntries');
    stories.forEach(story => {
        const div = document.createElement('div');
        div.textContent = story;
        const likeBtn = document.createElement('button');
        likeBtn.textContent = '좋아요';
        likeBtn.onclick = () => alert('좋아요를 눌렀습니다.');
        div.appendChild(likeBtn);
        storyEntries.appendChild(div);
    });
}
