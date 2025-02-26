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

        const pipeline = device.createRenderPipeline({
          label: 'our hardcoded red triangle pipeline',
          layout: 'auto',
          vertex: {
            // entryPoint: 'vs',
            module,
          },
          fragment: {
            // entryPoint: 'fs',
            module,
            targets: [{ format: presentationFormat }],
          },
        });

        const renderPassDescriptor = {
          label: 'our basic canvas renderPass',
          colorAttachments: [
            {
              // view: <- to be filled out when we render
              clearValue: [0.3, 0.3, 0.3, 1],
              loadOp: 'clear',
              storeOp: 'store',
            },
          ],
        };

        function render() {
          // Get the current texture from the canvas context and
          // set it as the texture to render to.
          renderPassDescriptor.colorAttachments[0].view =
              context.getCurrentTexture().createView();
       
          // make a command encoder to start encoding commands
          const encoder = device.createCommandEncoder({ label: 'our encoder' });
       
          // make a render pass encoder to encode render specific commands
          const pass = encoder.beginRenderPass(renderPassDescriptor);
          pass.setPipeline(pipeline);
          pass.draw(3);  // call our vertex shader 3 times
          pass.end();
       
          const commandBuffer = encoder.finish();
          device.queue.submit([commandBuffer]);
        }
       
        render();










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
