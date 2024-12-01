const express = require('express');
const router = express.Router();

// 신고 화면 렌더링
router.get('/', (req, res) => {
  res.render('report'); // views/safety-report.pug 렌더링
});

// 신고 데이터 처리
router.post('/', async (req, res) => {
  const { comment } = req.body;
  const user_id = 1; // 로그인 구현 시 사용자 ID를 동적으로 가져오도록 수정 필요

  try {
    await pool.query('INSERT INTO reports (user_id, comment) VALUES ($1, $2)', [user_id, comment]);
    res.send('신고가 성공적으로 접수되었습니다!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('신고 접수 중 오류가 발생했습니다.');
  }
});

module.exports = router;
