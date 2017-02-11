gr(() => {
    const mesh = gr("#main")("mesh").single();
    mesh.on("mouseenter", function() {
        mesh.setAttribute("albedo", "blue");
    });
    mesh.on("mouseleave", function() {
        mesh.setAttribute("albedo", "orange");
    });
    var rot = 0;
    rotate();

    function rotate() {
        mesh.setAttribute("rotation", "0," + rot + "," + rot);
        rot += 1;
        requestAnimationFrame(rotate);
    }
});