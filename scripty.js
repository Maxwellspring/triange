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
      // Your WebGPU code using the 'device' object goes here.  Example:
      const shader = device.createShaderModule({
        code: `
          @vertex
          fn main(@builtin(vertex_index) VertexIndex : u32) -> @builtin(position) vec4<f32> {
            return vec4<f32>(0.0, 0.0, 0.0, 1.0); //Simple vertex shader
          }
        `
      });
  
      // ...rest of your WebGPU code...
  
    } catch (error) {
        alert("and error happened")
      console.error('An error occurred:', error);
    }
  }
  
  main();
  