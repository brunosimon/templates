/* OPTIONS */
var options = {
    select   : 'bricks',
    number   : 85,
    checkbox : false
};

/* GUI */
var gui         = new dat.GUI(),
    controllers = {},
    group_1     = gui.addFolder('Group 1'),
    group_2     = gui.addFolder('Group 2');

group_1.open();
controllers.select = group_1.add(options,'select',{choice_1:'value_1',choice_2:'value_2'}).name('select');
controllers.number = group_1.add(options,'number',0,100).step(1).name('number');


group_2.open();
controllers.checkbox = group_2.add(options,'checkbox').name('dirt pass');

// Events
controllers.number.onChange(function(value)
{
    console.log('change');
});

/* STATS */
var rS = new rStats({
    CSSPath : 'src/css/',
    values  :
    {
        raf :
        {
            caption : 'RAF (ms)',
            over    : 25,
            average : true
        },
        fps :
        {
            caption : 'Framerate (FPS)',
            below   : 50,
            average : true
        }
    }
});


/* INIT THREE */
var scene    = new THREE.Scene(),
    camera   = new THREE.PerspectiveCamera(85,window.innerWidth/window.innerHeight,0.1,1000),
    center   = new THREE.Vector3(),
    canvas   = document.getElementById('three-canvas'),
    renderer = new THREE.WebGLRenderer({canvas:canvas,alpha:true});

renderer.setClearColor(0x000000,0);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.y = 0.2;
camera.position.z = 3;

/* DUMMY */
function init_dummy()
{
    var material = new THREE.MeshNormalMaterial(),
        geometry = new THREE.BoxGeometry(1,1,1),
        mesh     = new THREE.Mesh(geometry,material);

    scene.add(mesh);
}
init_dummy();

/* RESIZE */
var win = {width:window.innerWidth,height:window.innerHeight};
window.onresize = function()
{
    win.width  = window.innerWidth;
    win.height = window.innerHeight;

    canvas.width  = win.width;
    canvas.height = win.height;
    camera.aspect = win.width / win.height;
    camera.updateProjectionMatrix();
    renderer.setSize(win.width,win.height);
};

/* MOUSE MOVE */
var mouse = {x:0,y:0,ratio:{x:0,y:0}};
window.onmousemove = function(e)
{
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    mouse.ratio.x = mouse.x / win.width;
    mouse.ratio.y = mouse.y / win.height;
};

/* FRAMES */
function loop()
{
    window.requestAnimationFrame(loop);

    // Stats
    rS('raf').tick();
    rS('fps').frame();
    rS().update();

    camera.position.x = (mouse.ratio.x - 0.5) * 4;
    camera.position.y = - (mouse.ratio.y - 0.5) * 4;
    camera.lookAt(center);

    renderer.render(scene,camera);
}

loop();


