import dotenv
from os.path import join, dirname

DOTENV_PATH = join(dirname(__file__), '.env')
dotenv.load(DOTENV_PATH)

USERNAME = dotenv.get('USERNAME')
PASSWORD = dotenv.get('PASSWORD')

SQLALCHEMY_DATABASE_URI = 'mysql://{}:{}@localhost/{}'.format(
    USERNAME,
    PASSWORD,
    DATABASE
)
