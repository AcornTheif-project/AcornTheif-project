document.addEventListener('DOMContentLoaded', () => {
    // Initial load, if needed
});

function submitGuestbook() {
    let guestName = document.getElementById('guestName').value;
    let guestComment = document.getElementById('guestComment').value;

    if (guestName && guestComment) {
        let guestbookEntryHTML = `
            <div class="guestbook-item">
                <div>
                    <strong>${guestName}</strong>: ${guestComment}
                </div>
                <button class="delete-btn" onclick="confirmDelete(this)">삭제</button>
            </div>
        `;
        let guestbookEntries = document.getElementById('guestbookEntries');
        guestbookEntries.insertAdjacentHTML('beforeend', guestbookEntryHTML);

        // Clear input fields after submission
        document.getElementById('guestName').value = '';
        document.getElementById('guestComment').value = '';
    }
}

function confirmDelete(button) {
    let confirmation = confirm("정말 삭제할까요?");
    if (confirmation) {
        deleteGuestbookEntry(button);
    }
}

function deleteGuestbookEntry(button) {
    let entry = button.parentElement;
    entry.remove();
}
