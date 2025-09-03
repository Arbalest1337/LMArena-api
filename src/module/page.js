import puppeteer from 'puppeteer'
import { chatTemplate, imageTemplate } from './template.js'

export class Page {
  constructor(browser) {
    this.browser = null
    this.page = null
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled'
      ]
    })
    this.page = await this.browser.newPage()
    await this.page.goto(`https://lmarena.ai/?mode=direct`)
  }

  async chat(prompt) {
    const params = chatTemplate({ prompt })
    const response = await this.page.evaluate(
      async data => {
        const { params } = data

        const res = await fetch(`/nextjs-api/stream/create-evaluation`, {
          method: 'POST',
          body: JSON.stringify(params)
        })
        return await res.text()
      },
      { params }
    )
    return response
  }

  async genImage({ imageUrl, prompt }) {
    // gen image
    const params = imageTemplate({
      prompt,
      imageUrl
    })
    const genRes = await this.page.evaluate(
      async data => {
        const { params } = data
        const res = await fetch(`/nextjs-api/stream/create-evaluation`, {
          method: 'POST',
          body: JSON.stringify(params)
        })
        return await res.text()
      },
      { params }
    )
    return genRes
  }
}
