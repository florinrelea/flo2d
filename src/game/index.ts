import { Player } from './entities/player'

export function init() {
  const canvas = document.getElementById('cnv') as HTMLCanvasElement

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const c = canvas.getContext('2d') as CanvasRenderingContext2D

  if (!c) {
    throw new Error('No context found.')
  }

  const player = new Player(c, {
    x: 100,
    y: 100
  }, {
    x: canvas.width,
    y: canvas.height
  })

  player.draw()

  const keys = {
    right: {
      pressed: false
    },
    left: {
      pressed: false
    }
  }


  function eventLoop() {
    window.requestAnimationFrame(eventLoop)

    c.clearRect(
      0, 0,
      canvas.width, canvas.height
    )

    player.update()

    if (keys.left.pressed) {
      player.move('left')
    } else if (keys.right.pressed) {
      player.move('right')
    } else {
      player.resetVeloc('x')
    }
  }

  window.addEventListener('keydown', ({ key }) => {
    if (key === 'ArrowLeft') {
      keys.left.pressed = true
    } else if (key === 'ArrowRight') {
      keys.right.pressed = true
    } else if (key === 'ArrowUp') {
      player.jump()
    } else if (key === 'ArrowDown') {

    }
  })

  window.addEventListener('keyup', ({ key }) => {
    if (key === 'ArrowLeft') {
      keys.left.pressed = false
    } else if (key === 'ArrowRight') {
      keys.right.pressed = false
    } else if (key === 'ArrowUp') {
    } else if (key === 'ArrowDown') {}
  })

  eventLoop()
}