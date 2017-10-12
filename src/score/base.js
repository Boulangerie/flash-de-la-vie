export class BaseScore {

  constructor(name, score) {
    this.name = name
    this.score = score
    this.duration = score.length
    this.currentPosition = 0
    this.pause = false
  }

  get note() {
    return this.score[this.currentPosition]
  }

  pause() {
    this.pause = true
  }

  play() {
    this.pause = false
  }

  reset() {
    this.currentPosition = 0
  }

  tick() {
    if (!this.pause && this.currentPosition < this.duration) {
      this.currentPosition++
    } else {
      // repeat? :p
      this.currentPosition = 0
    }
  }

}