import numpy as np
import re

f = open('assets/claimsAreas','r')
data = f.read().strip().splitlines()
f.close()

claims = [[int(sub_str) for sub_str in re.findall(r'-?\d+', line)] for line in data]

canvas = np.zeros((1000,1000))
for (i, x, y, w, h) in claims:
    canvas[x:x+w,y:y+h] += 1
print('Part A: ', len(np.where(canvas>1)[0]))

for (i, x, y, w, h) in claims:
    claim = canvas[x:x+w, y:y+h]
    if( claim.min() == claim.max() == 1):
        print('Part B: ', i)