import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
const cursor = {
  x: 0,
  y: 0,
};

const sizes = {
  width: 0,
  height: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

function main() {
  const canvas = document.getElementById("c");
  if (!canvas) {
    alert("canvas not found");
    return;
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
  // const camera = new THREE.OrthographicCamera(-2, 2, 2, -2);
  camera.position.z = 5;

  const scene = new THREE.Scene();

  const material = new THREE.MeshPhongMaterial({ color: "red" });

  const geometry = new THREE.BoxGeometry();

  const cube = new THREE.Mesh(geometry, material);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  scene.add(cube);

  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    sizes.width = width;
    sizes.height = height;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time: number) {
    time *= 0.001;
    // cube.rotation.x = time;
    // cube.rotation.y = time;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    // camera.position.x = cursor.x * 2;
    // camera.position.y = -cursor.y * 2;
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 5;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 5;

    // camera.lookAt(cube.position);
    controls.update();

    // camera.position.y = Math.sin(time * Math.PI);
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
