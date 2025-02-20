function fakeConsole(message) { document.getElementById("fake-console").innerHTML += message + "<br>"; }

let thingey = 0

function changeStuff() {
    thingey += 0.1
    return thingey

}

const canvas = document.getElementById('screen');
const gl = canvas.getContext('webgl');

if (!gl) {
  fakeConsole('WebGL not supported');
} else {
  // Vertex shader source code
  const vsSource = `
    attribute vec4 aVertexPosition;
    void main() {
      gl_Position = aVertexPosition;
    }
  `;

  // Fragment shader source code
  const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
    }
  `;

  // Initialize shader program
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Get attribute locations
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
  };


  // Set up buffers and draw the triangle
  drawScene(gl, programInfo);
}


function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}


function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function drawScene(gl, programInfo) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Set clear color to black
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the canvas before drawing on it

  // Set the drawing position to the "program"
  gl.useProgram(programInfo.program);

  // Define the vertices of the triangle
  const positions = [
    -1.0,  thingey,
     1.0,  0.9,
     0.5, -1.0,
  ];

  // Create a buffer for the vertices
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Tell WebGL how to pull data from the buffer
  gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      2,          // size
      gl.FLOAT,   // type
      false,       // normalize
      0,          // stride
      0);        // offset

  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

  // Draw the triangle
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

fakeConsole("it no error")