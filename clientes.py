from flask import Flask, render_template, request, jsonify,json
from flask_cors import CORS, cross_origin

from flask_mysqldb import MySQL

app=Flask(__name__)
cors = CORS(app)

app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']=''
app.config['MYSQL_DB']='mobiles01'

mysql=MySQL(app)

@app.route('/')
def Index():
    #return render_template("index.html")
    return render_template("frmclientes.html")

@app.route('/buscarxdni', methods=['POST'])
def buscarxdni():
    dni=request.form['dni']
    cur=mysql.connection.cursor()
    sql="SELECT * FROM clientes WHERE dni='"+dni+"'"
    cur.execute(sql)
    res=cur.fetchall()
    return(jsonify(res))

@app.route('/buscar', methods=['POST'])
def buscar():
    campo=request.form['campo']
    oper=request.form['oper']
    valor=request.form['valor']
    if oper=='LIKE':
        valor='%'+valor+'%'
    sql="SELECT * FROM clientes WHERE "+campo+" "+oper+" '"+valor+"'"
    cur=mysql.connection.cursor()
    cur.execute(sql)
    res=cur.fetchall()
    return(jsonify(res))

@app.route('/guardar_cliente', methods=['POST'])
def guardar_cliente():
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
    print(cur.lastrowid)
    return(str(cur.lastrowid))
    #return("Executed...")
@app.route('/editar_cliente', methods=['POST'])
def editar():
    id=request.form['id']
    #dni=request.form['dni']
    ape=request.form['ape']
    nom=request.form['nom']
    sex=request.form['sex']
    ema=request.form['ema']
    #cla=request.form['cla']
    print("Executing...")
    cur=mysql.connection.cursor()
    sql="UPDATE clientes SET apellidos='"+ape+"', nombres='"+nom+"', sexo='"+sex+"', email='"+ema+"' WHERE id="+id
    cur.execute(sql)
    mysql.connection.commit()
    #return(sql)
    return(str(cur.lastrowid))

@app.route('/eliminar_cliente', methods=['POST'])
def eliminar():
    id=request.form['id']
    cur=mysql.connection.cursor()
    sql="DELETE FROM clientes WHERE id="+id
    print(sql)
    cur.execute(sql)
    mysql.connection.commit()
    return(sql)
    #return(str(cur.lastrowid))

@app.route('/uploadFile', methods=['POST'])
def uploadFile():
    foto=request.files['foto']
    foto.save(foto.filename)
    return("1")
if __name__=='__main__':
    app.run(port=3000,debug=True)
