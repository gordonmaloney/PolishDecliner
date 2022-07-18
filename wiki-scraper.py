import requests
from bs4 import BeautifulSoup


words = ['kawa', 'pies', 'xxxx']


print("[")


for word in words:
    url = f'https://en.wiktionary.org/wiki/{word}'
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'lxml')

    # check if there's a Polish entry on Wiktionary:
    if '<span class="mw-headline" id="Polish">' in str(soup):
        # strip everything before polish entry
        wikiSoup = BeautifulSoup(r.content, 'xml')
        polishSoup = BeautifulSoup(str(wikiSoup).split('<span class="mw-headline" id="Polish">')[1], 'lxml')

        trans = polishSoup.findAll('ol')[0]
        translation1 = trans.findAll('li')[0].text

        print('{ word: "' + word + '", cases: [' )

        polishDeclension = polishSoup.findAll('table', class_='inflection-table')[0]

        rows = polishDeclension.findAll('tr')

        for idx, row in enumerate(rows):
                if len(row.findAll('td')) > 1:
                    print('{ case: "' + row.find('th').text.strip() + '", declensions: [')
                    cells = row.findAll('td')
                    if len(cells) > 1:
                        print('{singular : "' + str(cells[0].text).strip() + '", plural : "' + str(cells[1].text).strip() + '"}] },')

        print("] },")

print(']')
