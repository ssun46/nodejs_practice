const http = require('http');

http.createServer((req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(8080, () => {
    // 80을 포트번호로 사용시 생략가능 (http 디폴트 포트번호: 80, https 디폴트 포트번호: 443)
    console.log('8080번 포트에서 서버 대기 중입니다.');
});