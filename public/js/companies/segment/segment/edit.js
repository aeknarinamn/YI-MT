$(function () {
	$("#entry_form").submit(function() {
		// var segmentAll =  $("#segment").html();
		// localStorage.setItem('segment', segmentAll);
		// $("#hiddenSegment").remove();
		// $("#groupError").append($("#group").html());

		//shorten code
		// var orginal = $('#group');
		// orginal.find('input:text').each(function() {
		//     $(this).attr('value', $(this).val());
		// });
		// orginal.find("option:selected").each(function(){
		// 	slectedValue = $(this).val();
		// 	// console.log('--------'+slectedValue+'--------');
		// 	$(this).find("option").each(function(){
		// 	  if ($(this).val() == slectedValue){
		// 	    $(this).attr("selected","selected");
		// 	  }
		// 	});
		// });

		var orginal = $('#group');
		orginal.find('input:text').each(function() {
		    $(this).attr('value', $(this).val());
		});
		orginal.find('div[id^="groupSegment_"]').each(function(){
			$(this).find('div select').each(function(){
				slectedValue = $(this).val();
				$(this).find("option").each(function(){
				  if ($(this).val() == slectedValue){
				    $(this).attr("selected","selected");
				  }
				});
			});
			$(this).find('div[id^="subSegment_"]').each(function(){
				$(this).find('select').each(function(){
					slectedValue = $(this).val();
					$(this).find("option").each(function(){
					  if ($(this).val() == slectedValue){
					    $(this).attr("selected","selected");
					  }
					});
				});
			});
		});

		// $('#group input:text').each(function() {
		//     $(this).attr('value', $(this).val());
		// });
		// $("#group select").each(function(){
		// 	slectedValue = $(this).val();
		// 	$("option").each(function(){
		// 	  if ($(this).val() == slectedValue){
		// 	    $(this).attr("selected","selected");
		// 	  }
		// 	});
		// 	// console.log($(this).val());
		// 	// value = $(this).val();
		// 	// $(this).val(value);
		// 	// $('option[value='+$(this).val()+']').attr('selected','selected');
		// });
		// var segmentAll = $("#group").html();
		var segmentAll = orginal.html();
		localStorage.setItem('segment', segmentAll);
		$("#hiddenGroupSegment").remove();
		// $("#groupError").remove();
		var hiddenElements = $("div:hidden");
		hiddenElements.remove();
	});

	$('[data-daterangepicker]').daterangepicker({
        autoApply: true,
        autoUpdateInput: true,
        locale: {
            format: 'DD/MM/YYYY'
        },
        "singleDatePicker" : true,
    });

    $('[data-daterangepicker-range]').daterangepicker({
        autoApply: true,
        autoUpdateInput: true,
        locale: {
            format: 'DD/MM/YYYY'
        },
    });
    // if($("input[name=sent_date]").val() == "Invalid date") $("input[name=sent_date]").val('');
});

// function test()
// {
// 	var orginalDiv = $('#group');
// 	orginalDiv.find('input:text').each(function() {
// 	    $(this).attr('value', $(this).val());
// 	});
// 	orginalDiv.find('div[id^="groupSegment_"]').each(function(){
// 		$(this).find('div select').each(function(){
// 			slectedValue = $(this).val();
// 			$("option").each(function(){
// 			  if ($(this).val() == slectedValue){
// 			    $(this).attr("selected","selected");
// 			  }
// 			});
// 		});
// 		$(this).find('div[id^="subSegment_"]').each(function(){
// 			$(this).find('select').each(function(){
// 				// console.log('--------'+$(this).attr('name')+'--------');
// 				// console.log('--------'+$(this).val()+'--------');
// 				slectedValue = $(this).val();
// 				$(this).find("option").each(function(){
// 				  if ($(this).val() == slectedValue){
// 				    $(this).attr("selected","selected");
// 				  }
// 				});
// 			});
// 			// $(this).find('div').each(function(){
// 				// if($(this).attr('id') != undefined){

// 				// 	$(this).find('div select').each(function(){
// 				// 		console.log('--------'+$(this).attr('name')+'--------');
// 				// 	});
// 				// 	// $(this).find('div[id='+$(this).attr('id')+']').each(function(){
// 				// 	// 	console.log('--------'+$(this).attr('name')+'--------');
// 				// 	// });
// 				// 	// console.log('--------'+$(this).attr('id')+'--------');
// 				// }
// 			// });
// 		});
// 		// console.log('--------'+$(this).attr('id')+'--------');
// 		// $(this).find('select').each(function(){
// 		// 	console.log('--------'+$(this).attr('name')+'--------');
// 		// });
// 		// console.log('--------'+$(this).attr('name')+'--------');
// 		// console.log($('select[name="'+$(this).attr('name')+'"] option:selected').val());
// 		// slectedValue = $(this).val();
// 		// $("option").each(function(){
// 		//   if ($(this).val() == slectedValue){
// 		//     $(this).attr("selected","selected");
// 		//   }
// 		// });
// 	});
// 	// console.log($clonedDiv.html());

// 	// console.log(orginalDiv);

// 	$('#test').append(orginalDiv.html());
// 	startFunctional();

// 	// console.log();
// }

$(window).load(function() {

	var retrievedObject = localStorage.getItem('segment');
	// console.log(retrievedObject);
	var checkError = $('#error').val();
	if(retrievedObject != null && checkError == 'true')
	{
		$("#group").empty();
		$("#group").append(retrievedObject);
		// $('.bootstrap-select').remove();
		// $('.selectpicker').selectpicker('refresh');
		// selectFieldEnum.selectpicker('refresh');
		startFunctional();
	}
	localStorage.clear();
});

