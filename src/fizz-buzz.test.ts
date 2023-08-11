import FizzBuzz from './fizz-buzz'

const expects = {
  Fizz: [3],
  Buzz: [5],
  Pizz: [7],
  Jazz: [11],
  FizzBuzz: [3, 5],
  FizzPizz: [3, 7],
  FizzJazz: [3, 11],
  BuzzPizz: [5, 7],
  BuzzJazz: [5, 11],
  PizzJazz: [7, 11],
  FizzBuzzPizz: [3, 5, 7],
  FizzBuzzJazz: [3, 5, 11],
  FizzPizzJazz: [3, 7, 11],
  BuzzPizzJazz: [5, 7, 11],
  FizzBuzzPizzJazz: [3, 5, 7, 11],
} as const

describe('fizz-buzz', () => {
  let spy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any>

  beforeEach(() => {
    spy = jest.spyOn(console, 'log')
    spy.mockImplementation((...args) => args)
  })

  afterEach(() => {
    spy.mockReset()
    spy.mockRestore()
  })

  it(`FizzBuzz問題`, () => {
    FizzBuzz()
    expect(console.log).toBeCalledTimes(100)
    Array.from({ length: 100 }).forEach((_, i) => {
      const num = i + 1
      const expected =
        Object.entries(expects)
          .reverse()
          .find(([_, criteria]) => criteria.every((n: number) => num % n === 0))?.[0] ?? `${num}`
      expect(spy.mock.calls[i][0]).toBe(expected)
    })
  })

  Array.of(200, 1000, 10000).forEach((length) => {
    it(`FizzBuzz問題(N=${length})`, () => {
      FizzBuzz(length)
      expect(console.log).toBeCalledTimes(length)
      Array.from({ length }).forEach((_, i) => {
        const num = i + 1
        const expected =
          Object.entries(expects)
            .reverse()
            .find(([_, criteria]) => criteria.every((n: number) => num % n === 0))?.[0] ?? `${num}`
        expect(spy.mock.calls[i][0]).toBe(expected)
      })
    })
  })
})
