const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let bird = new Image()
let bg = new Image()
let fg = new Image()
let pipeUp = new Image()
let pipeBottom = new Image()
let gap = 90
let score = 0

// Picture files
bird.src = './img/bird.png'
bg.src = './img/bg.png'
fg.src = './img/fg.png'
pipeUp.src = './img/pipeUp.png'
pipeBottom.src = './img/pipeBottom.png'

// Music files
let fly = new Audio()
let score_audio = new Audio()
let fail = new Audio()
fly.src = './audio/fly.mp3'
score_audio.src = './audio/score.mp3'
fail.src = './audio/fail.mp3'
// On button press
document.addEventListener('keydown', moveUp)

function moveUp() {
  yPos -= 30
  fly.play()
}

// Block generate
let pipe = []
pipe[0] = {
  x: canvas.width,
  y: 0
}

// Bird position
let xPos = 10
let yPos = 150
let grav = 1.5

function draw() {
  ctx.drawImage(bg, 0, 0)
  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)
    pipe[i].x--
    if(pipe[i].x == 125) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random () * pipeUp.height) - pipeUp.height
      })
    }
    // Collision
    if(xPos + bird.width >= pipe[i].x
    && xPos <= pipe[i].x + pipeUp.width
    && (yPos <= pipe[i].y + pipeUp.height
      || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
      || yPos + bird.height >= canvas.height - fg.height) {
        location.reload() // Page reload
    }
    if(pipe[i].x == 5) {
      score++
      score_audio.play()
    }
  }
  ctx.drawImage(fg, 0, canvas.height - fg.height)
  ctx.drawImage(bird, xPos, yPos)

  yPos += grav

  ctx.fillStyle = '#000'
  ctx.font = '24px Verdana'
  ctx.fillText('Счет:' + score, 10, canvas.height - 20)

  requestAnimationFrame(draw)
}


pipeBottom.onload = draw
