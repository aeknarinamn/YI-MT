$(function () {
    checkMove();
    //for have Data & old error
    // $(".form_datetime").datetimepicker({
    //     format: "dd/mm/YY hh:ii",
    //     autoclose: true,
    //     todayBtn: true,
    //      minuteStep: 1
    // });
    // $("#entry_form").submit(function() {
    //     document.getElementById('submit').disabled=true;
    //     var hiddenElements = $("div:hidden");
    //     hiddenElements.remove();
    // });

    // $('#fieldType').change(function() {
    //     console.log($(this).val());
    //     if($(this).val() == 'enum'){
    //         $('#enumDatas').show();
    //         $('#addEnumData').show();
    //     }else{
    //         $('#enumDatas').hide();
    //         $('#addEnumData').hide();
    //     }
    // });

    $('#previewModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever')

        // Extract info from data-* attributes
        var data = null;
        //var data = $('#txtMessage-'+$("#emojiTaget").val()).val('');
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        //modal.find('.modal-title').text('New message to ' + data)
        modal.find('.modal-body label').text(data)

        if(data == null) {
            modal.find('.modal-body label').text(data)

        } else {
            // $('input:radio[name="schedule_type"][value="one_time"]').prop('checked',true);

            }
        //media-body text-right 
    })

    $('#previewModal').on('hidden.bs.modal', function (e) {
        var modal = $(this)
        modal.find('.modal-body label').val('').end();
    })
    
    $('#button_cancel_modal').click( function() {
        resetAllDataRecurring();
        $('#sent_date_start_one_time').val('');
    });
 

    $('#recurring-div').hide();

    if($('input[name=schedule_type]:radio:checked').val() == 'recurring'){
        $('#recurring-div').show();
        $('#start-mailing-div').show();
    }

    $("input[name=schedule_type]:radio").change(function () {
        if($(this).val() == 'recurring'){
            $('#recurring-div').show();
            $('#start-mailing-div').show();
        } else {
            $('#start-mailing-div').show();
            $('#recurring-div').hide();
            resetAllDataRecurring();
        }
    });

    // $('#inlineRadio1').click( function() {
    //     $('#start-mailing-div').show();
    //     $('#recurring-div').hide();
    //     resetAllDataRecurring();
      
    // });

    // $('#inlineRadio2').click( function() {
    //     $('#recurring-div').show();
    //     $('#start-mailing-div').hide();
    //     $('#sent_date_start_one_time').val('');
    // });

    $('#optionsRadios1').click( function() {
        $('#inlineCheckbox1').attr('disabled', false);
        $('#inlineCheckbox2').attr('disabled', false);
        $('#inlineCheckbox3').attr('disabled', false);
        $('#inlineCheckbox4').attr('disabled', false);
        $('#inlineCheckbox5').attr('disabled', false);
        $('#inlineCheckbox6').attr('disabled', false);
        $('#inlineCheckbox7').attr('disabled', false);
        $('#selectDate').val('1');
 
    });

    $('#optionsRadios2').click( function() {
        clearAndDisabledDailyCheckbox();
    });

    $('[data-daterangepicker]').daterangepicker({
        //"autoApply": true,
        "timePicker" : true,
        "timePicker24Hour" : true,
        singleDatePicker: true,
        autoUpdateInput: false,
        //showDropdowns: true,
        opens: 'center',
        //drops: 'up',
        locale: {
            //format:'DD/MM/YYYY HH:mm',
            format:'YYYY/MM/DD',
            cancelLabel: 'Clear'
        },
    });
    $('[data-daterangepicker]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('YYYY/MM/DD HH:mm'));
    });

    $('[data-daterangepicker]').on('cancel.daterangepicker', function(ev, picker) {
          $(this).val('');
    });

    // if(!$('input[name=campaign_type]:radio:checked').val()){
    //     $('input:radio[name="campaign_type"][value="campaign"]').prop('checked',true);
    //     $(".campaign").show();
    // }

    // $("input[name=campaign_type]:radio").change(function () {
    //     if($(this).val() == 'campaign'){
    //         $(".campaign").show();
    //         $(".trigger").hide();
    //     } else {
    //         $(".campaign").hide();
    //         $(".trigger").show();
    //     }
    // });

    if(!$('input[name=send_status]:radio:checked').val()){
        $('input:radio[name="send_status"][value="schedule"]').prop('checked',true);
    } else {
        if($('input[name=send_status]:radio:checked').val() == 'send_it') {
            disableSentDate();
            $('#btnApprove').show();
        } else {
            // $('input:radio[name="schedule_type"][value="one_time"]').prop('checked',true);
            if($("input[name='sent_date']").val() != "") {
                $('#btnApprove').show();
            }
        }
    }

    $("input[name=send_status]:radio").change(function () {
    	if($(this).val() == 'send_it'){
    		disableSentDate();
            $('#btnApprove').show();
    	} else {
            if(!$('input[name=schedule_type]:radio:checked').val()){
                $('input:radio[name="schedule_type"][value="one_time"]').prop('checked',true);
            }
    		$("input[name=sent_date]").prop( "disabled", false );
            $('#btnApprove').hide();
    	}
    });

    $("input[name='sent_date']").change(function () {
        if($("input[name='sent_date']").val() != ""){
            $('#btnApprove').show();
        }

        if($("input[name=sent_date]").val() == "Invalid date"){
            $("input[name=sent_date]").val('');
        }
    });

    // $("input[name=sent_date]").focus(function() {
    //     $("input[name=send_status][value=" + schedule + "]").attr('checked', 'checked');
    // });

    $('#ClickWordList li').click(function() {
        $("#txtMessage").insertAtCaret($(this).text());
        return false
    });
    $("#DragWordList li").draggable({helper: 'clone'});
    $("#DragWordDynamicContent li").draggable({helper: 'clone'});
    $(".txtDropTarget").droppable({
        accept: "#DragWordList li",
        drop: function(ev, ui) {
            myValue = " "+"(["+ui.draggable.text()+"])"+" ";
            $(this).append( myValue );
              var id = $(this).attr('id');
            id = id.split("-");
            addID(id[1]);
            copyDataTextMessage();
            // $(this).insertAtCaret(ui.draggable.text());
        }
    });

    $("#addTextMessage").click(function() {
        var oldDivTextBox = parseInt($("#divTextBox").val());
        addTextMessage(oldDivTextBox);
    });

    $("#addTextPhoto").click(function() {
        var oldDivTextBox = parseInt($("#divTextBox").val());
        addTextPhoto(oldDivTextBox);
    });

    $('#photoModal').on('show.bs.modal', function (event) {
        if(event.relatedTarget != undefined){
            var src  =event.relatedTarget.src;
        } else {
            var src = $("#holder_modal").attr("src");
        }
        $('#modal_photo_img').attr('src', src);
    });
    divTextBox = $("#divTextBox").val();

    $("#addRichMessage").click(function() {
        var oldDivTextBox = parseInt($("#divTextBox").val());
        addDivRichMessage(oldDivTextBox);
    });

   /*
    * select image
    */
    $("input[name=image_size]:radio").change(function () {
        $("#fixSizeImage").html($(this).val());
    });
    // image type
    $("input[name=imageType]:radio").change(function () {
        $("#image-rich-message-show").attr('src',showImageBackground);
        $("#richMessageItem_actions").html('');
        addActionRichMessage($(this).val());
        addLinkActionRichMessage('url',$(this).val());
    });

    //action type
    // $("input[name=action_type]:radio").change(function () {
    //     addLinkActionRichMessage($(this).val());
    // });


    //load
    var imageSizeShow = $("input[name=image_size]:radio");
    var sizeImageShow = imageSizeShow.length;
    if(sizeImageShow > 0) {
        for (var i = 0; i < sizeImageShow; i++) {
            if($("#"+imageSizeShow[i].id).attr('fixcheck') == 'true'){
                $("#"+imageSizeShow[i].id).prop('checked',true);
            }
        }
    }
    var imageTypeShow = $("input[name=imageType]:radio");
    var sizeTypeShow = imageTypeShow.length;
    var actionNumber = 1;
    if(sizeTypeShow > 0) {
        for (var i = 0; i < sizeTypeShow; i++) {
            if($("#"+imageTypeShow[i].id).attr('fixcheck') == 'true'){
                $("#"+imageTypeShow[i].id).prop('checked',true);
                addActionRichMessage($("#"+imageTypeShow[i].id).val());
                actionNumber = $("#"+imageTypeShow[i].id).val();
            }
        }
    }

    var action_type = $("input[name^=action_type]:radio");
    var action_typeShow = action_type.length;
    if(actionNumber == 1) {
        $("#action_for_1").removeClass('hidden');
    }
    var order=1;
    for (var i = 0; i < action_typeShow; i++) {
        if($("#action_type_"+actionNumber+"_"+order).attr('fixcheck') == 'true'){
            $("#action_type_"+actionNumber+"_"+order).prop('checked',true);
        }
        order+=1;
    }
    //old input after refresh
    if (typeof oldImageSize != 'undefined') {
        $("#"+oldImageSize).prop('checked',true);
    }
    action_type.prop('checked', true);

});