function startFunctional(){
	$('.selectpicker').data('selectpicker', null);
	$('.bootstrap-select').remove();
	$('.selectpicker').selectpicker();
	$('[data-daterangepicker]').daterangepicker({
        autoApply: true,
        autoUpdateInput: true,
        locale: {
            format: 'DD/MM/YYYY'
        },
        "singleDatePicker" : true,
    });
    $('[data-daterangepicker-range]').daterangepicker({
        autoApply: true,
        autoUpdateInput: true,
        locale: {
            format: 'DD/MM/YYYY'
        },
    });
}

function addSegment(segmentGroupID)
{
	// console.log(segmentGroupID);
	// console.log(segmentGroupID);
	// console.log("groupSegment_"+segmentGroupID+""+" segment");
	var segment = $("#hiddenGroupSegment #groupSegmentTemp #hiddenSegment").html();
	// console.log($("#group #groupSegment_"+segmentGroupID+""+" #segment .segment-item").length);
	$("#group #groupSegment_"+segmentGroupID+""+"  #segment").append(segment);
	var index = $("#group #groupSegment_"+segmentGroupID+""+" #segment .segment-item").length;
	
	//main-segment
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][condition]']").attr("onchange", "checkFunctionMainSegment(this,$(':selected', this).closest('optgroup').attr('label'),"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][condition]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][condition]");

	//include empty value
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #include_empty").hide();
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #include_empty input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][include_empty_value]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][include_empty_value]");

	//operation_ecommerce_purchase
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operation_ecommerce_purchase select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operation]");

	//subscriber-data-field
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_field select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("onchange", "checkFunctionField(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_field select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_2_field input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_2]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand_2]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_field_enum select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand]");
	
	//operation-subscriber-data
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operation_subscriber_data select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("onchange", "checkFunctionSubscriberData(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operation_subscriber_data select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operation]");

	//subsciber-number
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_subscriber_number select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("onchange", "checkFunctionSubscriberNumber(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_subscriber_number select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_2_subscriber_number input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_2]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand_2]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_3_subscriber_number input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_3]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand_3]");

	//subsciber-data-date-added
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_date_added select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("onchange", "checkFunctionDateAdded(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_date_added select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_2_date_added input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_2]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand_2]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_2_relative_date select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_2]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand_2]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_2_absolute_date input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_2]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand_2]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_3_date_added input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_3]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand_3]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_3_absolute_date select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_3]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand_3]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_4_absolute_date select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_4]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand_4]");

	//subsciber-email-address
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operation_email_address select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operation]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_email_address input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand]");

	//subsciber-phone-number
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operation_phone_number select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operation]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_phone_number input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand]");

	//subsciber-gender
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operation_gender select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operation]");

	//subsciber-language
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operation_language select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("onchange", "checkFunctionSubscriberGender(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operation_language select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operation]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operand_language select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operand]");

	//campaign-activity
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operation_campaign_activity select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operation]");
	//sub-campaign-activity-segment-timeframe
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-campaign-activity #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("onchange", "checkFunctionCampaignActivityTimeFrame(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-campaign-activity #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operation]");
	//sub-campaign-activity-segment-sub-timeframe
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-campaign-activity #timeframe #segment-sub-timeframe-beforeTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-campaign-activity #timeframe #segment-sub-timeframe-relative-date select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-campaign-activity #timeframe #segment-sub-timeframe-afterTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-campaign-activity #timeframe #segment-sub-timeframe-absolute-date-operand input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-campaign-activity #timeframe #segment-sub-timeframe-absolute-date-operand_2 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-campaign-activity #timeframe #segment-sub-timeframe-absolute-date-operand_3 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_3]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand_3]");
	//sub-campaign-activity-segment-campaign
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-campaign-activity #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("onchange", "checkFunctionCampaignActivityCampaign(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-campaign-activity #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][campaign][operation]");
	//sub-campaign-activity-segment-sub-campaign
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-campaign-activity #campaign #segment-sub-campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][campaign][operand]");

	//sent-activity
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operation_sent_activity select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("onchange", "checkFunctionSentActivity(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operation_sent_activity select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operation]");
	//sub-sent-activity-segment-timeframe
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-sent-activity #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("onchange", "checkFunctionSentActivityTimeFrame(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-sent-activity #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operation]");
	//sub-sent-activity-segment-sub-timeframe
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-sent-activity #timeframe #segment-sub-timeframe-beforeTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-sent-activity #timeframe #segment-sub-timeframe-relative-date select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-sent-activity #timeframe #segment-sub-timeframe-afterTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-sent-activity #timeframe #segment-sub-timeframe-absolute-date-operand input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-sent-activity #timeframe #segment-sub-timeframe-absolute-date-operand_2 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-sent-activity #timeframe #segment-sub-timeframe-absolute-date-operand_3 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_3]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand_3]");
	//sub-sent-activity-segment-campaign
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-sent-activity #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("onchange", "checkFunctionSentActivityCampaign(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-sent-activity #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][campaign][operation]");
	//sub-sent-activity-segment-sub-campaign
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-sent-activity #campaign #segment-sub-campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][campaign][operand]");

	//click-activity
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operation_click_activity select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("onchange", "checkFunctionClickActivity(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #operation_click_activity select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][operation]");
	//sub-click-activity-segment-timeframe
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-click-activity #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("onchange", "checkFunctionClickActivityTimeFrame(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-click-activity #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operation]");
	//sub-click-activity-segment-sub-timeframe
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-click-activity #timeframe #segment-sub-timeframe-beforeTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-click-activity #timeframe #segment-sub-timeframe-relative-date select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-click-activity #timeframe #segment-sub-timeframe-afterTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-click-activity #timeframe #segment-sub-timeframe-absolute-date-operand input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-click-activity #timeframe #segment-sub-timeframe-absolute-date-operand_2 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-click-activity #timeframe #segment-sub-timeframe-absolute-date-operand_3 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_3]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand_3]");
	//sub-click-activity-segment-campaign
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-click-activity #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("onchange", "checkFunctionClickActivityCampaign(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-click-activity #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][campaign][operation]");
	//sub-click-activity-segment-sub-campaign
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-click-activity #campaign #segment-sub-campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][campaign][operand]");

	//sub-ecommerce-purchase-segment-timeframe
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-ecommerce-purchase #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("onchange", "checkFunctionTimeFrame(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-ecommerce-purchase #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operation]");
	//sub-ecommerce-purchase-segment-sub-timeframe
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-ecommerce-purchase #timeframe #segment-sub-timeframe-beforeTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-ecommerce-purchase #timeframe #segment-sub-timeframe-relative-date select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-ecommerce-purchase #timeframe #segment-sub-timeframe-afterTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-ecommerce-purchase #timeframe #segment-sub-timeframe-absolute-date-operand input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-ecommerce-purchase #timeframe #segment-sub-timeframe-absolute-date-operand_2 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-ecommerce-purchase #timeframe #segment-sub-timeframe-absolute-date-operand_3 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_3]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][timeframe][operand_3]");
	//sub-ecommerce-purchase-segment-campaign
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-ecommerce-purchase #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("onchange", "checkFunctionCampaign(this,"+index+","+segmentGroupID+")");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-ecommerce-purchase #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][campaign][operation]");
	//sub-ecommerce-purchase-segment-sub-campaign
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-ecommerce-purchase #campaign #segment-sub-campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operand]']").attr("name","segmentGroups["+segmentGroupID+"][subGroupSegment]["+index+"][segmentItem][campaign][operand]");

	// $("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp #sub-ecommerce-purchase #campaign #campaign-condition").attr("onchange","checkFunctionCampaign(this,"+index+","+segmentGroupID+")");
    // $("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp select[name='segmentItems["+0+"][field_id]']").attr("onchange", "checkFunctionMainSegment(this,$(':selected', this).closest('optgroup').attr('label'),"+index+","+segmentGroupID+")");
    // $("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp select[name='segmentItems["+segmentGroupID+"][field_id]']").attr("name", "segmentItems["+index+"][field_id]']");
    // $("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp select[name='segmentItems["+segmentGroupID+"][operation]']").attr("name", "segmentItems["+index+"][operation]']");
    // $("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp input[name='segmentItems["+segmentGroupID+"][operand]']").attr("name", "segmentItems["+index+"][operand]']");
	$("#group #groupSegment_"+segmentGroupID+""+" #segment #segmentTemp").attr('id','subSegment_'+index);
	
	startFunctional();
	// $('.selectpicker').data('selectpicker', null);
	// $('.bootstrap-select').remove();
	// $('.selectpicker').selectpicker();

	// $('[data-daterangepicker]').daterangepicker({
 //        autoApply: true,
 //        autoUpdateInput: true,
 //        locale: {
 //            format: 'DD/MM/YYYY'
 //        },
 //        "singleDatePicker" : true,
 //    });
	// $('.selectpicker').selectpicker('destroy');
	// $('.selectpicker').selectpicker();
	// $("#segment select[name='segmentItems["+index+"][field_id]']").selectpicker('refresh');
	// $("#segment select[name='segmentItems["+index+"][operation]']").selectpicker('refresh');
}

