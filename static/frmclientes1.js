var cl;
var cur=-1;
function guardar()
{	id=$('#id').html();
	dni=$('#dni').val();
	ape=$('#ape').val();
	nom=$('#nom').val();
	sex=$('input[name="sex"]:checked').val();
	ema=$('#ema').val();
	cla=$('#cla').val();
	foto=$('#foto')[0];
	datos="id="+id+"&dni="+dni+"&ape="+ape+"&nom="+nom+"&sex="+sex+"&ema="+ema+"&cla="+cla;
	rec=new Array(id,dni,ape,nom,sex,ema);
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
			//if(html>0)
			//{	
				if(id==0)
				{	console.log("Guardando datos...")
					$('#id').html(html);
					uploadFile();
				}
				else
				{	console.log("Actualizando la tabla de resultados....");
					cl.splice(cur,1,rec);
					showRegistros();
				}	
				
			//}
			//else
			//	alert("El registro no pudo guardarse....!");
		}
	});
}
function uploadFile()
{	//console.log("Subiendo archivo...")
	//var form_data = new FormData($('#form-file')[0]);
	var form_data = new FormData();
	var foto= $("#foto").prop("files")[0]; 
	form_data.append('foto', foto);
    $.ajax({
		type: 'POST',
		url: '/uploadFile',
		data: form_data,
		contentType: false,
		cache: false,
		processData: false,
		success: function(data) {
			console.log('Success!');
			alert(data)
		},
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
function eliminar(id)
{	if(id==0)
		id=$('#id').val();
	if(confirm('Desea eliminar el registro...'))
	{
		$.ajax({
			type:'POST',
			url:'/eliminar_cliente',
			//dataType:'json',
			data:"id="+id,
			success:function(html)
			{	alert(html);	
			}
		});
	}	
}
function showRecord(i)
{	cur=i;
	$('#id').html(cl[i][0]);
	$('#dni').val(cl[i][1]);
	$('#ape').val(cl[i][2]);
	$('#nom').val(cl[i][3]);
	//$('#nom').val(cl[i][3]);
	sex=cl[i][4];
	sx=document.getElementsByName("sex");
	if(sex==0)
		sx[0].checked=true;
	else
		sx[1].checked=true;
	$('#ema').val(cl[i][5]);
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
	table="<table align='center' class='table'><tr><th>N°</th><th>Apellidos</th><th>Nombres</th><th>Acción</th></tr>";
	c=1;
	for(i=0;i<nc;i++)
	{
		table+="<tr><td>"+c+"</td><td>"+cl[i][2]+"</td><td>"+cl[i][3]+"</td><td><button class='btn btn-primary' onclick='showRecord("+i+")'>E</button><button class='btn btn-danger' onclick='eliminar("+cl[i][0]+")'>X</button></td></tr>";
		c++;
	}
	table+="</table>";
	$('#results').html(table);
}