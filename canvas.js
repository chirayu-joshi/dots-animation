const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randomInArray = (arr) => arr[randomInRange(0, arr.length - 1)]

const canvas = document.getElementById('canvas')

const innerWidth = window.innerWidth
const innerHeight = window.innerHeight
canvas.width = innerWidth
canvas.height = innerHeight

const ctx = canvas.getContext('2d')

function Circle(x, y, dx, dy, radius) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius

  this.draw = () => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.strokeStyle = 'red'
    ctx.stroke()
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
    this.draw()
  }
}

let circleArray = []
for (let i = 0; i < 400; ++i) {
  const radius = 30
  const speed = 1
  let x = randomInRange(radius, innerWidth - radius)
  let dx = randomInArray([1, -1]) * speed + (speed * (Math.random() - 0.5))
  let y = randomInRange(radius, innerHeight - radius)
  let dy = randomInArray([1, -1]) * speed + (speed * (Math.random() - 0.5))
  circleArray.push(new Circle(x, y, dx, dy, radius))
}

const animate = () => {
  requestAnimationFrame(animate)

  ctx.clearRect(0, 0, innerWidth, innerHeight)

  for (const circle of circleArray) {
    circle.update()
  }
}
animate()
