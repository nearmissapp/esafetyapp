const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pool = require('./db'); // PostgreSQL 연결 설정
const authRoutes = require('./routes/auth'); // 로그인/회원가입 라우트
const reportRoutes = require('./routes/report'); // 안전신문고 라우트

const app = express();

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Pug 뷰 엔진 설정
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 라우트 설정
app.use('/auth', authRoutes);
app.use('/report', reportRoutes);

// 기본 라우트 (로그인 화면)
app.get('/', (req, res) => {
  res.render('login');
});

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
