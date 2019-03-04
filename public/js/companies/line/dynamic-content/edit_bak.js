$(function () {
    // $("#entry_form").submit(function() {
    // var hiddenElements = $("div:hidden");
    // hiddenElements.remove();
    // $("#includeData").remove();
    // });
  
    $('#ClickWordList li').click(function () {
        $("#txtMessage").insertAtCaret($(this).text());
        return false
    });
    $("#DragWordList li").draggable({helper: 'clone'});
    
    $(".txtDropTarget").droppable({
        accept: "#DragWordList li",
        drop: function (ev, ui) {
            var _element = $(ui.draggable["0"]).data("formats");
            //console.log(_element+""+ui.draggable.text());
            //myValue = " " + "([" + _element + "])" + " ";
            myValue = " "+_element+""+ui.draggable.text()+" ";
            $(this).append(myValue);
            var id = $(this).attr('id');
            id = id.split("-");
            addID(id[1]);
            copyDataTextMessage();
            // $(this).insertAtCaret(ui.draggable.text());
        }
    });

    $('#ruleTable tbody tr').on('click', function (event) {
        $(this).addClass('highlight').siblings().removeClass('highlight');
    });

    var table = $('#ruleTable').DataTable();
    $('#ruleTable tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        console.log(data);
    });

    startFunctional();

});

