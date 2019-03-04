$(function () {
});
function changeSubscriberGroup(data){
	// console.log(data.value);
	// $('#subscriberListFieldTable').DataTable().clear();
	if(data.value != ''){
		var subscriberGroupId = data.value;
		$.ajax({
	        type: "GET",
	        url : "/api/v1/subscriber-group/"+data.value,
	        // data: {
	        //     '_token' : $(this).attr('data-csrf')
	        // },
	        success: function(response){
				$('#subscriberListFieldTable').DataTable().clear();
	        	$.each( response, function( key, value ) {
	        		// console.log(key);
		      //   	if(value.type == 'enum'){
	       //  			$.ajax({
		      //   			type: "GET",
		      //   			url : "/api/v1/field/"+value.id,
					   //      // data: {
					   //      //     '_token' : $(this).attr('data-csrf')
					   //      // },
					   //      success: function(response){
					   //      	var fieldItems = response;
					   //      	addRowEnum(key,value,fieldItems);
								// // console.log(fieldItem);
					   //      }
					   //  });
		      //   	}else{
		      //   		addRow(key,value);
		      //   	}
		        	addRow(key,value);
		        	// console.log(value);
				  	// console.log( key + ": " + value );
				});
	        	// console.log(response);
	        }
	    });
	}else{
		console.log(data.value);
		$('#subscriberListFieldTable').DataTable().clear();
	}
}

function addRow(index,value){
	// console.log(index);
	// console.log(value);
	var rowSetData = "<tr class='odd table-profiling' role='row'>";
	rowSetData += "<input type='hidden' name='item[create]["+index+"][field_id]' value='"+value.id+"'/>";
	rowSetData += "<td class='text-center'><input type='checkbox' name='item[create]["+index+"][is_active]'/></td>";
	rowSetData += "<td class='text-center'>"+value.name+"</td>";
	rowSetData += "<td class='text-center'><input type='checkbox' name='item[create]["+index+"][is_force]'/></td>";
	rowSetData += "<td class='text-center'><input type='checkbox' name='item[create]["+index+"][is_defalut]'/></td>";
	// rowSetData += "<td class='text-center'><select class='form-control' style='width: 95%;' name='item[create]["+index+"][defalut_value]'><option value=''>--ว่าง--</option></select></td>";
	rowSetData += "<td class='text-center'><input type='checkbox' name='item[create]["+index+"][is_read_only]'/></td>";
	rowSetData += "<td class='text-center'>"+value.type+"</td>";
	rowSetData += "</tr>";
	// $('#subscriberListFieldTable').DataTable().row.add([
	//   "<tr class='odd table-profiling' role='row'>",
	//   "<td class='text-center'><input type='checkbox'/></td>", 
	//   "<td class='text-center'>"+value.name+"</td>", 
	//   "<td class='text-center'><input type='checkbox'/></td>",
	//   "<td class='text-center'><select class='form-control' style='width: 95%;'><option>--ว่าง--</option></select></td>",
	//   "<td class='text-center'><input type='checkbox'/></td>",
	//   "<td class='text-center'>INTEGER</td>",
	//   "</tr>",
	// ]).draw();
	// $('#subscriberListFieldTableBody').append(rowSetData);
	// $('#subscriberListFieldTable').DataTable();
	var table = $('#subscriberListFieldTable').DataTable();
	table.row.add($(rowSetData)[0]).draw();
}

function addRowEnum(index,value,fieldItems){
	var rowSetData = "<tr class='odd table-profiling' role='row'>";
	rowSetData += "<input type='hidden' name='item[create]["+index+"][field_id]' value='"+value.id+"'/>";
	rowSetData += "<td class='text-center'><input type='checkbox' name='item[create]["+index+"][is_active]'/></td>";
	rowSetData += "<td class='text-center'>"+value.name+"</td>";
	rowSetData += "<td class='text-center'><input type='checkbox' name='item[create]["+index+"][is_force]'/></td>";
	rowSetData += "<td class='text-center'>";
	rowSetData += "<select class='form-control' style='width: 95%;' name='item[create]["+index+"][defalut_value]'>";
	rowSetData += "<option value=''>--ว่าง--</option>";
	$.each( fieldItems.field_items, function( key, data ) {
		rowSetData += "<option value="+data.value+">"+data.value+"</option>";
	});
	rowSetData += "</select>";
	rowSetData += "</td>";
	rowSetData += "<td class='text-center'><input type='checkbox' name='item[create]["+index+"][is_read_only]'/></td>";
	rowSetData += "<td class='text-center'>"+value.type+"</td>";
	rowSetData += "</tr>";

	var table = $('#subscriberListFieldTable').DataTable();
	table.row.add($(rowSetData)[0]).draw();
}