function addGroupSegment(){
	var groupSegment = $("#hiddenGroupSegment").html();
	$("#group").append(groupSegment);
	var countSegmentGroup = $("#group div[id^='groupSegment']").length;

	//search-condition
	$("#group #groupSegmentTemp select[name='segmentGroups["+0+"][search_condition]']").attr("name","segmentGroups["+countSegmentGroup+"][search_condition]");
	
	//main-segment
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][condition]']").attr("onchange", "checkFunctionMainSegment(this,$(':selected', this).closest('optgroup').attr('label'),"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][condition]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][condition]");

	//include empty value
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #include_empty").hide();
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #include_empty input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][include_empty_value]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][include_empty_value]");

	//operation_ecommerce_purchase
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operation_ecommerce_purchase select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operation]");

	//subscriber-field
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_field select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("onchange", "checkFunctionField(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_field select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_2_field input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_2]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand_2]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_field_enum select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand]");
	
	//operation-subscriber-data
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operation_subscriber_data select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("onchange", "checkFunctionSubscriberData(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operation_subscriber_data select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operation]");

	//subsciber-number
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_subscriber_number select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("onchange", "checkFunctionSubscriberNumber(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_subscriber_number select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_2_subscriber_number input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_2]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand_2]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_3_subscriber_number input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_3]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand_3]");

	//subsciber-data-date-added
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_date_added select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("onchange", "checkFunctionDateAdded(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_date_added select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_2_date_added input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_2]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand_2]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_2_relative_date select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_2]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand_2]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_2_absolute_date input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_2]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand_2]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_3_date_added input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_3]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand_3]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_3_absolute_date select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_3]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand_3]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_4_absolute_date select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand_4]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand_4]");

	//subsciber-email-address
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operation_email_address select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operation]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_email_address input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand]");

	//subsciber-phone-number
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operation_phone_number select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operation]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_phone_number input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand]");

	//subsciber-gender
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operation_gender select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operation]");

	//subsciber-language
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operation_language select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("onchange", "checkFunctionSubscriberGender(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operation_language select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operation]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operand_language select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operand]");

	//campaign-activity
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operation_campaign_activity select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operation]");
	//sub-campaign-activity-segment-timeframe
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-campaign-activity #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("onchange", "checkFunctionCampaignActivityTimeFrame(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-campaign-activity #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operation]");
	//sub-campaign-activity-segment-sub-timeframe
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-campaign-activity #timeframe #segment-sub-timeframe-beforeTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-campaign-activity #timeframe #segment-sub-timeframe-relative-date select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-campaign-activity #timeframe #segment-sub-timeframe-afterTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-campaign-activity #timeframe #segment-sub-timeframe-absolute-date-operand input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-campaign-activity #timeframe #segment-sub-timeframe-absolute-date-operand_2 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-campaign-activity #timeframe #segment-sub-timeframe-absolute-date-operand_3 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_3]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand_3]");
	//sub-campaign-activity-segment-campaign
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-campaign-activity #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("onchange", "checkFunctionCampaignActivityCampaign(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-campaign-activity #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][campaign][operation]");
	//sub-campaign-activity-segment-sub-campaign
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-campaign-activity #campaign #segment-sub-campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][campaign][operand]");

	//sent-activity
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operation_sent_activity select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("onchange", "checkFunctionSentActivity(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operation_sent_activity select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operation]");
	//sub-sent-activity-segment-timeframe
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-sent-activity #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("onchange", "checkFunctionSentActivityTimeFrame(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-sent-activity #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operation]");
	//sub-sent-activity-segment-sub-timeframe
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-sent-activity #timeframe #segment-sub-timeframe-beforeTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-sent-activity #timeframe #segment-sub-timeframe-relative-date select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-sent-activity #timeframe #segment-sub-timeframe-afterTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-sent-activity #timeframe #segment-sub-timeframe-absolute-date-operand input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-sent-activity #timeframe #segment-sub-timeframe-absolute-date-operand_2 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-sent-activity #timeframe #segment-sub-timeframe-absolute-date-operand_3 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_3]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand_3]");
	//sub-sent-activity-segment-campaign
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-sent-activity #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("onchange", "checkFunctionSentActivityCampaign(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-sent-activity #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][campaign][operation]");
	//sub-sent-activity-segment-sub-campaign
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-sent-activity #campaign #segment-sub-campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][campaign][operand]");

	//click-activity
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operation_click_activity select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("onchange", "checkFunctionClickActivity(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #operation_click_activity select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][operation]");
	//sub-click-activity-segment-timeframe
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-click-activity #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("onchange", "checkFunctionClickActivityTimeFrame(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-click-activity #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operation]");
	//sub-click-activity-segment-sub-timeframe
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-click-activity #timeframe #segment-sub-timeframe-beforeTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-click-activity #timeframe #segment-sub-timeframe-relative-date select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-click-activity #timeframe #segment-sub-timeframe-afterTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-click-activity #timeframe #segment-sub-timeframe-absolute-date-operand input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-click-activity #timeframe #segment-sub-timeframe-absolute-date-operand_2 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-click-activity #timeframe #segment-sub-timeframe-absolute-date-operand_3 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_3]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand_3]");
	//sub-click-activity-segment-campaign
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-click-activity #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("onchange", "checkFunctionClickActivityCampaign(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-click-activity #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][campaign][operation]");
	//sub-click-activity-segment-sub-campaign
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-click-activity #campaign #segment-sub-campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][campaign][operand]");

	//sub-ecommerce-purchase-segment-timeframe
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-ecommerce-purchase #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("onchange", "checkFunctionTimeFrame(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-ecommerce-purchase #timeframe select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operation]");
	//sub-ecommerce-purchase-segment-sub-timeframe
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-ecommerce-purchase #timeframe #segment-sub-timeframe-beforeTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-ecommerce-purchase #timeframe #segment-sub-timeframe-relative-date select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-ecommerce-purchase #timeframe #segment-sub-timeframe-afterTime input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-ecommerce-purchase #timeframe #segment-sub-timeframe-absolute-date-operand input[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-ecommerce-purchase #timeframe #segment-sub-timeframe-absolute-date-operand_2 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_2]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand_2]");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-ecommerce-purchase #timeframe #segment-sub-timeframe-absolute-date-operand_3 select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][timeframe][operand_3]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][timeframe][operand_3]");
	//sub-ecommerce-purchase-segment-campaign
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-ecommerce-purchase #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("onchange", "checkFunctionCampaign(this,"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-ecommerce-purchase #campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operation]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][campaign][operation]");
	//sub-ecommerce-purchase-segment-sub-campaign
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-ecommerce-purchase #campaign #segment-sub-campaign select[name='segmentGroups["+0+"][subGroupSegment]["+0+"][segmentItem][campaign][operand]']").attr("name","segmentGroups["+countSegmentGroup+"][subGroupSegment]["+1+"][segmentItem][campaign][operand]");

	// $("#group #groupSegmentTemp #hiddenSegment #segmentTemp #sub-ecommerce-purchase #campaign #campaign-condition").attr("onchange","checkFunctionCampaign(this,"+1+","+countSegmentGroup+")");
	// $("#group #groupSegmentTemp #hiddenSegment #segmentTemp select[name='segmentItems["+0+"][field_id]']").attr("onchange", "checkFunctionMainSegment(this,$(':selected', this).closest('optgroup').attr('label'),"+1+","+countSegmentGroup+")");
	$("#group #groupSegmentTemp #hiddenSegment #segmentTemp").attr("id","subSegment_1");
	$("#group #groupSegmentTemp #hiddenSegment").attr("id","segment");
	$("#group #groupSegmentTemp").attr("id","groupSegment_"+countSegmentGroup);
	$("#group #groupSegment_"+countSegmentGroup+""+" #addSegmentItem").attr("onclick","addSegment("+countSegmentGroup+")");
	
	startFunctional();
	// $('.selectpicker').data('selectpicker', null);
	// $('.bootstrap-select').remove();
	// $('.selectpicker').selectpicker();

	// $('[data-daterangepicker]').daterangepicker({
 //        autoApply: true,
 //        autoUpdateInput: true,
 //        locale: {
 //            format: 'DD/MM/YYYY'
 //        },
 //        "singleDatePicker" : true,
 //    });
}

