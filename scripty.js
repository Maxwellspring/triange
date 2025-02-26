async function main() {
  try {
    const adapter = await navigator.gpu?.requestAdapter();
    if (!adapter) {
      alert("webgpu  not found")
      console.error('WebGPU adapter not found.  Check your browser and hardware support.');
      return; //Exit if no adapter
    }

    const device = await adapter.requestDevice();
    if (!device) {
      alert("failed to get webgpu")
      console.error('Failed to get WebGPU device. This might be due to resource limitations or permission issues.');
      return; //Exit if no device
    }

    console.log('WebGPU device successfully obtained:', device);
    alert("webgpu successfully started")

    async function main() {
      try {
        const adapter = await navigator.gpu?.requestAdapter();
        if (!adapter) {
          alert("webgpu  not found")
          console.error('WebGPU adapter not found.  Check your browser and hardware support.');
          return; //Exit if no adapter
        }

        const device = await adapter.requestDevice();
        if (!device) {
          alert("failed to get webgpu")
          console.error('Failed to get WebGPU device. This might be due to resource limitations or permission issues.');
          return; //Exit if no device
        }

        console.log('WebGPU device successfully obtained:', device);
        alert("webgpu successfully started")
        // V START OF CODE V

        // Get a WebGPU context from the canvas and configure it
        const canvas = document.querySelector('canvas');
        const context = canvas.getContext('webgpu');
        const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
        context.configure({
          device,
          format: presentationFormat,
        });

        const module = device.createShaderModule({
          label: 'our hardcoded red triangle shaders',
          code: `
            @vertex fn vs(
              @builtin(vertex_index) vertexIndex : u32
            ) -> @builtin(position) vec4f {
              let pos = array(
                vec2f( 0.0,  0.5),  // top center
                vec2f(-0.5, -0.5),  // bottom left
                vec2f( 0.5, -0.5)   // bottom right
              );
       
              return vec4f(pos[vertexIndex], 0.0, 1.0);
            }
       
            @fragment fn fs() -> @location(0) vec4f {
              return vec4f(1.0, 0.0, 0.0, 1.0);
            }
          `,
        });

        // ^ END OF CODE ^
      } catch (error) {
        alert("and error happened")
        console.error('An error occurred:', error);
      }
    }

    main();


  } catch (error) {
    alert("and error happened")
    console.error('An error occurred:', error);
  }
}

main();
