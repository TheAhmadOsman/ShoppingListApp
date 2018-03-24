from flask import (Flask, Response, request,
                   render_template, redirect, url_for)
import json


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/save", methods=["POST"])
def save():
    lst = request.get_json()
    with open("data.json", "w") as data:
        data.write(json.dumps(lst))
    return redirect(url_for("index"))


@app.route("/load")
def load():
    with open("data.json", "r") as storedData:
        data = storedData.read()
    return Response(data)


if __name__ == '__main__':
    app.run(debug=True, port=5001)
