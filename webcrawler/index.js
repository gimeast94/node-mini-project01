import puppeteer from 'puppeteer'
import mongoose from "mongoose";
import { Starbucks } from './model/starbucks.model.js';

await mongoose.connect('mongodb://127.0.0.1:27017/dockerDB');

async function crawler() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.starbucks.co.kr/menu/drink_list.do');
    await page.waitForTimeout(1000)

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // await page.waitForSelector(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li`);
    // const listLength = (await page.$$(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li`)).length;
    // console.log(listLength)

    const dtCount = await page.$$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dt > a`, dts => dts.length)
    
    
    for(let i = 1; i <= dtCount*2; i+=2) {
        const type = await page.$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dt:nth-child(${i}) > a`, el=> el.textContent)
        const liCount = await page.$$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${i+1}) > ul > li`, lis => lis.length)
        
        console.log(`<<<<<<<<<<<<${type}>>>>>>>>>>>`)

        for(let j = 1; j <= liCount; j++) {
            const name = await page.$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${i+1}) > ul > li:nth-child(${j}) > dl > dd`, el=> el.textContent)
            const img = await page.$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${i+1}) > ul > li:nth-child(${j}) > dl > dt > a > img`, el => el.src)

            console.log({name, img})

            const starbucks = new Starbucks({type, name, img})
            await starbucks.save()
        }
    }
    await browser.close()
}

crawler()