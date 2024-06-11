// DOMContentLoaded 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
    loadBoardEntries(); // 게시판 글 불러오기
});

// 게시판 게시 함수
function postBoardEntry() {
    const newPost = document.getElementById('newPost').value; // 새 게시물 내용을 가져옴
    if (newPost) {
        const boardEntries = document.getElementById('boardEntries'); // 게시판 게시물 목록 가져옴
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
        editBtn.onclick = () => makeEditable(diaryDiv, contentDiv, p, editBtn); // 수정 버튼 클릭 시 makeEditable 함수 호출
        buttonGroup.appendChild(editBtn);

        const deleteBtn = document.createElement('button'); // 삭제 버튼 생성
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = () => li.remove(); // 삭제 버튼 클릭 시 리스트 아이템 삭제
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(buttonGroup); // 리스트 아이템에 버튼 그룹 추가

        boardEntries.insertBefore(li, boardEntries.firstChild); // 게시판 게시물 목록의 맨 앞에 리스트 아이템 추가
        document.getElementById('newPost').value = ''; // 입력 필드 초기화
    }
}

// 게시물 수정 가능 상태로 전환 함수
function makeEditable(diaryDiv, contentDiv, p, editBtn) {
    const input = document.createElement('textarea');
    input.className = 'newPost';
    input.value = p.textContent;
    contentDiv.replaceChild(input, p);

    editBtn.textContent = '저장';
    editBtn.onclick = () => saveEdit(diaryDiv, contentDiv, input, p, editBtn);
}

// 게시물 수정 저장 함수
function saveEdit(diaryDiv, contentDiv, input, p, editBtn) {
    p.innerHTML = input.value.replace(/\n/g, "<br>");
    contentDiv.replaceChild(p, input);

    editBtn.textContent = '수정';
    editBtn.onclick = () => makeEditable(diaryDiv, contentDiv, p, editBtn);
}

// 게시물 불러오기 함수
function loadBoardEntries() {
    // 서버에서 게시물 불러오는 로직 (예시)
    const entries = [
        "게시물 1",
        "게시물 2"
    ];
    const boardEntries = document.getElementById('boardEntries'); // 게시판 게시물 목록 가져옴
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
        editBtn.onclick = () => makeEditable(diaryDiv, contentDiv, p, editBtn); // 수정 버튼 클릭 시 makeEditable 함수 호출
        buttonGroup.appendChild(editBtn);

        const deleteBtn = document.createElement('button'); // 삭제 버튼 생성
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = () => li.remove(); // 삭제 버튼 클릭 시 리스트 아이템 삭제
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(buttonGroup); // 리스트 아이템에 버튼 그룹 추가

        boardEntries.insertBefore(li, boardEntries.firstChild); // 게시판 게시물 목록의 맨 앞에 리스트 아이템 추가
    });
}