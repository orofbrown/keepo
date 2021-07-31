var FILENAME = 'LoFight_Voices.wav';

var audio = new Audio(FILENAME);
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source = audioCtx.createMediaElementSource(audio);

var analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);
source.connect(analyser);
audio.play();

function visualize() {
  const canvas = document.querySelector('canvas');
  const canvasCtx = canvas.getContext('2d');
  const { height, width } = canvas;

  const draw = function () {
    drawVisual = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, width, height);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    canvasCtx.beginPath();
    var sliceWidth = (width * 1.0) / bufferLength;
    var x = 0;
    for (var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] / 128.0;
      var y = (v * height) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  };

  draw();
}

var intervalId = -1;
function analyze() {
  intervalId = setInterval(() => {
    analyser.getByteTimeDomainData(dataArray);
    console.log(dataArray.slice(0, 8));
  }, 1000);
}

visualize();
analyze();
