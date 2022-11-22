from flask import Flask, render_template, request
#from pymysql import pymysql
from flask_mysqldb import MySQL

app=Flask(__name__)

app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']=''
app.config['MYSQL_DB']='mobiles01'

mysql=MySQL(app)


@app.route('/')
def Index():
    return render_template("index.html")

@app.route('/guardar_cliente', methods=['POST'])
def guardar_cliente():
    #if(request.methods=='POST'):
        #id=request.form['id']
    dni=request.form['dni']
    ape=request.form['ape']
    nom=request.form['nom']
    sex=request.form['sex']
    ema=request.form['ema']
    cla=request.form['cla']
    print("Executing...")
    cur=mysql.connection.cursor()
    cur.execute('INSERT INTO clientes VALUES(%s,%s,%s,%s,%s,%s,%s)',('0',dni,ape,nom,sex,ema,cla))
    mysql.connection.commit()
    
    return("Executed...")

if __name__=='__main__':
    app.run(port=3000,debug=True)
