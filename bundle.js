(function () {
  'use strict';

  const port = 8812;
  const address = '192.168.1.11';
  let socket = io(`http://${address}:${port}`);

  const showRemote = () => {
    const remote = document.getElementById('remote');
    remote.style.display = 'block';
    remote.addEventListener('click', (e) => {
      if(e.target.dataset.button) {
        console.log(e.target.dataset.button);
        socket.emit('button', {value: e.target.dataset.button});
      }
    });
  };

  const tryNewIP = () => {
    document.getElementById('newSocket').style.display = 'none';
    document.getElementById('newIP').removeEventListener('click', tryNewIP);
    const newIPAddress = document.getElementById('newIPAddress').value;
    socket = io(`http://${newIPAddress}:${port}`);
    socket.on("welcome", (message) => {
      console.log(message);
    });
    showRemote();
  };

  socket.on("welcome", (message) => {
    console.log(message);
    showRemote();
  });

  socket.on("connect", () => {
    console.log('connected');
  });
  socket.on("connect_timeout", () => {
    console.log('connect_timeout');
  });
  socket.on("connect_error", () => {
    socket.close();
    document.getElementById('newSocket').style.display = 'block';
    document.getElementById('newIP').addEventListener('click', tryNewIP);
  });

}());
