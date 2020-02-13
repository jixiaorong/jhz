var canvasAn = document.getElementById("wait_canvas");
var ctxAn = canvasAn.getContext("2d");
var particle = [];
var angleAn = Math.PI/4;
canvasAn.width = 600;
canvasAn.height = 600;
var width = canvasAn.width;
var height = canvasAn.height;

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function retinaReady() {
    var pixelRatio = window.devicePixelRatio || 1;
    var backingStore = ctxAn.webkitBackingStorePixelRatio || 1;
    window.ratio = pixelRatio / backingStore; // public var
    if (pixelRatio !== backingStore) {
        var oldWidth = canvasAn.width;
        var oldHeight = canvasAn.height;
        canvasAn.width = oldWidth * ratio;
        canvasAn.height = oldHeight * ratio;
        canvasAn.style.width = oldWidth + "px";
        canvasAn.style.height = oldHeight + "px";
        ctxAn.scale(window.ratio, window.ratio);
    }
}
retinaReady();
function runAn(a) {
    var r = 140;
    var x = r * Math.sin(a) + width / 2;
    var y = r * Math.cos(a) + ((height / 2)-80);
    var p;
    p = new Particle(x, y);
    particle.push(p);
}

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.r = getRandomInt(10, 16);
    this.v = {
        x: 0,
        y: 0
    };
    this.a = {
        x: 0,
        y: 0
    };
    this.al = 1;
}

Particle.prototype.update = function() {
    this.a.x = getRandomInt(-0.001, 0.001);
    this.a.y = getRandomInt(0.01, 0.02);
    this.v.x += this.a.x;
    this.v.y += this.a.y;
    this.x += this.v.x;
    this.y += this.v.y;

    if (this.r >= 0.01) {
        this.r -= 0.2;
        this.al -= 0.001;
    } else {
        this.r = 0;
        this.al = 0;
    }
};

Particle.prototype.draw = function() {
    ctxAn.fillStyle = "rgba(255,255,255," + this.al + ")";
    ctxAn.beginPath();
    ctxAn.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctxAn.fill();
};

function animate() {
    ctxAn.clearRect(0, 0, width, height);
    runAn(angleAn);
    requestAnimationFrame(animate);
    for (var j = 0; j < particle.length; j++) {
        var p = particle[j];
        p.update();
        p.draw();
    }

    if (angleAn <= 2 * Math.PI) {
        angleAn += 0.04;
    } else {
        angleAn = 0;
    }
}
animate();