function checkFunctionMainSegment(data,optGroupLabel,index,groupIndex){
	// console.log(optGroupLabel);
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" .sub-segment-item").hide();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #include_empty").hide();
	if(data.value == 'ecommerce_purchase')
	{
		showSegmentEcommercePurchase(index,groupIndex);
	}
	if(optGroupLabel == 'Field')
	{
		showSegmentField(index,groupIndex);
	}
	if(data.value == 'subscriber_data')
	{
		$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #include_empty").show();
		showSegmentSubscriberData(index,groupIndex);
	}
	if(data.value == 'date_added')
	{
		showSegmentSubscriberDateAdded(index,groupIndex);
	}
	if(data.value == 'email_address')
	{
		showSegmentSubscriberEmailAddress(index,groupIndex);
	}
	if(data.value == 'phone_number')
	{
		showSegmentSubscriberPhoneNumber(index,groupIndex);
	}
	if(data.value == 'gender')
	{
		showSegmentSubscriberGender(index,groupIndex);
	}
	if(data.value == 'language')
	{
		showSegmentSubscriberLanguage(index,groupIndex);
	}
	if(data.value == 'sent_activity')
	{
		showSegmentSentActivity(index,groupIndex);
	}
	// if(data.value == 'open_activity')
	// {
	// 	showSegmentCampaignActivity(index,groupIndex);
	// }
	if(data.value == 'click_activity')
	{
		showSegmentClickActivity(index,groupIndex);
	}
	// console.log(data.value+" "+optGroupLabel);
}

