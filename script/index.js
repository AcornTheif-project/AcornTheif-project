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
  }

  async function fetchData() {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      
      document.querySelector('.today .zero').innerText = data.today || 0;
      document.querySelector('.today .count').innerText = data.total || 0;
      document.querySelector('.profile__detail.name').innerText = `name: ${data.name || ''}`;
      document.querySelector('.profile__detail.phone').innerText = `phone: ${data.phone || ''}`;
      document.querySelector('.profile__detail.mail').innerText = `mail: ${data.mail || ''}`;
      document.querySelector('.profile__detail.instagram').innerText = `instagram: ${data.instagram || ''}`;
  
      const friendPoolSelect = document.querySelector('.friendpool__select');
      friendPoolSelect.innerHTML = '';
      (data.friendPool || []).forEach(friend => {
        const option = document.createElement('option');
        option.text = friend;
        friendPoolSelect.add(option);
      });
  
      const feelSelect = document.querySelector('.feel__select');
      feelSelect.value = data.feel || '기쁨 😃';
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', fetchData);
  
  