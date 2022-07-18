Polish noun declensions were driving me up the wall so I decided to build an app to practice.

To get all of the declensions, I wrote a Python script which scrapes wikipedia to create a JSON object of words and all their declensions in both singular and plural: https://github.com/gordonmaloney/polishwikiscraper/blob/main/main.py

And the vocab itself comes from the Duolingo Polish course, the vocab for which I scraped with another Python script I wrote.

To do:
    - pick which cases you'd like to study
    - pick between singular / plural (or both)
    - pick between multiple choice or typing an answer