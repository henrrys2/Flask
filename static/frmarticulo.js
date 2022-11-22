var cl;
var cur=-1;

$(document).ready(function() {
    $('#num').css('display','none')
    $('#vol').css('display','none')
})

$('#tipo_articulo').on('change', function () {
    console.log(this.value)
    $('#num').css('display','none')
    $('#vol').css('display','none')
    if(this.value == 2)
    {
        $('#num').css('display','table-row')
        $('#vol').css('display','table-row');
    }
});

function guardar()
{	id=$('#id').html();
	codigo=$('#codigo').val();
	titulo=$('#titulo').val();
	fecha=$('#fecha').val();
	tipo=$('select[name="tipo_articulo"]').val();
	
	foto = $("#foto").prop("files")[0]['name'];
	return console.log(empty($("#foto").prop("files")))
	numero=$('#numero').val();
	volumen=$('#volumen').val();
	datos="id="+id+"&codigo="+codigo+"&titulo="+titulo+"&fecha="+fecha+"&tipo="+tipo+"&numero="+numero+"&volumen="+volumen+"&foto="+foto;
	rec=new Array(id,codigo,titulo,fecha,tipo,numero,volumen,foto);
	if(id>0)
		url="/editar_cliente";
	else
		url="/guardar_cliente";
	$.ajax({
		type:'POST',
		url:url,
		data:datos,
		success:function(html)
		{	//alert(html)
			if(html>0)
			{	
				if(id==0)
				{	$('#id').html(html);
					uploadFile();
				}
				else
				{	console.log("Actualizando la tabla de resultados....");
					cl.splice(cur,1,rec);
					showRegistros();
				}	
				
			}
			else
				alert("El registro no pudo guardarse....!");
		}
	});
}
function uploadFile()
{
    var foto = $("#foto").prop("files")[0];   
    var form_data = new FormData();
    form_data.append("foto", foto);
    //alert(form_data);
    $.ajax({
        type: 'POST',
		url: "/uploadFile",
        dataType: 'script',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        success: function()
		{	alert('Archivo subido con éxito....')
            //alert(html);
        }
    });
}
function buscarxdni()
{
	dni=$('#dni').val();
	$.ajax({
		type:'POST',
		url:'/buscarxdni',
		//dataType:'json',
		data:'dni='+dni,
		success:function(html)
		{	//alert(html),
			cl=html;
			showRecord(0);
		}
	});
}
function eliminar(id,cu,src)
{	
	if(src==1)
		id=$('#id').val();
	
	if(confirm('Desea eliminar el registro...'))
	{	console.log("eliminando..."+id);
		$.ajax({
			type:'POST',
			url:'/eliminar_cliente',
			//dataType:'json',
			data:"id="+id,
			success:function(html)
			{	console.log(html);
				//if(cu>=0)
				//{
					cl.splice(cu,1);
					showRegistros();
				//}
			}
		});
	}	
}
function showRecord(i)
{	cur=i;
	$('#id').html(cl[i][0]);
	$('#dni').val(cl[i][1]);
	$('#titulo').val(cl[i][2]);
	$('#fecha').val(cl[i][3]);
	//$('#fecha').val(cl[i][3]);
	tipo=cl[i][4];
	sx=document.getElementsByName("tipo");
	if(tipo==0)
		sx[0].checked=true;
	else
		sx[1].checked=true;
	$('#numero').val(cl[i][5]);
}
function buscar()
{	campo=$('#campo').val();
	oper=$('#oper').val();
	valor=$('#valor').val();
	$.ajax({
		type:'POST',
		url:'/buscar',
		//dataType:'json',
		data:"campo="+campo+"&oper="+oper+"&valor="+valor,
		success:function(html)
		{	cl=html;
			showRegistros();
		}
	});
}
function showRegistros()
{
	nc=cl.length;
	table="<table align='center' volumenss='table'><tr><th>N°</th><th>Apellidos</th><th>fechabres</th><th>Acción</th></tr>";
	c=1;
	for(i=0;i<nc;i++)
	{
		table+="<tr><td>"+c+"</td><td>"+cl[i][2]+"</td><td>"+cl[i][3]+"</td><td><button volumenss='btn btn-primary' onclick='showRecord("+i+")'>E</button><button volumenss='btn btn-danger' onclick='eliminar("+cl[i][0]+","+i+","+2+")'>X</button></td></tr>";
		c++;
	}
	table+="</table>";
	//console.log(table)
	$('#results').html(table);
}