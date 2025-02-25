alert("start")

async function main() {
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();
    if (!device) {
        alert("succeed")
      fail('need a browser that supports WebGPU');
      return;
    } else {
        alert("fail")
    }
  }
  main();

  alert("end")