function checkFunctionCampaign(data,index,groupIndex){
	if(data.value != 'any-campaign')
	{
		showSegmentCampaign(index,groupIndex);
	}
	else
	{
		$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-ecommerce-purchase #segment-sub-campaign").hide();
	}
}

function checkFunctionSubscriberData(data,index,groupIndex){
	var divOperandDateAdded = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_date_added");
	var divOperand2DateAdded = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_2_date_added");
	var divOperand2DateRelative = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_2_relative_date");
	var divOperand2DateAbsolute = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_2_absolute_date");
	var divOperandDateAddedAnd = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_date_added_and");
	var divOperand3DateAddedAnd = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_3_date_added");
	var divOperand3DateAbsolute = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_3_absolute_date");
	var divOperand4DateAbsolute = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_4_absolute_date");
	var divOperandField = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_field");
	var divOperand2Field = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_2_field");
	var divOperandFieldEnum = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_field_enum");
	var selectFieldEnum = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_field_enum select");
	var divOperandSubscriberNumber = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_subscriber_number");
	var divOperand2SubscriberNumber = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_2_subscriber_number");
	var divOperandAndSubscriberNumber = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_and_subscriber_number");
	var divOperand3SubscriberNumber = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_3_subscriber_number");
	if(data.value == ''){
		divOperandField.hide();
		divOperand2Field.hide();
		divOperandDateAdded.hide();
		divOperand2DateAdded.hide();
		divOperandDateAddedAnd.hide();
		divOperand3DateAddedAnd.hide();
		divOperandFieldEnum.hide();
		divOperand2DateRelative.hide();
		divOperand2DateAbsolute.hide();
		divOperand3DateAbsolute.hide();
		divOperand4DateAbsolute.hide();
		divOperandSubscriberNumber.hide();
		divOperand2SubscriberNumber.hide();
		divOperandAndSubscriberNumber.hide();
		divOperand3SubscriberNumber.hide();
	}
	else if(data.value == 'date_added'){
		divOperandDateAdded.show();
		divOperand2DateAdded.show();
		divOperandField.hide();
		divOperand2Field.hide();
		divOperandSubscriberNumber.hide();
		divOperand2SubscriberNumber.hide();
		divOperandAndSubscriberNumber.hide();
		divOperand3SubscriberNumber.hide();
	}else{
		var fieldID = data.value;
		$.ajax({
            type: "GET",
            url : "/api/v1/field/"+fieldID,
            success: function(response){
            	// console.log(response.field_type);
            	divOperandDateAdded.hide();
				divOperand2DateAdded.hide();
				divOperand2DateRelative.hide();
				divOperand2DateAbsolute.hide();
				divOperand3DateAbsolute.hide();
				divOperandDateAddedAnd.hide();
				divOperand3DateAddedAnd.hide();
				divOperand4DateAbsolute.hide();
				divOperandSubscriberNumber.hide();
				divOperand2SubscriberNumber.hide();
				divOperandAndSubscriberNumber.hide();
				divOperand3SubscriberNumber.hide();
            	if(response.field_type == 'enum'){
            		divOperandField.hide();
					divOperand2Field.hide();
					selectFieldEnum.find('option').remove();
					selectFieldEnum.append(new Option('All','all', false, false));
					$.each(response.field_items, function( index, value ) {
	     				selectFieldEnum.append(new Option(value.value,value.value, false, false));
					});
					divOperandFieldEnum.show();
					selectFieldEnum.selectpicker('refresh');
            		// console.log(response);
            	}else if(response.field_type == 'integer' || response.field_type == 'decimal'){
            		// console.log(response.field_type);
            		divOperandFieldEnum.hide();
            		divOperandField.hide();
					divOperand2Field.hide();
            		divOperandSubscriberNumber.show();
            		divOperand2SubscriberNumber.show();
            	}else{
            		divOperandField.show();
            		divOperandField.find('select').val("is").change();
					divOperand2Field.show();
					divOperand2Field.find('input[type="text"]').val("");
					// divOperandDateAdded.hide();
					// divOperand2DateAdded.hide();
					// divOperand2DateRelative.hide();
					// divOperand2DateAbsolute.hide();
					// divOperand3DateAbsolute.hide();
					// divOperandDateAddedAnd.hide();
					// divOperand3DateAddedAnd.hide();
					// divOperand4DateAbsolute.hide();
					divOperandFieldEnum.hide();
            	}
            }
        });

	}
}

