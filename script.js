let viewer = null;
let isAutoRotating = true;


function initViewer(panoUrl) {
  document.getElementById('panorama').innerHTML = '';
  viewer = pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: panoUrl,
    autoLoad: true,
    autoRotate: -2,
    compass: false,
    showZoomCtrl: true
  });
}

function rotateLeft() {
  if (viewer) viewer.setYaw(viewer.getYaw() - 10);
}

function rotateRight() {
  if (viewer) viewer.setYaw(viewer.getYaw() + 10);
}

function toggleAutoRotate() {
  if (!viewer) return;
  if (isAutoRotating) {
    viewer.stopAutoRotate();
  } else {
    viewer.startAutoRotate(-2);
  }
  isAutoRotating = !isAutoRotating;
}

document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    initViewer(e.target.result);
  };
  reader.readAsDataURL(file);
});

function loadFromURL() {
  const url = document.getElementById('urlInput').value.trim();
  if (url) {
    initViewer(url);
  }
}