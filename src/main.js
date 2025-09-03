import 'dotenv/config'
import express from 'express'
import { success, failed } from './utils/index.js'
import { useLogMiddleware } from './middleware/log.js'
import { useCorsMiddleware } from './middleware/cors.js'
import { useErrorHandle } from './middleware/error.js'

import { Page } from './module/page.js'

const page = new Page()
await page.init()

const app = express()
app.use(express.json())

useLogMiddleware(app)
useCorsMiddleware(app, { allowAll: true })

app.post('/generate-image', async (req, res) => {
  try {
    const { prompt, imageUrl } = req.body
    const result = await page.genImage({ imageUrl, prompt })
    console.log('### RESULT ### \n', result)
    res.send(success(result))
  } catch (err) {
    res.send(failed(err))
  }
})

useErrorHandle(app)

const port = process.env.PORT ?? 4000
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