function checkFunctionField(data,index,groupIndex)
{
	var divOperandField = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_2_field");
	divOperandField.find('input[type="text"]').val("");
	if(data.value == 'is empty' || data.value == 'is not empty'){
		divOperandField.hide();
	}else{
		divOperandField.show();
	}
}

function checkFunctionTimeFrame(data,index,groupIndex){
	var divRelativeDate = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-ecommerce-purchase #segment-sub-timeframe-relative-date");
	var divAbsoluteDateOperand = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-ecommerce-purchase #segment-sub-timeframe-absolute-date-operand");
	var divAbsoluteDateOperand2 = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-ecommerce-purchase #segment-sub-timeframe-absolute-date-operand_2");
	var divAbsoluteDateOperand3 = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-ecommerce-purchase #segment-sub-timeframe-absolute-date-operand_3");
	var divBeforeTime = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-ecommerce-purchase #segment-sub-timeframe-beforeTime");
	var divAndTime = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-ecommerce-purchase #segment-sub-timeframe-andTime");
	var divAfterTime = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-ecommerce-purchase #segment-sub-timeframe-afterTime");
	if(data.value == 'anytime')
	{
		divBeforeTime.hide();
		divAndTime.hide();
		divAfterTime.hide();
		divRelativeDate.hide();
		divAbsoluteDateOperand.hide();
		divAbsoluteDateOperand2.hide();
		divAbsoluteDateOperand3.hide();
	}
	else if(data.value == 'between')
	{
		divBeforeTime.hide();
		divAndTime.hide();
		divAfterTime.show();
		divRelativeDate.hide();
		divAbsoluteDateOperand.hide();
		divAbsoluteDateOperand2.hide();
		divAbsoluteDateOperand3.hide();
	}
	else
	{
		if(data.value == 'relative date'){
			divRelativeDate.show();
			divBeforeTime.hide();
			divAndTime.hide();
			divAfterTime.hide();
			divAbsoluteDateOperand.hide();
			divAbsoluteDateOperand2.hide();
			divAbsoluteDateOperand3.hide();
		}else if(data.value == 'absolute date'){
			divAbsoluteDateOperand.show();
			divAbsoluteDateOperand2.show();
			divAbsoluteDateOperand3.show();
			divRelativeDate.hide();
			divBeforeTime.hide();
			divAndTime.hide();
			divAfterTime.hide();
		}else{
			divBeforeTime.show();
			divAndTime.hide();
			divAfterTime.hide();
			divRelativeDate.hide();
			divAbsoluteDateOperand.hide();
			divAbsoluteDateOperand2.hide();
			divAbsoluteDateOperand3.hide();
		}
	}
}

function checkFunctionCampaignActivityCampaign(data,index,groupIndex){
	if(data.value != 'any-campaign')
	{
		showSegmentCampaignActivityCampaign(index,groupIndex);
	}
	else
	{
		$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-campaign-activity #segment-sub-campaign").hide();
	}
}

function checkFunctionCampaignActivityTimeFrame(data,index,groupIndex){
	var divRelativeDate = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-campaign-activity #segment-sub-timeframe-relative-date");
	var divAbsoluteDateOperand = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-campaign-activity #segment-sub-timeframe-absolute-date-operand");
	var divAbsoluteDateOperand2 = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-campaign-activity #segment-sub-timeframe-absolute-date-operand_2");
	var divAbsoluteDateOperand3 = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-campaign-activity #segment-sub-timeframe-absolute-date-operand_3");
	var divBeforeTime = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-campaign-activity #segment-sub-timeframe-beforeTime");
	var divAndTime = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-campaign-activity #segment-sub-timeframe-andTime");
	var divAfterTime = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-campaign-activity #segment-sub-timeframe-afterTime");
	if(data.value == 'anytime')
	{
		divBeforeTime.hide();
		divAndTime.hide();
		divAfterTime.hide();
		divRelativeDate.hide();
		divAbsoluteDateOperand.hide();
		divAbsoluteDateOperand2.hide();
		divAbsoluteDateOperand3.hide();
	}
	else if(data.value == 'between')
	{
		divBeforeTime.hide();
		divAndTime.hide();
		divAfterTime.show();
		divRelativeDate.hide();
		divAbsoluteDateOperand.hide();
		divAbsoluteDateOperand2.hide();
		divAbsoluteDateOperand3.hide();
	}
	else
	{
		if(data.value == 'relative date'){
			divRelativeDate.show();
			divBeforeTime.hide();
			divAndTime.hide();
			divAfterTime.hide();
			divAbsoluteDateOperand.hide();
			divAbsoluteDateOperand2.hide();
			divAbsoluteDateOperand3.hide();
		}else if(data.value == 'absolute date'){
			divAbsoluteDateOperand.show();
			divAbsoluteDateOperand2.show();
			divAbsoluteDateOperand3.show();
			divRelativeDate.hide();
			divBeforeTime.hide();
			divAndTime.hide();
			divAfterTime.hide();
		}else{
			divBeforeTime.show();
			divAndTime.hide();
			divAfterTime.hide();
			divRelativeDate.hide();
			divAbsoluteDateOperand.hide();
			divAbsoluteDateOperand2.hide();
			divAbsoluteDateOperand3.hide();
		}
	}
}

