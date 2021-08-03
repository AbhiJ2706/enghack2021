const axios = require('axios');
const cheerio = require('cheerio');
const { FORMERR } = require('dns');
const fs = require('fs');


const scrapeAmazon = async () => {
    let links = require('./input.json')
    let productData = [];

    for (const link of links){
        const response = await axios.get(link.link, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
            }
        })
        const $ = cheerio.load(response.data)
        var price = $("#price_inside_buybox").text();
        if (price === "") {
            price = $("#priceblock_ourprice").text();
        }
        var image = $("#landingImage").attr('src')
        var ASIN = $('th:contains("ASIN") ~ ').text()
        console.log(price,ASIN)
        productData.push({
            "name" : link.name.trim(),
            "price" : parseFloat(price.trim().split("$")[1]),
            "image" : image.trim(),
            "link" : link.link.trim(),
            "ASIN" : ASIN.trim(),
        })
    }
    console.log(productData)


    fs.writeFile('./amazon/output.json', JSON.stringify(productData), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

module.exports = scrapeAmazon;