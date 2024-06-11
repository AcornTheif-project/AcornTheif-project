<<<<<<< HEAD:script/Diary.js
// DOMContentLoaded 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
    loadDiaryEntries(); // 다이어리 글 불러오기
});

// 비밀번호 확인 후 다이어리 접근 함수
function accessMyDiary() {
    const password = document.getElementById('myDiaryPassword').value; // 입력된 비밀번호 가져옴
    if (validatePassword(password)) {
        document.getElementById('passwordSection').style.display = 'none'; // 비밀번호 섹션 숨김
        document.getElementById('myDiarySection').style.display = 'block'; // 내 다이어리 섹션 표시
    } else {
        alert('비밀번호가 유효하지 않습니다.'); // 비밀번호가 틀리면 경고 메시지
    }
}

// 비밀번호 유효성 검사 함수
function validatePassword(password) {
    const correctPassword = "Test1234!"; // 올바른 비밀번호 예시 (이 비밀번호를 실제 비밀번호로 교체해야 합니다)
    return password === correctPassword;
}

// 다이어리 게시 함수
function postDiaryEntry() {
    const newPost = document.getElementById('newPost').value; // 새 게시물 내용을 가져옴
    if (newPost) {
        const diaryEntries = document.getElementById('diaryEntries'); // 다이어리 게시물 목록 가져옴
        const li = document.createElement('li'); // 새로운 리스트 아이템 생성

        // 다이어리 스타일의 게시물 생성
        const diaryDiv = document.createElement('div');
        diaryDiv.className = 'diary';

        const dateDiv = document.createElement('div');
        dateDiv.className = 'diary-date';
        dateDiv.textContent = new Date().toLocaleString(); // 현재 날짜와 시간 추가

        const contentDiv = document.createElement('div');
        contentDiv.className = 'diary-contents';
        const p = document.createElement('p');
        p.innerHTML = newPost.replace(/\n/g, "<br>");
        contentDiv.appendChild(p);

        diaryDiv.appendChild(dateDiv);
        diaryDiv.appendChild(contentDiv);

        li.appendChild(diaryDiv);

        const buttonGroup = document.createElement('div'); // 버튼 그룹 div 생성
        buttonGroup.className = 'button-group';

        const editBtn = document.createElement('button'); // 수정 버튼 생성
        editBtn.className = 'edit';
        editBtn.textContent = '수정';
        editBtn.onclick = () => makeEditable(li, contentDiv, p, editBtn); // 수정 버튼 클릭 시 makeEditable 함수 호출
        buttonGroup.appendChild(editBtn);

        const deleteBtn = document.createElement('button'); // 삭제 버튼 생성
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = () => li.remove(); // 삭제 버튼 클릭 시 리스트 아이템 삭제
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(buttonGroup); // 리스트 아이템에 버튼 그룹 추가

        diaryEntries.insertBefore(li, diaryEntries.firstChild); // 다이어리 게시물 목록의 맨 앞에 리스트 아이템 추가
        document.getElementById('newPost').value = ''; // 입력 필드 초기화
    }
}

// 게시물 수정 가능 상태로 전환 함수
function makeEditable(li, contentDiv, p, editBtn) {
    const input = document.createElement('textarea');
    input.className = 'newPost';
    input.value = p.textContent;
    contentDiv.replaceChild(input, p);

    editBtn.textContent = '저장';
    editBtn.onclick = () => saveEdit(li, contentDiv, input, p, editBtn);
}

// 게시물 수정 저장 함수
function saveEdit(li, contentDiv, input, p, editBtn) {
    p.innerHTML = input.value.replace(/\n/g, "<br>");
    contentDiv.replaceChild(p, input);

    editBtn.textContent = '수정';
    editBtn.onclick = () => makeEditable(li, contentDiv, p, editBtn);
}

// 게시물 불러오기 함수
function loadDiaryEntries() {
    // 서버에서 다이어리 글을 불러오는 로직 (예시)
    const entries = [
        "다이어리 글 1",
        "다이어리 글 2"
    ];
    const diaryEntries = document.getElementById('diaryEntries'); // 다이어리 게시물 목록 가져옴
    entries.forEach(entry => {
        const li = document.createElement('li'); // 새로운 리스트 아이템 생성

        // 다이어리 스타일의 게시물 생성
        const diaryDiv = document.createElement('div');
        diaryDiv.className = 'diary';

        const dateDiv = document.createElement('div');
        dateDiv.className = 'diary-date';
        dateDiv.textContent = new Date().toLocaleString(); // 현재 날짜와 시간 추가

        const contentDiv = document.createElement('div');
        contentDiv.className = 'diary-contents';
        const p = document.createElement('p');
        p.innerHTML = entry.replace(/\n/g, "<br>");
        contentDiv.appendChild(p);

        diaryDiv.appendChild(dateDiv);
        diaryDiv.appendChild(contentDiv);

        li.appendChild(diaryDiv);

        const buttonGroup = document.createElement('div'); // 버튼 그룹 div 생성
        buttonGroup.className = 'button-group';

        const editBtn = document.createElement('button'); // 수정 버튼 생성
        editBtn.className = 'edit';
        editBtn.textContent = '수정';
        editBtn.onclick = () => makeEditable(li, contentDiv, p, editBtn); // 수정 버튼 클릭 시 makeEditable 함수 호출
        buttonGroup.appendChild(editBtn);

        const deleteBtn = document.createElement('button'); // 삭제 버튼 생성
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = () => li.remove(); // 삭제 버튼 클릭 시 리스트 아이템 삭제
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(buttonGroup); // 리스트 아이템에 버튼 그룹 추가

        diaryEntries.insertBefore(li, diaryEntries.firstChild); // 다이어리 게시물 목록의 맨 앞에 리스트 아이템 추가
    });
}
=======
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
>>>>>>> main:user/VxiV8dXnW7beGgTPOsUvryudGKB2/script/Diary.js