function checkFunctionDateAdded(data,index,groupIndex){
	// console.log("kk");
	var divOperand2DateAdded = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_2_date_added");
	var divOperand2RelativeDate = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_2_relative_date");
	var divOperand2AbsoluteDate = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_2_absolute_date");
	var divOperandDateAddedAnd = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_date_added_and");
	var divOperand3DateAddedAnd = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_3_date_added");
	var divOperand3AbsoluteDate = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_3_absolute_date");
	var divOperand4AbsoluteDate = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_4_absolute_date");
	if(data.value != 'is between'){
		if(data.value == 'relative date'){
			divOperand2RelativeDate.show();
			divOperand2AbsoluteDate.hide();
			divOperand2DateAdded.hide();
			divOperandDateAddedAnd.hide();
			divOperand3DateAddedAnd.hide();
			divOperand3AbsoluteDate.hide();
			divOperand4AbsoluteDate.hide();
		}else if(data.value == 'absolute date'){
			divOperand2AbsoluteDate.show();
			divOperand3AbsoluteDate.show();
			divOperand4AbsoluteDate.show();
			divOperand2RelativeDate.hide();
			divOperand2DateAdded.hide();
			divOperandDateAddedAnd.hide();
			divOperand3DateAddedAnd.hide();
		}else{
			divOperand2DateAdded.show();
			divOperandDateAddedAnd.hide();
			divOperand3DateAddedAnd.hide();
			divOperand2RelativeDate.hide();
			divOperand2AbsoluteDate.hide();
			divOperand3AbsoluteDate.hide();
			divOperand4AbsoluteDate.hide();
		}
	}else{
		divOperand2DateAdded.hide();
		divOperandDateAddedAnd.hide();
		divOperand3DateAddedAnd.show();
		divOperand2RelativeDate.hide();
		divOperand2AbsoluteDate.hide();
		divOperand3AbsoluteDate.hide();
		divOperand4AbsoluteDate.hide();
	}
}

function checkFunctionSubscriberGender(data,index,groupIndex){
	var divOperandLanguage = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_language");
	if(data.value != 'is blank' && data.value != 'is not blank'){
		divOperandLanguage.show();
	}else{
		divOperandLanguage.hide();
	}
}

function checkFunctionSentActivity(data,index,groupIndex){
	var divSubSentActivity = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-sent-activity");
	if(data.value == 'was sent'){
		divSubSentActivity.show();
	}else{
		divSubSentActivity.hide();
	}
}

function checkFunctionSentActivityTimeFrame(data,index,groupIndex){
	var divRelativeDate = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-sent-activity #segment-sub-timeframe-relative-date");
	var divAbsoluteDateOperand = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-sent-activity #segment-sub-timeframe-absolute-date-operand");
	var divAbsoluteDateOperand2 = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-sent-activity #segment-sub-timeframe-absolute-date-operand_2");
	var divAbsoluteDateOperand3 = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-sent-activity #segment-sub-timeframe-absolute-date-operand_3");
	var divBeforeTime = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-sent-activity #segment-sub-timeframe-beforeTime");
	var divAndTime = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-sent-activity #segment-sub-timeframe-andTime");
	var divAfterTime = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-sent-activity #segment-sub-timeframe-afterTime");
	if(data.value == 'anytime')
	{
		divBeforeTime.hide();
		divAndTime.hide();
		divAfterTime.hide();
		divRelativeDate.hide();
		divAbsoluteDateOperand.hide();
		divAbsoluteDateOperand2.hide();
		divAbsoluteDateOperand3.hide();
	}
	else if(data.value == 'between')
	{
		divBeforeTime.hide();
		divAndTime.hide();
		divAfterTime.show();
		divRelativeDate.hide();
		divAbsoluteDateOperand.hide();
		divAbsoluteDateOperand2.hide();
		divAbsoluteDateOperand3.hide();
	}
	else
	{
		if(data.value == 'relative date'){
			divRelativeDate.show();
			divBeforeTime.hide();
			divAndTime.hide();
			divAfterTime.hide();
			divAbsoluteDateOperand.hide();
			divAbsoluteDateOperand2.hide();
			divAbsoluteDateOperand3.hide();
		}else if(data.value == 'absolute date'){
			divAbsoluteDateOperand.show();
			divAbsoluteDateOperand2.show();
			divAbsoluteDateOperand3.show();
			divRelativeDate.hide();
			divBeforeTime.hide();
			divAndTime.hide();
			divAfterTime.hide();
		}else{
			divBeforeTime.show();
			divAndTime.hide();
			divAfterTime.hide();
			divRelativeDate.hide();
			divAbsoluteDateOperand.hide();
			divAbsoluteDateOperand2.hide();
			divAbsoluteDateOperand3.hide();
		}
	}
}

function checkFunctionSentActivityCampaign(data,index,groupIndex){
	console.log(data.value);
	if(data.value != 'any-campaign')
	{
		showSegmentSentActivityCampaign(index,groupIndex);
	}
	else
	{
		$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-sent-activity #segment-sub-campaign").hide();
	}
}

