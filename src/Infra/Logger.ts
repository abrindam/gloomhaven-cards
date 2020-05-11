
export class Logger {

  static log(message: string) {
    console.log(message)
  }

  static secret(label: string, secret: string) {
    const obfuscated = btoa(secret)
    console.log(`${label}: ${obfuscated}`)
  }

  static error(message: string) {
    console.log("ERROR: " + message)
  }

}