function clearAndDisabledDailyCheckbox(){
    $( "#inlineCheckbox1" ).attr({
      disabled: true,
      checked: false
    });
    $( "#inlineCheckbox2" ).attr({
      disabled: true,
      checked: false
    });
    $( "#inlineCheckbox3" ).attr({
      disabled: true,
      checked: false
    });
    $( "#inlineCheckbox4" ).attr({
      disabled: true,
      checked: false
    });
    $( "#inlineCheckbox5" ).attr({
      disabled: true,
      checked: false
    });
    $( "#inlineCheckbox6" ).attr({
      disabled: true,
      checked: false
    });
    $( "#inlineCheckbox7" ).attr({
      disabled: true,
      checked: false
    });
}

function resetAllDataRecurring(){
    $('#inlineCheckbox7').attr('checked', false);
    $('#inlineCheckbox1').attr('checked', false);
    $('#inlineCheckbox2').attr('checked', false);
    $('#inlineCheckbox3').attr('checked', false);
    $('#inlineCheckbox4').attr('checked', false);
    $('#inlineCheckbox5').attr('checked', false);
    $('#inlineCheckbox6').attr('checked', false);
    $('#inlineCheckbox7').attr('checked', false);
    $('#selectDate').val('1');
    $('#sent_date_start_recurring').val('');
    $('#sent_date_end_recurring').val('');
    $('#selectStartOrEndMonth').val('1');
}

function disableSentDate(){
    $("input[name=sent_date]").prop( "disabled", true );
    $("input[name=sent_date]").val('');
}

$.fn.insertAtCaret = function (myValue) {
    myValue = " "+"<"+myValue+">"+" ";
    return this.each(function(){
            //IE support
            if (document.selection) {
                    this.focus();
                    sel = document.selection.createRange();
                    sel.text = myValue;
                    this.focus();
            }
            //MOZILLA / NETSCAPE support
            else if (this.selectionStart || this.selectionStart == '0') {
                    var startPos = this.selectionStart;
                    var endPos = this.selectionEnd;
                    var scrollTop = this.scrollTop;
                    this.value = this.value.substring(0, startPos)+ myValue+ this.value.substring(endPos,this.value.length);
                    this.focus();
                    this.selectionStart = startPos + myValue.length;
                    this.selectionEnd = startPos + myValue.length;
                    this.scrollTop = scrollTop;
            } else {
                    this.value += myValue;
                    this.focus();
            }
    });
};

function moveDown(orderID){
    var divID = $("#div_"+orderID);
    divID.next().insertBefore(divID);
    var nextMove = parseInt(orderID+1);
    var oldAction = $("#moveAction_"+orderID).html();
    var newAction = $("#moveAction_"+nextMove).html();
    $("#moveAction_"+orderID).empty();
    $("#moveAction_"+nextMove).empty();
    if(nextMove < 4 ){
        $("#moveAction_"+nextMove).append(oldAction);
        $("#moveAction_"+orderID).append(newAction);

        $("#div_"+nextMove).attr("id", "moveup");
        $("#moveAction_"+nextMove).attr("id", "move_action_up");
        $("textarea[name='payload["+nextMove+"]']").attr("name", "moveup_payload");
        $("input[name='message_type["+nextMove+"]']").attr("name", "moveup_message_type");
        $("input[name='order_id["+nextMove+"]']").attr("name", "moveup_order_id");
        $("#div_"+orderID).attr("id", "movedown");
        $("#moveAction_"+orderID).attr("id", "move_action_down");
        $("textarea[name='payload["+orderID+"]']").attr("name", "movedown_payload");
        $("input[name='message_type["+orderID+"]']").attr("name", "movedown_message_type");
        $("input[name='order_id["+orderID+"]']").attr("name", "movedown_order_id");

        $("#type_"+nextMove).attr("id", "type_moveup");
        $("#text_wrapper"+nextMove).attr("id", "text_wrapper_moveup");
        $("#text-"+nextMove).attr("id", "text-moveup");
        $("#txtMessage-"+nextMove).attr("id", "txtMessage-moveup");
        $("#type_"+orderID).attr("id", "type_movedown");
        $("#text_wrapper"+orderID).attr("id", "text_wrapper_down");
        $("#text-"+orderID).attr("id", "text-down");
        $("#moveup").attr("id", "div_"+orderID);
        $("#move_action_up").attr("id", "moveAction_"+orderID);
        $("#txtMessage-"+orderID).attr("id", "txtMessage-down");

        $("textarea[name='moveup_payload']").attr("name", "payload["+orderID+"]");
        $("input[name='moveup_message_type']").attr("name", "message_type["+orderID+"]");
        $("input[name='moveup_order_id']").val(orderID);
        $("input[name='moveup_order_id']").attr("name", "order_id["+orderID+"]");
        $("#movedown").attr("id", "div_"+nextMove);
        $("#move_action_down").attr("id", "moveAction_"+nextMove);
        $("textarea[name='movedown_payload']").attr("name", "payload["+nextMove+"]");
        $("input[name='movedown_message_type']").attr("name", "message_type["+nextMove+"]");
        $("input[name='movedown_order_id']").val(nextMove);
        $("input[name='movedown_order_id']").attr("name", "order_id["+nextMove+"]");

        $("#type_moveup").attr("id", "type_"+orderID);
        $("#text_wrapper_moveup").attr("id", "text_wrapper"+orderID);
        $("#text-moveup").attr("onclick", "setTagetDiv("+orderID+")");
        $("#text-moveup").attr("id", "text-"+orderID);
        $("#txtMessage-moveup").attr("id", "txtMessage-"+orderID);
        $("#type_movedown").attr("id", "type_"+nextMove);
        $("#text_wrapper_down").attr("id", "text_wrapper"+nextMove);
        $("#text-down").attr("onclick", "setTagetDiv("+nextMove+")");
        $("#text-down").attr("id", "text-"+nextMove);
        $("#txtMessage-down").attr("id", "txtMessage-"+nextMove);

        $("#hidden-photo-"+orderID).attr("name","hidden_photo_up");
        $("#hidden-photo-"+orderID).attr("id","hidden-photo_up");
        $("#photo-"+orderID).attr("name","photo_name_up");
        $("#photo-"+orderID).attr("id","photo_up");
        $("#imagePhoto-"+orderID).attr("id","imagePhoto-up");
        $("input[name='real_photo["+orderID+"]']").attr("name","real_photo_name_up");
        $("input[name='real_photo_name_up']").attr("id","real_photo_up");
        $("#show-photo-"+orderID).attr("id","show-photo-up");

        $("#hidden-photo-"+nextMove).attr("name","hidden_photo_down");
        $("#hidden-photo-"+nextMove).attr("id","hidden-photo_down");
        $("#photo-"+nextMove).attr("name","photo_name_down");
        $("#photo-"+nextMove).attr("id","photo_down");
        $("#imagePhoto-"+nextMove).attr("id","imagePhoto-down");
        $("input[name='real_photo["+nextMove+"]']").attr("name","real_photo_name_down");
        $("input[name='real_photo_name_down']").attr("id","real_photo_down");
        $("#show-photo-"+nextMove).attr("id","show-photo-down");

        //photo
        $("#hidden_photo_up").attr("name","hidden-photo-"+nextMove);
        $("#hidden-photo_up").attr("id","hidden-photo-"+nextMove);
        $("#photo_up").attr("name","photo-"+nextMove);
        $("#photo_up").attr("id","photo-"+nextMove);
        $("#imagePhoto-up").attr("id","imagePhoto-"+nextMove);
        $("#real_photo_up").attr("name","real_photo["+nextMove+"]");
        $("#real_photo_up").attr("id","real_photo["+nextMove+"]");
        $("#show-photo-up").attr("id","show-photo-"+nextMove);

        $("#hidden_photo_down").attr("name","hidden-photo-"+orderID);
        $("#hidden-photo_down").attr("id","hidden-photo-"+orderID);
        $("#photo_down").attr("name","photo-"+orderID);
        $("#photo_down").attr("id","photo-"+orderID);
        $("#imagePhoto-down").attr("id","imagePhoto-"+orderID);
        $("#real_photo_down").attr("name","real_photo["+orderID+"]");
        $("#real_photo_down").attr("id","real_photo["+orderID+"]");
        $("#show-photo-down").attr("id","show-photo-"+orderID);

        var orderIDDeleteDivEle = $("#div_"+orderID).find('[onclick^=deleteDivMessage]');
        orderIDDeleteDivEle.attr("onclick", "deleteDivMessage("+orderID+")");
        var orderaddID = $("#div_"+orderID).find('[onclick^=addID]');
            orderaddID.attr("onclick", "addID("+orderID+")");
        var nextMoveDeleteDivEle = $("#div_"+nextMove).find('[onclick^=deleteDivMessage]');
        nextMoveDeleteDivEle.attr("onclick", "deleteDivMessage("+nextMove+")");
        var addID = $("#div_"+nextMove).find('[onclick^=addID]');
            addID.attr("onclick", "addID("+nextMove+")");
        moveDownSticker(orderID,nextMove);
    }
    checkMove();
}

