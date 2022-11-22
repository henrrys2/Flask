from flask_mysqldb import MySQL

def conectar(app):
    app.config['MYSQL_HOST']='localhost'
    app.config['MYSQL_USER']='root'
    app.config['MYSQL_PASSWORD']=''
    app.config['MYSQL_DB']='mobiles01'
    mysql=MySQL(app)
    return mysql
