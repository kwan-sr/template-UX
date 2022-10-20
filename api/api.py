import os
import time
import random

from flask import Flask, jsonify, json, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# define image names. You can load this information from a local file or a database
images = [{'name': 'cardinal.jpg', 'label': 'Cardinal'}, 
          {'name': 'bluejay.jpg', 'label': 'Blue jay'},
          {'name': 'cedarwaxwing.jpg', 'label': 'Cedar waxwing'}]

# check that the backend is connected
@app.route('/time')
def get_current_time():
    return jsonify({'time': time.strftime("%I:%M:%S %p", time.localtime())})

@app.route('/imageInfo', methods=['GET'])
def getImageInfo():
    random.shuffle(images)
    response_body = {'imgs': images}
    return jsonify(response_body)


# send data from frontend to backend
@app.route('/create', methods=['POST'])
def create():
    request_data = json.loads(request.data)
    name = request_data['content']
    print(name)
    response_body = {'todo': name}
    print("data saved")
    return jsonify(response_body)


@app.route('/api', methods=['GET'])
def api():
    return {
      'userId': 1, 
      'title': 'Flask React application',
      'completed': False
    }

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

