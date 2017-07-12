const axios = require('axios')
const cheerio = require('cheerio')
// const fs = require('fs')
const baseURL = 'https://github.com/'
export function getCommits(user) {
    return new Promise((resolve, reject) => {
        const url = baseURL + user
        axios.get(url).then(res => {
            const load = cheerio.load(res.data)
            const parsed = load('div.js-contribution-graph > h2').text()
            const reg = /\d+/g
            const x = parsed.match(reg)
            resolve(x)
        }).catch(err => reject(err))
    })
}
export function getSVG(user) {
    return new Promise((resolve, reject) => {
        const url = baseURL + user
        axios.get(url).then(res => {
            const load = cheerio.load(res.data)
            const parsed = load('.js-calendar-graph').html()
            const svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 720 120"> ' + parsed + ' </svg>';
            // fs.writeFile('./scrapedSVG.svg', svg, function(err) {
            //     console.log('File successfully written!')
            // })
            resolve(svg)
        }).catch(err => reject(err))
    })
}