//New Function + octi
function moveUp(orderID){
    var divID = $("#div_"+orderID);
    divID.prev().insertAfter(divID);

    var nextMove = orderID-1;
    var oldAction = $("#moveAction_"+orderID).html();
    var newAction = $("#moveAction_"+nextMove).html();
    $("#moveAction_"+orderID).empty();
    $("#moveAction_"+nextMove).empty();
    if(nextMove < 4 ){
        $("#moveAction_"+nextMove).append(oldAction);
        $("#moveAction_"+orderID).append(newAction);

        $("#div_"+nextMove).attr("id", "moveup");
        $("#moveAction_"+nextMove).attr("id", "move_action_up");
        $("textarea[name='payload["+nextMove+"]']").attr("name", "moveup_payload");
        $("input[name='message_type["+nextMove+"]']").attr("name", "moveup_message_type");
        $("input[name='order_id["+nextMove+"]']").attr("name", "moveup_order_id");
        $("#div_"+orderID).attr("id", "movedown");
        $("#moveAction_"+orderID).attr("id", "move_action_down");
        $("textarea[name='payload["+orderID+"]']").attr("name", "movedown_payload");
        $("input[name='message_type["+orderID+"]']").attr("name", "movedown_message_type");
        $("input[name='order_id["+orderID+"]']").attr("name", "movedown_order_id");

        $("#type_"+nextMove).attr("id", "type_moveup");
        $("#text_wrapper"+nextMove).attr("id", "text_wrapper_moveup");
        $("#text-"+nextMove).attr("id", "text-moveup");
        $("#txtMessage-"+nextMove).attr("id", "txtMessage-moveup");
        $("#type_"+orderID).attr("id", "type_movedown");
        $("#text_wrapper"+orderID).attr("id", "text_wrapper_down");
        $("#text-"+orderID).attr("id", "text-down");
        $("#txtMessage-"+orderID).attr("id", "txtMessage-down");

        //photo
        $("#hidden-photo-"+orderID).attr("name","hidden_photo_up");
        $("#hidden-photo-"+orderID).attr("id","hidden-photo_up");
        $("#photo-"+orderID).attr("name","photo_name_up");
        $("#photo-"+orderID).attr("id","photo_up");
        $("#imagePhoto-"+orderID).attr("id","imagePhoto-up");
        $("input[name='real_photo["+orderID+"]']").attr("name","real_photo_name_up");
        $("input[name='real_photo_name_up']").attr("id","real_photo_up");
        $("#show-photo-"+orderID).attr("id","show-photo-up");
        $("#hidden-photo-"+nextMove).attr("name","hidden_photo_down");
        $("#hidden-photo-"+nextMove).attr("id","hidden-photo_down");
        $("#photo-"+nextMove).attr("name","photo_name_down");
        $("#photo-"+nextMove).attr("id","photo_down");
        $("#imagePhoto-"+nextMove).attr("id","imagePhoto-down");
        $("input[name='real_photo["+nextMove+"]']").attr("name","real_photo_name_down");
        $("input[name='real_photo_name_down']").attr("id","real_photo_down");
        $("#show-photo-"+nextMove).attr("id","show-photo-down");

        $("#moveup").attr("id", "div_"+orderID);
        $("#move_action_up").attr("id", "moveAction_"+orderID);
        $("textarea[name='moveup_payload']").attr("name", "payload["+orderID+"]");
        $("input[name='moveup_message_type']").attr("name", "message_type["+orderID+"]");
        $("input[name='moveup_order_id']").val(orderID);
        $("input[name='moveup_order_id']").attr("name", "order_id["+orderID+"]");
        $("#movedown").attr("id", "div_"+nextMove);
        $("#move_action_down").attr("id", "moveAction_"+nextMove);
        $("textarea[name='movedown_payload']").attr("name", "payload["+nextMove+"]");
        $("input[name='movedown_message_type']").attr("name", "message_type["+nextMove+"]");
        $("input[name='movedown_order_id']").val(nextMove);
        $("input[name='movedown_order_id']").attr("name", "order_id["+nextMove+"]");

        $("#type_moveup").attr("id", "type_"+orderID);
        $("#text_wrapper_moveup").attr("id", "text_wrapper"+orderID);
        $("#text-moveup").attr("onclick", "setTagetDiv("+orderID+")");
        $("#text-moveup").attr("id", "text-"+orderID);
        $("#txtMessage-moveup").attr("id", "txtMessage-"+orderID);
        $("#type_movedown").attr("id", "type_"+nextMove);
        $("#text_wrapper_down").attr("id", "text_wrapper"+nextMove);
        $("#text-down").attr("id", "text-"+nextMove);
        $("#text-down").attr("onclick", "setTagetDiv("+nextMove+")");
        $("#txtMessage-down").attr("id", "txtMessage-"+nextMove);

        //photo
        $("#hidden_photo_up").attr("name","hidden-photo-"+nextMove);
        $("#hidden-photo_up").attr("id","hidden-photo-"+nextMove);
        $("#photo_up").attr("name","photo-"+nextMove);
        $("#photo_up").attr("id","photo-"+nextMove);
        $("#imagePhoto-up").attr("id","imagePhoto-"+nextMove);
        $("#real_photo_up").attr("name","real_photo["+nextMove+"]");
        $("#real_photo_up").attr("id","real_photo["+nextMove+"]");
        $("#show-photo-up").attr("id","show-photo-"+nextMove);

        $("#hidden_photo_down").attr("name","hidden-photo-"+orderID);
        $("#hidden-photo_down").attr("id","hidden-photo-"+orderID);
        $("#photo_down").attr("name","photo-"+orderID);
        $("#photo_down").attr("id","photo-"+orderID);
        $("#imagePhoto-down").attr("id","imagePhoto-"+orderID);
        $("#real_photo_down").attr("name","real_photo["+orderID+"]");
        $("#real_photo_down").attr("id","real_photo["+orderID+"]");
        $("#show-photo-down").attr("id","show-photo-"+orderID);

        var orderIDDeleteDivEle = $("#div_"+orderID).find('[onclick^=deleteDivMessage]');
        orderIDDeleteDivEle.attr("onclick", "deleteDivMessage("+orderID+")");
        var orderaddID = $("#div_"+orderID).find('[onclick^=addID]');
            orderaddID.attr("onclick", "addID("+orderID+")");
        var nextMoveDeleteDivEle = $("#div_"+nextMove).find('[onclick^=deleteDivMessage]');
        nextMoveDeleteDivEle.attr("onclick", "deleteDivMessage("+nextMove+")");
        var addID = $("#div_"+nextMove).find('[onclick^=addID]');
            addID.attr("onclick", "addID("+nextMove+")");
        moveUpSticker(orderID,nextMove);
    }
    checkMove();
}

function moveUpSticker(orderID,nextMove){
    $("#message_sticker-"+nextMove).attr("id", "message_sticker_moveup_payload");
    //$("#type_"+nextMove).attr("id", "type_moveup_payload");
    //name
    $("#stkID-"+nextMove).attr("name", "payload_stkID_moveup_payload");
    $("#stkPKGID-"+nextMove).attr("name", "payload_stkPKGID_moveup_payload");
    $("#stkVer-"+nextMove).attr("name", "payload_stkVer_moveup_payload");
    $("#pathSticker-"+nextMove).attr("name", "payload_pathSticker_moveup_payload");
    //id
    $("#stkID-"+nextMove).attr("id", "stkID_moveup_payload");
    $("#stkPKGID-"+nextMove).attr("id", "stkPKGID_moveup_payload");
    $("#stkVer-"+nextMove).attr("id", "stkVer_moveup_payload");
    $("#pathSticker-"+nextMove).attr("id", "pathSticker_moveup_payload");

    //sticker
    $("#message_sticker-"+orderID).attr("id", "message_sticker_movedown_payload");
    //$("#type_"+orderID).attr("id", "type_movedown_payload");

    //name
    $("#stkID-"+orderID).attr("name", "payload_stkID_movedown_payload");
    $("#stkPKGID-"+orderID).attr("name", "payload_stkPKGID_movedown_payload");
    $("#stkVer-"+orderID).attr("name", "payload_stkVer_movedown_payload");
    $("#pathSticker-"+orderID).attr("name", "payload_pathSticker_movedown_payload");
    //id
    $("#stkID-"+orderID).attr("id", "stkID_movedown_payload");
    $("#stkPKGID-"+orderID).attr("id", "stkPKGID_movedown_payload");
    $("#stkVer-"+orderID).attr("id", "stkVer_movedown_payload");
    $("#pathSticker-"+orderID).attr("id", "pathSticker_movedown_payload");

    /// New
    $("#message_sticker_moveup_payload").attr("id", "message_sticker-"+orderID);
    //$("#type_moveup_payload").attr("id", "type_"+orderID);
    //name
    $("#stkID_moveup_payload").attr("name", "payload["+orderID+"][stkID]");
    $("#stkPKGID_moveup_payload").attr("name", "payload["+orderID+"][stkPKGID]");
    $("#stkVer_moveup_payload").attr("name", "payload["+orderID+"][stkVer]");
    $("#pathSticker_moveup_payload").attr("name", "payload["+orderID+"][pathSticker]");
    //id
    $("#stkID_moveup_payload").attr("id", "stkID-"+orderID);
    $("#stkPKGID_moveup_payload").attr("id", "stkPKGID-"+orderID);
    $("#stkVer_moveup_payload").attr("id", "stkVer-"+orderID);
    $("#pathSticker_moveup_payload").attr("id", "pathSticker-"+orderID);

    $("#message_sticker_movedown_payload").attr("id", "message_sticker-"+nextMove);
    //$("#type_movedown_payload").attr("id", "type_"+nextMove);
    //name
    $("#stkID_movedown_payload").attr("name", "payload["+nextMove+"][stkID]");
    $("#stkPKGID_movedown_payload").attr("name", "payload["+nextMove+"][stkPKGID]");
    $("#stkVer_movedown_payload").attr("name", "payload["+nextMove+"][stkVer]");
    $("#pathSticker_movedown_payload").attr("name", "payload["+nextMove+"][pathSticker]");
    //id
    $("#stkID_movedown_payload").attr("id", "stkID-"+nextMove);
    $("#stkPKGID_movedown_payload").attr("id", "stkPKGID-"+nextMove);
    $("#stkVer_movedown_payload").attr("id", "stkVer-"+nextMove);
    $("#pathSticker_movedown_payload").attr("id", "pathSticker-"+nextMove);

    var orderIDeditEle = $("#div_"+orderID).find('[onclick^=editSticker]');
    orderIDeditEle.attr("onclick", "editSticker("+orderID+")");
    var nextMoveEditEle = $("#div_"+nextMove).find('[onclick^=editSticker]');
    nextMoveEditEle.attr("onclick", "editSticker("+nextMove+")");

}

