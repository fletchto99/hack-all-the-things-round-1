import hlextend
from urllib import quote
sha = hlextend.new('sha512')
check = '94eb179a29fd000eba77fa7ad6f0184f56d54460495db8a1d4225bbd4684a714d41fc133317c893fa9f3cb3bdf73a098edc178b5e7cb35feb340f3dea5cf990c'
import sys
sys.stdout.write(sha.extend('/../flag.txt', 'flag', 6, check, raw=True))
print sha.hexdigest()
