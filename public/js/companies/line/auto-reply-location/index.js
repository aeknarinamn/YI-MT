$(function() {

    /*
    * select image
    */
    $("input[name=image_size]:radio").change(function () {
        $("#fixSizeImage").html($(this).val());
    });
    // image type
    $("input[name^=imageType]:radio").change(function () {
        $("#image-rich-message-show").attr('src',showImageBackground);
        $("#richMessageItem_actions").html('');
        addActionRichMessage($(this).val());
        var htmlresult = genInputAction($(this).val());
        $("#richMessageItem_actions").html(htmlresult);
        addLinkActionRichMessage('keyword',1);

        var action_type = $("input[name^=action_type]:radio");
        var action_typeShow = action_type.length;
        if($(this).val() == 1) {
            $("#action_for_1").removeClass('hidden');
        }
        var order=1;
        for (var i = 0; i < action_typeShow; i++) {
            if($("#action_type_"+$(this).val()+"_"+order).attr('fixcheck') == 'true'){
                $("#action_type_"+$(this).val()+"_"+order).prop('checked',true);
            }
            order+=1;
        }
        $("input[name^=action_type]:radio").change(function () {
            addLinkActionRichMessage($(this).val(), $(this).attr('data-type'));
        });
    //load
    });

    //action type

    $("input[name^=action_type]:radio").change(function () {
        addLinkActionRichMessage($(this).val(), $(this).attr('data-type'));
    });


    //load
    $("#imageType2").prop('checked',true);

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
    if($(this).val() == 1) {
        $("#action_for_1").removeClass('hidden');
    }
    var order=1;
    for (var i = 0; i < action_typeShow; i++) {
        if($("#action_type_2_"+order).attr('fixcheck') == 'true'){
            $("#action_type_2_"+order).prop('checked',true);
        }
        // var val = $(action_type[i]).val();
        // if(val == 'location'){
        //     $("input[value^="+val+"]").prop('checked',true);
        // }
        order+=1;
    }
    // addChecked(actionNumber);
        /*
    * Fix Image
     */
    // $("#imageType2").click();


});

