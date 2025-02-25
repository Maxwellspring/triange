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
        // write code here VVVVV

        // Get a WebGPU context from the canvas and configure it
        const canvas = document.querySelector('canvas');
        const context = canvas.getContext('webgpu');
        const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
        context.configure({
          device,
          format: presentationFormat,
        });


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
