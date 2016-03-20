function trigScript(numPoints) {
	startTime = Date.now();
	lastTime = Date.now();

	function logTime(label) {
		var elapsedTime = Date.now() - lastTime;
		//console.log(label + ": " + elapsedTime);
		lastTime = Date.now();
	}

	edges = [];
	vertices = [];

	initialize(numPoints);

	function initialize(numPoints) {

		// Generate random vertices and insert into vertices array
		for(i = 0; i < numPoints; i++) {
			vertices.push(new Vertex(randomPoint(), randomPoint(), randomVelocity(), randomVelocity()));
		}

		// Generate edges array
		for(i = 0; i < vertices.length; i++) {
			for(j = 0; j < vertices.length; j++) {
				if(i != j) {
					if(i < j) {
						var a = i;
						var b = j;
					} else {
						var a = j;
						var b = i;
					}

					var c = true;

					for(k = 0; k < edges.length; k++) {
						if(a == edges[k].point1 && b == edges[k].point2) {
							c = false;
						}
					}

					if(c) { edges.push(new Edge(a, b)); }
				}
			}
		}

		logTime("Initialize");

		// Call runScript
		runScript();
	}

	function runScript() {

		// Get canvas element and set context
		var canvas = document.getElementById('canvas');
		
		if (canvas.getContext) {
			var ctx = canvas.getContext('2d');

			ctx.clearRect(0, 0, 500, 500);
			ctx.strokeStyle = "#3a4450";
			ctx.fillStyle = "#3a4450";

			calculateGraph();
			drawEdges(ctx);
			logTime("drawEdges");
			
			drawVertices(ctx);
			logTime("drawVertices");

			var total = Date.now() - startTime;

			//console.log("Total: " + total);

			window.t = setTimeout(runScript, 50);
		}
	}

	function Vertex(x, y, xVelocity, yVelocity) {
		this.x = x;
		this.y = y;
		this.xVelocity = xVelocity;
		this.yVelocity = yVelocity;
	}

	function Edge(point1, point2, len) {
		this.point1 = point1;
		this.point2 = point2;
		this.len = 0;
		this.cross = 0;
	}

	function randomPoint() {
		return Math.floor(Math.random() * (501));
	}

	function randomVelocity() {
		return Math.floor(Math.random() * (10)) - 5;
	}

	function determineIfOutOfBounds(i) {
		if(vertices[i].x >= 500) {
			vertices[i].x = 500;
			vertices[i].xVelocity = vertices[i].xVelocity * -1;
		} else if(vertices[i].x <= 0) {
			vertices[i].x = 0;
			vertices[i].xVelocity = vertices[i].xVelocity * -1;
		}

		if(vertices[i].y >= 500) {
			vertices[i].y = 500;
			vertices[i].yVelocity = vertices[i].yVelocity * -1;
		} else if(vertices[i].y <= 0) {
			vertices[i].y = 0;
			vertices[i].yVelocity = vertices[i].yVelocity * -1;
		}
	}

	function determineCross(A, B, C, D) {
		return (((A.x-C.x)*(D.y-C.y)-(A.y-C.y)*(D.x-C.x))*((B.x-C.x)*(D.y-C.y)-(B.y-C.y)*(D.x-C.x))<0)&&(((C.x-A.x)*(B.y-A.y)-(C.y-A.y)*(B.x-A.x))*((D.x-A.x)*(B.y-A.y)-(D.y-A.y)*(B.x-A.x))<0) ? true : false;
	}

	function calculateGraph() {

		// Reset cross property and calculate length for each edge
		for(i = 0; i < edges.length; i++) {
			edges[i].cross = 0;
			edges[i].len = Math.sqrt((vertices[edges[i].point2].x - vertices[edges[i].point1].x) * (vertices[edges[i].point2].x - vertices[edges[i].point1].x) + (vertices[edges[i].point2].y - vertices[edges[i].point1].y) * (vertices[edges[i].point2].y - vertices[edges[i].point1].y));
		}

		logTime("Reset cross and len");

		// Sort edges by length (shortest to longest)
		edges = edges.sort(function(a, b) {
			return a.len < b.len ? -1 : 1;
			if(a.len < b.len) 
				return -1;
			if(a.len > b.len)
				return 1;
			return 0;
		});

		logTime("Sort");

		// Calculate cross for each edge
		for(i = 0; i < edges.length; i++) {
			j = 0;

			while(edges[j].cross != 0 && edges[i].cross == 0) {
				if(i != j && edges[j].cross == 1) {
					if(determineCross(vertices[edges[i].point1], vertices[edges[i].point2], vertices[edges[j].point1], vertices[edges[j].point2])) {
						edges[i].cross = -1;
					}
				}

				j++;
			}

			edges[i].cross = edges[i].cross != -1 ? 1 : -1;
		}

		logTime("Calculate cross");
	}

	function drawEdges(ctx) {
		ctx.beginPath();
		for(i = 0; i < edges.length; i++) {
			if(edges[i].cross == 1) {
				ctx.moveTo(vertices[edges[i].point1].x, vertices[edges[i].point1].y);
			ctx.lineTo(vertices[edges[i].point2].x, vertices[edges[i].point2].y);
			}
		}
		ctx.stroke();
	}

	function drawVertices(ctx) {
		ctx.beginPath();

	    for(i = 0; i < vertices.length; i++) {
	    	ctx.moveTo(vertices[i].x, vertices[i].y);
			ctx.arc(vertices[i].x, vertices[i].y, 4, Math.PI*2, false);

			vertices[i].x += vertices[i].xVelocity;
	    	vertices[i].y += vertices[i].yVelocity;
	    	determineIfOutOfBounds(i);
		}
		ctx.fill();
	}
}

	