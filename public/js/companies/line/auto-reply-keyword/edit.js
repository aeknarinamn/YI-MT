$(function() {
    checkMove();
	//for have Data & old error
    $('[data-daterangepicker]').daterangepicker({
        //autoApply: true,
        "timePicker" : true,
        "timePicker24Hour" : true,
        autoUpdateInput: false,

        locale: {
            format:'DD/MM/YYYY HH:mm',
            cancelLabel: 'Clear'
        },

    });
    /**
     *  Fix show Old Date in JS
     *
     */
    var fix_sent_date_error_for_show_only = $("#fix_sent_date_error_for_show_only");
    if($("#fix_sent_date_error_for_show_only").val() != undefined){
        var dates = $("#fix_sent_date_error_for_show_only").val().split('~');

        $('[data-daterangepicker]').daterangepicker({
            //autoApply: true,
            "timePicker" : true,
            "timePicker24Hour" : true,
            autoUpdateInput: false,

            locale: {
                format:'DD/MM/YYYY HH:mm',
                cancelLabel: 'Clear'
            },
            startDate: $.trim(dates[0]),
            endDate: $.trim(dates[1]),
        });
    }
     /**
     *  End Fix show Old Date in JS
     *
     */
    $('[data-daterangepicker]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('DD/MM/YYYY HH:mm') + ' ~ ' + picker.endDate.format('DD/MM/YYYY HH:mm'));
    });

    $('[data-daterangepicker]').on('cancel.daterangepicker', function(ev, picker) {
          $(this).val('');
    });


    $('#ClickWordList li').click(function() {
        $("#txtMessage").insertAtCaret($(this).text());
        return false
    });
    $("#DragWordList li").draggable({helper: 'clone'});
    $(".txtDropTarget").droppable({
        accept: "#DragWordList li",
        drop: function(ev, ui) {
            myValue = " "+"(["+ui.draggable.text()+"])"+" ";
            $(this).append( myValue );
            var id = $(this).attr('id');
            id = id.split("-");
            addID(id[1]);
            copyDataTextMessage();
            //$(this).insertAtCaret(ui.draggable.text());
            // $(this).insertAtCaret(ui.draggable.text());
        }
    });

    // $("#DragWordList-DynamicContent li").draggable({helper: 'clone'});
    // $(".txtDropTarget").droppable({
    //     accept: "#DragWordList-DynamicContent li",
    //     drop: function(ev, ui) {
    //         myValue = " "+"(["+ui.draggable.text()+"])"+" ";
    //         $(this).append( myValue );
    //         var id = $(this).attr('id');
    //         id = id.split("-");
    //         addID(id[1]);
    //         copyDataTextMessage();
    //         //$(this).insertAtCaret(ui.draggable.text());
    //         // $(this).insertAtCaret(ui.draggable.text());
    //     }
    // });

    //copy from campaign   =>  complete to delete comment
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
});

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
    if(nextMove <= 5 ){
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

        //old photo
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

        //new photo
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
        checkMove();
    }
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
    if(nextMove <=5 ){
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
     checkMove();
    }
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

