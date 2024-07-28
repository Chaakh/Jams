// popup.js
document.addEventListener("DOMContentLoaded", function () {
  const joinRoomButton = document.getElementById("joinRoom");
  const addToQueueButton = document.getElementById("addToQueue");
  const queueList = document.getElementById("queue");

  joinRoomButton.addEventListener("click", function () {
    const roomId = document.getElementById("roomId").value;
    // Implement room joining logic here
    console.log("Joining room:", roomId);
    chrome.runtime.sendMessage({ action: "joinRoom", roomId: roomId });
  });

  addToQueueButton.addEventListener("click", function () {
    const mediaUrl = document.getElementById("mediaUrl").value;
    // Implement adding to queue logic here
    console.log("Adding to queue:", mediaUrl);
    chrome.runtime.sendMessage({ action: "addToQueue", mediaUrl: mediaUrl });
    const li = document.createElement("li");
    li.textContent = mediaUrl;
    queueList.appendChild(li);
  });

  // Listen for queue updates from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateQueue") {
      // Update the queue display
      queueList.innerHTML = "";
      message.queue.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        queueList.appendChild(li);
      });
    }
  });
});
