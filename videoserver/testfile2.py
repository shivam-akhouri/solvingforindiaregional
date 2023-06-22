import socketio

# standard Python
sio = socketio.Client()

@sio.event
def connect():
    print('connected')

@sio.on("video_receive")
def on_message(data):
    print(data)

sio.connect("http://127.0.0.1:5000")