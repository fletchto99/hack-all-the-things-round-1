flag = "flag{I_4M_4_L4ZY_3MPLOY3E}"
key = "D"

encrypted = ""

for ch in flag:
	encrypted = encrypted + hex(ord(ch) ^ ord(key)) + " "

encrypted = encrypted.strip()

print("Encrypted: " + encrypted)

# All that people need to make is below
for i in range(0, 128):
	solution = ""
	for hx in encrypted.split(' '):
		solution = solution + chr(int(hx, 16) ^ i)
	print(solution)
