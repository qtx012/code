const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// CORS 및 body-parser 설정
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // 큰 데이터 허용

// /images 엔드포인트
app.post('/images', (req, res) => {
    const { file, fileName, comment } = req.body;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    // 파일 처리 로직 (예시)
    console.log(`Received file: ${fileName}`);
    console.log(`Comment: ${comment}`);

    res.json({ message: 'File and comment received successfully' });
});

// 서버 실행
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
