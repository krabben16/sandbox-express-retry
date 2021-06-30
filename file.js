const fs = require('fs')
const { join } = require('path')

module.exports = class File {
  constructor(name) {
    this.path = join(process.cwd(), name)
  }
  read() {
    return fs.readFileSync(this.path)
  }
  write(data) {
    fs.writeFileSync(this.path, data)
  }
  init() {
    fs.writeFileSync(this.path, 0)
  }
}