function handleFileRichMessageSelected(input){
    if (input.files && input.files[0]) {
        var textId = input.id;
        var id = textId.split('-');
        var reader = new FileReader();
        var validExtensions = ['jpg','jpeg','png']; //array of valid extensions
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

                if(mb > 100.00) {
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
        $("#action_type"+position).prop('checked',true);
    }
}

function genInputAction(imageType){
    var richActionImage = '';
    $("#richMessageItem_actions").html('');
    if(imageType == 1){
        /**
         * action type Keyword, URL, No Action
         */
        richActionImage +="<div class='div_action' id='action_for_1'>";
        richActionImage +="<div>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' id='action_type_1_1' value='keyword' fixcheck='true'> Keyword";
        richActionImage +="</label>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' value='location'> Location Group";
        richActionImage +="</label>";
        richActionImage +="</div>";
        /**
        * action value
         */
        richActionImage +="<div id='action_type1_keyword' class='action_value'>";
        richActionImage +="<input class='form-control' id='actions_keyword_1' type='hidden' name='actions_keyword[1]' value=''>";
        richActionImage +="<div id='show_text_rich_message_keyword_1' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
        richActionImage +="<button id='btn_text_rich_message_keyword_1' type='button' onclick='getDataKeyword(1);' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
        richActionImage +="Select Keyword</button>";
        richActionImage +="</div>";
        richActionImage +="<div id='action_type1_location_group' class='hidden action_value'>";

        richActionImage +="</div>";
        richActionImage +="</div>";
        // close div id action_for_1
        /**
         * action type Keyword, URL, No Action
         */
        richActionImage +="<div class='div_action hidden' id='action_for_2'>";
        richActionImage +="<div>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[2]' data-type='2' id='action_type_1_2' value='keyword' fixcheck='true'> Keyword";
        richActionImage +="</label>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[2]' data-type='2' value='location'> Location Group";
        richActionImage +="</label>";
        richActionImage +="</div>";
        /**
        * action value
         */
        richActionImage +="<div id='action_type2_keyword' class='action_value'>";
        richActionImage +="<input class='form-control' id='actions_keyword_2' type='hidden' name='actions_keyword[2]' value=''>";
        richActionImage +="<div id='show_text_rich_message_keyword_2' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
        richActionImage +="<button id='btn_text_rich_message_keyword_2' type='button' onclick='getDataKeyword(2);' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
        richActionImage +="Select Keyword</button>";
        richActionImage +="</div>";

        richActionImage +="<div id='action_type2_location_group' class='hidden action_value'>";
        richActionImage +="</div>";
        richActionImage +="</div>";
        // close div id action_for_2
        /**
         * action type Keyword, URL, No Action
         */
        richActionImage +="<div class='div_action hidden' id='action_for_3'>";
        richActionImage +="<div>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[3]' data-type='3' id='action_type_1_3' value='keyword' fixcheck='true'> Keyword";
        richActionImage +="</label>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[3]' data-type='3' value='location'> Location Group";
        richActionImage +="</div>";
        /**
        * action value
         */
        richActionImage +="<div id='action_type3_keyword' class='action_value'>";
        richActionImage +="<input class='form-control' id='actions_keyword_3' type='hidden' name='actions_keyword[3]' value=''>";
        richActionImage +="<div id='show_text_rich_message_keyword_3' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
        richActionImage +="<button id='btn_text_rich_message_keyword_3' type='button' onclick='getDataKeyword(3);' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
        richActionImage +="Select Keyword</button>";
        richActionImage +="</div>";

        richActionImage +="<div id='action_type3_location_group' class='hidden action_value'>";
        richActionImage +="</div>";
        richActionImage +="</div>";

        // close div id action_for_3
        /**
         * action type Keyword, URL, No Action
         */
        richActionImage +="<div class='div_action hidden' id='action_for_4'>";
        richActionImage +="<div>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[4]' data-type='4' id='action_type_1_4' value='keyword' fixcheck='true'> Keyword";
        richActionImage +="</label>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[4]' data-type='4' value='location'> Location Group";
        richActionImage +="</label>";
        richActionImage +="</div>";
        /**
        * action value
         */
        richActionImage +="<div id='action_type4_keyword' class='action_value'>";
        richActionImage +="<input class='form-control' id='actions_keyword_4' type='hidden' name='actions_keyword[4]' value=''>";
        richActionImage +="<div id='show_text_rich_message_keyword_4' class='hidden'></div>";
        richActionImage +="<button id='btn_text_rich_message_keyword_4' type='button' onclick='getDataKeyword(4);' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
        richActionImage +="Select Keyword</button>";
        richActionImage +="</div>";

        richActionImage +="<div id='action_type4_location_group' class='hidden action_value'>";

        richActionImage +="</div>";
        richActionImage +="</div>";
        //div  richMessageItem_actions
        richActionImage +="</div></div></div>";
    } else if (imageType == 2) {
       /**
         * action type Keyword, URL, No Action
         */
        richActionImage +="<div class='div_action' id='action_for_1'>";
        richActionImage +="<div>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' id='action_type_2_1' value='keyword' fixcheck='true'> Keyword";
        richActionImage +="</label>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' value='location'> Location Group";
        richActionImage +="</label>";
        richActionImage +="</div>";
        /**
        * action value
         */
        richActionImage +="<div id='action_type1_keyword' class='action_value'>";
        richActionImage +="<input class='form-control' id='actions_keyword_1' type='hidden' name='actions_keyword[1]' value=''>";
        richActionImage +="<div id='show_text_rich_message_keyword_1' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
        richActionImage +="<button id='btn_text_rich_message_keyword_1' type='button' onclick='getDataKeyword(1);' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
        richActionImage +="Select Keyword</button>";
        richActionImage +="</div>";
        richActionImage +="<div id='action_type1_location_group' class='hidden action_value'>";

        richActionImage +="</div>";
        richActionImage +="</div>";
        // close div id action_for_1
        /**
         * action type Keyword, URL, No Action
         */
        richActionImage +="<div class='div_action hidden' id='action_for_2'>";
        richActionImage +="<div>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[2]' data-type='2' id='action_type_2_2' value='keyword' fixcheck='true'> Keyword";
        richActionImage +="</label>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[2]' data-type='2' value='location'> Location Group";
        richActionImage +="</label>";
        richActionImage +="</div>";
        /**
        * action value
         */
        richActionImage +="<div id='action_type2_keyword' class='action_value'>";
        richActionImage +="<input class='form-control' id='actions_keyword_2' type='hidden' name='actions_keyword[2]' value=''>";
        richActionImage +="<div id='show_text_rich_message_keyword_2' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
        richActionImage +="<button id='btn_text_rich_message_keyword_2' type='button' onclick='getDataKeyword(2);' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
        richActionImage +="Select Keyword</button>";
        richActionImage +="</div>";

        richActionImage +="<div id='action_type2_location_group' class='hidden action_value'>";

        richActionImage +="</div>";
        richActionImage +="</div>";
        // close div id action_for_2

    } else if (imageType == 3) {
      /**
         * action type Keyword, URL, No Action
         */
        richActionImage +="<div class='div_action' id='action_for_1'>";
        richActionImage +="<div>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' id='action_type_3_1' value='keyword' fixcheck='true'> Keyword";
        richActionImage +="</label>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' value='location'> Location Group";
        richActionImage +="</label>";

        richActionImage +="</div>";
        /**
        * action value
         */
        richActionImage +="<div id='action_type1_keyword' class='action_value'>";
        richActionImage +="<input class='form-control' id='actions_keyword_1' type='hidden' name='actions_keyword[1]' value=''>";
        richActionImage +="<div id='show_text_rich_message_keyword_1' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
        richActionImage +="<button id='btn_text_rich_message_keyword_1' type='button' onclick='getDataKeyword(1);' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
        richActionImage +="Select Keyword</button>";
        richActionImage +="</div>";
        richActionImage +="<div id='action_type1_location_group' class='hidden action_value'>";

        richActionImage +="</div>";
        richActionImage +="</div>";
        // close div id action_for_1
    }
    return richActionImage;
}

function addLinkActionRichMessage(typeAction, positionType) {
    if(typeAction == 'keyword'){
            // $("#btn_text_rich_message_location_group_"+positionType).removeClass('hidden'); // ok
            //$("#show_text_rich_message_location_group_"+positionType).html(''); //ok
            //close div
            $("#action_type"+positionType+"_location_group").addClass('hidden'); //op
            //open new div
            var dataDiv = $("#show_text_rich_message_keyword_"+positionType).text();
            if($.trim(dataDiv) == ""){

                $("#action_type"+positionType+"_location_group").addClass('hidden');
                $("#action_type"+positionType+"_keyword").addClass('hidden');
                $("#show_text_rich_message_keyword_"+positionType).addClass('hidden');
                $("#btn_text_rich_message_keyword_"+positionType).removeClass('hidden');
                //open new div
                //deleteRichLocation(positionType);
            } else {
                $("#btn_text_rich_message_keyword_"+positionType).addClass('hidden'); // ok
            }
            $("#action_type"+positionType+"_keyword").removeClass('hidden');

    } else if(typeAction == 'location') {
            // $("#btn_text_rich_message_keyword_"+positionType).removeClass('hidden'); // ok
            //$("#show_text_rich_message_keyword_"+positionType).html(''); //ok
            //close div
            // $("#action_type"+positionType+"_location_group").addClass('hidden');
            $("#action_type"+positionType+"_keyword").addClass('hidden'); //op
            //open new div
            var dataDiv = $("#show_text_rich_message_location_group_"+positionType).text();
            if($.trim(dataDiv) == ""){

                $("#action_type"+positionType+"_location_group").addClass('hidden');
                $("#action_type"+positionType+"_keyword").addClass('hidden');
                $("#show_text_rich_message_location_group_"+positionType).addClass('hidden');
                $("#btn_text_rich_message_location_group_"+positionType).removeClass('hidden');
                //open new div
                //deleteRichKeywordTag(positionType);
            } else {
                $("#btn_text_rich_message_location_group_"+positionType).addClass('hidden'); // ok
            }
            $("#action_type"+positionType+"_location_group").removeClass('hidden');


    }
}

function addProtocol(protocal,id){
    $("#protocol_"+id).html(protocal+" <span class='caret'></span>");
    $("input[name='actions_protocol["+id+"]").val(protocal);
}

function getDataKeyword(actionID){
    $.ajax({
        type     : "GET",
        url      : '/api/v1/company-rich-message/'+companyID+'/keywords/',
        success  : function(data)
        {
            if(data){
                var items = jQuery.parseJSON(data);
                var result ='';
                $("#tbodyAutoKeyword").html('');
                for(var index in items){
                    result += "<tr>";
                    result += "<td>";
                    result += "<a style=\"cursor:pointer\" name='addDataRichKeyword-"+actionID+"-"+items[index].keywordID+"' onclick=\"addDataRichKeyword("+actionID+","+items[index].keywordID+",'"+items[index].keyword+"')\" class=\"btn btn-default\">Select</a>";
                    result += "</td>";

                    result += "<td>";
                    result += items[index].title;
                    result += "</td>";

                    result += "<td>";
                    result += items[index].keyword;
                    result += "</td>";

                    result += "<td style='white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 100px;white-space: nowrap;'>";
                    result += items[index].text;
                    result += "</td>";
                    result += "</tr>";
                }
                $("#tbodyAutoKeyword").html(result);
            }
        }
    })
}

function addDataRichKeyword(actionID, keywordID,keyword){
    $('#keywordModal').modal('hide'); // close modal
    var input = "<input type='hidden' name='rich_message_keyword["+actionID+"]' value="+keywordID+">";
    $("#show_text_rich_message_keyword_"+actionID).html(keyword +"&nbsp;<a style='cursor:pointer' onclick='deleteRichKeywordTag("+actionID+")'><i class='fa fa-close text-danger'></i></a>");
    $("#show_text_rich_message_keyword_"+actionID).removeClass('hidden');
    $("#btn_text_rich_message_keyword_"+actionID).addClass('hidden');
    $("#rich_message_for_keyword").append(input);
    deleteRichLocation(actionID);
}

function deleteRichKeywordTag(actionID){
    $("#show_text_rich_message_keyword_"+actionID).html('');
    $("#btn_text_rich_message_keyword_"+actionID).removeClass('hidden');
    $("#show_text_rich_message_keyword_"+actionID).addClass('hidden');

    $("input[name='rich_message_keyword["+actionID+"]'").remove();
    $('#keywordModal').modal('hide'); // close modal
}

function addChecked(actionNumber){
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
    // action_type.prop('checked', true);
}


function getDataLocationGroups(actionID){
    $.ajax({
        type     : "GET",
        url      : '/api/v1/company-rich-message/'+companyID+'/locations/',
        success  : function(data)
        {
            if(data){
                var locationGroups = jQuery.parseJSON(data);
                var result ='';
                $("#tbodyLocationGroup").addClass('hidden');
                $("#tbodyLocationGroup").html('');
                for(var index in locationGroups){
                    result += "<tr>";
                    result += "<td>";
                    result += "<a style=\"cursor:pointer\" onclick=\"addDataLocationGroup("+actionID+","+locationGroups[index].id+",'"+locationGroups[index].name+"')\" class=\"btn btn-default\">Select</a>";
                    result += "</td>";

                    result += "<td>";
                    result += locationGroups[index].name;
                    result += "</td>";

                    result += "<td class='text-center'>";
                    result += locationGroups[index].countIem;
                    result += "</td>";

                    // result += "<td style='white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 100px;white-space: nowrap;'>";
                    // result += locationGroups[index].text;
                    // result += "</td>";
                    result += "</tr>";
                }
                $("#tbodyLocationGroup").html(result);
                $("#tbodyLocationGroup").removeClass('hidden');

            }
        }
    })
}

function addDataLocationGroup(actionID, locationGroupID,name){
    $('#LocationGroupModal').modal('hide'); // close modal
    var input = "<input type='hidden' name='rich_message_location["+actionID+"]' value="+locationGroupID+">";
    $("#show_text_rich_message_location_group_"+actionID).html(name +"&nbsp;<a style='cursor:pointer' onclick='deleteRichLocation("+actionID+")'><i class='fa fa-close text-danger'></i></a>");
    $("#show_text_rich_message_location_group_"+actionID).removeClass('hidden');
    $("#btn_text_rich_message_location_group_"+actionID).addClass('hidden');
    $("#rich_message_for_location_group").append(input);
    deleteRichKeywordTag(actionID);
}

function deleteRichLocation(actionID){
    $("#show_text_rich_message_location_group_"+actionID).html('');
    $("#btn_text_rich_message_location_group_"+actionID).removeClass('hidden');
    $("#show_text_rich_message_location_group_"+actionID).addClass('hidden');

    $("input[name='rich_message_location["+actionID+"]'").remove();
    $('#LocationGroupModal').modal('hide'); // close modal
}