$.fn.insertAtCaret = function (myValue) {
    myValue = " " + "<" + myValue + ">" + " ";
    return this.each(function () {
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
            this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
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

function copyDataTextMessage() {
    $('#txtMessage-' + $("#emojiTaget").val()).val('');
    var divTarget = "text-" + $("#emojiTaget").val();
    var ini = $("#" + divTarget).html().replace(/<br>/g, '\n');
    ini = ini.replace(/<\/div>/g, "");
    ini = ini.replace(/<div>/g, '\n');
    var targets = $("#" + divTarget).find("img");
    var index = targets.length;
    for (var i = 0; i <= index; i++) {
        if (targets[i] != undefined) {
            var fileName = $.trim(targets[i].src);
            fileName = fileName.split('/');
            ini = ini.replace(targets[i].outerHTML, "@##{[" + fileName[5] + "]}@###");
            delete fileName;
        }
    }
    $('#txtMessage-' + $("#emojiTaget").val()).val(ini);
}

function addID(id) {
    $("#emojiTaget").val(id);
}

function addEmoji(path, nameSticker) {
    var divTarget = "text-" + $("#emojiTaget").val();
    var emoJiImg = "<img id='message_emoji' height='30px' src='" + path + "'>";
    $("#" + divTarget).append(emoJiImg);
    var ini = $("#" + divTarget).html().replace(/<br>/g, '\n');
    ini = ini.replace(/<\/div>/g, "");
    ini = ini.replace(/<div>/g, '\n');
    var targets = $("#" + divTarget).find("img");
    var index = targets.length;
    for (var i = 0; i <= index; i++) {
        if (targets[i] != undefined) {
            var fileName = targets[i].src;
            fileName = fileName.split('/');

            ini = ini.replace(targets[i].outerHTML, "@##{[" + fileName[5] + "]}@###");
            delete fileName;
        }
    }
    $('#txtMessage-' + $("#emojiTaget").val()).val(ini);
    $('#emojiModal').modal('toggle');
}

function setTagetDiv(id) {
    $("#emojiTaget").val(id);
}


function submitForm() {
    var hiddenElements = $("div:hidden");
    hiddenElements.remove();
    document.getElementById('entry_form').submit();
}

function startFunctional() {
    $('.selectpicker').data('selectpicker', null);
    $('.bootstrap-select').remove();
    $('.selectpicker').selectpicker();
    $('[data-daterangepicker]').daterangepicker({
        autoApply: true,
        autoUpdateInput: true,
        locale: {
            format: 'DD/MM/YYYY'
        },
        "singleDatePicker": true,
    });

    $('[data-daterangepicker-range]').daterangepicker({
        autoApply: true,
        autoUpdateInput: true,
        locale: {
            format: 'DD/MM/YYYY'
        },
    });
}

function checkFunctionSubscriberData(data,index){
    // console.log(data.value);
    // console.log(index);
    var conditionDateAdded = $('#modal-rule-'+index+' #condition_date_added');
    var operationDateAdded = $('#modal-rule-'+index+' #operation_date_added');
    var operationDateBetween = $('#modal-rule-'+index+' #operation_date_between');
    var conditionField = $('#modal-rule-'+index+' #condition_field');
    var operationField = $('#modal-rule-'+index+' #operation_field');
    var conditionFieldEnum = $('#modal-rule-'+index+' #condition_field_enum');
    var selectFieldEnum = $('#modal-rule-'+index+' #condition_field_enum select');
    var operationRelativeDate = $('#modal-rule-'+index+' #operation_relative_date');
    var operationAbsoluteDate = $('#modal-rule-'+index+' #operation_absolute_date');
    var operandAbsoluteDate = $('#modal-rule-'+index+' #operand_absolute_date');
    var operand2AbsoluteDate = $('#modal-rule-'+index+' #operand_2_absolute_date');
    var conditionNumber = $('#modal-rule-'+index+' #condition_number');
    var operationNumber = $('#modal-rule-'+index+' #operation_number');
    var operandNumberAnd = $('#modal-rule-'+index+' #operand_number_and');
    var operandNumber = $('#modal-rule-'+index+' #operand_number');
    $('#modal-rule-'+index+' .action-rule').hide();
    if(data.value == 'date_added'){
        conditionDateAdded.show();
        operationDateAdded.show();
    }else{
        var fieldID = data.value;
        $.ajax({
            type: "GET",
            url : "/api/v1/field/"+fieldID,
            success: function(response){
                $('#modal-rule-'+index+' .action-rule').hide();
                if(response.field_type == 'enum'){
                    selectFieldEnum.find('option').remove();
                    selectFieldEnum.append(new Option('All','all', false, false));
                    $.each(response.field_items, function( index, value ) {
                        selectFieldEnum.append(new Option(value.value,value.value, false, false));
                    });
                    conditionFieldEnum.show();
                    selectFieldEnum.selectpicker('refresh');
                }else if(response.field_type == 'integer' || response.field_type == 'decimal'){
                    conditionNumber.show();
                    operationNumber.show();
                }else{
                    conditionField.show();
                    conditionField.find('select').val("is").change();
                    operationField.show();
                    operationField.find('input[type="text"]').val("");
                }
            }
        });
    }
}

function checkFunctionSubscriberDateAdded(data,index){
    // $('#modal-rule-'+index+' .action-rule').hide();
    var conditionDateAdded = $('#modal-rule-'+index+' #condition_date_added');
    var operationDateAdded = $('#modal-rule-'+index+' #operation_date_added');
    var operationDateBetween = $('#modal-rule-'+index+' #operation_date_between');
    var operationRelativeDate = $('#modal-rule-'+index+' #operation_relative_date');
    var operationAbsoluteDate = $('#modal-rule-'+index+' #operation_absolute_date');
    var operandAbsoluteDate = $('#modal-rule-'+index+' #operand_absolute_date');
    var operand2AbsoluteDate = $('#modal-rule-'+index+' #operand_2_absolute_date');
    operationDateAdded.hide();
    operationDateBetween.hide();
    operationRelativeDate.hide();
    operationAbsoluteDate.hide();
    operandAbsoluteDate.hide();
    operand2AbsoluteDate.hide();
    if(data.value == 'is between'){
        operationDateBetween.show();
    }else if(data.value == 'relative date'){
        operationRelativeDate.show();
    }else if(data.value == 'absolute date'){
        operationAbsoluteDate.show();
        operandAbsoluteDate.show();
        operand2AbsoluteDate.show();
    }else{
        operationDateAdded.show();
    }
}
    
function checkFunctionSubscriberNumber(data,index){
    // console.log();
    var operationNumber = $('#modal-rule-'+index+' #operation_number');
    var operandNumberAnd = $('#modal-rule-'+index+' #operand_number_and');
    var operandNumber = $('#modal-rule-'+index+' #operand_number');
    operationNumber.hide();
    operandNumberAnd.hide();
    operandNumber.hide();
    if(data.value == 'is empty' || data.value == 'is not empty'){
        
    }else if(data.value == 'is between'){
        operationNumber.show();
        operandNumberAnd.show();
        operandNumber.show();
    }else{
        operationNumber.show();
    }
}

function checkFunctionField(data,index){
    // console.log();
    var operationField = $('#modal-rule-'+index+' #operation_field');
    if(data.value == 'is empty' || data.value == 'is not empty'){
        operationField.hide();
    }else{
        operationField.show();
    }
}

function addRuleDynamicContent(index){
    var indexRow = $("#dynamic-show .dynamic-rule-item").length + 1;
    var targetText = $("#modal-rule-"+index+" select[name='rule["+index+"][target]'] option:selected").text();
    var targetVal = $("#modal-rule-"+index+" select[name='rule["+index+"][target]']").val();
    var descriptionVal = $("#modal-rule-"+index+" textarea[name='rule["+index+"][description]']").val();
    // var rowSetData = "<tr class='dynamic-rule-item'>";
    var condition = "";
    var operation = "";
    var operand = "";
    var operand2 = "";
    var type = "";
    // console.log(targetVal);
    if(targetVal == 'date_added'){
        condition = $("#modal-rule-"+index+" #condition_date_added select[name='rule["+index+"][condition]']").val();
        if(condition == 'is between'){
            operation = $("#modal-rule-"+index+" #operation_date_between input[name='rule["+index+"][operation]']").val();
            // console.log(operation);
        }else if(condition == 'relative date'){
            operation = $("#modal-rule-"+index+" #operation_relative_date select[name='rule["+index+"][operation]']").val();
        }else if(condition == 'absolute date'){
            operation = $("#modal-rule-"+index+" #operation_absolute_date input[name='rule["+index+"][operation]']").val();
            operand = $("#modal-rule-"+index+" #operand_absolute_date select[name='rule["+index+"][operand]']").val();
            operand2 = $("#modal-rule-"+index+" #operand_2_absolute_date select[name='rule["+index+"][operand_2]']").val();
        }else{
            operation = $("#modal-rule-"+index+" #operation_date_added input[name='rule["+index+"][operation]']").val();
        }
        type = 'date_added';
        addRow(index,indexRow,descriptionVal,targetText,targetVal,condition,operation,operand,operand2,type);
    }else{
        var fieldID = targetVal;
        $.ajax({
            type: "GET",
            url : "/api/v1/field/"+fieldID,
            success: function(response){
                // console.log(response.field_type);
                if(response.field_type == 'enum'){
                    condition = $("#modal-rule-"+index+" #condition_field_enum select[name='rule["+index+"][condition]']").val();
                    // console.log(condition);
                }else if(response.field_type == 'integer' || response.field_type == 'decimal'){
                    condition = $("#modal-rule-"+index+" #condition_number select[name='rule["+index+"][condition]']").val();
                    if(condition == 'is between'){
                        operation = $("#modal-rule-"+index+" #operation_number input[name='rule["+index+"][operation]']").val();
                        operand = $("#modal-rule-"+index+" #operand_number input[name='rule["+index+"][operand]']").val();
                    }else{
                        if(condition != 'is empty' && condition != 'is not empty'){
                            operation = $("#modal-rule-"+index+" #operation_number input[name='rule["+index+"][operation]']").val();
                            // console.log(operation);
                        }
                    }
                }else{
                    condition = $("#modal-rule-"+index+" #condition_field select[name='rule["+index+"][condition]']").val();
                    if(condition != 'is empty' && condition != 'is not empty'){
                        operation = $("#modal-rule-"+index+" #operation_field input[name='rule["+index+"][operation]']").val();
                    }
                    // console.log(condition);
                }
                type = response.field_type;
                addRow(index,indexRow,descriptionVal,targetText,targetVal,condition,operation,operand,operand2,type);
            }
        });
    }
    // console.log("2");
    // rowSetData += "<td><input type='checkbox' value=''></td>";
    // rowSetData += "<td>"+indexRow+"</td>";
    // rowSetData += "<td>"+descriptionVal+"</td>";
    // rowSetData += "<td>"+targetText+"</td>";
    // rowSetData += "<td hidden><input type='hidden' name='rule["+indexRow+"][target]' value='"+targetVal+"'></td>";
    // rowSetData += "<td hidden><input type='hidden' name='rule["+indexRow+"][description]' value='"+descriptionVal+"'></td>";
    // rowSetData += "<td hidden><input type='hidden' name='rule["+indexRow+"][condition]' value='"+condition+"'></td>";
    // rowSetData += "<td hidden><input type='hidden' name='rule["+indexRow+"][operation]' value='"+operation+"'></td>";
    // rowSetData += "<td hidden><input type='hidden' name='rule["+indexRow+"][operand]' value='"+operand+"'></td>";
    // rowSetData += "<td hidden><input type='hidden' name='rule["+indexRow+"][operand2]' value='"+operand2+"'></td>";
    // rowSetData += "</tr>";
    // $("#dynamic-show").append(rowSetData);
    // var table = $('#ruleTable').DataTable();
    // $('#modal-rule-'+index).modal('toggle');
    // table.row.add( $(rowSetData)[index] ).draw();
    // console.log(rowSetData);
}

function addRow(index,indexRow,descriptionVal,targetText,targetVal,condition,operation,operand,operand2,type){
    var rowSetData = "<tr class='dynamic-rule-item'>";
    rowSetData += "<td><input type='checkbox' name='rule["+indexRow+"][is_active]' value=''></td>";
    rowSetData += "<td>"+indexRow+"</td>";
    rowSetData += "<td>"+descriptionVal+"</td>";
    rowSetData += "<td>"+targetText+"</td>";
    rowSetData += "<td hidden><input type='hidden' name='rule["+indexRow+"][target]' value='"+targetVal+"'></td>";
    rowSetData += "<td hidden><input type='hidden' name='rule["+indexRow+"][description]' value='"+descriptionVal+"'></td>";
    rowSetData += "<td hidden><input type='hidden' name='rule["+indexRow+"][type]' value='"+type+"'></td>";
    rowSetData += "<td hidden><input type='hidden' name='rule["+indexRow+"][condition]' value='"+condition+"'></td>";
    rowSetData += "<td hidden><input type='hidden' name='rule["+indexRow+"][operation]' value='"+operation+"'></td>";
    rowSetData += "<td hidden><input type='hidden' name='rule["+indexRow+"][operand]' value='"+operand+"'></td>";
    rowSetData += "<td hidden><input type='hidden' name='rule["+indexRow+"][operand2]' value='"+operand2+"'></td>";
    rowSetData += "</tr>";
    var table = $('#ruleTable').DataTable();
    $('#modal-rule-'+index).modal('toggle');
    table.row.add( $(rowSetData)[index] ).draw();
    addPayload(indexRow);
}

function addPayload(indexRow){
    var rowSetData = "<div class='col-xs-12' style='padding-left:0;padding-right:0'>";
            rowSetData += "<div class='panel panel-default' id='div_"+indexRow+"'>";
                rowSetData += "<div class='panel-heading' >";
                    rowSetData += "<h1 class='panel-title'>";
                        rowSetData += "<a onClick='addID("+indexRow+")' data-toggle='modal' role='button' data-target='#emojiModal' class='btn btn-xs btn-default pull-right' style='margin-right: 5px;'><i class='fa fa-smile-o text-warning'></i> emoji</a>";
                    rowSetData += "</h1";
                    rowSetData += "<div class='clearfix'></div>";
                rowSetData += "</div>";
                // rowSetData += "<div class='message' id='type_"+indexRow+"'>";
                //     rowSetData += "<div id='text_wrapper-"+indexRow+"' >";
                //         rowSetData += "<div class='txtDropTarget' onblur='copyDataTextMessage();' onclick='setTagetDiv("+indexRow+")' id='text-"+indexRow+"' contentEditable='true' hidefocus='true' style='z-index: auto;position: relative;line-height: 20px;font-size: 14px;transition: none;margin-top: 0px;margin-bottom: 0px;height: 183px;padding: 10px;background: transparent !important'></div>";
                //     rowSetData += "</div>";
                //     rowSetData += "<textarea name='rule["+indexRow+"][payload]' style='display:none;' id='txtMessage-"+indexRow+"' class='form-control txtDropTarget' rows='4'></textarea>";
                // rowSetData += "</div>";
            rowSetData += "</div>";
    rowSetData += "</div>";
    $('#payload_show').append(rowSetData);
}

