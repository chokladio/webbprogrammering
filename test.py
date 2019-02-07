#!/usr/bin/python
import requests
from contextlib import closing
from bs4 import BeautifulSoup


def simple_get(url):
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None

    except RequestException as e:
        log_error('Error during requests to {0} : {1}'.format(url, str(e)))
        return None

def is_good_response(resp):

    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200 
            and content_type is not None 
            and content_type.find('html') > -1)

def log_error(e):
    print(e)

def scrape():


    
    program = "I"
    year = "1718"
    URL = "https://www.ceq.lth.se/rapporter/?lasar_lp={}&program={}&kurskod=&sort=kurskod".format(year, program)
    return simple_get(URL)


payload = {
    'username': 'ine15cga',
    'password': 'thering2'
}


with requests.Session() as s:
    url = "https://cas.lu.se/cas/login?service=https%3A%2F%2Fwww.ceq.lth.se%2Frapporter%2F%3Flasar_lp%3D1718%26program%3DI%26kurskod%3D%26sort%3Dkurskod"
    url2 = "https://www.ceq.lth.se/rapporter/?lasar_lp=1718&program=I&kurskod=&sort=kurskod&ticket=ST-23007-EC4obwYNjmzX6c0TtKld-cas.lu.se"
    url3 = "https://cas.lu.se/cas/login;jsessionid=4B3B0626280DC2971F6EE73FB374B260?service=https%3A%2F%2Fwww.ceq.lth.se%2Frapporter%2F%3Flasar_lp%3D1718%26program%3DI%26kurskod%3D%26sort%3Dkurskod"
    ratt = "/cas/login;jsessionid=ED4E8CB00D880B958AD24409DD5666E9?service=https%3A%2F%2Fwww.ceq.lth.se%2Frapporter%2F%3Flasar_lp%3D1718%26program%3DI%26kurskod%3D%26sort%3Dkurskod"
    
    p = s.post(url, data=payload)
    # print the html returned or something more intelligent to see if it's a successful login page.
    print (p.text)

    # An authorised request.
    r = s.get('A protected web page url')
    print (r.text)
        # etc...


        
if __name__ == '__main__':
    raw_html = scrape()
    html = BeautifulSoup(raw_html, 'html.parser')
    for p in html.select('p'):
        if p['id'] == 'walrus':
            print(p.text)
