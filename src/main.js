const port = 8812;
const address = 'localhost';
let socket = new WebSocket(`ws://${address}:${port}`);
let status = document.getElementById('status');

const onOpen = () => {
	
	// Listen for messages
	socket.onmessage = () => {
    showRemote();
	};
	
	// Listen for socket closes
	socket.onclose = (event) => {
		console.log('Client notified socket has closed',event);
	};
};

const onError = (err, x, y) => {
  socket.close();
  status.innerText = 'error occurred';
  document.getElementById('newSocket').style.display = 'block';
  document.getElementById('newIP').onclick = tryNewIP;
};

const showRemote = () => {
  const remote = document.getElementById('remote');
  remote.style.display = 'block';
  remote.onclick = (e) => {
    if(e.target.dataset.button) {
      console.log(e.target.dataset.button);
      socket.send(JSON.stringify( { type: 'button', value: e.target.dataset.button}));
    }
  };
};

const tryNewIP = () => {
  document.getElementById('newSocket').style.display = 'none';
  document.getElementById('newIP').removeEventListener('click', tryNewIP);
  const newIPAddress = document.getElementById('newIPAddress').value;
  socket = new WebSocket(`ws://${newIPAddress}:${port}`);
  socket.onopen = onOpen;	
  socket.onerror = onError;
  showRemote();
};

socket.onopen = onOpen;	
socket.onerror = onError;