var maxTextbox = 5;
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
        if(divTextBox != 5 && divTextBox !=1) {
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
        // divEmoji +="</div>";
        // $("#div_"+divTextBox).append(divEmoji);

        if(type == 'text'){
            // var divTextMessage ="<div id='text_wrapper"+ divTextBox +"'>";
            // divTextMessage +="<div class='txtDropTarget ui-droppable' id='text-"+divTextBox+"' onblur='copyDataTextMessage();' onclick='setTagetDiv("+divTextBox+")' contentEditable='true' hidefocus='true' style='z-index: auto; position: relative;line-height: 20px;font-size: 14px;transition: none;margin-top: 0px;margin-bottom: 0px;min-height: 94px;max-height: 140px;padding: 10px;background: transparent !important'>";
            // divTextMessage +=divTextBox+''+divTextBox+''+divTextBox+"</div></div>";
            // divTextMessage +="</div></div>";
            // divTextMessage +="<textarea name='payload["+ divTextBox +"]' style='display:none' id='txtMessage-"+ divTextBox +"' class='form-control txtDropTarget' rows='4'></textarea>";
            // $("#div_"+divTextBox).append(divTextMessage);

            // var divTextMessage ="<div id='text_wrapper"+ divTextBox +"'>";
            divEmoji +="<div id='text_wrapper"+ divTextBox +"'>";
            divEmoji +="<div class='txtDropTarget ui-droppable' id='text-"+divTextBox+"' onblur='copyDataTextMessage();' onclick='setTagetDiv("+divTextBox+")' contentEditable='true' hidefocus='true' style='z-index: auto; position: relative;line-height: 20px;font-size: 14px;transition: none;margin-top: 0px;margin-bottom: 0px;min-height: 94px;max-height: 140px;padding: 10px;background: transparent !important'>";
            // divTextMessage +=divTextBox+''+divTextBox+''+divTextBox+"</div></div>";
            divEmoji +="</div></div>";
            divEmoji +="<textarea name='payload["+ divTextBox +"]' style='display:none' id='txtMessage-"+ divTextBox +"' class='form-control txtDropTarget' rows='4'></textarea>";

            divEmoji +="</div>";
            // $("#div_"+divTextBox).append(divEmoji);

            $("#div_"+divTextBox).append(divEmoji);

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
                }
            });
        } else if(type == 'photo'){
            var holderSrc = $("#holder").attr('src');

            var divTextPhoto = "<div class='panel-body'>";
            // divTextPhoto += "<div id='show-photo-"+divTextBox+"'><img src='"+holder+"' id='imagePhoto-"+divTextBox+"' class='inputfile' style='display:none;width: 50px; height: 50px;'><i class='fa fa-photo fa-3x inputfile'></i>";
            divTextPhoto += "<div id='show-photo-"+divTextBox+"' style='min-height:90px;'><img data-toggle='modal' data-target='#photoModal' src='"+holderSrc+"' id='imagePhoto-"+divTextBox+"' class='inputfile' style='display:;max-width: 90px; max-height: 90px;cursor:pointer;'>";
            divTextPhoto += "<label class='btn btn-default btn-sm' style='margin-left: 5px; vertical-align: top;'>"+upload+"<input type='file'  accept='image/*' onchange='handleFileSelected(this)' id='photo-"+divTextBox+"' name='photo["+divTextBox+"]' class='btn btn-default btn-sm' style='margin-left: 5px; vertical-align: top;display:none;'></label>";
            divTextPhoto += "</div>You can send photos of up to 10MB.</div>";
            divTextPhoto += "<input type='hidden' id='real_photo["+divTextBox+"]' name='real_photo["+divTextBox+"]'>";
            divEmoji +="</div>";

            $("#div_"+divTextBox).append(divEmoji);
            // $("#div_"+divTextBox).append(divTextPhoto);
            $("#div_"+divTextBox).append(divTextPhoto);
        } else if(type == 'sticker') {
            divEmoji +="</div>";
            $("#div_"+divTextBox).append(divEmoji);
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
    // var emoJiImg = "&nbsp;<img id='message_emoji' height='30px' src='"+path+"'>&nbsp;";
     var emoJiImg = "&nbsp;<img height='30px' src='"+path+"'>";

    $("#text-"+$("#emojiTaget").val()).focus();
    pasteHtmlAtCaret(emoJiImg, false);

    // {[emoji_001]}
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
        if(countDiv >= 2){
            //3 => 2
            var divToTarget = $("#div_"+parseInt(id+1)).html($("#div_"+parseInt(id+2)).html()); // copy Data to Div ID
            $("#div_"+parseInt(id+1)).attr('style',$("#div_"+parseInt(id+2)).attr('style'));
            moveDiv(parseInt(id+2),parseInt(id+1));

            if(countDiv == 2) {
                $("#div_"+parseInt(id+1)).remove();
            }
            else if(countDiv == 3) {
                $("#div_"+parseInt(id+2)).remove();
            }
            else if(countDiv == 4) {
                //4 => 3
                var divToTarget = $("#div_"+parseInt(id+2)).html($("#div_"+parseInt(id+3)).html()); // copy Data to Div ID
                $("#div_"+id).attr('style',$("#div_"+parseInt(id+1)).attr('style'));
                moveDiv(parseInt(id+3),parseInt(id+2));
                $("#div_"+parseInt(id+3)).remove();
            }
            else if(countDiv == 5) {
                //4=>3
                var divToTarget = $("#div_"+parseInt(id+2)).html($("#div_"+parseInt(id+3)).html()); // copy Data to Div ID
                $("#div_"+id).attr('style',$("#div_"+parseInt(id+1)).attr('style'));
                moveDiv(parseInt(id+3),parseInt(id+2));
                //5=>4
                var divToTarget = $("#div_"+parseInt(id+3)).html($("#div_"+parseInt(id+4)).html()); // copy Data to Div ID
                $("#div_"+parseInt(id+3)).attr('style',$("#div_"+parseInt(id+4)).attr('style'));
                moveDiv(parseInt(id+4),parseInt(id+3));
                $("#div_"+parseInt(id+4)).remove();
            }
        } else if(countDiv == 1){
            $("#div_"+id).remove();
        }
    } else if(id == 2){
        $("#div_"+id).html(''); // clear Data
        //3=>2
        var divToTarget = $("#div_"+id).html($("#div_"+parseInt(id+1)).html()); // copy Data to Div ID
        $("#div_"+id).attr('style',$("#div_"+parseInt(id+1)).attr('style'));
        moveDiv(parseInt(id+1),id);
        if(countDiv > 2){
            if(countDiv == 3) {
                $("#div_"+parseInt(id+1)).remove();
            }
            else if(countDiv == 4) {
                //4 => 3
                var divToTarget = $("#div_"+parseInt(id+1)).html($("#div_"+parseInt(id+2)).html()); // copy Data to Div ID
                $("#div_"+parseInt(id+1)).attr('style',$("#div_"+parseInt(id+2)).attr('style'));
                moveDiv(parseInt(id+2),parseInt(id+1));
                $("#div_"+parseInt(id+2)).remove();
            }
            else if(countDiv == 5) {
                //4 => 3
                var divToTarget = $("#div_"+parseInt(id+1)).html($("#div_"+parseInt(id+2)).html()); // copy Data to Div ID
                $("#div_"+parseInt(id+1)).attr('style',$("#div_"+parseInt(id+2)).attr('style'));
                moveDiv(parseInt(id+2),parseInt(id+1));
                $("#div_"+parseInt(id+2)).html('');
                //5=>4
                var divToTarget = $("#div_"+parseInt(id+2)).html($("#div_"+parseInt(id+3)).html()); // copy Data to Div ID
                $("#div_"+parseInt(id+2)).attr('style',$("#div_"+parseInt(id+3)).attr('style'));
                moveDiv(parseInt(id+3),parseInt(id+2));
                $("#div_"+parseInt(id+3)).remove();
            }
        } else if(countDiv == 2){
            $("#div_"+id).remove();
        }
    } else if(id == 3){
        $("#div_"+id).html(''); // clear Data
        //4=>3
        var divToTarget = $("#div_"+id).html($("#div_"+parseInt(id+1)).html()); // copy Data to Div ID
        $("#div_"+id).attr('style',$("#div_"+parseInt(id+1)).attr('style'));
        moveDiv(parseInt(id+1),id);
        $("#div_"+parseInt(id+1)).html(''); // clear Data
        //5=>4
        var divToTarget = $("#div_"+parseInt(id+1)).html($("#div_"+parseInt(id+2)).html()); // copy Data to Div ID
        $("#div_"+id).attr('style',$("#div_"+parseInt(id+1)).attr('style'));
        moveDiv(parseInt(id+2),parseInt(id+1));

        if(countDiv > 3){
            if(countDiv == 4) {
                $("#div_"+parseInt(id+1)).remove();
            } else if(countDiv == 5) {
                $("#div_"+parseInt(id+2)).remove();
            }
        } else if(countDiv == 3){
            $("#div_"+id).remove();
        }
    } else if(id == 4){
        $("#div_"+id).html(''); // clear Data
        var divToTarget = $("#div_"+id).html($("#div_"+parseInt(id+1)).html()); // copy Data to Div ID
        $("#div_"+id).attr('style',$("#div_"+parseInt(id+1)).attr('style'));
        moveDiv(parseInt(id+1),id);
        $("#div_"+parseInt(id+1)).html('');
        $("#div_"+parseInt(id+1)).remove();
        if(countDiv == 4) {
            $("#div_"+parseInt(id)).remove();
        }
    } else if(id == 5){
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
    if(parseInt(countDiv) < 5){
        $("#messageTypes").show();
    }
    if(countDiv == 0) {
        $("#addRichMessage").attr('disabled', false);
    } else {
        $("#addRichMessage").attr('disabled', true);
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
            if(i == 2 || i == 3 || i == 4) {
                $("#moveAction_"+i).empty();
                if(countDiv > 2 && i != countDiv){
                    divText = "<a onclick='moveDown("+i+")' class='btn btn-xs btn-default'><i class='fa fa-chevron-down text-info'></i>"+ btn_scrolldown + "</a>";
                }
                divText += "<a onclick='moveUp("+i+")' class='btn btn-xs btn-default'><i class='fa fa-chevron-up text-info'></i>"+ btn_scrollup + "</a>";

                $("#moveAction_"+i).append(divText);
            }
            if(i == 5) {
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
        var validExtensions = ['jpg','jpeg', 'png']; //array of valid extensions
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
                     $('#photo-'+id[1]).val("");
                    $('#imagePhoto-'+id[1]).attr('src', $("#holder").attr('src'));
                    return false;
                } else {
                     $('#photo-'+id[1]).val("");
                    $('#imagePhoto-'+id[1]).attr('src', e.target.result);
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


function pasteHtmlAtCaret(html, selectPastedContent) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            var firstNode = frag.firstChild;
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                if (selectPastedContent) {
                    range.setStartBefore(firstNode);
                } else {
                    range.collapse(true);
                }
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        // IE < 9
        var originalRange = sel.createRange();
        originalRange.collapse(true);
        sel.createRange().pasteHTML(html);
        if (selectPastedContent) {
            range = sel.createRange();
            range.setEndPoint("StartToStart", originalRange);
            range.select();
        }
    }
}

function chkNumber(ele) {
    var vchar = String.fromCharCode(event.keyCode);
    if ((vchar<'0' || vchar>'9') && (vchar != '.')) return false;
    ele.onKeyPress=vchar;
}