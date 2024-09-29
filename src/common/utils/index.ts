export function sleep(time: number): Promise<number> {
  return new Promise((res) => {
    setTimeout(res, time, time)
  })
}