function moveDownSticker(orderID,nextMove){
    $("#message_sticker-"+nextMove).attr("id", "message_sticker_moveup_payload");
    //$("#type_"+nextMove).attr("id", "type_moveup_payload");
    //name
    $("#stkID-"+nextMove).attr("name", "payload_stkID_moveup_payload");
    $("#stkPKGID-"+nextMove).attr("name", "payload_stkPKGID_moveup_payload");
    $("#stkVer-"+nextMove).attr("name", "payload_stkVer_moveup_payload");
    $("#pathSticker-"+nextMove).attr("name", "payload_pathSticker_moveup_payload");
    //id
    $("#stkID-"+nextMove).attr("id", "stkID_moveup_payload");
    $("#stkPKGID-"+nextMove).attr("id", "stkPKGID_moveup_payload");
    $("#stkVer-"+nextMove).attr("id", "stkVer_moveup_payload");
    $("#pathSticker-"+nextMove).attr("id", "pathSticker_moveup_payload");

    //sticker
    $("#message_sticker-"+orderID).attr("id", "message_sticker_movedown_payload");
    //$("#type_"+orderID).attr("id", "type_movedown_payload");

    //name
    $("#stkID-"+orderID).attr("name", "payload_stkID_movedown_payload");
    $("#stkPKGID-"+orderID).attr("name", "payload_stkPKGID_movedown_payload");
    $("#stkVer-"+orderID).attr("name", "payload_stkVer_movedown_payload");
    $("#pathSticker-"+orderID).attr("name", "payload_pathSticker_movedown_payload");
    //id
    $("#stkID-"+orderID).attr("id", "stkID_movedown_payload");
    $("#stkPKGID-"+orderID).attr("id", "stkPKGID_movedown_payload");
    $("#stkVer-"+orderID).attr("id", "stkVer_movedown_payload");
    $("#pathSticker-"+orderID).attr("id", "pathSticker_movedown_payload");

    /// New
    $("#message_sticker_moveup_payload").attr("id", "message_sticker-"+orderID);
    //$("#type_moveup_payload").attr("id", "type_"+orderID);
    //name
    $("#stkID_moveup_payload").attr("name", "payload["+orderID+"][stkID]");
    $("#stkPKGID_moveup_payload").attr("name", "payload["+orderID+"][stkPKGID]");
    $("#stkVer_moveup_payload").attr("name", "payload["+orderID+"][stkVer]");
    $("#pathSticker_moveup_payload").attr("name", "payload["+orderID+"][pathSticker]");
    //id
    $("#stkID_moveup_payload").attr("id", "stkID-"+orderID);
    $("#stkPKGID_moveup_payload").attr("id", "stkPKGID-"+orderID);
    $("#stkVer_moveup_payload").attr("id", "stkVer-"+orderID);
    $("#pathSticker_moveup_payload").attr("id", "pathSticker-"+orderID);

    $("#message_sticker_movedown_payload").attr("id", "message_sticker-"+nextMove);
    //$("#type_movedown_payload").attr("id", "type_"+nextMove);
    //named
    $("#stkID_movedown_payload").attr("name", "payload["+nextMove+"][stkID]");
    $("#stkPKGID_movedown_payload").attr("name", "payload["+nextMove+"][stkPKGID]");
    $("#stkVer_movedown_payload").attr("name", "payload["+nextMove+"][stkVer]");
    $("#pathSticker_movedown_payload").attr("name", "payload["+nextMove+"][pathSticker]");
    //id
    $("#stkID_movedown_payload").attr("id", "stkID-"+nextMove);
    $("#stkPKGID_movedown_payload").attr("id", "stkPKGID-"+nextMove);
    $("#stkVer_movedown_payload").attr("id", "stkVer-"+nextMove);
    $("#pathSticker_movedown_payload").attr("id", "pathSticker-"+nextMove);


    var orderIDeditEle = $("#div_"+orderID).find('[onclick^=editSticker]');
    orderIDeditEle.attr("onclick", "editSticker("+orderID+")");
    var nextMoveEditEle = $("#div_"+nextMove).find('[onclick^=editSticker]');
    nextMoveEditEle.attr("onclick", "editSticker("+nextMove+")");
}

var maxTextbox = 3;
var divTextBox = 0;

function addSticker(path,stkID,stkPKGID,stkVer,pathSticker) {
    var editSticekrID = parseInt($("#editSticker").val());
    if(editSticekrID != 0){
        $("#message_sticker-"+editSticekrID).attr("src",path);
        $("#stkID-"+editSticekrID).attr("name","payload["+editSticekrID+"][stkID]");
        $("#stkID-"+editSticekrID).val(stkID);
        $("#stkPKGID-"+editSticekrID).attr("name","payload["+editSticekrID+"][stkPKGID]");
        $("#stkPKGID-"+editSticekrID).val(stkPKGID);
        $("#stkVer-"+editSticekrID).attr("name","payload["+editSticekrID+"][stkVer]");
        $("#stkVer-"+editSticekrID).val(stkVer);
        $("#pathSticker-"+editSticekrID).attr("name","payload["+editSticekrID+"][pathSticker]");
        $("#pathSticker-"+editSticekrID).val(pathSticker);
        $("#editSticker").val(0);
        $('#stickerModal').modal('toggle');
    } else {
        oldDivTextBox = parseInt($("#divTextBox").val());
        if(oldDivTextBox==0){
            oldDivTextBox = 1;
            divTextBox = oldDivTextBox;
        } else {
            divTextBox = parseInt(divTextBox)+1;
        }
        $("#divTextBox").val(divTextBox);

        if(divTextBox <= maxTextbox) {
            var create = createTextBox('sticker');
            if(create){
                $("#div_"+divTextBox).hide();
                $("#stkID-"+divTextBox).remove();
                $("#stkPKGID-"+divTextBox).remove();
                $("#stkVer-"+divTextBox).remove();
                $("#message_sticker-"+divTextBox).remove();
                $("#type_"+divTextBox).append("<img id='message_sticker-"+divTextBox+"'  height='70px' src='"+path+"'>");
                $("#type_"+divTextBox).append("<input type='hidden' id='stkID-"+divTextBox+"' name='payload["+divTextBox+"][stkID]' value='"+stkID+"'>");
                $("#type_"+divTextBox).append("<input type='hidden' id='stkPKGID-"+divTextBox+"' name='payload["+divTextBox+"][stkPKGID]' value='"+stkPKGID+"'>");
                $("#type_"+divTextBox).append("<input type='hidden' id='stkVer-"+divTextBox+"' name='payload["+divTextBox+"][stkVer]' value='"+stkVer+"'>");
                $("#type_"+divTextBox).append("<input type='hidden' id='pathSticker-"+divTextBox+"' name='payload["+divTextBox+"][pathSticker]' value='"+pathSticker+"'>");
                $('#stickerModal').modal('toggle');
                $("#div_"+divTextBox).show();
                checkMove();
            }
        } else {
            $("#messageTypes").hide();
        }
    }
    $("#addRichMessage").attr('disabled', true);
}

function addTextMessage(oldDivTextBox) {
   $("#addRichMessage").attr('disabled', true);
    if(oldDivTextBox==0){
        oldDivTextBox = 1;
        divTextBox = oldDivTextBox;
    } else {
        divTextBox = parseInt(divTextBox)+1;
    }
    $("#divTextBox").val(divTextBox);
    if(divTextBox <= maxTextbox) {
        $("#messageTypes").show();
        createTextBox('text');
        checkMove();
        if(divTextBox==maxTextbox){
            $("#messageTypes").hide();
        }
    } else {
        $("#messageTypes").hide();
    }
}

