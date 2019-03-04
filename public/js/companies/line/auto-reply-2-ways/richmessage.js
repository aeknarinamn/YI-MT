$(function () {


    getDataKeyword(1);
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
    var imageSizeShow = $("input[name=image_size]:radio");
    var sizeImageShow = imageSizeShow.length;
    if(sizeImageShow > 0) {
        for (var i = 0; i < sizeImageShow; i++) {
            if($("#"+imageSizeShow[i].id).attr('fixcheck') == 'true'){
                $("#"+imageSizeShow[i].id).prop('checked',true);
            }
        }
    }
    if ( typeof oldImageTypeSelected === 'undefined') {
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
    }

    addChecked(actionNumber);


    if ( typeof oldImageTypeSelected !== 'undefined') {
        // $("#imageType"+oldImageTypeSelected).click();
    }

        // var _URL = window.URL || window.webkitURL;
        //     $("#uploadPhoto").change(function(input) {
        //     var file, img;
        //     if ((file = this.files[0])) {
        //         img = new Image();
        //         img.onload = function() {
        //             alert(this.width + " " + this.height);
        //         };
        //         img.onerror = function() {
        //             alert( "not a valid file: " + file.type);
        //         };
        //         img.src = _URL.createObjectURL(file);
        //     }
        // });

    /*
    *
    */
   addDisabled2Ways();
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
                    console.log(input.files[0]);
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
            divRichMessage +="<input id='uploadPhoto' type='file' onchange='handleFileRichMessageSelected(this)' accept='image/*'  class='btn btn-default btn-sm' style='margin-left: 5px; vertical-align: top;display:none;'></label>";
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

            divRichMessage +="<label style='margin: 0 50px 0 15px;white-space: nowrap;'>Link :</label>";

            divRichMessage +="<div id='richMessageItem_actions'>";
            // action keyword
            /**
             * action type Keyword, URL, No Action
             */
            divRichMessage +="<div class='div_action' id='action_for_1'>";
            divRichMessage +="<div>";
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[1]' data-type='1' id='action_type_1_1' value='keyword' fixcheck='true'> Keyword";
            divRichMessage +="</label>";
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[1]' data-type='1' value='url'> URL";
            divRichMessage +="</label>";
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[1]' data-type='1' value='no_action'> No Action";
            divRichMessage +="</label>";
            /* For 1 on 1 chat */
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[1]' data-type='1' value='2_ways' disabled> 2-Ways";
            divRichMessage +="</label>";

            divRichMessage +="</div>";
            /**
            * action value
             */
            divRichMessage +="<div id='action_type1_keyword' class='action_value'>";
            divRichMessage +="<input class='form-control' id='actions_keyword_1' type='hidden' name='actions_keyword[1]' value=''>";
            divRichMessage +="<div id='show_text_rich_message_keyword_1' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
            divRichMessage +="<button id='btn_text_rich_message_keyword_1' type='button' onclick='getDataKeyword(1);' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
            divRichMessage +="Select Keyword</button>";
            divRichMessage +="</div>";
            divRichMessage +="<div id='action_type1_url' class='hidden action_value'>";
            divRichMessage +="<div class='input-group' style='width: 300px;'>";
            divRichMessage +="<div class='input-group-btn'>";
            divRichMessage +="<button id='protocol_1' type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>http:// <span class='caret'></span></button>";
            divRichMessage +="<ul class='dropdown-menu' aria-labelledby='protocol_1'>";
            divRichMessage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('http://',1)\">http</a></li>";
            divRichMessage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('https://',1)\">https</a></li>";
            divRichMessage +="</ul>";
            divRichMessage +="</div>";
            divRichMessage +="<input class='form-control' id='actions_protocol[1]' type='hidden' name='actions_protocol[1]' value='http://'>";
            divRichMessage +="<input class='form-control' type='text' name='actions_order[1]' class='form-control' style='width: 300px;'>";
            divRichMessage +="</div>";
            divRichMessage +="</div>";
            /* For 1 on 1 chat */
            divRichMessage +="<div id='action_type1_2_ways' class='hidden action_value'>";
            divRichMessage +="<input class='form-control' id='actions_2_ways_1' type='hidden' name='actions_2_ways[1]' value=''>";
            divRichMessage +="<div id='show_text_rich_message_2_ways_1' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
            divRichMessage +="<button id='btn_text_rich_message_2_ways_1' type='button' onclick='getData2_ways(1);' class='btn btn-primary' data-toggle='#' data-target='#2WaysModal'>";
            divRichMessage += btn_2_ways+"</button>";
            divRichMessage +="</div>";

            divRichMessage +="<input type='hidden' value='1' name='old_action_order[1]'>";
            divRichMessage +="</div>";
            // close div id action_for_1
            /**
             * action type Keyword, URL, No Action
             */
            divRichMessage +="<div class='div_action hidden' id='action_for_2'>";
            divRichMessage +="<div>";
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[2]' data-type='2' id='action_type_1_2' value='keyword' fixcheck='true'> Keyword";
            divRichMessage +="</label>";
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[2]' data-type='2' value='url'> URL";
            divRichMessage +="</label>";
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[2]' data-type='2' value='no_action'> No Action";
            divRichMessage +="</label>";
            /* For 1 on 1 chat */
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[2]' data-type='2' value='2_ways' disabled> 2-Ways";
            divRichMessage +="</label>";
            divRichMessage +="</div>";
            /**
            * action value
             */
            divRichMessage +="<div id='action_type2_keyword' class='action_value'>";
            divRichMessage +="<input class='form-control' id='actions_keyword_2' type='hidden' name='actions_keyword[2]' value=''>";
            divRichMessage +="<div id='show_text_rich_message_keyword_2' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
            divRichMessage +="<button id='btn_text_rich_message_keyword_2' type='button' onclick='getDataKeyword(2);' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
            divRichMessage +="Select Keyword</button>";
            divRichMessage +="</div>";

            divRichMessage +="<div id='action_type2_url' class='hidden action_value'>";
            divRichMessage +="<div class='input-group' style='width: 300px;'>";
            divRichMessage +="<div class='input-group-btn'>";
            divRichMessage +="<button id='protocol_2' type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>http:// <span class='caret'></span></button>";
            divRichMessage +="<ul class='dropdown-menu' aria-labelledby='protocol_2'>";
            divRichMessage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('http://',2)\">http</a></li>";
            divRichMessage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('https://',2)\">https</a></li>";
            divRichMessage +="</ul>";
            divRichMessage +="</div>";
            divRichMessage +="<input class='form-control' id='actions_protocol[2]' type='hidden' name='actions_protocol[2]' value='http://'>";
            divRichMessage +="<input class='form-control' type='text' name='actions_order[2]' class='form-control' style='width: 300px;'>";
            divRichMessage +="</div>";
            divRichMessage +="</div>";
            /* For 1 on 1 chat */
            divRichMessage +="<div id='action_type2_2_ways' class='hidden action_value'>";
            divRichMessage +="<input class='form-control' id='actions_2_ways_1' type='hidden' name='actions_2_ways[2]' value=''>";
            divRichMessage +="<div id='show_text_rich_message_2_ways_1' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
            divRichMessage +="<button id='btn_text_rich_message_2_ways_1' type='button' onclick='getData2_ways(2);' class='btn btn-primary' data-toggle='#' data-target='#2WaysModal'>";
            divRichMessage += btn_2_ways+"</button>";
            divRichMessage +="</div>";

            divRichMessage +="<input type='hidden' value='2' name='old_action_order[2]'>";
            divRichMessage +="</div>";
            // close div id action_for_2
            /**
             * action type Keyword, URL, No Action
             */
            divRichMessage +="<div class='div_action hidden' id='action_for_3'>";
            divRichMessage +="<div>";
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[3]' data-type='3' id='action_type_1_3' value='keyword' fixcheck='true'> Keyword";
            divRichMessage +="</label>";
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[3]' data-type='3' value='url'> URL";
            divRichMessage +="</label>";
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[3]' data-type='3' value='no_action'> No Action";
            divRichMessage +="</label>";
            /* For 1 on 1 chat */
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[3]' data-type='3' value='2_ways' disabled> 2-Ways";
            divRichMessage +="</label>";
            divRichMessage +="</div>";
            /**
            * action value
             */
            divRichMessage +="<div id='action_type3_keyword' class='action_value'>";
            divRichMessage +="<input class='form-control' id='actions_keyword_3' type='hidden' name='actions_keyword[3]' value=''>";
            divRichMessage +="<div id='show_text_rich_message_keyword_3' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
            divRichMessage +="<button id='btn_text_rich_message_keyword_3' type='button' onclick='getDataKeyword(3);' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
            divRichMessage +="Select Keyword</button>";
            divRichMessage +="</div>";

            divRichMessage +="<div id='action_type3_url' class='hidden action_value'>";
            divRichMessage +="<div class='input-group' style='width: 300px;'>";
            divRichMessage +="<div class='input-group-btn'>";
            divRichMessage +="<button id='protocol_3' type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>http:// <span class='caret'></span></button>";
            divRichMessage +="<ul class='dropdown-menu' aria-labelledby='protocol_3'>";
            divRichMessage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('http://',3)\">http</a></li>";
            divRichMessage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('https://',3)\">https</a></li>";
            divRichMessage +="</ul>";
            divRichMessage +="</div>";
            divRichMessage +="<input class='form-control' id='actions_protocol[3]' type='hidden' name='actions_protocol[3]' value='http://'>";
            divRichMessage +="<input class='form-control' type='text' name='actions_order[3]' class='form-control' style='width: 300px;'>";
            divRichMessage +="</div>";
            divRichMessage +="</div>";
             /* For 1 on 1 chat */
            divRichMessage +="<div id='action_type3_2_ways' class='hidden action_value'>";
            divRichMessage +="<input class='form-control' id='actions_2_ways_1' type='hidden' name='actions_2_ways[3]' value=''>";
            divRichMessage +="<div id='show_text_rich_message_2_ways_1' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
            divRichMessage +="<button id='btn_text_rich_message_2_ways_1' type='button' onclick='getData2_ways(3);' class='btn btn-primary' data-toggle='#' data-target='#2WaysModal'>";
            divRichMessage += btn_2_ways+"</button>";
            divRichMessage +="</div>";
            divRichMessage +="<input type='hidden' value='3' name='old_action_order[3]'>";
            divRichMessage +="</div>";

            // close div id action_for_3
            /**
             * action type Keyword, URL, No Action
             */
            divRichMessage +="<div class='div_action hidden' id='action_for_4'>";
            divRichMessage +="<div>";
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[4]' data-type='4' id='action_type_1_4' value='keyword' fixcheck='true'> Keyword";
            divRichMessage +="</label>";
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[4]' data-type='4' value='url'> URL";
            divRichMessage +="</label>";
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[4]' data-type='4' value='no_action'> No Action";
            divRichMessage +="</label>";
            /* For 1 on 1 chat */
            divRichMessage +="<label class='radio-inline'>";
            divRichMessage +="<input type='radio' name='action_type[4]' data-type='4' value='2_ways' disabled> 2-Ways";
            divRichMessage +="</label>";
            divRichMessage +="</div>";
            /**
            * action value
             */
            divRichMessage +="<div id='action_type4_keyword' class='action_value'>";
            divRichMessage +="<input class='form-control' id='actions_keyword_4' type='hidden' name='actions_keyword[4]' value=''>";
            divRichMessage +="<div id='show_text_rich_message_keyword_4' class='hidden'></div>";
            divRichMessage +="<button id='btn_text_rich_message_keyword_4' type='button' onclick='getDataKeyword(4);' class='btn btn-primary' data-toggle='modal' data-target='#keywordModal'>";
            divRichMessage +="Select Keyword</button>";
            divRichMessage +="</div>";

            divRichMessage +="<div id='action_type4_url' class='hidden action_value'>";
            divRichMessage +="<div class='input-group' style='width: 300px;'>";
            divRichMessage +="<div class='input-group-btn'>";
            divRichMessage +="<button id='protocol_4' type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>http:// <span class='caret'></span></button>";
            divRichMessage +="<ul class='dropdown-menu' aria-labelledby='protocol_4'>";
            divRichMessage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('http://',4)\">http</a></li>";
            divRichMessage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('https://',4)\">https</a></li>";
            divRichMessage +="</ul>";
            divRichMessage +="</div>";
            divRichMessage +="<input class='form-control' id='actions_protocol[4]' type='hidden' name='actions_protocol[4]' value='http://'>";
            divRichMessage +="<input class='form-control' type='text' name='actions_order[4]' class='form-control' style='width: 300px;'>";
            divRichMessage +="</div>";
            divRichMessage +="</div>";
            /* For 1 on 1 chat */
            divRichMessage +="<div id='action_type4_2_ways' class='hidden action_value'>";
            divRichMessage +="<input class='form-control' id='actions_2_ways_1' type='hidden' name='actions_2_ways[4]' value=''>";
            divRichMessage +="<div id='show_text_rich_message_2_ways_1' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
            divRichMessage +="<button id='btn_text_rich_message_2_ways_1' type='button' onclick='getData2_ways(4);' class='btn btn-primary' data-toggle='#' data-target='#2WaysModal'>";
            divRichMessage += btn_2_ways+"</button>";
            divRichMessage +="</div>";
            divRichMessage +="<input type='hidden' value='4' name='old_action_order[4]'>";
            divRichMessage +="</div>";
            //div  richMessageItem_actions
            divRichMessage +="</div></div></div>";

            $("#div_"+divTextBox).append(divRichMessage);
            addLinkActionRichMessage('keyword',1);
            $("#1040x1040").prop('checked', true);
            $("#imageType1").prop('checked', true);
            $("#action_type_1_1").prop('checked', true);
            $("#action_type_1_2").prop('checked', true);
            $("#action_type_1_3").prop('checked', true);
            $("#action_type_1_4").prop('checked', true);

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
                var htmlresult = genInputAction($(this).val());
                $("#richMessageItem_actions").html(htmlresult);
                addLinkActionRichMessage('keyword', $(this).val());

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
            });

            // //action type
            $("input[name^=action_type]:radio").change(function () {
                addLinkActionRichMessage($(this).val(), $(this).attr('data-type'));
            });

        } else {
            $("#messageTypes").hide();
        }
    }
    $("#imageType2").click();
    $("#imageType1").click();
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
        // $("#action_type"+position+"_url").addClass('hidden');
        $(obj).addClass('active');
        $(".div_action").addClass('hidden');
        $("#action_for_"+position).removeClass('hidden');
        $("#action_for_"+position).removeClass('hidden');
       // $("#action_type"+position+"_keyword").removeClass('hidden');

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
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' value='url'> URL";
        richActionImage +="</label>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' value='no_action'> No Action";
        richActionImage +="</label>";
        /* For 1 on 1 chat */
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' value='2_ways' disabled> 2-Ways";
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
        richActionImage +="<div id='action_type1_url' class='hidden action_value'>";
        richActionImage +="<div class='input-group' style='width: 300px;'>";
        richActionImage +="<div class='input-group-btn'>";
        richActionImage +="<button id='protocol_1' type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>http:// <span class='caret'></span></button>";
        richActionImage +="<ul class='dropdown-menu' aria-labelledby='protocol_1'>";
        richActionImage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('http://',1)\">http</a></li>";
        richActionImage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('https://',1)\">https</a></li>";
        richActionImage +="</ul>";
        richActionImage +="</div>";
        richActionImage +="<input class='form-control' id='actions_protocol[1]' type='hidden' name='actions_protocol[1]' value='http://'>";
        richActionImage +="<input class='form-control' type='text' name='actions_order[1]' class='form-control' style='width: 300px;'>";
        richActionImage +="</div>";
        richActionImage +="</div>";
        /* For 1 on 1 chat */
        richActionImage +="<div id='action_type1_2_ways' class='hidden action_value'>";
        richActionImage +="<input class='form-control' id='actions_2_ways_1' type='hidden' name='actions_2_ways[1]' value=''>";
        richActionImage +="<div id='show_text_rich_message_2_ways_1' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
        richActionImage +="<button id='btn_text_rich_message_2_ways_1' type='button' onclick='getData2_ways(1);' class='btn btn-primary' data-toggle='#' data-target='#2WaysModal'>";
        richActionImage +=btn_2_ways+"</button>";
        richActionImage +="</div>";

        richActionImage +="<input type='hidden' value='1' name='old_action_order[1]'>";
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
        richActionImage +="<input type='radio' name='action_type[2]' data-type='2' value='url'> URL";
        richActionImage +="</label>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[2]' data-type='2' value='no_action'> No Action";
        richActionImage +="</label>";
         /* For 1 on 1 chat */
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[2]' data-type='2' value='2_ways' disabled> 2-Ways";
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

        richActionImage +="<div id='action_type2_url' class='hidden action_value'>";
        richActionImage +="<div class='input-group' style='width: 300px;'>";
        richActionImage +="<div class='input-group-btn'>";
        richActionImage +="<button id='protocol_2' type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>http:// <span class='caret'></span></button>";
        richActionImage +="<ul class='dropdown-menu' aria-labelledby='protocol_2'>";
        richActionImage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('http://',2)\">http</a></li>";
        richActionImage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('https://',2)\">https</a></li>";
        richActionImage +="</ul>";
        richActionImage +="</div>";
        richActionImage +="<input class='form-control' id='actions_protocol[2]' type='hidden' name='actions_protocol[2]' value='http://'>";
        richActionImage +="<input class='form-control' type='text' name='actions_order[2]' class='form-control' style='width: 300px;'>";
        richActionImage +="</div>";
        richActionImage +="</div>";
         /* For 1 on 1 chat */
        richActionImage +="<div id='action_type2_2_ways' class='hidden action_value'>";
        richActionImage +="<input class='form-control' id='actions_2_ways_2' type='hidden' name='actions_2_ways[2]' value=''>";
        richActionImage +="<div id='show_text_rich_message_2_ways_2' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
        richActionImage +="<button id='btn_text_rich_message_2_ways_2' type='button' onclick='getData2_ways(2);' class='btn btn-primary' data-toggle='#' data-target='#2WaysModal'>";
        richActionImage += btn_2_ways+"</button>";
        richActionImage +="</div>";
        richActionImage +="<input type='hidden' value='2' name='old_action_order[2]'>";
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
        richActionImage +="<input type='radio' name='action_type[3]' data-type='3' value='url'> URL";
        richActionImage +="</label>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[3]' data-type='3' value='no_action'> No Action";
        richActionImage +="</label>";
         /* For 1 on 1 chat */
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[3]' data-type='3' value='2_ways' disabled> 2-Ways";
        richActionImage +="</label>";

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

        richActionImage +="<div id='action_type3_url' class='hidden action_value'>";
        richActionImage +="<div class='input-group' style='width: 300px;'>";
        richActionImage +="<div class='input-group-btn'>";
        richActionImage +="<button id='protocol_3' type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>http:// <span class='caret'></span></button>";
        richActionImage +="<ul class='dropdown-menu' aria-labelledby='protocol_3'>";
        richActionImage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('http://',3)\">http</a></li>";
        richActionImage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('https://',3)\">https</a></li>";
        richActionImage +="</ul>";
        richActionImage +="</div>";
        richActionImage +="<input class='form-control' id='actions_protocol[3]' type='hidden' name='actions_protocol[3]' value='http://'>";
        richActionImage +="<input class='form-control' type='text' name='actions_order[3]' class='form-control' style='width: 300px;'>";
        richActionImage +="</div>";
        richActionImage +="</div>";
        /* For 1 on 1 chat */
        richActionImage +="<div id='action_type3_2_ways' class='hidden action_value'>";
        richActionImage +="<input class='form-control' id='actions_2_ways_3' type='hidden' name='actions_2_ways[3]' value=''>";
        richActionImage +="<div id='show_text_rich_message_2_ways_3' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
        richActionImage +="<button id='btn_text_rich_message_2_ways_3' type='button' onclick='getData2_ways(3);' class='btn btn-primary' data-toggle='#' data-target='#2WaysModal'>";
        richActionImage += btn_2_ways+"</button>";
        richActionImage +="</div>";
        richActionImage +="<input type='hidden' value='3' name='old_action_order[3]'>";
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
        richActionImage +="<input type='radio' name='action_type[4]' data-type='4' value='url'> URL";
        richActionImage +="</label>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[4]' data-type='4' value='no_action'> No Action";
        richActionImage +="</label>";
        /* For 1 on 1 chat */
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[4]' data-type='4' value='2_ways' disabled> 2-Ways";
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

        richActionImage +="<div id='action_type4_url' class='hidden action_value'>";
        richActionImage +="<div class='input-group' style='width: 300px;'>";
        richActionImage +="<div class='input-group-btn'>";
        richActionImage +="<button id='protocol_4' type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>http:// <span class='caret'></span></button>";
        richActionImage +="<ul class='dropdown-menu' aria-labelledby='protocol_4'>";
        richActionImage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('http://',4)\">http</a></li>";
        richActionImage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('https://',4)\">https</a></li>";
        richActionImage +="</ul>";
        richActionImage +="</div>";
        richActionImage +="<input class='form-control' id='actions_protocol[4]' type='hidden' name='actions_protocol[4]' value='http://'>";
        richActionImage +="<input class='form-control' type='text' name='actions_order[4]' class='form-control' style='width: 300px;'>";
        richActionImage +="</div>";
        richActionImage +="</div>";
         /* For 1 on 1 chat */
        richActionImage +="<div id='action_type4_2_ways' class='hidden action_value'>";
        richActionImage +="<input class='form-control' id='actions_2_ways_4' type='hidden' name='actions_2_ways[4]' value=''>";
        richActionImage +="<div id='show_text_rich_message_2_ways_4' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
        richActionImage +="<button id='btn_text_rich_message_2_ways_4' type='button' onclick='getData2_ways(4);' class='btn btn-primary' data-toggle='#' data-target='#2WaysModal'>";
        richActionImage += btn_2_ways+"</button>";
        richActionImage +="</div>";
        richActionImage +="<input type='hidden' value='4' name='old_action_order[4]'>";
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
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' value='url'> URL";
        richActionImage +="</label>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' value='no_action'> No Action";
        richActionImage +="</label>";
         /* For 1 on 1 chat */
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' value='2_ways'> 2-Ways";
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
        richActionImage +="<div id='action_type1_url' class='hidden action_value'>";
        richActionImage +="<div class='input-group' style='width: 300px;'>";
        richActionImage +="<div class='input-group-btn'>";
        richActionImage +="<button id='protocol_1' type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>http:// <span class='caret'></span></button>";
        richActionImage +="<ul class='dropdown-menu' aria-labelledby='protocol_1'>";
        richActionImage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('http://',1)\">http</a></li>";
        richActionImage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('https://',1)\">https</a></li>";
        richActionImage +="</ul>";
        richActionImage +="</div>";
        richActionImage +="<input class='form-control' id='actions_protocol[1]' type='hidden' name='actions_protocol[1]' value='http://'>";
        richActionImage +="<input class='form-control' type='text' name='actions_order[1]' class='form-control' style='width: 300px;'>";
        richActionImage +="</div>";
        richActionImage +="</div>";
         /* For 1 on 1 chat */
        richActionImage +="<div id='action_type1_2_ways' class='hidden action_value'>";
        richActionImage +="<input class='form-control' id='actions_2_ways_1' type='hidden' name='actions_2_ways[1]' value=''>";
        richActionImage +="<div id='show_text_rich_message_2_ways_1' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
        richActionImage +="<button id='btn_text_rich_message_2_ways_1' type='button' onclick='getData2_ways(1);' class='btn btn-primary' data-toggle='#' data-target='#2WaysModal'>";
        richActionImage += btn_2_ways+"</button>";
        richActionImage +="</div>";
        richActionImage +="<input type='hidden' value='1' name='old_action_order[1]'>";
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
        richActionImage +="<input type='radio' name='action_type[2]' data-type='2' value='url'> URL";
        richActionImage +="</label>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[2]' data-type='2' value='no_action'> No Action";
        richActionImage +="</label>";
        /* For 1 on 1 chat */
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[2]' data-type='2' value='2_ways'> 2-Ways";
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

        richActionImage +="<div id='action_type2_url' class='hidden action_value'>";
        richActionImage +="<div class='input-group' style='width: 300px;'>";
        richActionImage +="<div class='input-group-btn'>";
        richActionImage +="<button id='protocol_2' type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>http:// <span class='caret'></span></button>";
        richActionImage +="<ul class='dropdown-menu' aria-labelledby='protocol_2'>";
        richActionImage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('http://',2)\">http</a></li>";
        richActionImage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('https://',2)\">https</a></li>";
        richActionImage +="</ul>";
        richActionImage +="</div>";
        richActionImage +="<input class='form-control' id='actions_protocol[2]' type='hidden' name='actions_protocol[2]' value='http://'>";
        richActionImage +="<input class='form-control' type='text' name='actions_order[2]' class='form-control' style='width: 300px;'>";
        richActionImage +="</div>";
        richActionImage +="</div>";
         /* For 1 on 1 chat */
        richActionImage +="<div id='action_type2_2_ways' class='hidden action_value'>";
        richActionImage +="<input class='form-control' id='actions_2_ways_2' type='hidden' name='actions_2_ways[2]' value=''>";
        richActionImage +="<div id='show_text_rich_message_2_ways_2' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
        richActionImage +="<button id='btn_text_rich_message_2_ways_2' type='button' onclick='getData2_ways(2);' class='btn btn-primary' data-toggle='#' data-target='#2WaysModal'>";
        richActionImage += btn_2_ways+"</button>";
        richActionImage +="</div>";
        richActionImage +="<input type='hidden' value='2' name='old_action_order[2]'>";
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
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' value='url'> URL";
        richActionImage +="</label>";
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' value='no_action'> No Action";
        richActionImage +="</label>";
        /* For 1 on 1 chat */
        richActionImage +="<label class='radio-inline'>";
        richActionImage +="<input type='radio' name='action_type[1]' data-type='1' value='2_ways' disabled> 2-Ways";
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
        richActionImage +="<div id='action_type1_url' class='hidden action_value'>";
        richActionImage +="<div class='input-group' style='width: 300px;'>";
        richActionImage +="<div class='input-group-btn'>";
        richActionImage +="<button id='protocol_1' type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>http:// <span class='caret'></span></button>";
        richActionImage +="<ul class='dropdown-menu' aria-labelledby='protocol_1'>";
        richActionImage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('http://',1)\">http</a></li>";
        richActionImage +="<li style='cursor:pointer;'><a onclick=\"addProtocol('https://',1)\">https</a></li>";
        richActionImage +="</ul>";
        richActionImage +="</div>";
        richActionImage +="<input class='form-control' id='actions_protocol[1]' type='hidden' name='actions_protocol[1]' value='http://'>";
        richActionImage +="<input class='form-control' type='text' name='actions_order[1]' class='form-control' style='width: 300px;'>";
        richActionImage +="</div>";
        richActionImage +="</div>";
         /* For 1 on 1 chat */
        richActionImage +="<div id='action_type1_2_ways' class='hidden action_value'>";
        richActionImage +="<input class='form-control' id='actions_2_ways_1' type='hidden' name='actions_2_ways[1]' value=''>";
        richActionImage +="<div id='show_text_rich_message_2_ways_1' class='hidden'><a style='cursor:pointer'><i class='fa fa-close text-danger'></i></a></div>";
        richActionImage +="<button id='btn_text_rich_message_2_ways_1' type='button' onclick='getData2_ways(1);' class='btn btn-primary' data-toggle='#' data-target='#2WaysModal'>";
        richActionImage += btn_2_ways+ "</button>";
        richActionImage +="</div>";
        richActionImage +="<input type='hidden' value='1' name='old_action_order[1]'>";
        richActionImage +="</div>";
        // close div id action_for_1
    }
    return richActionImage;
}

