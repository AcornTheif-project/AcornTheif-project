// Diary.js

// DOMContentLoaded 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
    loadDiaryEntries(); // 다이어리 글 불러오기
});

// 다이어리 게시 함수
function postDiaryEntry() {
    const newPost = document.getElementById('newPost').value; // 새 게시물 내용을 가져옴
    if (newPost) {
        const diaryEntries = document.getElementById('diaryEntries'); // 다이어리 게시물 목록 가져옴
        const li = document.createElement('li'); // 새로운 리스트 아이템 생성
        const textSpan = document.createElement('span'); // 게시물 내용을 담을 span 생성
        textSpan.textContent = newPost;
        li.appendChild(textSpan);

        const buttonGroup = document.createElement('div'); // 버튼 그룹 div 생성
        buttonGroup.className = 'button-group';

        const editBtn = document.createElement('button'); // 수정 버튼 생성
        editBtn.textContent = '수정';
        editBtn.onclick = () => makeEditable(li, textSpan, editBtn); // 수정 버튼 클릭 시 makeEditable 함수 호출
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
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,13}$/;
    return regex.test(password); // 정규식을 사용하여 비밀번호 유효성 검사
}

// 다이어리 글 수정 가능 상태로 전환 함수
function makeEditable(li, textSpan, editBtn) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = textSpan.textContent;
    li.insertBefore(input, textSpan);
    li.removeChild(textSpan);

    editBtn.textContent = '저장';
    editBtn.onclick = () => saveEdit(li, input, textSpan, editBtn); // 저장 버튼 클릭 시 saveEdit 함수 호출
}

// 다이어리 글 저장 함수
function saveEdit(li, input, textSpan, editBtn) {
    textSpan.textContent = input.value;
    li.insertBefore(textSpan, input);
    li.removeChild(input);

    editBtn.textContent = '수정';
    editBtn.onclick = () => makeEditable(li, textSpan, editBtn); // 수정 버튼 클릭 시 makeEditable 함수 호출
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
        const textSpan = document.createElement('span'); // 게시물 내용을 담을 span 생성
        textSpan.textContent = entry;
        li.appendChild(textSpan);

        const buttonGroup = document.createElement('div'); // 버튼 그룹 div 생성
        buttonGroup.className = 'button-group';

        const editBtn = document.createElement('button'); // 수정 버튼 생성
        editBtn.textContent = '수정';
        editBtn.onclick = () => makeEditable(li, textSpan, editBtn); // 수정 버튼 클릭 시 makeEditable 함수 호출
        buttonGroup.appendChild(editBtn);

        const deleteBtn = document.createElement('button'); // 삭제 버튼 생성
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = () => li.remove(); // 삭제 버튼 클릭 시 리스트 아이템 삭제
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(buttonGroup); // 리스트 아이템에 버튼 그룹 추가

        diaryEntries.insertBefore(li, diaryEntries.firstChild); // 다이어리 게시물 목록의 맨 앞에 리스트 아이템 추가
    });
}
