const express = require("express");
const path = require("path");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // 서비스 계정 키 경로


const app = express();
const port = 5501;

// Firebase Admin SDK 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acornproject-31fe8-default-rtdb.firebaseio.com/"
});

const db = admin.database();

app.use(express.static(path.join(__dirname)));

// 루트 경로에 있는 index.html 파일 제공
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Firebase에서 데이터 가져오는 API 엔드포인트
app.get("/api/data", async (req, res) => {
  try {
    const snapshot = await db.ref("your/data/path").once("value");
    const data = snapshot.val();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// /styles 디렉토리 서빙
app.use("/styles", express.static(path.join(__dirname, "styles")));

// 서버 실행
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
