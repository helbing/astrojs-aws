export class HelloWorld {
  public sayHello(name: string) {
    return `Hello, ${name}`
  }

  public fibonacci(num: number) {
    const array = [0, 1]
    for (let i = 2; i < num + 1; i++) {
      array.push(array[i - 2] + array[i - 1])
    }
    return array[num]
  }
}
