const fizzBuzzConfig = {
  Fizz: 3,
  Buzz: 5,
  Pizz: 7,
  Jazz: 11,
} as const

type FizzBuzzConfig = typeof fizzBuzzConfig
type FizzBuzzDivisibleValue = keyof FizzBuzzConfig

/**
 * FizzBuzzカリー関数
 */
function divFn(n: number, s: FizzBuzzDivisibleValue) {
  return (value: number) => {
    return value % n === 0 ? s : null
  }
}

/**
 * FizzBuzz問題
 *
 * 1からNまでの数字をプリントせよ。
 * - 3の倍数の場合は「Fizz」
 * - 5の倍数の場合は「Buzz」
 * - 7の倍数の場合は「Pizz」
 * - 11の倍数の場合は「Jazz」
 * - ※複数マッチする場合は連結
 */
export default function FizzBuzz(length: number = 100): void {
  Array.from({ length }).forEach((_, i) => {
    const value = i + 1
    const result = Object.entries(fizzBuzzConfig)
      .map(([key, num]) => divFn(num, key as FizzBuzzDivisibleValue)(value))
      .join('')
    console.log(result.length > 0 ? result : `${value}`)
  })
}
