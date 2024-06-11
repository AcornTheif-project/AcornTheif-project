// 게시판 게시 함수
function postBoardEntry() {
    const newPost = document.getElementById('newPost').value;
    if (newPost) {
        const boardEntries = document.getElementById('boardEntries');
        const li = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.className = 'text';
        textSpan.textContent = newPost;
        li.appendChild(textSpan);

        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit';
        editBtn.textContent = '수정';
        editBtn.onclick = () => makeEditable(li, textSpan, editBtn);
        buttonGroup.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = () => li.remove();
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(buttonGroup);
        boardEntries.insertBefore(li, boardEntries.firstChild);
        document.getElementById('newPost').value = '';
    }
}

// 게시물 수정 가능 상태로 전환 함수
function makeEditable(li, textSpan, editBtn) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = textSpan.textContent;
    input.className = 'text';
    li.insertBefore(input, textSpan);
    li.removeChild(textSpan);

    editBtn.textContent = '저장';
    editBtn.onclick = () => saveEdit(li, input, textSpan, editBtn);
}

// 게시물 수정 저장 함수
function saveEdit(li, input, textSpan, editBtn) {
    textSpan.textContent = input.value;
    li.insertBefore(textSpan, input);
    li.removeChild(input);

    editBtn.textContent = '수정';
    editBtn.onclick = () => makeEditable(li, textSpan, editBtn);
}
