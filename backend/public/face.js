// 1️⃣ Video & Canvas select
const video = document.getElementById("video");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");

// 2️⃣ Load face-api models
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/face-models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/face-models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/face-models")
]).then(startVideo);

// 3️⃣ Start camera
function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream);
}

// 4️⃣ Face detection loop
video.addEventListener("play", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  setInterval(async () => {
    const detection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) return;

    faceapi.draw.drawDetections(canvas, detection);

    // 🔴 YAHI SE function call hota hai
    captureAndSend("STU001");

  }, 3000);
});


// 5️⃣ 📸 PHOTO CAPTURE + BACKEND SEND (👇 YAHAN LIKHO)
function captureAndSend(userId) {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = video.videoWidth;
  tempCanvas.height = video.videoHeight;

  tempCanvas.getContext("2d").drawImage(video, 0, 0);
  const imageBase64 = tempCanvas.toDataURL("image/jpeg");

  fetch("/api/attendance/mark", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      image: imageBase64
    })
  })
  .then(res => res.json())
  .then(data => console.log(data.message));
}
