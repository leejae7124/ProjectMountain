const WebSocket = require('ws');
const express = require('express');
const router = express.Router();

module.exports = (server) => { //(server) 여기에 app.js에서 넘겨준 express 서버가 들어감.
  const wss = new WebSocket.Server({ server }); //변수 선언을 wss로 해줘야 한다. / 여기서 웹소켓과 express 연결된다.

  wss.on('connection', (ws, req) => { // 프론트(index.html)에서 서버와 연결 시 이 부분이 실행된다.
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; //원래는 뒤의 ~remoteAddress만 있으면 ip를 알아낼 수 있는데,
    //x-forwarded-for는 프록시 서버가 사용되어 ip가 변조될 경우 정확한 ip를 찾을 수 있게 도와줌(100% 완벽은x), express에서는 req.ip로도 ip를 알아낼 수 있다.
    console.log('새로운 클라이언트 접속', ip);
    ws.on('message', (message) => { // 클라이언트에서 서버로 메세지를 send 했을 때 이 부분이 실행되고 그 내용은 message에 담긴다.
      console.log(message);
    });
    ws.on('error', (error) => { // 에러 처리 핸들러
      console.error(error);
    });
    if (ws.readyState === ws.OPEN) { //웹소켓 연결은 비동기로 처리되기 때문에 연결 중, 연결 실패 등의 상태가 존재하는데 웹소켓이 클라이언트랑 서버랑 연결이 된 상태라는 것을 이런식으로 검사하는거 (연결 안됐는데 보내봐야 의미 없으니까) -> 일종의 안전 장치이다.
        //ws.readyState는 websocket의 연결 상태를 나타내는데 연결이 되어 데이터를 전송 가능한 상태가 되면 OPEN으로 변경된다. 그래서 === ws.OPEN인거
        ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
      }
    ws.on('close', () => { // 연결 종료 시 호출됨.(클라가 브라우저를 끈다거나 등등)
      console.log('클라이언트 접속 해제', ip);
      clearInterval(ws.interval);
    });

    //연결이 끊겼는데도 계속 메세지를 전송하면 서버 자원 낭비이므로 ws.interval에 담아서 연결이 끊겼을 때 ('close') clearinterval로 메모리 누수를 방지해준다.
    /*ws.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
      if (ws.readyState === ws.OPEN) { //웹소켓 연결은 비동기로 처리되기 때문에 연결 중, 연결 실패 등의 상태가 존재하는데 웹소켓이 클라이언트랑 서버랑 연결이 된 상태라는 것을 이런식으로 검사하는거 (연결 안됐는데 보내봐야 의미 없으니까) -> 일종의 안전 장치이다.
        //ws.readyState는 websocket의 연결 상태를 나타내는데 연결이 되어 데이터를 전송 가능한 상태가 되면 OPEN으로 변경된다. 그래서 === ws.OPEN인거
        ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
      }
    }, 3000);*/
  });
};

const SocketIO = require('socket.io');

module.exports = (server) => {
  const io = SocketIO(server, { path: '/socket.io' }); //socketIO 서버랑 express 서버랑 연결해준다.
  //path는 프론트와 일치시켜주면 된다

router.post('/main', (req, res) => { //정보 받아온 후 
    res.send('fin')
    io.on('connection', (socket) => { // 아까 ws에서는 req(ws, req)가 있었는데 이번엔 없다.
        const req = socket.request; // socket 안에 request가 들어있다!
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; //ip 찾아내줌
        console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip); // socket.id -> 어떤 사람이 웹 소켓 접속했을 때 고유 id가 부여되는데 그걸 통해서 어떠한 작업들을 할 수가 있다.
        //이 사람이 어떤 채팅방에 들어 있는지 알아내거나,
        //이 사람을 강제로 채팅방에서 쫓아낼 때 id를 사용한다거나
        socket.on('disconnect', () => { // 연결 종료 시 호출됨.
          console.log('클라이언트 접속 해제', ip, socket.id);
          clearInterval(socket.interval);
        });
        socket.on('error', (error) => { // 에러 시
          console.error(error);
        });
        socket.on('reply', (data) => { // 클라이언트로부터 메시지 수신시
          console.log(data); //data : 'Hello Node.JS'
        });
        socket.emit('news', 'Hello Socket.IO')
        /*socket.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
          socket.emit('news', 'Hello Socket.IO'); //socket.io는 이벤트 식이기 때문에 
          //이벤트 이름과 메세지 이렇게 두 개로 나뉘어 있음. -> 동작은 아까와 동일
        }, 3000);*/
      });
})

  io.on('connection', (socket) => { // 아까 ws에서는 req(ws, req)가 있었는데 이번엔 없다.
    const req = socket.request; // socket 안에 request가 들어있다!
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; //ip 찾아내줌
    console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip); // socket.id -> 어떤 사람이 웹 소켓 접속했을 때 고유 id가 부여되는데 그걸 통해서 어떠한 작업들을 할 수가 있다.
    //이 사람이 어떤 채팅방에 들어 있는지 알아내거나,
    //이 사람을 강제로 채팅방에서 쫓아낼 때 id를 사용한다거나
    socket.on('disconnect', () => { // 연결 종료 시 호출됨.
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on('error', (error) => { // 에러 시
      console.error(error);
    });
    socket.on('reply', (data) => { // 클라이언트로부터 메시지 수신시
      console.log(data); //data : 'Hello Node.JS'
    });
    socket.emit('news', 'Hello Socket.IO')
    /*socket.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
      socket.emit('news', 'Hello Socket.IO'); //socket.io는 이벤트 식이기 때문에 
      //이벤트 이름과 메세지 이렇게 두 개로 나뉘어 있음. -> 동작은 아까와 동일
    }, 3000);*/
  });
};