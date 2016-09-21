import workerFarm from 'worker-farm'

export const crawl = (site, callback) => {
  const workers = workerFarm(require.resolve('./workers/crawl'))

  workers(site, (urls) => {
    callback(urls)
    workerFarm.end(workers)
  })
}
