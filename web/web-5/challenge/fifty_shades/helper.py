import hashlib
URL_DICT = {}
INDEX_DICT = {}


def build_dict():
    page_temp = 0
    for i in range(51):
        s = str('Fifty_shades_' + str(i)).encode('utf-8')
        print(s)
        hash = hashlib.sha224(s).hexdigest()
        if page_temp > 0 and page_temp < 3:
            page_temp += 1
        else:
            page_temp = 1
        time = 5 ** (i+1)
        tup = (hash, page_temp, time)
        URL_DICT[i] = tup
        INDEX_DICT[hash] = i
        print(str(i) + ':: ' + str(tup))
    s = str('Fifty_shades_' + str(51)).encode('utf-8')
    hash = hashlib.sha224(s).hexdigest()
    tup = (hash, 'flag', 0)
    URL_DICT[51] = tup

def get_index(hash):
    return INDEX_DICT[hash]


def get_hash(index):
    return URL_DICT[index]


def get_next_url(hash):
   index = int(get_index(hash) + 1)
   return get_hash(
        index
   )


def get_first_url():
    return URL_DICT[0]


build_dict()
