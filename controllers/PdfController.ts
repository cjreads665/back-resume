const puppeteer = require('puppeteer');
const hbs = require('handlebars')
const fs = require('fs-extra');
const path = require('path');
const data = require('../data.json')

//compile hbs to pdf

const compile  = async function (templateName:any,data:Object){
    //locate the template hbs
    const filePath = path.join(process.cwd(),'templates',`${templateName}.hbs`)
    //get the html
    const html = await fs.readFile(filePath,'utf8')
    return hbs.compile(html)(data)
}


export default (async function () {
    try{
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: '/usr/bin/chromium-browser',
            args: [
              '--no-sandbox',
              '--disable-gpu',
            ]
        })
        const page = await browser.newPage()
        const content = await compile('mainTemp',data)
        await page.setContent(content);
        await page.emulateMediaType('screen')
        await page.pdf({
            path: 'resume.pdf',
            format : 'A4',
            printBackground : true
        })
        console.log('pdf created');
        await browser.close()
        // process.exit()

    } catch(err){
        console.log('error' + err);
        
    }
})