function checkFunctionClickActivity(data,index,groupIndex){
	var divSubClickActivity = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-click-activity");
	if(data.value == 'was sent'){
		divSubClickActivity.show();
	}else{
		divSubClickActivity.hide();
	}
}

function checkFunctionClickActivityTimeFrame(data,index,groupIndex){
	var divRelativeDate = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-click-activity #segment-sub-timeframe-relative-date");
	var divAbsoluteDateOperand = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-click-activity #segment-sub-timeframe-absolute-date-operand");
	var divAbsoluteDateOperand2 = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-click-activity #segment-sub-timeframe-absolute-date-operand_2");
	var divAbsoluteDateOperand3 = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-click-activity #segment-sub-timeframe-absolute-date-operand_3");
	var divBeforeTime = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-click-activity #segment-sub-timeframe-beforeTime");
	var divAndTime = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-click-activity #segment-sub-timeframe-andTime");
	var divAfterTime = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-click-activity #segment-sub-timeframe-afterTime");
	if(data.value == 'anytime')
	{
		divBeforeTime.hide();
		divAndTime.hide();
		divAfterTime.hide();
		divRelativeDate.hide();
		divAbsoluteDateOperand.hide();
		divAbsoluteDateOperand2.hide();
		divAbsoluteDateOperand3.hide();
	}
	else if(data.value == 'between')
	{
		divBeforeTime.hide();
		divAndTime.hide();
		divAfterTime.show();
		divRelativeDate.hide();
		divAbsoluteDateOperand.hide();
		divAbsoluteDateOperand2.hide();
		divAbsoluteDateOperand3.hide();
	}
	else
	{
		if(data.value == 'relative date'){
			divRelativeDate.show();
			divBeforeTime.hide();
			divAndTime.hide();
			divAfterTime.hide();
			divAbsoluteDateOperand.hide();
			divAbsoluteDateOperand2.hide();
			divAbsoluteDateOperand3.hide();
		}else if(data.value == 'absolute date'){
			divAbsoluteDateOperand.show();
			divAbsoluteDateOperand2.show();
			divAbsoluteDateOperand3.show();
			divRelativeDate.hide();
			divBeforeTime.hide();
			divAndTime.hide();
			divAfterTime.hide();
		}else{
			divBeforeTime.show();
			divAndTime.hide();
			divAfterTime.hide();
			divRelativeDate.hide();
			divAbsoluteDateOperand.hide();
			divAbsoluteDateOperand2.hide();
			divAbsoluteDateOperand3.hide();
		}
	}
}

function checkFunctionClickActivityCampaign(data,index,groupIndex){
	// console.log(data.value);
	if(data.value != 'any-campaign')
	{
		showSegmentClickActivityCampaign(index,groupIndex);
	}
	else
	{
		$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-click-activity #segment-sub-campaign").hide();
	}
}

function checkFunctionSubscriberNumber(data,index,groupIndex){
	var divOperand2SubscriberNumber = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_2_subscriber_number");
	var divOperandAndSubscriberNumber = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_and_subscriber_number");
	var divOperand3SubscriberNumber = $("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_3_subscriber_number");
	divOperand2SubscriberNumber.hide();
	divOperandAndSubscriberNumber.hide();
	divOperand3SubscriberNumber.hide();
	console.log(index);
	if(data.value == 'is between'){
		divOperand2SubscriberNumber.show();
		divOperandAndSubscriberNumber.show();
		divOperand3SubscriberNumber.show();
	}else if(data.value == 'is empty' || data.value == 'is not empty'){

	}else{
		divOperand2SubscriberNumber.show();
	}
}

function showSegmentField(index,groupIndex){
	// console.log(groupIndex);
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operation_field").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_field").show();
}

function showSegmentSubscriberData(index,groupIndex){
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operation_subscriber_data").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_date_added").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_2_date_added").show();
}

function showSegmentEcommercePurchase(index,groupIndex){
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operation_ecommerce_purchase").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-ecommerce-purchase").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-ecommerce-purchase #timeframe").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-ecommerce-purchase #campaign").show();
}

function showSegmentCampaign(index,groupIndex){
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-ecommerce-purchase #segment-sub-campaign").show();
}

function showSegmentCampaignActivityCampaign(index,groupIndex){
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-campaign-activity #segment-sub-campaign").show();
}

function showSegmentSentActivityCampaign(index,groupIndex){
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-sent-activity #segment-sub-campaign").show();
}

function showSegmentClickActivityCampaign(index,groupIndex){
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-click-activity #segment-sub-campaign").show();
}

function showSegmentSubscriberDateAdded(index,groupIndex){
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operation_date_added").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_date_added").show();
}

function showSegmentSubscriberEmailAddress(index,groupIndex){
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operation_email_address").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_email_address").show();
}

function showSegmentSubscriberPhoneNumber(index,groupIndex){
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operation_phone_number").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_phone_number").show();
}

function showSegmentSubscriberGender(index,groupIndex){
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operation_gender").show();
}

function showSegmentSubscriberLanguage(index,groupIndex){
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operation_language").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operand_language").show();
}

function showSegmentCampaignActivity(index,groupIndex){
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operation_campaign_activity").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-campaign-activity").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-campaign-activity #timeframe").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-campaign-activity #campaign").show();
}

function showSegmentSentActivity(index,groupIndex){
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operation_sent_activity").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-sent-activity").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-sent-activity #timeframe").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-sent-activity #campaign").show();
}

function showSegmentClickActivity(index,groupIndex){
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #operation_click_activity").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-click-activity").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-click-activity #timeframe").show();
	$("#group #groupSegment_"+groupIndex+""+" #segment #subSegment_"+index+""+" #sub-click-activity #campaign").show();
}


