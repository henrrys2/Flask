from flask import Flask, render_template, request
#from flask_cors import CORS, cross_origin

app = Flask(__name__)

@app.route('/')
def Index():
    #return render_template("index.html")
    return render_template("files.html")

@app.route('/uploadFile', methods=['POST'])
def uploadFile():
    #f=request.files['fileupload']
    f=request.files['attachments']
    #print(f)
    # f.save(f.filename)
    return("1")
if __name__=='__main__':
    app.run(port=3000,debug=True)
