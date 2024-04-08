#!/usr/bin/python3
"""Start the Flask App."""
from flask import Flask, render_template, url_for
from models import storage
import uuid;

app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'


@app.teardown_appcontext
def teardown_db(exception):
    """Close the session."""
    storage.close()


@app.route('/101-hbnb')
def hbnb_filters(the_id=None):
    """Request handled here."""
    county_stuf = storage.all('State').values()
    counties = dict([i.name, i] for i in county_stuf)
    vifaa = storage.all('Amenity').values()
    mahli = storage.all('Place').values()
    wasee = dict([j.id, "{} {}".format(j.first_name, j.last_name)]
                 for j in storage.all('User').values())
    return render_template('101-hbnb.html',
                           cache_id=uuid.uuid4(),
                           states=counties,
                           amens=vifaa,
                           places=mahli,
                           users=wasee)

if __name__ == "__main__":
    """The Main Flask App."""
    app.run(host=host, port=port)
