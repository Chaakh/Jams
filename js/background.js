// background.js
let socket;
let currentQueue = [];

chrome.runtime.onInstalled.addListener(function() {
  console.log('Collaborative Media Queue extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'joinRoom') {
    connectWebSocket(message.roomId);
  } else if (message.action === 'addToQueue') {
    addToQueue(message.mediaUrl);
  }
});

function connectWebSocket(roomId) {
  // Replace with your WebSocket server URL
  socket = new WebSocket('wss://your-websocket-server.com');

  socket.onopen = function(event) {
    console.log('WebSocket connected');
    socket.send(JSON.stringify({ type: 'join', roomId: roomId }));
  };

  socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    handleWebSocketMessage(message);
  };
}

function handleWebSocketMessage(message) {
  if (message.type === 'queueUpdate') {
    currentQueue = message.queue;
    broadcastQueueUpdate();
  } else if (message.type === 'playbackControl') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: message.action});
    });
  }
}

function addToQueue(mediaUrl) {
  currentQueue.push(mediaUrl);
  socket.send(JSON.stringify({ type: 'addToQueue', mediaUrl: mediaUrl }));
  broadcastQueueUpdate();
}

function broadcastQueueUpdate() {
  chrome.runtime.sendMessage({action: 'updateQueue', queue: currentQueue});
}