function addLinkActionRichMessage(typeAction, positionType) {
    /*
    *  typeAction
    *  keyword
    *  url
    *  no_action
    *
    *  positionType
    *
    *
    *
    */
    if(typeAction == 'keyword'){
        $("#action_type"+positionType+"_url").addClass('hidden');
         $("#action_type"+positionType+"_2_ways").addClass('hidden');
        $("#action_type"+positionType+"_keyword").removeClass('hidden');

        //clear old value
        $("input[name^='actions_order["+positionType+"]']").val('');

        var dataDiv = $("#show_text_rich_message_keyword_"+positionType).text();
        if($.trim(dataDiv).length == 0) {
            $("#btn_text_rich_message_keyword_"+positionType).removeClass('hidden');
        }

    } else if(typeAction == 'url') {
        $("#action_type"+positionType+"_keyword").addClass('hidden');
         $("#action_type"+positionType+"_2_ways").addClass('hidden');
        $("#action_type"+positionType+"_url").removeClass('hidden');

        // $("#btn_text_rich_message_keyword_"+positionType).addClass('hidden');
        $("input[name='rich_message_keyword["+positionType+"]'").remove();

        $("input[name^='actions_order["+positionType+"]']").val('');
        //close div

    } else if(typeAction == 'no_action') {
        $("input[name='rich_message_keyword["+positionType+"]'").remove();
        $("input[name='rich_message_2_ways["+positionType+"]'").remove();
        $("input[name^='actions_order["+positionType+"]']").val('');

        $("#action_type"+positionType+"_url").addClass('hidden');
        $("#action_type"+positionType+"_keyword").addClass('hidden');
        $("#action_type"+positionType+"_2_ways").addClass('hidden');

    } else if(typeAction == '2_ways') {
        $("#action_type"+positionType+"_keyword").addClass('hidden');
        $("#action_type"+positionType+"_url").addClass('hidden');
        $("#action_type"+positionType+"_2_ways").removeClass('hidden');

        $("input[name='rich_message_keyword["+positionType+"]'").remove();
        $("input[name^='actions_order["+positionType+"]']").val('');

        var dataDiv = $("#show_text_rich_message_2_ways_"+positionType).text();
        if($.trim(dataDiv).length == 0) {
            $("#btn_text_rich_message_2_ways_"+positionType).removeClass('hidden');
        }
    }
}

