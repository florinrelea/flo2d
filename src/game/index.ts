import { Platform } from './entities/playform'
import { Player } from './entities/player'
import { collisionHandler } from './lib/collision-handler'
import { handlePlayerMovement } from './lib/player-camera'
import backgroundImage from '../assets/img/sky-background.png'
import hills1 from '../assets/img/background/hills1.png'
import hills2 from '../assets/img/background/hills2.png'
import { GenericObject } from './entities/generic-object'

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
  })

  const hillsHeight = 1080 / 2
  const hillsWidth = 1920 / 2

  const bgElements: GenericObject[] = []

  for (let i = 0; i < 4; i += 1) {
    bgElements.push(
      new GenericObject({
        image: hills1,
        ctx: c,
        pos: {
          x: i * hillsWidth,
          y: canvas.height - hillsHeight
        },
        width: hillsWidth,
        height: hillsHeight
      }),
      new GenericObject({
        image: hills2,
        ctx: c,
        pos: {
          x: (i * hillsWidth) + hillsWidth,
          y: canvas.height - hillsHeight
        },
        width: hillsWidth,
        height: hillsHeight
      })
    )
  }

  const genericObjects: GenericObject[] = [
    new GenericObject({
      image: backgroundImage,
      ctx: c,
      pos: {
        x: 0,
        y: 0
      },
      width: canvas.width,
      height: canvas.height
    })
  ].concat(bgElements)

  const platforms: Platform[] = []

  const createPlatform = (x: number, y: number, length: number) => {
    for (let i = 0; i < length; i += 1) {
      const prevPlat = platforms[platforms.length - 1]

      let dir

      if (i === 0) {
        dir = 'left' as const
      } else if (i === length - 1) {
        dir = 'right' as const
      } else {
        dir = 'mid' as const
      }

      platforms.push(
        new Platform(
          c,
          { x: prevPlat && i !== 0 ? prevPlat.pos.x + prevPlat.width : x, y },
          dir
        )
      )
    }
  }

  createPlatform(0, 500, 100)

  const drawInitialScene = () => {
    genericObjects.forEach(p => p.draw())

    platforms.forEach(p => p.draw())

    player.draw()
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

    genericObjects.forEach(p => p.draw())
    platforms.forEach(p => p.draw())

    collisionHandler(player, platforms)
    handlePlayerMovement(
      keys.left.pressed,
      keys.right.pressed,
      player,
      platforms,
      bgElements, {
      x: canvas.width,
      y: canvas.height
    })

    player.update()
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