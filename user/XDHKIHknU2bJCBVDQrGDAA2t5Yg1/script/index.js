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

document.addEventListener('DOMContentLoaded', () => {
    const profileImage = localStorage.getItem('profileImage');
    if (profileImage) {
        const profileImageContainer = document.getElementById('profileImageContainer');
        profileImageContainer.style.backgroundImage = `url(${profileImage})`;
        profileImageContainer.style.backgroundSize = 'cover';
        profileImageContainer.style.backgroundPosition = 'center';
    }
  
    const backgroundImage = localStorage.getItem('backgroundImage'); // localStorage에서 배경 이미지 가져오기
    if (backgroundImage) {
        document.querySelector('.background').style.backgroundImage = `url('${backgroundImage}')`; // .background 클래스의 배경 이미지 변경
    }
  });
  
function menuHome() {
    document.getElementById("contentFrame").setAttribute("src", "home.html");
    document.getElementById("menuHome").style =
      "color: black; background-color: white;";
    document.getElementById("menuDiary").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuGallery").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuBoard").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuGuestbook").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuSetting").style =
      "color: white; background-color: #298EB5;";
  }

  function menuDiary() {
    document
      .getElementById("contentFrame")
      .setAttribute("src", "Diary.html");
    document.getElementById("menuHome").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuDiary").style =
      "color: black; background-color: white;";
    document.getElementById("menuGallery").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuBoard").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuGuestbook").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuSetting").style =
      "color: white; background-color: #298EB5;";
  }

  function menuGallery() {
    document
      .getElementById("contentFrame")
      .setAttribute("src", "Gallery.html");
    document.getElementById("menuHome").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuDiary").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuGallery").style =
      "color: black; background-color: white;";
    document.getElementById("menuBoard").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuGuestbook").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuSetting").style =
      "color: white; background-color: #298EB5;";
  }

  function menuBoard() {
    document
      .getElementById("contentFrame")
      .setAttribute("src", "Board.html");
    document.getElementById("menuHome").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuDiary").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuGallery").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuBoard").style =
      "color: black; background-color: white;";
    document.getElementById("menuGuestbook").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuSetting").style =
      "color: white; background-color: #298EB5;";
  }

  function menuGuestbook() {
    document
      .getElementById("contentFrame")
      .setAttribute("src", "Guestbook.html");
    document.getElementById("menuHome").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuDiary").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuGallery").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuBoard").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuGuestbook").style =
      "color: black; background-color: white;";
    document.getElementById("menuSetting").style =
      "color: white; background-color: #298EB5;";
  }

  function menuSetting() {
    document
      .getElementById("contentFrame")
      .setAttribute("src", "setting.html");
    document.getElementById("menuHome").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuDiary").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuGallery").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuBoard").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuGuestbook").style =
      "color: white; background-color: #298EB5;";
    document.getElementById("menuSetting").style =
      "color: black; background-color: white;";
  }