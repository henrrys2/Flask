from flask import Flask, render_template, request, jsonify,json
from flask_cors import CORS, cross_origin

from flask_mysqldb import MySQL

app=Flask(__name__)
cors = CORS(app)

app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']=''
app.config['MYSQL_DB']='practica_a'

mysql=MySQL(app)

@app.route('/')
def Index():
    #return render_template("index.html")
    return render_template("frmarticulo.html")

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
    
    codigo=request.form['codigo']
    titulo=request.form['titulo']
    fecha=request.form['fecha']
    tipo=request.form['tipo']
    numero=request.form['numero']
    volumen=request.form['volumen']
    foto=request.form['foto']
    print("Executing...")
    cur=mysql.connection.cursor()
    resultRow = cur.execute("SELECT *  FROM publicacion WHERE codigo ="+codigo)
    if resultRow:

        print("Se encontro resultados...")
        return(str(0))
    else:
        
        print("No se encontro resultados...")
        cur.execute('INSERT INTO publicacion VALUES(%s,%s,%s,%s,%s)',('0',codigo,titulo,fecha,tipo))
        mysql.connection.commit()
        print(cur.lastrowid)
        pub_id = cur.lastrowid
        
        if tipo == '2' :
            
            cur.execute('INSERT INTO revista VALUES (%s,%s,%s,%s,%s)',('0',numero,volumen,pub_id,foto))
            mysql.connection.commit()
        else:
            
            cur.execute('INSERT INTO libro VALUES (%s,%s,%s)',('0',foto,pub_id))
            mysql.connection.commit()

        return(str(cur.lastrowid))
        
    

    
    #return("Executed...")
@app.route('/editar_cliente', methods=['POST'])
def editar():
    id=request.form['id']
    #codigo=request.form['codigo']
    titulo=request.form['titulo']
    fecha=request.form['fecha']
    tipo=request.form['tipo']
    numero=request.form['numero']
    volumen=request.form['volumen']
    #cla=request.form['cla']
    print("Executing...")
    cur=mysql.connection.cursor()
    sql="UPDATE publicacion SET titulo='"+titulo+"', fecha='"+fecha+"', tipo='"+tipo+"' WHERE id="+id
    cur.execute(sql)
    mysql.connection.commit()
    #return(sql)
    return(str(cur.lastrowid))

@app.route('/eliminar_cliente', methods=['POST'])
def eliminar():
    id=request.form['id']
    cur=mysql.connection.cursor()
    sql="DELETE FROM publicacion WHERE id="+id
    print(sql)
    cur.execute(sql)
    mysql.connection.commit()
    return(sql)
    #return(str(cur.lastrowid))

@app.route('/uploadFile', methods=['POST'])
def uploadFile():
    foto=request.files['foto']
    url = 'files/publicacion/'
    foto.save(url + foto.filename)
    return("1")
if __name__=='__main__':
    app.run(port=3000,debug=True)
