import pi from './pi'

addEventListener('message', async (event: any) => {
  postMessage(await pi(event.data))
})
