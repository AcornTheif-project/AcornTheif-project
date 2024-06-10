// 필요한 모듈들을 불러옵니다.
const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
require('firebase/auth');
const admin = require('firebase-admin');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const fs = require('fs');

// Firebase 설정 정보를 정의합니다.
const firebaseConfig = {
  apiKey: "AIzaSyANUvuFVtSO5hNo4wrE67XlGJnvmx-qjHU",
  authDomain: "acornproject-31fe8.firebaseapp.com",
  projectId: "acornproject-31fe8",
  storageBucket: "acornproject-31fe8.appspot.com",
  messagingSenderId: "186186674797",
  appId: "1:186186674797:web:f6a5ae00c7c0be9026c564",
  measurementId: "G-35N8JE5ZHQ"
};

// Firebase를 초기화합니다.
firebase.initializeApp(firebaseConfig);

// Firebase Admin SDK를 초기화합니다.
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acornproject-31fe8-default-rtdb.firebaseio.com"
});

// Firebase Authentication 메서드를 불러옵니다.
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

// Express 앱을 생성합니다.
const app = express();
app.use(bodyParser.json()); // 요청 바디를 JSON으로 파싱합니다.
app.use(cors()); // CORS를 허용합니다.
app.use(session({
  secret: 'my_super_secret_key', // 세션 암호화에 사용되는 키입니다.
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // 배포 환경에서는 true로 설정해야 합니다.
}));

// 공통 index.html 파일을 읽습니다.
const commonIndexPath = path.join(__dirname, 'public', 'index.html');
let commonIndexContent = '';
fs.readFile(commonIndexPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading common index.html:', err);
  } else {
    commonIndexContent = data;
  }
});

// 기본 경로로 요청이 오면 로그인 페이지를 제공합니다.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Sign_in.html'));
});

// 회원가입 페이지를 제공합니다.
app.get('/Sign_up.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Sign_up.html'));
});

// 비밀번호 재설정 페이지를 제공합니다.
app.get('/reset_password.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'reset_password.html'));
});

// 로그인 후에만 index.html을 제공합니다.
app.get('/index.html', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 정적 파일을 제공합니다.
app.use(express.static(path.join(__dirname, 'public')));

// 사용자 디렉토리를 제공합니다.
app.use('/user/:uid', (req, res, next) => {
  const uid = req.params.uid;
  const userDir = path.join(__dirname, 'user', uid);
  if (fs.existsSync(userDir)) {
    express.static(userDir)(req, res, next);
  } else {
    res.status(404).send('User page not found');
  }
});

// 파일을 복사하는 함수입니다.
function copyFileSync(source, target) {
  let targetFile = target;

  // 대상이 디렉토리인 경우, 새로운 파일을 생성합니다.
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

// 폴더를 재귀적으로 복사하는 함수입니다.
function copyFolderRecursiveSync(source, target) {
  let files = [];

  // 폴더를 생성하거나 통합이 필요한지 확인합니다.
  const targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  // 복사
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

// 회원가입 엔드포인트입니다.
app.post('/register', async (req, res) => {
  const { name, email, password, region, gender } = req.body;
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firebase Admin SDK를 사용하여 사용자 프로필을 업데이트합니다.
    await admin.auth().updateUser(user.uid, {
      displayName: name
    });

    // Firestore에 추가 사용자 정보를 저장합니다.
    const db = admin.firestore();
    await db.collection('users').doc(user.uid).set({
      name,
      region,
      gender,
      email
    });

    // 사용자 디렉토리와 파일을 생성합니다.
    const userDir = path.join(__dirname, 'user', user.uid);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    // 공통 index.html 파일을 사용자 디렉토리에 복사합니다.
    const userHomePagePath = path.join(userDir, 'index.html');
    fs.writeFileSync(userHomePagePath, commonIndexContent);

    // 공통 스타일 디렉토리를 사용자 디렉토리에 복사합니다.
    const commonStylesDir = path.join(__dirname, 'public', 'styles');
    copyFolderRecursiveSync(commonStylesDir, userDir);

    // 공통 이미지 디렉토리를 사용자 디렉토리에 복사합니다.
    const commonImagesDir = path.join(__dirname, 'public', 'images');
    copyFolderRecursiveSync(commonImagesDir, userDir);

    // 다른 HTML 파일들을 사용자 디렉토리에 복사합니다.
    const htmlFiles = ['jukebox.html', 'Board.html', 'Diary.html', 'Guestbook.html', 'home.html'];
    htmlFiles.forEach(file => {
      const sourcePath = path.join(__dirname, 'public', file);
      const targetPath = path.join(userDir, file);
      copyFileSync(sourcePath, targetPath);
    });

    res.status(200).send('User registered successfully!');
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      res.status(400).send('Error: The email address is already in use by another account.');
    } else {
      res.status(400).send('Error: ' + error.message);
    }
  }
});

// 로그인 엔드포인트입니다.
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    req.session.user = userCredential.user;
    res.status(200).json({ redirectUrl: `/user/${userCredential.user.uid}/index.html` });
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
});

// 구글 로그인 엔드포인트입니다.
app.post('/login/google', async (req, res) => {
  const idToken = req.body.idToken;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    req.session.user = { uid };
    res.status(200).json({ redirectUrl: `/user/${uid}/index.html` });
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
});

// 비밀번호 재설정 엔드포인트입니다.
app.post('/reset-password', (req, res) => {
  const { email } = req.body;
  const auth = firebase.auth();
  auth.sendPasswordResetEmail(email)
    .then(() => {
      res.status(200).send('Password reset email sent successfully');
    })
    .catch((error) => {
      res.status(400).send('Error: ' + error.message);
    });
});

// 로그아웃 엔드포인트입니다.
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logged out successfully!');
});

// 서버를 시작합니다.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
