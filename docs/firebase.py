import firebase_admin
from firebase_admin import db
from firebase_admin import credentials

cred = credentials.Certificate("C:\Users\GeoYS\Documents\Projects\studentAlexa\source\student-alexa-firebase-adminsdk-yngj9-03736e5f4c.json")
url = "https://student-alexa.firebaseio.com/"
firebase_admin.initialize_app(cred, {'databaseURL':url})

root = db.reference()
# Add a new user under /users.
new_user = root.child('users').push({
    'name' : 'Mary Anning', 
    'since' : 1700
})

