
# this code will read the touch values from the ESP32 and echo them on the command line
# you could do something else more interesting with these values (e.g. visualize/sonify)

#pip install pyserial 
import serial
import json

# change the port as necessary by your OS
ser = serial.Serial('/dev/cu.usbserial-02301A6B', 115200)

print("hello world")

# while(True):
#   print(str(ser.readline().strip(), 'ascii'))
dict_all = {}

#have each data come on a new line
while(True):
  data = str(ser.readline().strip(), 'ascii')
  try:
    dict_json = dict(json.loads(data))
    dict_json.update(dict_all)
    with open('data.json', 'w') as outfile:
      json.dump(dict_all, outfile)
    print(dict_json)
  except json.JSONDecodeError as e:
    print("JSON:", e)