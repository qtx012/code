//server.js
const express = require('express');
const app = express();
const port = 5000;
const multer = require('multer');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static('public'));
const path = require('path');
app.use(express.json());
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
}));

const storage = multer.memoryStorage(); // 파일을 메모리에 저장
const upload = multer({ storage });

// 이미지 업로드 처리 경로
app.post('/images', upload.single('image'), (req, res) => {


  // 이미지 파일은 req.file에 저장됨
  console.log('File received:', req);

  // 필요한 처리 후 응답 전송
  res.json({ message: 'Image uploaded successfully' });
});

// /images 엔드포인트
const imagesDirectory = path.join(__dirname, 'images');

// '/images/:filename' 경로에 대한 GET 요청 처리
app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(imagesDirectory, filename);

  // 파일이 존재하는지 확인하고 응답
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Image not found' });
    }
  });
});

app.post('/predict', (req, res) => {
    const { file, fileName, comment } = req.body;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    // 파일 처리 로직 (예시)
    console.log(`Received file: ${fileName}`);
    console.log(`Comment: ${comment}`);

    res.json({ message: 'uccessfully' });
});
// 서버 실행
app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`);
});