function createTextBox(type){
    if(divTextBox <= maxTextbox) {
        $("#divTextBox").val(divTextBox);
        var divText ="<div class='panel panel-default' id='div_"+divTextBox+"' ";
        if(type == "photo") {
            divText+="style='height:auto !important;'>";
        } else {
            divText+=">";
        }
        divText+="<div class='panel-heading'>";
        divText+="<h1 class='panel-title'>";
        if(type == "sticker") {
            divText+= message_panel_sticker_header;
        } else if(type == "text") {
            divText+= message_panel_header;
        } else if(type == "photo") {
            divText+= message_photo_panel_header;
        }
        divText += "<span class='center'>";
        divText += "<div id='moveAction_"+divTextBox+"'>";
        if(divTextBox != 3 && divTextBox !=1) {
            divText += "<a onclick='moveDown("+divTextBox+")' class='btn btn-xs btn-default'><i class='fa fa-chevron-down text-info'></i>"+ btn_scrolldown + "</a>";
        }
        if(divTextBox != 1) {
            divText += "<a onclick='moveUp("+divTextBox+")' class='btn btn-xs btn-default'><i class='fa fa-chevron-up text-info'></i>"+ btn_scrollup + "</a>";
        }
        divText +="</div></span>";
        divText +="<a onclick='deleteDivMessage("+divTextBox+")' class='btn btn-xs btn-default pull-right'><i class='fa fa-close text-danger'></i></a>";
        if(type == 'text') {
            divText +="<a onClick='addID("+divTextBox+")' data-toggle='modal' role='button' data-target='#emojiModal' class='btn btn-xs btn-default pull-right' style='margin-right: 5px;'><i class='fa fa-smile-o text-warning'></i> "+message_emoji+"</a>";
        } else if(type == 'sticker') {
            divText +="<a data-toggle='modal' onclick='editSticker("+divTextBox+")' data-target='#stickerModal' class='btn btn-xs btn-default pull-right' style='margin-right: 5px;'><i class='fa fa-pencil text-success'></i> "+ btn_edit +"</a>";
        } //else if(type == 'photo') {
        //     divText +="<a data-toggle='modal' class='btn btn-xs btn-default pull-right' style='margin-right: 5px;'><i class='fa fa-pencil text-success'></i>"+ btn_edit +"</a>";
        // }
        divText +="</h1><div class='clearfix'></div></div>";//close div panel-heading
        divText +="</div>"; //close panel panel-default
        $("#divforMessage").append(divText);
        var divEmoji ="<div class='message' id='type_"+ divTextBox +"'>";
        if(type == 'sticker'){
            divEmoji +="<input type='hidden' name='message_type["+ divTextBox +"]' value='sticker'>";
        } else if(type == 'text') {
            divEmoji +="<input type='hidden' name='message_type["+ divTextBox +"]' value='text'>";
        } else if(type == 'photo') {
            divEmoji +="<input type='hidden' name='message_type["+ divTextBox +"]' value='photo'>";
        }
        divEmoji +="<input type='hidden' name='order_id["+ divTextBox +"]' value='"+divTextBox+"'>";
        divEmoji +="</div>";
        $("#div_"+divTextBox).append(divEmoji);

        if(type == 'text'){
            var divTextMessage ="<div id='text_wrapper"+ divTextBox +"'>";
            divTextMessage +="<div class='txtDropTarget ui-droppable' id='text-"+divTextBox+"' onblur='copyDataTextMessage();' onclick='setTagetDiv("+divTextBox+")' contentEditable='true' hidefocus='true' style='z-index: auto; position: relative;line-height: 20px;font-size: 14px;transition: none;margin-top: 0px;margin-bottom: 0px;height: 94px;padding: 10px;background: transparent !important'>";
            // divTextMessage +=divTextBox+''+divTextBox+''+divTextBox+"</div></div>";
            divTextMessage +="</div></div>";
            divTextMessage +="<textarea name='payload["+ divTextBox +"]' style='display:none' id='txtMessage-"+ divTextBox +"' class='form-control txtDropTarget' rows='4'></textarea>";
            $("#div_"+divTextBox).append(divTextMessage);
            addID(divTextBox);
            copyDataTextMessage();
            $(".txtDropTarget").droppable({
                accept: "#DragWordList li",
                drop: function(ev, ui) {
                    myValue = " "+"(["+ui.draggable.text()+"])"+" ";
                    $(this).append( myValue );
                      var id = $(this).attr('id');
                    id = id.split("-");
                    addID(id[1]);
                    copyDataTextMessage();
                },
            });
            // $(".txtDropTarget").droppable({
            //     accept: "#DragWordDynamicContent li",
            //     drop: function(ev, ui) {
            //         myValue = " "+"%D_"+ui.draggable.text()+"%"+" ";
            //         $(this).append( myValue );
            //           var id = $(this).attr('id');
            //         id = id.split("-");
            //         addID(id[1]);
            //         copyDataTextMessage();
            //     }
            // });
        } else if(type == 'photo'){
            var holderSrc = $("#holder").attr('src');
            var divTextPhoto = "<div class='panel-body'>";
            // divTextPhoto += "<div id='show-photo-"+divTextBox+"'><img src='"+holder+"' id='imagePhoto-"+divTextBox+"' class='inputfile' style='display:none;width: 50px; height: 50px;'><i class='fa fa-photo fa-3x inputfile'></i>";
            divTextPhoto += "<div id='show-photo-"+divTextBox+"' style='min-height:90px;'><img data-toggle='modal' data-target='#photoModal' src='"+holderSrc+"' id='imagePhoto-"+divTextBox+"' class='inputfile' style='display:;max-width: 90px; max-height: 90px;'>";
            divTextPhoto += "<label class='btn btn-default btn-sm' style='margin-left: 5px; vertical-align: top;'>"+upload+"<input type='file'  accept='image/*' onchange='handleFileSelected(this)' id='photo-"+divTextBox+"' name='photo["+divTextBox+"]' class='btn btn-default btn-sm' style='margin-left: 5px; vertical-align: top;display:none;'></label>";
            divTextPhoto += "</div>You can send photos of up to 10MB.</div>";
            divTextPhoto += "<input type='hidden' id='real_photo["+divTextBox+"]' name='real_photo["+divTextBox+"]'>";
            $("#div_"+divTextBox).append(divTextPhoto);
        }

        if(divTextBox==maxTextbox){
            $("#messageTypes").hide();
        }
        return true;
    } else {
        $("#messageTypes").hide();
    }
}

/**
** For Emoji
 **/
function addID(id){
    $("#emojiTaget").val(id);
}

function addEmoji(path,nameSticker){
    var divTarget = "text-"+$("#emojiTaget").val();
    var emoJiImg = "<img id='message_emoji' height='30px' src='"+path+"'>";
    $("#"+divTarget).append(emoJiImg);
    var ini  = $("#"+divTarget).html().replace( /<br>/g, '\n' );
    ini  = ini.replace( /<\/div>/g,"" );
    ini  = ini.replace( /<div>/g, '\n' );
    var targets = $("#"+divTarget).find( "img" );
    var index = targets.length;
    for (var i = 0; i <=index; i++) {
        if(targets[i] != undefined){
            var fileName = targets[i].src;
            fileName = fileName.split('/');

            ini = ini.replace(targets[i].outerHTML, "@##{["+fileName[5]+"]}@###");
            delete fileName;
        }
    }
    $('#txtMessage-'+$("#emojiTaget").val()).val( ini );
    $('#emojiModal').modal('toggle');
}

function copyDataTextMessage(){
    $('#txtMessage-'+$("#emojiTaget").val()).val('');
    var divTarget = "text-"+$("#emojiTaget").val();
    var ini  = $("#"+divTarget).html().replace( /<br>/g, '\n' );
    ini  = ini.replace( /<\/div>/g,"" );
    ini  = ini.replace( /<div>/g, '\n' );
    var targets = $("#"+divTarget).find( "img" );
    var index = targets.length;
    for (var i = 0; i <=index; i++) {
        if(targets[i] != undefined){
            var fileName = $.trim(targets[i].src);
            fileName = fileName.split('/');
            ini = ini.replace(targets[i].outerHTML, "@##{["+fileName[5]+"]}@###");
            delete fileName;
        }
    }
    $('#txtMessage-'+$("#emojiTaget").val()).val( ini );
}

function setTagetDiv(id){
    $("#emojiTaget").val(id);
}

