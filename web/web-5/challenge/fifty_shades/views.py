from fifty_shades import app, helper
from flask import Flask, render_template
from random import randint


@app.route('/')
def main():
    return 'hello world'


@app.route('/<redirect_path>')
def path_redirect(redirect_path):
    url = ''
    if redirect_path in helper.INDEX_DICT:
        print('exists')
        url = helper.get_next_url(redirect_path)
        print(url)
    else:
        url = helper.get_first_url()
    if url[1] == 'flag':
        template = 'flag.html'
        url = ''
        time = 0
    else:
        template = "page_template{}.html".format(url[1])
        time = url[2]
        url = url[0]
    return render_template(template, url=url, time=time)


if __name__ == '__main__':
    app.run(port=3000)
