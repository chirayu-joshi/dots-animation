const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randomInArray = (arr) => arr[randomInRange(0, arr.length - 1)]

const canvas = document.getElementById('canvas')

let innerWidth = canvas.width = window.innerWidth
let innerHeight = canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

const colorArray = [
  '#264653', '#2a9d8f', '#e9c46a', '#f4a261', 
  '#e76f51', '#d62828', '#9e2a2b', '#ffd60a'
]

const mouse = {
  x: undefined,
  y: undefined
}

function Circle(x, y, dx, dy, radius) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.minRadius = radius
  this.color = randomInArray(colorArray)

  this.draw = () => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  this.update = () => {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }
    this.x += this.dx
    this.y += this.dy
    // Interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 && mouse.y - this.y > -50 &&
      this.radius < 40) {
      ++this.radius
    } else if (this.radius > this.minRadius) {
      --this.radius
    }
    this.draw()
  }
}

let circleArray = []
const init = () => {
  circleArray = []
  for (let i = 0; i < 800; ++i) {
    const radius = randomInRange(1, 4)
    const speed = 1
    let x = randomInRange(radius, innerWidth - radius)
    let dx = randomInArray([1, -1]) * speed + (speed * (Math.random() - 0.5))
    let y = randomInRange(radius, innerHeight - radius)
    let dy = randomInArray([1, -1]) * speed + (speed * (Math.random() - 0.5))
    circleArray.push(new Circle(x, y, dx, dy, radius))
  }
}

const animate = () => {
  requestAnimationFrame(animate)

  ctx.clearRect(0, 0, innerWidth, innerHeight)

  for (const circle of circleArray) {
    circle.update()
  }
}

init()
animate()

window.addEventListener('mousemove', ({ x, y }) => {
  mouse.x = x
  mouse.y = y
})

window.addEventListener('resize', () => {
  innerWidth = canvas.width = window.innerWidth
  innerHeight = canvas.height = window.innerHeight
  init()
})
