const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
require('firebase/auth');
const admin = require('firebase-admin');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const fs = require('fs');

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

// Initialize Firebase Admin with service account
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acornproject-31fe8-default-rtdb.firebaseio.com"
});

const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'my_super_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Note: `secure` should be true in a production environment
}));

// Read the common index.html file
const commonIndexPath = path.join(__dirname, 'public', 'index.html');
let commonIndexContent = '';
fs.readFile(commonIndexPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading common index.html:', err);
  } else {
    commonIndexContent = data;
  }
});

// Serve login.html by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve register.html
app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Serve index.html after login, only if user is authenticated
app.get('/index.html', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve user directories
app.use('/user/:uid', (req, res, next) => {
  const uid = req.params.uid;
  const userDir = path.join(__dirname, 'user', uid);
  if (fs.existsSync(userDir)) {
    express.static(userDir)(req, res, next);
  } else {
    res.status(404).send('User page not found');
  }
});

// Function to copy files from source to destination
function copyFileSync(source, target) {
  let targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

// Function to copy a folder recursively
function copyFolderRecursiveSync(source, target) {
  let files = [];

  // Check if folder needs to be created or integrated
  const targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  // Copy
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

// Register endpoint
app.post('/register', async (req, res) => {
  const { name, email, password, region, gender } = req.body;
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Use Firebase Admin SDK to update user profile
    await admin.auth().updateUser(user.uid, {
      displayName: name
    });

    // Save additional user information in Firestore
    const db = admin.firestore();
    await db.collection('users').doc(user.uid).set({
      name,
      region,
      gender,
      email
    });

    // Create user directory and files
    const userDir = path.join(__dirname, 'user', user.uid);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    // Copy the common index.html to the user's directory
    const userHomePagePath = path.join(userDir, 'index.html');
    fs.writeFileSync(userHomePagePath, commonIndexContent);

    // Copy the common styles directory to the user's directory
    const commonStylesDir = path.join(__dirname, 'public', 'styles');
    copyFolderRecursiveSync(commonStylesDir, userDir);

    // Copy the common images directory to the user's directory
    const commonImagesDir = path.join(__dirname, 'public', 'images');
    copyFolderRecursiveSync(commonImagesDir, userDir);

    // Copy the other HTML files to the user's directory
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

// Login endpoint
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

// Google Login endpoint
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

// Logout endpoint
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logged out successfully!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
