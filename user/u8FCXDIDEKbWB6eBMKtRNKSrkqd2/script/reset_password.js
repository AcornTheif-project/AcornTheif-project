// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANUvuFVtSO5hNo4wrE67XlGJnvmx-qjHU",
    authDomain: "acornproject-31fe8.firebaseapp.com",
    projectId: "acornproject-31fe8",
    storageBucket: "acornproject-31fe8.appspot.com",
    messagingSenderId: "186186674797",
    appId: "1:186186674797:web:f6a5ae00c7c0be9026c564",
    measurementId: "G-35N8JE5ZHQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reset Password function
function resetPassword() {
    const email = document.getElementById('reset-email').value;
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert('비밀번호 재설정 이메일이 전송되었습니다.');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('오류: ' + error.message);
        });
}
// Reset Password function
