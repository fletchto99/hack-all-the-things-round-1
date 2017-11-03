import random
def generate_token():
    random_list = []
    for r in range(65):
        random_list.append(random.randint(1, 10))
    token_template = "4{}{}e{}{}3{}{}2{}{}2{}{}b{}{}5{}{}7{}{}c{}{}6{}{}3{}{}7{}{}4{}{}9{}{}7{}{}5{}{}b{}{}e{}{}2{}{}8{}{}1{}{}7{}{}1{}{}5{}{}b{}{}0{}{}b{}{}8{}{}5{}{}8{}{}7{}{}d{}{}".format(
        *random_list
    )
    return token_template


def validate_token(token):
    flag = '4e322b57c6374975be281715b0b8587d'
    return flag == token
