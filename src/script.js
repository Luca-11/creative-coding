import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Base
 */

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2(0x000000, 0.001);

const gltfLoader = new GLTFLoader();

const CampfireY = 11;
const Campfirelight = new THREE.PointLight(0xff9f3f, 10, 16);
Campfirelight.position.set(-15, 13, -15);
Campfirelight.castShadow = true; // default false
scene.add(Campfirelight);

//Set up shadow properties for the light
Campfirelight.shadow.mapSize.width = 512;
Campfirelight.shadow.mapSize.height = 512;
Campfirelight.shadow.camera.near = 0.5;
Campfirelight.shadow.camera.far = 500;

// Create stars
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });

const starVertices = [];

for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000; // Random position in x axis
  const y = Math.random() * 800; // Random position in y axis (only positive values)
  const z = (Math.random() - 0.5) * 2000; // Random position in z axis

  starVertices.push(x, y, z);
}

starsGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVertices, 3)
);

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

/**
 * Campfire
 */
gltfLoader.load(
  "/models/Campfire.glb",
  (gltf) => {
    console.log("big-rock loaded", gltf);
    scene.add(gltf.scene);
    gltf.scene.scale.set(2, 2, 2);
    gltf.scene.position.set(-15, CampfireY, -15);
  },
  (progress) => {
    console.log("progress", progress);
  },
  (error) => {
    console.log("error loading trex", error);
  }
);

/**
 * Rock-flat
 */
gltfLoader.load(
  "/models/Rock-Flat.glb",
  (gltf) => {
    console.log("rock-flat loaded", gltf);
    scene.add(gltf.scene);
    gltf.scene.scale.set(70, 70, 70);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.rotation.y = 5;
  },
  (progress) => {
    console.log("progress", progress);
  },
  (error) => {
    console.log("error loading trex", error);
  }
);

/**
 * RockHigh
 */
gltfLoader.load(
  "/models/RockHigh.glb",
  (gltf) => {
    console.log("rock-high loaded", gltf);
    scene.add(gltf.scene);
    gltf.scene.scale.set(110, 110, 110);
    gltf.scene.position.set(-50, 0, -10);
    gltf.scene.rotation.y = 1;
  },
  (progress) => {
    console.log("progress", progress);
  },
  (error) => {
    console.log("error loading trex", error);
  }
);

/**
 * Tent
 */
gltfLoader.load(
  "/models/Tent.glb",
  (gltf) => {
    console.log("tent loaded", gltf);
    scene.add(gltf.scene);
    gltf.scene.scale.set(2.5, 2.5, 2.5);
    gltf.scene.position.set(0, 10, 23);
    gltf.scene.rotation.y = 1.55;
  },
  (progress) => {
    console.log("progress", progress);
  },
  (error) => {
    console.log("error loading trex", error);
  }
);

/**
 * Wood-Log
 */
gltfLoader.load(
  "/models/Wood-Log.glb",
  (gltf) => {
    console.log("wood-log loaded", gltf);
    const woodLog1 = gltf.scene;
    const woodLog2 = gltf.scene.clone();

    woodLog1.scale.set(5, 5, 5);
    woodLog2.scale.set(7, 7, 7);

    woodLog1.position.set(5, 12, -15);
    woodLog2.position.set(30, 1.5, -4);

    woodLog1.rotation.y = 8;
    woodLog2.rotation.z = 0;
    woodLog2.rotation.x = 12;
    woodLog2.rotation.y = 4;

    scene.add(woodLog1);
    scene.add(woodLog2);
  },
  (progress) => {
    console.log("progress", progress);
  },
  (error) => {
    console.log("error loading trex", error);
  }
);

/**
 * Trees
 */
gltfLoader.load(
  "/models/Tree-1.glb",
  (gltf) => {
    console.log("tree loaded", gltf);
    const tree1 = gltf.scene;
    const tree2 = gltf.scene.clone();
    const tree3 = gltf.scene.clone();
    const tree4 = gltf.scene.clone();

    tree1.scale.set(50, 50, 50);
    tree2.scale.set(35, 35, 35);
    tree3.scale.set(25, 25, 25);
    tree4.scale.set(16, 16, 16);

    tree1.position.set(-20, 55, 50);
    tree2.position.set(-20, 45, -55);
    tree3.position.set(-45, 30, 30);
    tree4.position.set(19, 25, -37);

    tree1.rotation.y = Math.random() * Math.PI;
    tree2.rotation.y = Math.random() * Math.PI;
    tree3.rotation.y = Math.random() * Math.PI;
    tree4.rotation.y = 0;
    tree4.rotation.x = -0.3;

    scene.add(tree1);
    scene.add(tree2);
    scene.add(tree3);
    scene.add(tree4);
  },
  (progress) => {
    console.log("progress", progress);
  },
  (error) => {
    console.log("error loading trex", error);
  }
);

/**
 * Lantern
 */
gltfLoader.load("/models/Lantern.glb", (gltf) => {
  console.log("lantern loaded", gltf);
  const lantern1 = gltf.scene;

  lantern1.scale.set(7, 7, 7);
  lantern1.position.set(17.8, 13, 34.7);
  lantern1.rotation.y = 1.5;

  // Create a sphere to represent the light source
  const lightGeometry = new THREE.SphereGeometry(0.2, 8, 8);
  const lightMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    transparent: true,
    opacity: 0,
  });
  const lightSphere = new THREE.Mesh(lightGeometry, lightMaterial);

  // Position the light sphere at the same location as the lantern
  lightSphere.position.set(17, 18, 32);

  // Create a point light at the same location as the lantern
  const light = new THREE.PointLight(0xffffff, 3, 15);
  light.position.copy(lightSphere.position);

  scene.add(lantern1);
  scene.add(lightSphere);
  scene.add(light);
});

