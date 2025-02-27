let numberr = 0.4

function changeStuff() {
  numberr += 0.1
  main();
  return numberr
}

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
    alert("WebGPU Device Success")

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
        alert("WebGPU Device Success")
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
          label: 'our hardcoded rgb triangle shaders',
          code: `
            struct OurVertexShaderOutput {
              @builtin(position) position: vec4f,
              @location(0) color: vec4f,
            };
            @vertex fn vs(
              @builtin(vertex_index) vertexIndex : u32
            ) -> OurVertexShaderOutput {
              let pos = array(
                vec2f( 0.0,  0.5),  // top center
                vec2f(-0.5, -0.5),  // bottom left
                vec2f( 0.5, -0.5)   // bottom right
            );
            var color = array<vec4f, 3>(
              vec4f(1, 0, 0, 1), // red
              vec4f(0, 1, 0, 1), // green
              vec4f(0, 0, 1, 1), // blue
            );
            var vsOutput: OurVertexShaderOutput;
            vsOutput.position = vec4f(pos[vertexIndex], 0.0, 1.0);
            vsOutput.color = color[vertexIndex];
            return vsOutput;
            }

            @fragment fn fs(fsInput: OurVertexShaderOutput) -> @location(0) vec4f {
            return fsInput.color;
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
              clearValue: [0.3, 0.3, numberr, 1],
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






















async function main2() {
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










        const module = device.createShaderModule({
          label: 'doubling compute module',
          code: `
            @group(0) @binding(0) var<storage, read_write> data: array<f32>;
       
            @compute @workgroup_size(1) fn computeSomething(
              @builtin(global_invocation_id) id: vec3u
            ) {
              let i = id.x;
              data[i] = data[i] * 2.0;
            }
          `,
        });

        const pipeline = device.createComputePipeline({
          label: 'doubling compute pipeline',
          layout: 'auto',
          compute: {
            module,
          },
        });

        const input = new Float32Array([1, 3, 5]);

        // create a buffer on the GPU to hold our computation
        // input and output
        const workBuffer = device.createBuffer({
          label: 'work buffer',
          size: input.byteLength,
          usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
        });
        // Copy our input data to that buffer
        device.queue.writeBuffer(workBuffer, 0, input);

        // create a buffer on the GPU to get a copy of the results
        const resultBuffer = device.createBuffer({
          label: 'result buffer',
          size: input.byteLength,
          usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
        });

        // Setup a bindGroup to tell the shader which
        // buffer to use for the computation
        const bindGroup = device.createBindGroup({
          label: 'bindGroup for work buffer',
          layout: pipeline.getBindGroupLayout(0),
          entries: [
            { binding: 0, resource: { buffer: workBuffer } },
          ],
        });

        // Encode commands to do the computation
        const encoder = device.createCommandEncoder({
          label: 'doubling encoder',
        });
        const pass = encoder.beginComputePass({
          label: 'doubling compute pass',
        });
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bindGroup);
        pass.dispatchWorkgroups(input.length);
        pass.end();

        // Encode a command to copy the results to a mappable buffer.
        encoder.copyBufferToBuffer(workBuffer, 0, resultBuffer, 0, resultBuffer.size);

        // Finish encoding and submit the commands
        const commandBuffer = encoder.finish();
        device.queue.submit([commandBuffer]);

        // Read the results
        await resultBuffer.mapAsync(GPUMapMode.READ);
        const result = new Float32Array(resultBuffer.getMappedRange());

        console.log('input', input);
        document.getElementById("fake-console").textContent += `input ${input} `
        console.log('result', result);
        document.getElementById("fake-console").textContent += `result ${result} `
        resultBuffer.unmap();










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

main2();