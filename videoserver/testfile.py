import socketio

# standard Python
sio = socketio.Client()

@sio.event
def connect():
    print('connected')
    sio.emit("video_send", {
        "data": 1142
    })

sio.connect("http://127.0.0.1:5000")