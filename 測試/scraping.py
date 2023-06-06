import requests
from bs4 import BeautifulSoup
from urllib.parse import unquote
import webbrowser

base_url = 'http://yzunews.yzu.edu.tw/'

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0'}

r = requests.get(base_url, headers=headers)

#print(r.raise_for_status())
#print(r.status_code)

# Get crawling results 
soup = BeautifulSoup(r.content, 'html.parser')

page_title = soup.select('head  title')[0].text
print('Crawling %s 新聞...\n' % (page_title))

# Retrieve top five search result links.
# #main-content > article.content-list > header > h3 > a
# Select article.content-list elements inside #main-content
# then select all <a> tags
linkElems = soup.select('#main-content >article.content-list > header > h3 > a')

stop_words = ['詳細內容', '遠東商銀']

for i, linkElem in enumerate(linkElems):
    #print(i)
    title = linkElem.getText()
    link = linkElem.get('href') # get url from <href> tag
    link = unquote(link)
    #print(title)
    # print(any(w in title for w in stops_words))
    # title 有 ['詳細內容', '遠東商銀'] 其中一個
    if not any(w in title for w in stop_words):
        # link = 'https://www.yzu.edu.tw' + link
        print(title)
        print(link)
        print()
        # Open a browser tab for each result.
        #webbrowser.open_new(link)
    else:
        continue 