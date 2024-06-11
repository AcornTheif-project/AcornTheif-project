document.addEventListener('DOMContentLoaded', () => {
    // Initial load, if needed
});

function submitGuestbook() {
    let guestName = document.getElementById('guestName').value;
    let guestComment = document.getElementById('guestComment').value;

    if (guestName && guestComment) {
        let guestbookEntryHTML = `
            <div class="guestbook-item">
                <strong>${guestName}</strong>: ${guestComment}
            </div>
        `;
        let guestbookEntries = document.getElementById('guestbookEntries');
        guestbookEntries.insertAdjacentHTML('beforeend', guestbookEntryHTML);

        // Clear input fields after submission
        document.getElementById('guestName').value = '';
        document.getElementById('guestComment').value = '';
    }
}
