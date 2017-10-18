import hlextend
from urllib import quote
sha = hlextend.new('sha512')
check = '116ab7b0a95104dd30ae38abee66ea6b41e3599820d297cbe59e9c237bc0aa45e928d07eeec3ba5f5a0c7024ebced1e9957ff6e2444fab482393f0b125800c88'
print quote(sha.extend('/../flag.txt', 'flag', 7, check, raw=True))
print sha.hexdigest()