function deleteDivMessage(id){
    var countDiv = $("[id^=div_]").length;
    if(id == 1) {
        $("#div_"+id).html(''); // clear Data
        var divToTarget = $("#div_"+id).html($("#div_"+parseInt(id+1)).html()); // copy Data to Div ID
        $("#div_"+id).attr('style',$("#div_"+parseInt(id+1)).attr('style'));
        moveDiv(parseInt(id+1),id);
        $("#div_"+parseInt(id+1)).html('');
        if(countDiv == 2) {
            $("#div_"+parseInt(id+1)).remove();
        } else if(countDiv >2){
            var divToTarget = $("#div_"+parseInt(id+1)).html($("#div_"+parseInt(id+2)).html()); // copy Data to Div ID
            $("#div_"+parseInt(id+1)).attr('style',$("#div_"+parseInt(id+2)).attr('style'));
            moveDiv(parseInt(id+2),parseInt(id+1));
            $("#div_"+parseInt(id+2)).html('');
            $("#div_"+parseInt(id+2)).remove();
        } else if(countDiv == 1){
            $("#div_"+id).remove();
        }
    } else if(id == 2){
        $("#div_"+id).html(''); // clear Data
        var divToTarget = $("#div_"+id).html($("#div_"+parseInt(id+1)).html()); // copy Data to Div ID
            $("#div_"+id).attr('style',$("#div_"+parseInt(id+1)).attr('style'));
        moveDiv(parseInt(id+1),id);
        $("#div_"+parseInt(id+1)).remove();
        if(countDiv == 2) {
            $("#div_"+id).remove();
        }
    }
    else if(id == 3){
        $("#div_"+id).remove();
    }
    checkMove();
    for (var i = 1; i <= countDiv; i++) {
        if($("input[name='message_type["+i+"]']").val() != 'photo'){
            $("#div_"+i).attr('style','');
        }
    }
    divTextBox = divTextBox - 1;
    $("#divTextBox").val(divTextBox);
    countDiv = $("[id^=div_]").length;
    if(parseInt(countDiv) < 3){
        $("#messageTypes").show();
    }
    if(countDiv == 0) {
        $("#addRichMessage").attr('disabled', false);
    }
}

function moveDiv(fromDiv, toDiv){
    //$("#div_"+fromDiv).attr("id", "moveup");
    $("#moveAction_"+fromDiv).attr("id", "move_action_up");
    $("textarea[name='payload["+fromDiv+"]']").attr("name", "moveup_payload");
    $("input[name='message_type["+fromDiv+"]']").attr("name", "moveup_message_type");
    $("input[name='order_id["+fromDiv+"]']").attr("name", "moveup_order_id");
    //$("#moveup").attr("id", "div_"+toDiv);
    $("#move_action_up").attr("id", "moveAction_"+toDiv);
    $("textarea[name='moveup_payload']").attr("name", "payload["+toDiv+"]");
    $("input[name='moveup_message_type']").attr("name", "message_type["+toDiv+"]");
    $("input[name='moveup_order_id']").val(toDiv);
    $("input[name='moveup_order_id']").attr("name", "order_id["+toDiv+"]");

    $("#message_sticker-"+fromDiv).attr("id", "message_sticker_moveup_payload");
    $("#type_"+fromDiv).attr("id", "type_moveup_payload");
    $("#stkID-"+fromDiv).attr("name", "payload_stkID_moveup_payload");
    $("#stkPKGID-"+fromDiv).attr("name", "payload_stkPKGID_moveup_payload");
    $("#stkVer-"+fromDiv).attr("name", "payload_stkVer_moveup_payload");
    $("#pathSticker-"+fromDiv).attr("name", "payload_pathSticker_moveup_payload");
    $("#stkID-"+fromDiv).attr("id", "stkID_moveup_payload");
    $("#stkPKGID-"+fromDiv).attr("id", "stkPKGID_moveup_payload");
    $("#stkVer-"+fromDiv).attr("id", "stkVer_moveup_payload");
    $("#pathSticker-"+fromDiv).attr("id", "pathSticker_moveup_payload");

    $("#message_sticker_moveup_payload").attr("id", "message_sticker-"+toDiv);
    $("#type_moveup_payload").attr("id", "type_"+toDiv);
    $("#stkID_moveup_payload").attr("name", "payload["+toDiv+"][stkID]");
    $("#stkPKGID_moveup_payload").attr("name", "payload["+toDiv+"][stkPKGID]");
    $("#stkVer_moveup_payload").attr("name", "payload["+toDiv+"][stkVer]");
    $("#pathSticker_moveup_payload").attr("name", "payload["+toDiv+"][pathSticker]");
    $("#stkID_moveup_payload").attr("id", "stkID-"+toDiv);
    $("#stkPKGID_moveup_payload").attr("id", "stkPKGID-"+toDiv);
    $("#stkVer_moveup_payload").attr("id", "stkVer-"+toDiv);
    $("#pathSticker_moveup_payload").attr("id", "pathSticker-"+toDiv);

    $("#text_wrapper"+fromDiv).attr("id", "text_wrapper"+toDiv);
    $("#text-"+fromDiv).attr("onclick", "setTagetDiv('"+toDiv+"')");
    $("#text-"+fromDiv).attr("id", "text-"+toDiv);
    $("#txtMessage-"+fromDiv).attr("id", "txtMessage-"+toDiv);

    $("#show-photo-"+fromDiv).attr("id","show-photo-up");
    $("#photo-"+fromDiv).attr("name","photo["+toDiv+"]");
    $("#photo-"+fromDiv).attr("id","photo-"+toDiv);
    $("#hidden-photo-"+fromDiv).attr("name","hidden_photo["+toDiv+"]");
    $("#hidden-photo-"+fromDiv).attr("id","hidden-photo-"+toDiv);
    $("#imagePhoto-"+fromDiv).attr("id","#imagePhoto-"+toDiv);

    $("input[name='real_photo["+fromDiv+"]']").attr("name","real_photo["+toDiv+"]");
    $("input[name='real_photo["+toDiv+"]']").attr("id","real_photo["+toDiv+"]");

    $('#div_'+toDiv).find('a').each(function(e) {
        var attr = $(this).attr('onclick');
        if(attr == "moveUp("+fromDiv+")"){
            $(this).attr("onclick","moveUp("+toDiv+")");
        }
        else if(attr == "deleteDivMessage("+fromDiv+")"){
            $(this).attr("onclick","deleteDivMessage("+toDiv+")");
        }
        else if(attr == "addID("+fromDiv+")"){
            $(this).attr("onclick","addID("+toDiv+")");
        }
    });
}

function editSticker(id){
    $("#editSticker").val(id);
}

function checkMove(){
    var countDiv = $("[id^=div_]").length;
    if(countDiv > 1){
        var divText = '';
        for (var i = 1; i <= countDiv; i++) {
            divText = '';
            if(i == 1) {
                $("#moveAction_"+i).empty();
                divText = "<a onclick='moveDown("+i+")' class='btn btn-xs btn-default'><i class='fa fa-chevron-down text-info'></i>"+ btn_scrolldown + "</a>";
                $("#moveAction_"+i).append(divText);
            }
            if(i == 2) {
                $("#moveAction_"+i).empty();
                if(countDiv > 2){
                    divText = "<a onclick='moveDown("+i+")' class='btn btn-xs btn-default'><i class='fa fa-chevron-down text-info'></i>"+ btn_scrolldown + "</a>";
                }
                divText += "<a onclick='moveUp("+i+")' class='btn btn-xs btn-default'><i class='fa fa-chevron-up text-info'></i>"+ btn_scrollup + "</a>";

                $("#moveAction_"+i).append(divText);
            }
            if(i == 3) {
                $("#moveAction_"+i).empty();
                divText = "<a onclick='moveUp("+i+")' class='btn btn-xs btn-default'><i class='fa fa-chevron-up text-info'></i>"+ btn_scrollup + "</a>";
                $("#moveAction_"+i).append(divText);
            }
        }
    }
    if(countDiv == 1) $("#moveAction_"+countDiv).empty();
}

function addTextPhoto(oldDivTextBox) {
    if(oldDivTextBox==0){
        oldDivTextBox = 1;
        divTextBox = oldDivTextBox;
    } else {
        divTextBox = parseInt(divTextBox)+1;
    }
    $("#divTextBox").val(divTextBox);
    if(divTextBox <= maxTextbox) {
        $("#messageTypes").show();
        createTextBox('photo');
        checkMove();
        if(divTextBox==maxTextbox){
            $("#messageTypes").hide();
        }
    } else {
        $("#messageTypes").hide();
    }
    $("#addRichMessage").attr('disabled', true);
}

