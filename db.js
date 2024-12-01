const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '222.122.202.31', // 제공받은 IP
  database: 'postgres', // wxhackathon?
  password: 'hackathon123!',
  port: 5432,
});

pool.connect((err) => {
    if (err) {
      console.error('PostgreSQL 연결 오류:', err.message);
    } else {
      console.log('PostgreSQL에 성공적으로 연결되었습니다.');
    }
  });
  
  module.exports = pool;
