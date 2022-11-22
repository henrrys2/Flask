var pr;
var carrito=new Array();
var tot=0;
$('#datosCliente').hide();
$('#btnRegistrar').hide();
function buscar()
{	valor=$('#valor').val();
	$.ajax({
		type:'post',
		url:'/getProductos',
		dataType:'json',
		//data:'campo=descripcion&oper=LIKE&valor='+valor+'&accion=buscarV',
		data:'campo=descripcion&oper=LIKE&valor='+valor+'',
		success:function(html)
		{	alert(html);
			pr=html;
			printProducts();
		}
	});
}
function printProducts()
{
	html="";
	np=pr.length;
	for(i=0;i<np;i++)
		html+="<div class='ventas_pr col-md-2'><img src='../static/imgs/"+pr[i][0]+".jpg' height='130'><br>"+pr[i][1]+"<br>S/. "+pr[i][2]+"<br><button onclick='addCarrito("+i+")' class='btn btn-success' data-toggle='modal' data-target='#myModal'>+</button></div>";
	$('#results').html(html);
}

function addCarrito(row)
{
	p=new Array(pr[row][0],pr[row][1],pr[row][2],1);
	carrito.push(p);
	console.table(carrito);
	printCarrito();
}
function printCarrito()
{
	nc=carrito.length;
	html="<table align='center'><tr><th>No</th><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Sub-Total</th></tr>";
	c=1;
	tot=0;
	for(i=0;i<nc;i++)
	{	
		html+="<tr><td>"+c+"</td><td>"+carrito[i][1]+"</td><td>"+carrito[i][2]+"</td><td>"+carrito[i][3]+"</td><td>"+carrito[i][2]+"</td><td><button class='btn btn-danger' onclick='delCarrito("+i+")'>X</button></td></tr>";
		c++;
		tot+=parseFloat(carrito[i][2]);
	}
	console.log(tot);
	html+="<tr><td align='right' colspan='4'>TOTAL S/.</td><td>"+tot.toFixed(2)+"</td></tr>";
	html+="</table>";
	$('#carrito').html(html)
}
function delCarrito(row)
{	carrito.splice(row,1);
	printCarrito();
}
function comprar()
{	//obtenemos los datos del carrito
	car=carrito.join("*");
	dni=$('#dni').val();
	cla=$('#clave').val();
	$.ajax({
		type:'post',
		url:'/comprar',
		data:'car='+car+"&tot="+tot+"&dni="+dni+"&cla="+cla,
		success:function(html)
		{	alert(html);
			//console.log(html);
			/*if(html==-1)
				alert("El cliente no existe...");
			else
				alert("Su compra se registró exitosamente...");
			*/
		}
	});
}
function datosCliente()
{	$('#carrito').hide()
	$('#datosCliente').show();	
	$('#btnDatos').hide()
	$('#btnRegistrar').show()
}



