const express = require("express");
const path = require("path");

const app = express();
const port = 5501;

app.use(express.static(path.join(__dirname)));

// 루트 경로에 있는 index.html 파일 제공
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// /styles 디렉토리 서빙
app.use("/styles", express.static(path.join(__dirname, "styles")));

// 서버 실행
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
