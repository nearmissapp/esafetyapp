const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db'); // PostgreSQL 연결 설정

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup'); // views/signup.pug 파일 렌더링
  });

// 로그인 처리
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).send('아이디가 존재하지 않습니다.');
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send('비밀번호가 일치하지 않습니다.');
    }

    // 로그인 성공
    res.redirect('/report'); // 안전신문고 화면으로 이동
  } catch (err) {
    console.error(err.message);
    res.status(500).send('로그인 중 오류가 발생했습니다.');
  }
});

// 회원가입 처리
router.post('/signup', async (req, res) => {
    const { username, password, name, organization } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      await pool.query(
        'INSERT INTO users (username, password, name, organization) VALUES ($1, $2, $3, $4)',
        [username, hashedPassword, name, organization]
      );
      res.redirect('/'); // 회원가입 후 로그인 페이지로 이동
      console.log('회원가입 데이터:', { username, hashedPassword, name, organization });
    } catch (err) {
          
      console.error('회원가입 중 오류:', err.message); // 구체적인 에러 메시지 출력
      res.status(500).send('회원가입 중 오류가 발생했습니다.');
    }
  });

module.exports = router;
