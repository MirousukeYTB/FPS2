let scene, camera, renderer;
let player, floor, enemies = [];
let bullets = [];
let moveSpeed = 0.1, bulletSpeed = 0.2;
let controls = { forward: false, backward: false, left: false, right: false };

// Initialiser la scène
function init() {
    // Créer la scène
    scene = new THREE.Scene();
    
    // Créer la caméra à la première personne
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.8, 5);
    
    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("game-container").appendChild(renderer.domElement);

    // Créer un sol
    const floorGeometry = new THREE.PlaneGeometry(200, 200);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x707070 });
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Ajouter un joueur (représenté par un cube)
    const playerGeometry = new THREE.BoxGeometry(0.5, 1.8, 0.5);
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(0, 1.8 / 2, 0);
    scene.add(player);

    // Ajouter des ennemis (cubes rouges)
    for (let i = 0; i < 5; i++) {
        const enemyGeometry = new THREE.BoxGeometry(1, 1, 1);
        const enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
        enemy.position.set(Math.random() * 50 - 25, 0.5, Math.random() * 50 - 25);
        enemies.push(enemy);
        scene.add(enemy);
    }

    // Capture de la souris pour la caméra (Pointer Lock API)
    document.body.addEventListener("click", () => {
        document.body.requestPointerLock();
    });

    document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement === document.body) {
            document.addEventListener("mousemove", onMouseMove, false);
        } else {
            document.removeEventListener("mousemove", onMouseMove, false);
        }
    });

    // Gérer les déplacements avec ZQSD
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    // Tirer des balles
    document.addEventListener("click", shootBullet);

    animate();
}

// Gérer les mouvements de la caméra avec la souris
function onMouseMove(event) {
    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;

    player.rotation.y -= movementX * 0.002;
    camera.rotation.x -= movementY * 0.002;
}

// Déplacements avec ZQSD
function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
            controls.forward = true;
            break;
        case 'KeyS':
            controls.backward = true;
            break;
        case 'KeyA':
            controls.left = true;
            break;
        case 'KeyD':
            controls.right = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
            controls.forward = false;
            break;
        case 'KeyS':
            controls.backward = false;
            break;
        case 'KeyA':
            controls.left = false;
            break;
        case 'KeyD':
            controls.right = false;
            break;
    }
}

// Tirer une balle
function shootBullet() {
    const bulletGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const bullet = new THREE.Mesh(bulletGeometry, bull
