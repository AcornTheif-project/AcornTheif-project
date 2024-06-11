function uploadProfileImage() {
    const fileInput = document.getElementById('profileImageInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            localStorage.setItem('profileImage', imageData);
            alert('프로필 이미지가 업로드되었습니다.');
        };
        reader.readAsDataURL(file);
    } else {
        alert('이미지를 선택하세요.');
    }
}

function setBackground() {
    const fileInput = document.getElementById('backgroundImageInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            localStorage.setItem('backgroundImage', imageData); // 배경 이미지를 localStorage에 저장
            alert('배경 이미지가 설정되었습니다.');
        };
        reader.readAsDataURL(file);
    } else {
        alert('이미지를 선택하세요.');
    }
}