function addProtocol(protocal,id){
    $("#protocol_"+id).html(protocal+" <span class='caret'></span>");
    $("input[name='actions_protocol["+id+"]").val(protocal);
}

function getDataKeyword(actionID){
    var autoRereply = $("#autoReplyKeywordID").val();
    var url ='';
    if(autoRereply == "no") {
        url = '/api/v1/company-rich-message/'+companyID+'/keywords/';
    } else {
        url = '/api/v1/company-rich-message/'+companyID+'/keywords/?keywordID='+autoRereply;
    }
     $.ajax({
        type     : "GET",
        url      : url,
        success  : function(data)
        {
            if(data){
                var items = jQuery.parseJSON(data);
                var result ='';
                $("#tbodyAutoKeyword").html('');
                for(var index in items){
                    result += "<tr>";
                    result += "<td>";
                    result += "<a style=\"cursor:pointer\" onclick=\"addDataRichKeyword("+actionID+","+items[index].keywordID+",'"+items[index].keyword+"')\" class=\"btn btn-default\">Select</a>";
                    result += "</td>";

                    result += "<td>";
                    result += items[index].title;
                    result += "</td>";

                    result += "<td>";
                    result += items[index].keyword;
                    result += "</td>";

                    result += "<td style='white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 100px;white-space: nowrap;'>";
                    result += items[index].contentType;
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
    $("#show_text_rich_message_keyword_"+actionID).html(keyword +" <a style='cursor:pointer' onclick='deleteRichKeywordTag("+actionID+")'><i class='fa fa-close text-danger'></i></a>");
    $("#show_text_rich_message_keyword_"+actionID).removeClass('hidden');
    $("#btn_text_rich_message_keyword_"+actionID).addClass('hidden');
    $("#rich_message_for_keyword").append(input);
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

function getData2_ways(actionID){
    $('#2WaysModal').modal('hide');
    // var autoRereply = $("#autoReplyKeywordID").val();
    var url ='';
    // if(autoRereply == "no") {
        url = '/api/v1/company-rich-message/'+companyID+'/two-ways/';
    // } else {
        // url = '/api/v1/company-rich-message/'+companyID+'/two-ways/?keywordID='+autoRereply;
    // }
     $.ajax({
        type     : "GET",
        url      : url,
        success  : function(data)
        {
            if(data){
                var items = jQuery.parseJSON(data);
                var result ='';
                $("#tbody2Ways").html('');
                for(var index in items){
                    result += "<tr>";
                    result += "<td>";
                    result += "<a style=\"cursor:pointer\" onclick=\"addData2Ways("+actionID+","+items[index].keywordID+",'"+items[index].keyword+"')\" class=\"btn btn-default\">Select</a>";
                    result += "</td>";

                    result += "<td>";
                    result += items[index].title;
                    result += "</td>";

                    result += "<td>";
                    result += items[index].keyword;
                    result += "</td>";

                    result += "<td style='white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 100px;white-space: nowrap;'>";
                    result += items[index].contentType;
                    result += "</td>";
                    result += "</tr>";
                }
                $("#tbody2Ways").html(result);
                $('#2WaysModal').modal('show');
            }
        }
    })
}

function addData2Ways(actionID, keywordID, keyword){
    if($("input[name^=rich_message_2_ways]").length == 0) {
        $('#2WaysModal').modal('hide');
        var input = "<input type='hidden' name='rich_message_2_ways["+actionID+"]' value="+keywordID+">";
        $("#show_text_rich_message_2_ways_"+actionID).html(keyword +" <a style='cursor:pointer' onclick='deleteRich2Ways("+actionID+")'><i class='fa fa-close text-danger'></i></a>");
        $("#show_text_rich_message_2_ways_"+actionID).removeClass('hidden');
        $("#btn_text_rich_message_2_ways_"+actionID).addClass('hidden');
        $("#rich_message_for_2_ways").append(input);

        var action_type = $("input[name^=action_type]");
        var sizeType = action_type.length;

        var imageTypeShow = $("input[name=imageType]:radio");
        var sizeTypeShow = imageTypeShow.length;
        var actionNumber = 1;
        if(sizeTypeShow > 0) {
            for (var i = 0; i < sizeTypeShow; i++) {
                if($("#"+imageTypeShow[i].id).prop('checked') == true){
                    actionNumber = $("#"+imageTypeShow[i].id).val();
                }
            }
        }
        if(actionID == 1) {
            addLinkActionRichMessage('no_action',2);
        } else if(actionID == 2) {
            addLinkActionRichMessage('no_action',1);
        }
        if(sizeType > 0) {
            for (var i = 0; i < sizeType; i++) {
                if($(action_type[i]).val() == '2_ways') {
                    if($(action_type[i]).prop('checked') == false) {
                        $(action_type[i]).prop('disabled', true);
                    } else {
                        if($(action_type[i]).attr('data-type') != actionID) {
                            $(action_type[i]).prop('disabled', true);
                            $(action_type[i]).prop('checked', false);
                        }
                    }
                }
            }
            for (var i = 0; i < sizeType; i++) {
                if($(action_type[i]).val() == 'no_action') {
                    if($(action_type[i]).attr('data-type') != actionID) {
                        $(action_type[i]).prop('checked', true);
                    }
                }
            }
        }

    } else {
        //alert("Please Delete Old 2-ways");
    }
}

function deleteRich2Ways(actionID){
    $("#show_text_rich_message_2_ways_"+actionID).html('');
    $("#btn_text_rich_message_2_ways_"+actionID).removeClass('hidden');
    $("#show_text_rich_message_2_ways_"+actionID).addClass('hidden');

    $("input[name='rich_message_2_ways["+actionID+"]'").remove();
    var imageTypeShow = $("input[name=imageType]:radio");
    var sizeTypeShow = imageTypeShow.length;
    var actionNumber = 1;
    if(sizeTypeShow > 0) {
        for (var i = 0; i < sizeTypeShow; i++) {
            if($("#"+imageTypeShow[i].id).prop('checked') == 'true'){
                actionNumber = $("#"+imageTypeShow[i].id).val();
            }
        }
    }
    if(actionNumber == 1) {
        // image 2
        var action_type = $("input[name^=action_type]");
        var sizeType = action_type.length;
        if(sizeType > 0) {
            for (var i = 0; i < sizeType; i++) {
                if($(action_type[i]).val() == '2_ways'){
                    $(action_type[i]).prop('disabled', false);
                }
            }
        }
    } else {

    }
    $('#2WaysModal').modal('hide'); // close modal

}
function addDisabled2Ways() {
    var action_type = $("input[name^=action_type]");
    var sizeType = action_type.length;
    for (var i = 0; i < sizeType; i++) {
        if($(action_type[i]).val() == '2_ways' && $(action_type[i]).prop('checked') == false){
            $(action_type[i]).prop('disabled', true);
        }
    }
}