function handleFileSelected(input){
    if (input.files && input.files[0]) {
        var textId = input.id;
        var id = textId.split('-');
        var reader = new FileReader();
        var validExtensions = ['jpg','jpeg']; //array of valid extensions
        var type = false;
        if(typeof input.files[0] != 'undefined'){
            var type = input.files[0].name.split('.').pop().toLowerCase();
        }
        if($.inArray(type, validExtensions) == -1){
            $('#file_over_alert').show();
        } else {
            reader.onload = function (e) {
                if(input.files[0].size){
                    var mb = bytesToSize(input.files[0].size);
                } else {
                    var mb = bytesToSize(input.files[0].fileSize);
                }

                if(mb > 10.00) {
                    $('#file_over_alert').show();
                    $('#imagePhoto-'+id[1]).attr('src', $("#holder").attr('src'));
                    return false;
                } else {
                    $('#imagePhoto-'+id[1]).attr('src', e.target.result)
                    var real_photo  = $("input[name='real_photo["+id[1]+"]'");
                    $(real_photo).val(e.target.result);
                }
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
}

function bytesToSize(bytes){
    if (bytes > 0 ){
        return parseFloat((bytes/1024)/1024);
    }
}

function handleFileRichMessageSelected(input){
    if (input.files && input.files[0]) {
        var textId = input.id;
        var id = textId.split('-');
        var reader = new FileReader();
        var validExtensions = ['jpg','jpeg']; //array of valid extensions
        var type = false;
        if(typeof input.files[0] != 'undefined'){
            var type = input.files[0].name.split('.').pop().toLowerCase();
        }
        if($.inArray(type, validExtensions) == -1){
            $('#file_over_alert').show();
        } else {
            reader.onload = function (e) {
                if(input.files[0].size){
                    var mb = bytesToSize(input.files[0].size);
                } else {
                    var mb = bytesToSize(input.files[0].fileSize);
                }

                if(mb > 10.00) {
                    $('#file_over_alert').show();
                    // $('#imagePhoto-'+id[1]).attr('src', $("#holder").attr('src'));
                    return false;
                } else {
                    $('#image-rich-message-show').attr('src', e.target.result);
                    var image_rich_message_upload  = $("input[name='image_rich_message_upload");
                    $(image_rich_message_upload).val(e.target.result);
                }
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
}

function addDivRichMessage(oldDivTextBox){
    if(oldDivTextBox == 0) {
        divTextBox = parseInt(divTextBox)+1;
        $("#divTextBox").val(divTextBox);
        $("#messageTypes").hide();


        if(divTextBox <= maxTextbox) {
            var divText ="<div class='panel panel-default' id='div_"+divTextBox+"'> ";
            divText+="<div class='panel-heading'>";
            divText+="<h1 class='panel-title'>";
            divText+= message_panel_rich_message_header;

            divText +="<a onclick='deleteDivMessage("+divTextBox+")' class='btn btn-xs btn-default pull-right'><i class='fa fa-close text-danger'></i></a>";

            divText +="</h1><div class='clearfix'></div></div>";//close div panel-heading
            divText +="</div>"; //close panel panel-default
            $("#divforMessage").append(divText);
            var rich_message ="<div class='message' id='type_"+ divTextBox +"'>";
            rich_message +="<input type='hidden' name='message_type["+ divTextBox +"]' value='rich_message'>";
            rich_message +="<input type='hidden' name='order_id["+ divTextBox +"]' value='"+divTextBox+"'>";
            rich_message +="</div>";
            $("#div_"+divTextBox).append(rich_message);

            var selectImagesize = 'Select image size :';
            var divRichMessage = "<div class='panel-body'>";
            divRichMessage += "<label>"+selectImagesize+"</label> ";
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='image_size' value='1040x1040' id='1040x1040'> 1040x1040";
            divRichMessage +="</label>";
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='image_size' value='1040x2080' id='1040x2080'> 1040x2080";
            divRichMessage +="</label><br>";

            divRichMessage +="<div style='display: flex'>";
            divRichMessage +="<div class='img-column'>";
            divRichMessage +="<div class='radio'>";
            divRichMessage +="<label>";
            divRichMessage +="<img src='"+imageType1+"' alt='ImageType1' style='margin-bottom: 5px;' width='146px' height='116px'>";
            divRichMessage +="<br>";
            divRichMessage +="<input type='radio' name='imageType' id='imageType1' value='1'><br>";
            divRichMessage +="<br>";
            divRichMessage +="Image Type 1 <a href='"+imageGuild1+"' target='_blank'>(Design Guide)</a>";
            divRichMessage +="</label></div></div>";

             divRichMessage +="<div class='img-column'>";
            divRichMessage +="<div class='radio'>";
            divRichMessage +="<label>";
            divRichMessage +="<img src='"+imageType2+"' alt='ImageType2' style='margin-bottom: 5px;' width='146px' height='116px'>";
            divRichMessage +="<br>";
            divRichMessage +="<input type='radio' name='imageType' id='imageType2' value='2'><br>";
            divRichMessage +="<br>";
            divRichMessage +="Image Type 2 <a href='"+imageGuild2+"' target='_blank'>(Design Guide)</a>";
            divRichMessage +="</label></div></div>";

            divRichMessage +="<div class='img-column'>";
            divRichMessage +="<div class='radio'>";
            divRichMessage +="<label>";
            divRichMessage +="<img src='"+imageType3+"' alt='ImageType3' style='margin-bottom: 5px;' width='146px' height='116px'>";
            divRichMessage +="<br>";
            divRichMessage +="<input type='radio' name='imageType' id='imageType3' value='3'><br>";
            divRichMessage +="<br>";
            divRichMessage +="Image Type 3 <a href='"+imageGuild1+"' target='_blank'>(Design Guide)</a>";
            divRichMessage +="</label></div></div>";

            divRichMessage +="</div><hr>";

            divRichMessage +="<div id='show-photo-rich-message' style='min-height:90px;'>";
            divRichMessage +="<img src='"+showImageBackground+"' id='image-rich-message-show' class='inputfile' style='display:;max-width: 90px; max-height: 90px;'>";
            divRichMessage +="<label class='btn btn-default btn-sm' style='margin-left: 5px; vertical-align: top;'>Upload";
            divRichMessage +="<input type='file' onchange='handleFileRichMessageSelected(this)' accept='image/*'  class='btn btn-default btn-sm' style='margin-left: 5px; vertical-align: top;display:none;'></label>";
            divRichMessage +="<input type='hidden' name='image_rich_message_upload'>";
            divRichMessage +="</div>";
            divRichMessage +="<div>Upload an image that follows the rules explained in the design guide. Images may be <span id='fixSizeImage'>1040x1040</span </div><br> You can send photos of up to 10MB.<hr>";

            divRichMessage +="<div style='display: flex'>";
            divRichMessage +="<table id='img_table'>";
            divRichMessage +="<tr><td class='active' colspan='3' style='height: 75px;cursor:pointer' onclick='changeActive(1,1,this)'>";
            divRichMessage +="<a>Add</a></td></tr>";
            divRichMessage +="<tr>";
            divRichMessage +="<td style='height: 75px;cursor:pointer' onclick='changeActive(1,2,this)'>";
            divRichMessage +="<a>Add</a>";
            divRichMessage +="</td>";

            divRichMessage +="<td style='height: 75px;cursor:pointer' onclick='changeActive(1,3,this)'>";
            divRichMessage +="<a>Add</a>";
            divRichMessage +="</td>";

            divRichMessage +="<td style='height: 75px;cursor:pointer' onclick='changeActive(1,4,this)'>";
            divRichMessage +="<a>Add</a>";
            divRichMessage +="</td>";

            divRichMessage +="</tr></table>";

            divRichMessage +="<label style='margin: 0 50px 0 15px;'>Link :</label>";

            divRichMessage +="<div id='richMessageItem_actions'>";
            // action keyword
            divRichMessage +="<div id='action_type1_keyword'><label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type'  id='action_type1 value='keyword'> Keyword";
            divRichMessage +="</label><br>";
            divRichMessage +="<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModal'>";
            divRichMessage +="Select Keyword</button>";
            divRichMessage +="</div>";

            // //action url
            // divRichMessage +="<label class='radio-inline'>";
            // divRichMessage +="<input type='radio' name='action_type' id='action_type2' value='url'> URL";
            // divRichMessage +="</label><br>";

            divRichMessage +="<div class='div_action' id='action_for_1'></div>";
            divRichMessage +="<div class='div_action' id='action_for_2'></div>";
            divRichMessage +="<div class='div_action' id='action_for_3'></div>";
            divRichMessage +="<div class='div_action' id='action_for_4'></div>";
            divRichMessage +="</div>";//div  richMessageItem_actions
            divRichMessage +="</div></div></div>";

            $("#div_"+divTextBox).append(divRichMessage);
            addLinkActionRichMessage('url',1);
            $("#1040x1040").prop('checked', true);
            $("#imageType1").prop('checked', true);
            $("#action_type1").prop('checked', true);
            $("#action_type2").prop('checked', true);
            $("#action_type3").prop('checked', true);
            $("#action_type4").prop('checked', true);

            $("#action_type1_keyword").removeClass("hidden");
            $("#action_type2_keyword").addClass("hidden");
            $("#action_type3_keyword").addClass("hidden");
            $("#action_type4_keyword").addClass("hidden");

            $("#action_type1_url").addClass("hidden");
            $("#action_type2_url").addClass("hidden");
            $("#action_type3_url").addClass("hidden");
            $("#action_type4_url").addClass("hidden");
            /*
            * select image
            */
            $("input[name=image_size]:radio").change(function () {
                $("#fixSizeImage").html($(this).val());
            });
            // image type
            $("input[name=imageType]:radio").change(function () {
                $("#image-rich-message-show").attr('src',showImageBackground);
                $("#richMessageItem_actions").html('');
                addActionRichMessage($(this).val());
                addLinkActionRichMessage('url',$(this).val());

            });

            // //action type
            // $("input[name=action_type]:radio").change(function () {
            //     addLinkActionRichMessage($(this).val());
            // });

        } else {
            $("#messageTypes").hide();
        }
    }

}

function addActionRichMessage(type){
    var divRichMessage = '';
    $("#img_table td.active").removeClass('active');
    if(type == 1) {
        divRichMessage +="<tr>";
        divRichMessage +="<td class='active' colspan='3' style='height: 75px;cursor:pointer' onclick='changeActive(1,1,this);'>";
        divRichMessage +="<a>Add</a>";
        divRichMessage +="</td></tr>";
        divRichMessage +="<tr>";
        divRichMessage +="<td style='height: 75px;cursor:pointer' onclick='changeActive(1,2,this);'>";
        divRichMessage +="<a>Add</a>";
        divRichMessage +="</td>";

        divRichMessage +="<td style='height: 75px;cursor:pointer' onclick='changeActive(1,3,this);'>";
        divRichMessage +="<a>Add</a>";
        divRichMessage +="</td>";

        divRichMessage +="<td style='height: 75px;cursor:pointer' onclick='changeActive(1,4,this);'>";
        divRichMessage +="<a>Add</a>";
        divRichMessage +="</td>";
        divRichMessage +="</tr>";
    } else if(type == 2) {
        divRichMessage +="<tr>";
        divRichMessage +="<td class='active' style='height: 150px;cursor:pointer' onclick='changeActive(2,1,this);'>";
        divRichMessage +="<a>Add</a>";
        divRichMessage +="</td>";

        divRichMessage +="<td style='height: 150px;cursor:pointer' onclick='changeActive(2,2,this);'>";
        divRichMessage +="<a>Add</a>";
        divRichMessage +="</td>";
        divRichMessage +="</tr>";
    } else if(type == 3) {
        divRichMessage +="<tr>";
        divRichMessage +="<td class='active'  style='height: 150px;cursor:pointer' onclick='changeActive(3,1,this);'>";
        divRichMessage +="<a>Add</a>";
        divRichMessage +="</td>";
        divRichMessage +="</tr>";
    }
    $("#img_table").html(divRichMessage);
}

function changeActive(type, position, obj) {
    $("#img_table td.active").removeClass('active');
    if(obj) {
        $(obj).addClass('active');
        $(".div_action").addClass('hidden');
        $("#action_for_"+position).removeClass('hidden');
        $("#action_for_"+position).removeClass('hidden');
        $("#action_type"+position+"_keyword").removeClass('hidden');
    }
}

function genInputAction(imageType, type){
    var richActionImage = '';
    $("#richMessageItem_actions").html('');
    if(imageType == 1){
        richActionImage +="<div class='div_action' id='action_for_1'>";
        richActionImage +="<div id='action_type1_keyword'><label class='radio-inline'>";
        richActionImage +="<input type='radio' name='actions_order[1]' id='action_type1' value='keyword'> Keyword";
        richActionImage +="</label><br>";
        richActionImage +="<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
        richActionImage +="Select Keyword</button>";
        richActionImage +="</div>";

        richActionImage +="<div id='action_type1_url'><label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]' value='url'> URL";
        richActionImage +="</label><br>";
        richActionImage +="<input class='' type='text' name='actions_order[1]' placeholder='http://' class='form-control' style='width: 300px;''>";
        richActionImage +="</div></div>";

        richActionImage +="<div class='div_action hidden' id='action_for_2'>";
        richActionImage +="<div id='action_type2_keyword'><label class='radio-inline'>";
        richActionImage +="<input type='radio' name='actions_order[2]' id='action_type2' value='keyword'> Keyword";
        richActionImage +="</label><br>";
        richActionImage +="<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
        richActionImage +="Select Keyword</button>";
        richActionImage +="</div>";

        richActionImage +="<div id='action_type2_url'><label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[2]' value='url'> URL";
        richActionImage +="</label><br>";
        richActionImage +="</div>";
        richActionImage +="</div>";

        richActionImage +="<div class='div_action hidden' id='action_for_3'>";
        richActionImage +="<div id='action_type3_keyword'><label class='radio-inline'>";
        richActionImage +="<input type='radio' name='actions_order[3]' id='action_type3' value='keyword'> Keyword";
        richActionImage +="</label><br>";
        richActionImage +="<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
        richActionImage +="Select Keyword</button>";
        richActionImage +="</div>";


        richActionImage +="<label class='radio-inline' id='action_type3_url'>";
        richActionImage +="<div id='action_type3_url'><input type='radio' name='action_type[3]' value='url'> URL";
        richActionImage +="</label><br>";
        richActionImage +="<input class='' type='text' name='actions_order[3]' placeholder='http://' class='form-control' style='width: 300px;''>";
        richActionImage +="</div>";
        richActionImage +="</div>";

        richActionImage +="<div class='div_action hidden' id='action_for_4'>";
        richActionImage +="<div id='action_type4_keyword'><label class='radio-inline'";
        richActionImage +="<input type='radio' name='actions_order[4]' id='action_type4' value='keyword'> Keyword";
        richActionImage +="</label><br>";
        richActionImage +="<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
        richActionImage +="Select Keyword</button>";
        richActionImage +="</div>"

        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<div id='action_type3_url'><input type='radio' name='action_type[4]'  value='url'> URL";
        richActionImage +="</label><br>";
        richActionImage +="<input class='' type='text' name='actions_order[4]' placeholder='http://' class='form-control' style='width: 300px;''>";
        richActionImage +="</div>";
        richActionImage +="</div>";

    } else if (imageType == 2) {
        richActionImage +="<div class='div_action' id='action_for_1'>";
        richActionImage +="<div id='action_type3_keyword'><label class='radio-inline'>";
        richActionImage +="<input type='radio' name='actions_order[1]' id='action_type1' value='keyword'> Keyword";
        richActionImage +="</label><br>";
        richActionImage +="<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
        richActionImage +="Select Keyword</button>";
        richActionImage +="</div>"

        richActionImage +="<div id='action_type1_url'><label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]'  value='url'> URL";
        richActionImage +="</label><br>";
        richActionImage +="<input class='' type='text' name='actions_order[1]' placeholder='http://' class='form-control' style='width: 300px;''>";
        richActionImage +="</div>";
        richActionImage +="</div>";

        richActionImage +="<div class='div_action hidden' id='action_for_2'>";
        richActionImage +="<div id='action_type3_keyword'><label class='radio-inline'>";
        richActionImage +="<input type='radio' name='actions_order[2]' id='action_type2' value='keyword'> Keyword";
        richActionImage +="</label><br>";
        richActionImage +="<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
        richActionImage +="Select Keyword</button>";
        richActionImage +="</div>";

        richActionImage +="<div id='action_type2_url'><label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[2]'  value='url'> URL";
        richActionImage +="</label><br>";
        richActionImage +="<input class='' type='text' name='actions_order[2]' placeholder='http://' class='form-control' style='width: 300px;''>";
        richActionImage +="</div>";
        richActionImage +="</div>";

    } else if (imageType == 3) {
        richActionImage +="<div class='div_action' id='action_for_1'>";
        richActionImage +="<div id='action_type1_keyword'><label class='radio-inline'>";
        richActionImage +="<input type='radio' name='actions_order[1]' value='keyword'> Keyword";
        richActionImage +="</label><br>";
        richActionImage +="<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
        richActionImage +="Select Keyword</button>";
        richActionImage +="</div>";


        richActionImage +="<div id='action_type1_url'><label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]' id='action_type1' value='url'> URL";
        richActionImage +="</label><br>";
        richActionImage +="<input class='' type='text' name='actions_order[1]' placeholder='http://' class='form-control' style='width: 300px;''>";
        richActionImage +="</div>";
        richActionImage +="</div>";
    }
    return richActionImage;
}

function addLinkActionRichMessage(value, type) {
    if(value =='url'){
        var imageTypes = $("input[name=imageType]:radio");
        var typelength = imageTypes.length;
        var imageTypeChecked =1;
        for (var i = 0; i < typelength ; i++) {
            if($("#"+imageTypes[i].id).prop('checked')){
                imageTypeChecked  = $("#"+imageTypes[i].id).val();
            }
        }
        var htmlresult = genInputAction(imageTypeChecked, type);
        $("#richMessageItem_actions").html(htmlresult);
        if(type == 1) {
            $("#action_type2").prop('checked', true);
            $("#action_type3").prop('checked', true);
            $("#action_type4").prop('checked', true);
        } else if(type == 2) {
            $("#action_type2").prop('checked', true);
            $("#action_type3").prop('checked', true);
        } else if(type == 3) {
            $("#action_type4").prop('checked', true);
        }
        $("#action_type1").prop('checked', true);
    }  else if(value == 'keyword') {
        /*
         call ajax with company to list keyword tag -> first

            $.ajax({
                    type     : "GET",
                    url      : '/api/v1/balance_sheet/'+balance_sheet_ID,
                    success  : function(data)
                    {

                    }
            })



            <a class="btn btn-default btn-sm" data-toggle="modal" data-target="#richModal">Select Keyword</a>
            <div class="modal fade" id="richModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th width="100px"></th>
                                    <th>Main Keyword</th>
                                    <th>Additional Keywords</th>
                                    <th>Content</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach(range(1,4)as $i)
                                    <tr>
                                        <td><a href="#" class="btn btn-default">Select</a></td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test Keyword</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        */
    } else {
        $("#richMessageItem_actions").html('');
    }
}

