let root = [];

let min_x = -1.2;
let max_x = 1.2;
let min_y = -1.2;
let max_y = 1.2;

let colours = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff'];

let precision = 20;

function setup() {
	createCanvas(200, 200);

	root[0] = new Complex(1, 0);
	root[1] = new Complex(0, 1);
	root[3] = new Complex(0, -1);
    root[2] = new Complex(-1, 0);
}

function draw() {
	//Complex(map(mouseX, 0, width, min_x, max_x), map(mouseY, 0, height, min_y, max_y));

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			let p = map(x, 0, width, min_x, max_x);
			let q = map(y, 0, height, min_y, max_y);

			let m = new Complex(p, q);
			let cm = m;
			let n = 0;

			while (n < precision) {
				m = cm.subtract(f(m).divide(f_prime(m)));
				cm = m;

				n++;
			}

			let buffer = [];

			for (let r of root) {
				buffer.push(cm.subtract(r));
			}

			let buffer_mag = [];

			for (let r of buffer) {
				buffer_mag.push(r.mag());
			}

			for (let i = 0; i < buffer_mag.length; i++) {
				var min = 9999;
				var index = 0;
				if (buffer_mag[i] <= min) {
					min = buffer_mag[i];
					index = i;
				}
			}

			// stroke(colours[index]);
			// stroke(colours[2]);

			let a = cm.subtract(root[0]);
			let b = cm.subtract(root[1]);
			let c = cm.subtract(root[2]);
			let d = cm.subtract(root[3]);

			if (a.mag() < b.mag() && a.mag() < c.mag() && a.mag() < d.mag()) {
				stroke(colours[0]);
			} else if (b.mag() < a.mag() && b.mag() < c.mag() && b.mag() < d.mag()) {
				stroke(colours[1]);
			} else if (c.mag() < a.mag() && c.mag() < b.mag() && c.mag() < d.mag()) {
				stroke(colours[2]);
			} else if (d.mag() < a.mag() && d.mag() < b.mag() && d.mag() < c.mag()) {
				stroke(colours[3]);
			} else {
				stroke(colours[4]);
			}

			point(x, y);
		}
	}

	fill(0);
	noStroke();

	for (let r of root) {
		ellipse(map(r.a, min_x, max_x, 0, width), map(r.b, min_y, max_y, 0, height), 10, 10);
	}

	noLoop();
}

function mousePressed() {
	redraw();
}

function f(x, c=new Complex(-1, 0)) {
	let result = new Complex(1, 0);
	for (let r of root) {
		result = result.multiply(x.subtract(r))
	}
	return result;
}

function f_prime(x, c=new Complex(4, 0)) {
	let result = new Complex(0, 0);
	for (let r of root) {
		let num = new Complex(1, 0);
		for (let s of root) {
			if (r != s) {
				num = num.multiply(x.subtract(s));
			}
		}
		result = result.add(num);
	}
	return result;
}