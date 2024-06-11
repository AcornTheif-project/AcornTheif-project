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

// Register function
function register() {
  const name = document.getElementById('writer').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password1').value;
  const confirmPassword = document.getElementById('password2').value;
  const region = document.getElementById('location').value;
  const genderElements = document.getElementsByName('gender');
  let gender = '';
  for (let i = 0; i < genderElements.length; i++) {
      if (genderElements[i].checked) {
          gender = genderElements[i].value;
          break;
      }
  }

  let isValid = true;

  if (!email.includes("@")) {
      document.getElementById("error__email").innerText = "이메일이 올바르지 않습니다.";
      isValid = false;
  } else {
      document.getElementById("error__email").innerText = "";
  }

  if (name === "") {
      document.getElementById("error__writer").innerText = "이름이 올바르지 않습니다.";
      isValid = false;
  } else {
      document.getElementById("error__writer").innerText = "";
  }

  if (password === "") {
      document.getElementById("error__password1").innerText = "비밀번호를 입력해 주세요.";
      isValid = false;
  } else {
      document.getElementById("error__password1").innerText = "";
  }

  if (confirmPassword === "") {
      document.getElementById("error__password2").innerText = "비밀번호를 입력해 주세요.";
      isValid = false;
  } else {
      document.getElementById("error__password2").innerText = "";
  }

  if (password !== confirmPassword) {
      document.getElementById("error__password1").innerText = "비밀번호가 일치하지 않습니다.";
      document.getElementById("error__password2").innerText = "비밀번호가 일치하지 않습니다.";
      isValid = false;
  }

  const validRegions = ["서울", "경기", "인천", "전라", "광주", "강원", "경상", "충청", "제주"];
  if (!validRegions.includes(region)) {
      document.getElementById("error__location").innerText = "지역을 선택해 주세요.";
      isValid = false;
  } else {
      document.getElementById("error__location").innerText = "";
  }

  if (!gender) {
      document.getElementById("error__gender").innerText = "성별을 선택해 주세요.";
      isValid = false;
  } else {
      document.getElementById("error__gender").innerText = "";
  }

  if (isValid) {
      fetch('/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password, region, gender })
      })
      .then(response => response.text())
      .then(data => {
          alert(data);
          window.location.href = '/';
      })
      .catch(error => console.error('Error:', error));
  }
}
