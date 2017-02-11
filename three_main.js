!function(){
var main = function() {
    var scene = new THREE.Scene();
    var width = 512;
    var height = 512;
    var camera = new THREE.PerspectiveCamera(60, width / height);
    camera.position.set(0, 0, 50);
    var renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(width, height);
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);
    const obj = document.getElementsByClassName('threejs-container');
    obj[0].appendChild(renderer.domElement);
    var geometry = new THREE.CubeGeometry(13, 13, 13);
    var material = new THREE.MeshPhongMaterial({
        color: "orange"
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    obj[0].addEventListener('mousemove', onMouseMove);
    var mouse = {
        x: 0,
        y: 0
    };

    function onMouseMove(e) {
        var rect = e.target.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.x = (mouse.x / width) * 2 - 1;
        mouse.y = -(mouse.y / height) * 2 + 1;
        var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
        vector.unproject(camera);
        var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        var objs = ray.intersectObjects(scene.children);
        if (objs.length > 0) {
            material.color.set("blue");
        } else {
            material.color.set("orange");
        }
    }
    (function update() {
        requestAnimationFrame(update);
        mesh.rotation.set(
            0,
            mesh.rotation.y + .02,
            mesh.rotation.z + .02
        );
        renderer.render(scene, camera);
    })();
};
window.addEventListener('DOMContentLoaded', main, false);
}();