import scrapy


class skiScraper2(scrapy.Spider):
    name = "SkyResorts_spider2"
    start_urls = ['https://www.skiresort.info/snow-reports/trentino/sorted/open-slopes/']

    def parse(self, response):
        self.logger.info("HELOOOO")
        ski_items = response.css('div.resort-list-item')

        for resort in ski_items:
            name = resort.css('a.h3::text').getall()[0]
            name = name.replace("/\u200b", "").replace("\u2013", "").replace("\u00e0", "").replace("\u00f9","").replace("\u00e8", "")
            yield {
                'name':name,
                'open/closed': resort.css('span.closed::text').getall()[0],
                'open km': resort.css('span.bold::text').getall()[0],
                'snow depth': resort.css('td::text').getall()[5][0],
                'open lifts': resort.css('span::text').getall()[len(resort.css('span::text').getall()) - 1][0],

            }
