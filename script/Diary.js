// Diary.js

// DOMContentLoaded 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
    loadDiaryEntries(); // 다이어리 글 불러오기
    load24hStories(); // 24시간 스토리 불러오기
});

// 다이어리 게시 함수
function postDiaryEntry() {
    const newPost = document.getElementById('newPost').value; // 새 게시물 내용을 가져옴
    if (newPost) {
        const diaryEntries = document.getElementById('diaryEntries'); // 다이어리 게시물 목록 가져옴
        const li = document.createElement('li'); // 새로운 리스트 아이템 생성
        li.textContent = newPost; // 리스트 아이템에 새 게시물 내용 설정
        const deleteBtn = document.createElement('button'); // 삭제 버튼 생성
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = () => li.remove(); // 삭제 버튼 클릭 시 리스트 아이템 삭제
        li.appendChild(deleteBtn); // 리스트 아이템에 삭제 버튼 추가
        diaryEntries.insertBefore(li, diaryEntries.firstChild); // 다이어리 게시물 목록의 맨 앞에 리스트 아이템 추가
        document.getElementById('newPost').value = ''; // 입력 필드 초기화
    }
}

// 비밀번호 확인 후 다이어리 및 스토리 접근 함수
function accessMyDiary() {
    const password = document.getElementById('myDiaryPassword').value; // 입력된 비밀번호 가져옴
    if (validatePassword(password)) {
        document.getElementById('passwordSection').style.display = 'none'; // 비밀번호 섹션 숨김
        document.getElementById('myDiarySection').style.display = 'block'; // 내 다이어리 섹션 표시
        document.getElementById('storySection').style.display = 'block'; // 24시간 스토리 섹션 표시
    } else {
        alert('비밀번호가 유효하지 않습니다.'); // 비밀번호가 틀리면 경고 메시지
    }
}

// 비밀번호 유효성 검사 함수
function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,13}$/;
    return regex.test(password); // 정규식을 사용하여 비밀번호 유효성 검사
}

// 24시간 스토리 게시 함수
function post24hStory() {
    const newStory = document.getElementById('newStory').value; // 새 스토리 내용을 가져옴
    if (newStory) {
        const storyEntries = document.getElementById('storyEntries'); // 스토리 게시물 목록 가져옴
        const div = document.createElement('div'); // 새로운 div 요소 생성
        div.textContent = newStory; // div 요소에 새 스토리 내용 설정
        const likeBtn = document.createElement('button'); // 좋아요 버튼 생성
        likeBtn.textContent = '좋아요';
        likeBtn.onclick = () => alert('좋아요를 눌렀습니다.'); // 좋아요 버튼 클릭 시 알림
        div.appendChild(likeBtn); // div 요소에 좋아요 버튼 추가
        storyEntries.insertBefore(div, storyEntries.firstChild); // 스토리 게시물 목록의 맨 앞에 div 요소 추가
        document.getElementById('newStory').value = ''; // 입력 필드 초기화
    }
}

// 다이어리 글 불러오기 함수
function loadDiaryEntries() {
    // 서버에서 다이어리 글을 불러오는 로직 (예시)
    const entries = [
        "다이어리 글 1",
        "다이어리 글 2"
    ];
    const diaryEntries = document.getElementById('diaryEntries'); // 다이어리 게시물 목록 가져옴
    entries.forEach(entry => {
        const li = document.createElement('li'); // 새로운 리스트 아이템 생성
        li.textContent = entry; // 리스트 아이템에 다이어리 글 내용 설정
        const deleteBtn = document.createElement('button'); // 삭제 버튼 생성
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = () => li.remove(); // 삭제 버튼 클릭 시 리스트 아이템 삭제
        li.appendChild(deleteBtn); // 리스트 아이템에 삭제 버튼 추가
        diaryEntries.insertBefore(li, diaryEntries.firstChild); // 다이어리 게시물 목록의 맨 앞에 리스트 아이템 추가
    });
}

// 24시간 스토리 불러오기 함수
function load24hStories() {
    // 서버에서 24시간 게시물을 불러오는 로직 (예시)
    const stories = [
        "Story 1",
        "Story 2"
    ];
    const storyEntries = document.getElementById('storyEntries'); // 스토리 게시물 목록 가져옴
    stories.forEach(story => {
        const div = document.createElement('div'); // 새로운 div 요소 생성
        div.textContent = story; // div 요소에 스토리 내용 설정
        const likeBtn = document.createElement('button'); // 좋아요 버튼 생성
        likeBtn.textContent = '좋아요';
        likeBtn.onclick = () => alert('좋아요를 눌렀습니다.'); // 좋아요 버튼 클릭 시 알림
        div.appendChild(likeBtn); // div 요소에 좋아요 버튼 추가
        storyEntries.insertBefore(div, storyEntries.firstChild); // 스토리 게시물 목록의 맨 앞에 div 요소 추가
    });
}