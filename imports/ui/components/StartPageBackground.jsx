import React, { Component } from 'react';
import { initShaderProgram } from '../helpers/glFuncs';

class StartPageBackground extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.programInfo = {};
  }

  handleMouseMove = e => {
    this.programInfo.data.mouse[0] = e.clientX;
    this.programInfo.data.mouse[1] = e.clientY;
  }

  initBuffers = gl => {
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
      1.0, 1.0,
      -1.0, 1.0,
      1.0, -1.0,
      -1.0, -1.0
    ];

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(positions),
      gl.STATIC_DRAW);

    return {
      position: positionBuffer
    };
  };

  drawScene = (gl, programInfo, buffers) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.viewport(0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    {
      const numComponents = 2;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;

      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertextPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }

    gl.useProgram(programInfo.program);

    gl.uniform2fv(programInfo.uniformLocations.resolution, programInfo.data.resolution);
    gl.uniform2fv(programInfo.uniformLocations.mouse, programInfo.data.mouse);
    gl.uniform1f(programInfo.uniformLocations.time, (Date.now() - programInfo.data.timeStart) / 1000);

    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  };

  handleResize(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  componentDidMount() {
    const canvas = this.ref.current;
    this.handleResize(canvas);

    window.addEventListener("resize", () => {
      this.handleResize(canvas);
    });

    let gl = canvas.getContext("webgl");

    if (gl === null) {
      console.log("WebGL is not supported by the brower");
      return false;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);

    const vsSource = `
      attribute vec4 aVertexPosition;

      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    const fsSource = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 resolution;
    uniform vec2 mouse;
    uniform float time;

    float random (in vec2 _st) {
        return fract(sin(dot(_st.xy,
                            vec2(12.9898,78.233)))*
            43758.5453123);
    }

    // Based on Morgan McGuire @morgan3d
    // https://www.shadertoy.com/view/4dS3Wd
    float noise (in vec2 _st) {
        vec2 i = floor(_st);
        vec2 f = fract(_st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    #define NUM_OCTAVES 5

    float fbm ( in vec2 _st) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        // Rotate to reduce axial bias
        mat2 rot = mat2(cos(0.5), sin(0.5),
                        -sin(0.5), cos(0.50));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(_st);
            _st = rot * _st * 2.0 + shift;
            a *= 0.5;
        }
        return v;
    }

    void main() {
        vec2 st = gl_FragCoord.xy/resolution.xy*3.;
        // st += st * abs(sin(time*0.1)*3.0);
        vec3 color = vec3(0.0);

        vec2 q = vec2(0.);
        q.x = fbm( st + 0.00*time);
        q.y = fbm( st + vec2(1.0));

        vec2 r = vec2(0.);
        r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*time );
        r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*time);

        float f = fbm(st+r);

        color = mix(vec3(0.101961,0.619608,0.666667),
                    vec3(0.666667,0.666667,0.498039),
                    clamp((f*f)*4.0,0.0,1.0));

        color = mix(color,
                    vec3(0,0,0.164706),
                    clamp(length(q),0.0,1.0));

        color = mix(color,
                    vec3(0.666667,1,1),
                    clamp(length(r.x),0.0,1.0));

        gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);
    }
    `;

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    this.programInfo = {
      program: shaderProgram,
      data: {
        mouse: [0.0, 0.0],
        resolution: [gl.canvas.clientWidth, gl.canvas.clientHeight],
        timeStart: Date.now()
      },
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition")
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, "resolution"),
        mouse: gl.getUniformLocation(shaderProgram, "mouse"),
        time: gl.getUniformLocation(shaderProgram, "time")
      }
    };

    const buffers = this.initBuffers(gl);

    const anim = () => {
      this.drawScene(gl, this.programInfo, buffers);
      requestAnimationFrame(anim);
    };

    anim();
  }

  render() {
    return (
      <canvas
        ref={this.ref}
        className="StartPageBackground"
        onMouseMove={this.handleMouseMove}>Canvas is not supported</canvas>
    );
  }
}
export default StartPageBackground;
