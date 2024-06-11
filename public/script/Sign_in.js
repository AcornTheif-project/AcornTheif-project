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

// Login function
function login() {
    const email = document.getElementById('id').value; // 변경된 ID
    const password = document.getElementById('password').value; // 변경된 ID

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            alert(data);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Google Login function
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            result.user.getIdToken().then((idToken) => {
                fetch('/login/google', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ idToken })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.redirectUrl) {
                        window.location.href = data.redirectUrl;
                    } else {
                        alert(data);
                    }
                })
                .catch(error => console.error('Error:', error));
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        });
}

// Go to register page
function goToRegister() {
    window.location.href = '/Sign_up.html';
}

// Go to reset password page
function goToResetPassword() {
    window.location.href = '/reset_password.html';
}

// Find ID function
function findId() {
    alert('아이디 찾기 기능은 아직 구현되지 않았습니다.');
}

// Find Password function
function findPassword() {
    const email = document.getElementById('id').value; // 변경된 ID
    if (!email) {
        alert('이메일을 입력해주세요.');
        return;
    }

    fetch('/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => console.error('Error:', error));
}
