import scrapy
from pandas._libs import json


class skiScraper(scrapy.Spider):
    name = "SkyResorts_spider"
    start_urls = ['https://www.skiresort.info/ski-resorts/trentino/']

    def parse (self, response):
        self.logger.info("HELOOOO")
        ski_items = response.css('div.resort-list-item-image--big')

        for resort in ski_items:
            name = resort.css('a.h3::text').getall()[0]
            name = name.replace("/\u200b", "").replace("\u2013", "").replace("\u00e0", "").replace("\u00f9","").replace("\u00e8","")
            yield {

                'name': name,
                'slope Lenght': resort.css('span.slopeinfoitem::text').getall()[0][0],
                'km blue slope': resort.css('span.slopeinfoitem::text').getall()[1][0],
                'km red slope': resort.css('span.slopeinfoitem::text').getall()[2][0],
                'km black slope': resort.css('span.slopeinfoitem::text').getall()[3][0],
                'lifts': resort.css('li::text').getall()[0],
                'price': resort.css('td::text').getall()[len(resort.css('td::text').getall()) - 1][0]
            }





