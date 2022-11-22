from flask import Flask, render_template, request, jsonify,json
from flask_cors import CORS, cross_origin

from conexion import conectar

app=Flask(__name__)

mysql=conectar(app)

@app.route('/')
def Index():
    #return render_template("index.html")
    return render_template("frmventas.html")

@app.route('/getProductos', methods=['POST'])
def getProductos():
    campo=request.form['campo']
    oper=request.form['oper']
    valor=request.form['valor']
    cur=mysql.connection.cursor()
    sql="SELECT * FROM producto WHERE "+campo+" "+oper+"'%"+valor+"%'"
    cur.execute(sql)
    res=cur.fetchall()
    return(jsonify(res))

@app.route('/comprar', methods=['POST'])
def comprar():
    car=request.form['car']
    tot=request.form['tot']
    dni=request.form['dni']
    cla=request.form['cla']
    id=validarCliente(dni,cla)
    if id>0:
        ca=car.split("*")
        nca=len(ca)
        #Guardamos los datos de la compra
        sql="INSERT INTO compra VALUES(0,"+tot+",CURRENT_DATE(),"+id+")"
        cur=mysql.connection.cursor()
        cur.execute(sql)
        compra_id=cur.lastrowid
        #Guardamos los detalles
        for i in range(nca):
            caa=ca[i].split(",")
            can=caa[3]
            pid=caa[0]
            sql1="INSERT INTO detalleCompra VALUES(0,"+can+","+compra_id+","+pid+")"
            cur=mysql.connection.cursor()
            cur.execute(sql1)
            #Actualizamos stocks...
            #...
        #res=cur.fetchall()
        #return(jsonify(res))
    
def validarCliente(dni,cla):
    sql="SELECT * FROM cliente WHERE dni='"+dni+"' AND clave='"+cla+"'"
    cur=mysql.connection.cursor()
    cur.execute(sql)
    res=cur.fetchall()
    id=0;
    n=len(res)
    if n>0:
        id=res[0][0]
    return id

if __name__=='__main__':
    app.run(port=3000,debug=True)
