import * as cheerio from 'cheerio'
import axios from 'axios'

/**
 * og scrap
 * @param {string} url 
 * @returns og = {}
 */
export async function scrap(url) {
    const scrap = await axios.get(url)
    const html = scrap.data
    const $ = cheerio.load(html)

    let og = {}
    
    $('meta').each((i, el) => {
        if($(el).attr('property')) {
            const key = $(el).attr('property').split(":")[1]
            const val = $(el).attr('content')

            og[key] = val
        }
    })

    return og
}