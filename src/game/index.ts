import { Platform } from './entities/playform'
import { Player } from './entities/player'
import { collisionHandler } from './lib/collision-handler'
import { handlePlayerMovement } from './lib/player-camera'

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

  const platforms = [
    new Platform(c, { x: 200, y: 500 })
  ]

  const drawInitialScene = () => {
    player.draw()

    platforms.forEach(p => p.draw())
  }

  drawInitialScene()

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

    platforms.forEach(p => p.draw())
    player.update()

    collisionHandler(player, platforms)
    handlePlayerMovement(keys.left.pressed, keys.right.pressed, player, platforms)
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