/**
 * Backpack
 */
gltfLoader.load(
  "/models/Backpack.glb",
  (gltf) => {
    console.log("backpack loaded", gltf);
    scene.add(gltf.scene);
    gltf.scene.scale.set(2, 2, 2);
    gltf.scene.position.set(3, 15, -25);
    gltf.scene.rotation.y = 3;
    // gltf.scene.rotation.z = 1;
    gltf.scene.rotation.x = 0.5;
  },
  (progress) => {
    console.log("progress", progress);
  },
  (error) => {
    console.log("error loading trex", error);
  }
);

/**
 * grass
 */

const grassCount = 105; // Number of grass instances you want to create
const FLOOR_SIZE = 90; // Adjust this value to match the size of your floor

for (let i = 0; i < grassCount; i++) {
  gltfLoader.load(
    "/models/grass.glb",
    (gltf) => {
      console.log("grass loaded", gltf);
      scene.add(gltf.scene);

      // Scale and rotate the grass
      gltf.scene.scale.set(30, 23, 30);
      gltf.scene.rotation.y = 1;

      // Position the grass at a random location
      const x = Math.random() * FLOOR_SIZE - FLOOR_SIZE / 2;
      const z = Math.random() * FLOOR_SIZE - FLOOR_SIZE / 2;
      gltf.scene.position.set(x, 0, z);
    },
    (progress) => {
      console.log("progress", progress);
    },
    (error) => {
      console.log("error loading grass", error);
    }
  );
}

/**
 * Fireflies
 */

// Create a group to hold the fireflies and their lights
const fireflies = new THREE.Group();
scene.add(fireflies);

// Create a number of fireflies
const fireflyCount = 15;
for (let i = 0; i < fireflyCount; i++) {
  // Create a sphere to represent the firefly
  const fireflyGeometry = new THREE.SphereGeometry(0.2, 8, 8);
  const fireflyMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const firefly = new THREE.Mesh(fireflyGeometry, fireflyMaterial);

  // Position the firefly at a random location in the upper half of the scene
  firefly.position.set(
    Math.random() * 100 - 50,
    Math.random() * 50 + 25,
    Math.random() * 100 - 50
  );

  // Store the initial y position and a random phase
  firefly.initialY = firefly.position.y;
  firefly.phase = Math.random() * 2 * Math.PI;

  // Create a point light at the same location as the firefly
  const light = new THREE.PointLight(0xffff00, 3, 30);
  light.position.copy(firefly.position);

  // Add the firefly and its light to the group
  fireflies.add(firefly);
  fireflies.add(light);
}

/**
 * drink
 */
gltfLoader.load(
  "/models/drink.glb",
  (gltf) => {
    console.log("drink loaded", gltf);
    scene.add(gltf.scene);
    gltf.scene.scale.set(25, 25, 25);
    gltf.scene.position.set(1, 12.6, -7);
    gltf.scene.rotation.y = 3;
  },
  (progress) => {
    console.log("progress", progress);
  },
  (error) => {
    console.log("error loading trex", error);
  }
);

/**
 * Stuff
 */
gltfLoader.load(
  "/models/Stuff.glb",
  (gltf) => {
    console.log("stuff loaded", gltf);
    scene.add(gltf.scene);
    gltf.scene.scale.set(13, 13, 13);
    gltf.scene.position.set(-9, 12.6, -32);
    gltf.scene.rotation.y = 1;

    // Create a point light at the same location as the object
    const light = new THREE.PointLight(0xffffff, 1.5, 35);
    light.position.set(0, 18, -30);

    scene.add(light); // Add the light to the scene
  },
  (progress) => {
    console.log("progress", progress);
  },
  (error) => {
    console.log("error loading trex", error);
  }
);

/**
 * Moon
 */
// Create a sphere to represent the moon
const moonGeometry = new THREE.SphereGeometry(5, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

// Position the moon in the sky
moon.position.set(-45, 55, 15);

// Create a point light at the same location as the moon
const moonLight = new THREE.PointLight(0xffffff, 1, 150);
moonLight.position.copy(moon.position);

// Add the moon and its light to the scene
scene.add(moon);
scene.add(moonLight);

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0x101010, 1);
scene.add(ambientLight);

// Adjust directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

window.addEventListener("resize", () => {
  // Update sizes
  const wWidth = window.innerWidth;
  const wHeight = window.innerHeight;

  // Update camera
  camera.aspect = wWidth / wHeight;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(wWidth, wHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
// camera.position.set(40, 24, 0);
camera.position.set(80, 48, -10);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, -1, 0);
controls.enableDamping = true;

// Disable zoom
controls.enableZoom = false;

controls.maxPolarAngle = Math.PI / 3;
controls.minPolarAngle = Math.PI / 3;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setClearColor(0x000020, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Update controls
  controls.update();

  // Move each firefly and its light
  for (let i = 0; i < fireflyCount * 2; i += 2) {
    const firefly = fireflies.children[i];
    const light = fireflies.children[i + 1];

    // Create a gentle oscillation with a phase
    const speed = 1.5; // Adjust to make the oscillation faster or slower
    const amplitude = 1; // Adjust to make the oscillation larger or smaller
    firefly.position.y =
      firefly.initialY +
      Math.sin((elapsedTime + firefly.phase) * speed) * amplitude;

    // Make the light follow the firefly
    light.position.copy(firefly.position);
  }

  const speed1 = 2;
  const speed2 = 0.5;
  const amplitude1 = 2;
  const amplitude2 = 0.7;
  Campfirelight.intensity =
    5 +
    Math.sin(elapsedTime * speed1) * amplitude1 +
    Math.sin(elapsedTime * speed2) * amplitude2;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
