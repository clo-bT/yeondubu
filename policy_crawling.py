from selenium import webdriver
from bs4 import BeautifulSoup as bs
from selenium.webdriver.common.keys import Keys
import time
import json
driver = webdriver.Chrome()
driver.get('https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004881&wlfareInfoReldBztpCd=02')
time.sleep(3)
html = bs(driver.page_source, 'html.parser')
with open('output.txt', 'w', encoding='UTF-8') as output:
    output.write(str(html.prettify()))