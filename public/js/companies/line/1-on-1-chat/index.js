var currentRequestMessage = null;

var countD = 0;
var OcountD = null;
var oData = [];
function getUser(count) {
    // $.ajax({
    //     type: "GET",
    //     url: urlLineUsers,
    //     timeout: 20000,
    //     // async: true, /* If set to non-async, browser shows page as "Loading.."*/
    //     cache: false,
    //     data:{count:count},
    //     success: function(data) {
    //         var users = JSON.parse(data);
    //         var items = '';
    //         var tab = '';
    //         // console.log(users);
    //         if(users.data.length > 0 && (users.count !=count)) {
    //             items = setDataUser(users);
    //             tab = setDataMessage(users);
    //             // console.log(users.count +"  => " + count);
    //             //if($("div[id^=user_]").length == 0 || (users.count != count) ) {
    //                 $("#left").html(items);
    //                 $("#tabChats").html(tab);
    //             //}
    //         }
    //         if(users.count != null) {
    //             countD = users.count;
    //         }
    //       // console.log('success');

    //     },
    //     error: function() {
    //         console.log('Ooops, getUser something happened!');
    //         //setTimeout(getUser(), 5000);
    //     },
    //     complete: function() {
    //       // console.log('complete  countD = '+countD);
    //       // getUser(countD);
    //       setTimeout(getUser(countD), 1000);
    //         //setTimeout(getUser(), 5000);
    //     }
    // });

    $.ajax({
        type: "GET",
        url: urlLineUsers,
        timeout: 5000,
        cache: false,
        data:{count:count},
        success: function(data) {
            var users = JSON.parse(data);
            var items = '';
            var tab = '';
            if (OcountD == null) {
                //first;
                items = setDataUser(users);
                tab = setDataMessage(users);
                $("#left").html(items);
                $("#tabChats").html(tab);
                OcountD = users.data.length;
                loadTestMessageUser(users);
            }
            console.log("OcountD => "+OcountD + " users.data.length =>  "+users.data.length);
            if(OcountD !=null && (OcountD < users.data.length  ) ) {
                // user Add
                items = setDataAppendUser(users);
                tab = setDataMessageAppend(users);
                //console.log(items);
                // tab = setDataMessage(users);
                $("#ulUsers").append(items);
                $("#tabChats").append(tab);
                // $("#tabChats").append(tab);
                // OcountD = users.data.length;
                OcountD = users.data.length;
                loadTestMessageUser(users);
            } else if(OcountD !=null && (OcountD > users.data.length ) ) {
                items = setDataUser(users);
                $("#left").html(items);
                OcountD = users.data.length;
            }

            // if(users.data.length > 0 && (users.count !=count)) {
            //     items = setDataUser(users);
            //     tab = setDataMessage(users);
            //     // console.log(users.count +"  => " + count);
            //     //if($("div[id^=user_]").length == 0 || (users.count != count) ) {
            //         $("#left").html(items);
            //         $("#tabChats").html(tab);
            //     //}
            // }
            // if(users.count != null) {
            //     countD = users.count;
            // }
          // console.log('success');

        },
        error: function() {
            // console.log('Ooops, getUser something happened!');
            //setTimeout(getUser(), 5000);
        },
        complete: function() {
            // console.log('Ooops, complete getUser');

          setTimeout(getUser(OcountD), 1000);
        }
    });
}

function setDataAppendUser(users) {
    var item ='';
    for (var i in users.data) {
        if($.inArray( users.data[i].mid, oData ) == -1) {
            oData.push(users.data[i].mid);
            item  += "<li id='li_user_"+users.data[i].mid+"' onclick=changeShowPhoto('"+users.data[i].pictureUrl+"','"+users.data[i].mid+"','"+users.data[i].company_id+"','"+users.data[i].dimId+"','"+users.data[i].id+"') >";
            item  += "<a data-toggle='tab' href='#user_"+users.data[i].mid+"'>";
            item  += "<div class='row'>";
            item  += "<div class='col-xs-9'>";
            item  += "<div class='media'>";
            item  += "<div class='media-left media-middle'>";
            item  += "<img src="+users.data[i].pictureUrl+" alt='user-image' class='img-circle' width='50px' height='50px'/>";
            item  += "</div>";
            item  += "<div class='media-body'>";
            item  += "<h4 class='media-heading'>"+  users.data[i].displayName +"</h4>";
            item  += "<span class='text-muted'>"+  users.data[i].statusMessage +"</span>";
            item  += "</div>";
            item  += "</div>";
            item  += "</div>";
            item  += "<div class='col-xs-3 text-right'>";
            item  += "<button class='btn btn-xs btn-link' onclick=deleteUser('"+users.data[i].mid+"')><span class='text-danger'><i class='fa fa-times' aria-hidden='true'></i></span></button>";
            item  += "<div>9.00 PM</div>";
            item  += "</div>";
            item  += "</div>";
            item  += "</a>";
            item  += "</li>";
            // item  += "<hr style='margin:0'>";
            item  += "<hr id='hr_user_"+users.data[i].mid+"' style='margin:0'>";

        }
    }
    return item;
}

function setDataDeleteUser(users) {
    for (var i in users.data) {
        if($.inArray( users.data[i].mid, oData ) == -1) {
            item  += "<li onclick=changeShowPhoto('"+users.data[i].pictureUrl+"','"+users.data[i].mid+"','"+users.data[i].company_id+"','"+users.data[i].dimId+"','"+users.data[i].id+"') >";
            item  += "<a data-toggle='tab' href='#user_"+users.data[i].mid+"'>";
            item  += "<div class='row'>";
            item  += "<div class='col-xs-9'>";
            item  += "<div class='media'>";
            item  += "<div class='media-left media-middle'>";
            item  += "<img src="+users.data[i].pictureUrl+" alt='user-image' class='img-circle' width='50px' height='50px'/>";
            item  += "</div>";
            item  += "<div class='media-body'>";
            item  += "<h4 class='media-heading'>"+  users.data[i].displayName +"</h4>";
            item  += "<span class='text-muted'>"+  users.data[i].statusMessage +"</span>";
            item  += "</div>";
            item  += "</div>";
            item  += "</div>";
            item  += "<div class='col-xs-3 text-right'>";
            item  += "<div class='text-danger' onclick=deleteUser('"+users.data[i].mid+"')><i class='fa fa-times' aria-hidden='true'></i></div>";
            item  += " 9.00 PM";
            item  += "</div>";
            item  += "</div>";
            item  += "</a>";
            item  += "</li>";
            item  += "<hr style='margin:0'>";
        }
    }
    return item;
}

function setDataUser(users) {
    var item ='';
    var divUsers = $("div[id^=user_]");
    //if(divUsers.length == 0) {
        item  += "<ul class='nav nav-pills nav-stacked' id='ulUsers'>";
        for (var i in users.data) {
            oData.push(users.data[i].mid);


            item  += "<li id='li_user_"+users.data[i].mid+"' onclick=changeShowPhoto('"+users.data[i].pictureUrl+"','"+users.data[i].mid+"','"+users.data[i].company_id+"','"+users.data[i].dimId+"','"+users.data[i].id+"')";
            if(i == 0 ) {
                item  += " class='active' >";
            } else {
                item  += ">";
            }
            item  += "<a data-toggle='tab' href='#user_"+users.data[i].mid+"'>";
            item  += "<div class='row'>";
            item  += "<div class='col-xs-9'>";
            item  += "<div class='media'>";
            item  += "<div class='media-left media-middle'>";
            item  += "<img src="+users.data[i].pictureUrl+" alt='user-image' class='img-circle' width='50px' height='50px'/>";
            item  += "</div>";
            item  += "<div class='media-body'>";
            item  += "<h4 class='media-heading'>"+  users.data[i].displayName +"</h4>";
            item  += "<span class='text-muted'>"+  users.data[i].statusMessage +"</span>";
            item  += "</div>";
            item  += "</div>";
            item  += "</div>";
            item  += "<div class='col-xs-3 text-right'>";
            item  += "<button class='btn btn-xs btn-link' onclick=deleteUser('"+users.data[i].mid+"')><span class='text-danger'><i class='fa fa-times' aria-hidden='true'></i></span></button>";
            item  += "<div>9.00 PM</div>";
            item  += "</div>";
            item  += "</div>";
            item  += "</a>";
            item  += "</li>";
            item  += "<hr id='hr_user_"+users.data[i].mid+"' style='margin:0'>";
        }
        item  += "</ul>";
        oData = oData.filter(function(itm,i,a){
            return i==a.indexOf(itm);
        });
        return item;
    // } else {
    //     for( var i in divUsers) {
    //         console.log(users.data[i].mid)
    //         if("user_"+users.data[i].mid != divUsers[i].id) {
    //             item  += "<li onclick=changeShowPhoto('"+users.data[i].pictureUrl+"','"+users.data[i].mid+"','"+users.data[i].company_id+"','"+users.data[i].dimId+"','"+users.data[i].id+"') >";
    //             item  += "<a data-toggle='tab' href='#user_"+users.data[i].mid+"'>";
    //             item  += "<div class='row'>";
    //             item  += "<div class='col-xs-9'>";
    //             item  += "<div class='media'>";
    //             item  += "<div class='media-left media-middle'>";
    //             item  += "<img src="+users.data[i].pictureUrl+" alt='user-image' class='img-circle' width='50px' height='50px'/>";
    //             item  += "</div>";
    //             item  += "<div class='media-body'>";
    //             item  += "<h4 class='media-heading'>"+  users.data[i].displayName +"</h4>";
    //             item  += "<span class='text-muted'>"+  users.data[i].statusMessage +"</span>";
    //             item  += "</div>";
    //             item  += "</div>";
    //             item  += "</div>";
    //             item  += "<div class='col-xs-3 text-right'>";
    //             item  += "<div class='text-danger' onclick='deleteUser("+users.data[i].mid+")'><i class='fa fa-times' aria-hidden='true'></i></div>";
    //             item  += " 9.00 PM";
    //             item  += "</div>";
    //             item  += "</div>";
    //             item  += "</a>";
    //             item  += "</li>";
    //             item  += "<hr style='margin:0'>";
    //         }
    //         $("#ulUsers").append($item);
    //     }
    // }
}

function setDataMessage(users) {
    var item ='';
    item +="<div class='onchat'>";
    item +="<div class='tab-content'>";
    for (var i in users.data) {
        //if($.inArray( users.data[i].mid, oData ) == -1) {
            // item +="<p class='text-center'>";
            // item +="<Badge>"+users.data[i].id+"(Monday)</Badge>";
            // item +="</p>";
            if(i == 0) {
                item +="<div id='user_"+users.data[i].mid+"' class='tab-pane fade in active'>";
            } else {
                item +="<div id='user_"+users.data[i].mid+"' class='tab-pane fade'>";
            }
            item +="</div>";
       // }
    }
    item +="</div>";
    item +="</div>";
    return item;
}

function setDataMessageAppend(users) {
    var item ='';
    item +="<div class='onchat'>";
    item +="<div class='tab-content'>";
    for (var i in users.data) {
        if($.inArray( users.data[i].mid, oData ) == -1) {
            // item +="<p class='text-center'>";
            // item +="<Badge>"+users.data[i].id+"(Monday)</Badge>";
            // item +="</p>";
                //item +="<div id='user_"+users.data[i].mid+"' class='tab-pane fade '>";
                item +="<div id='user_"+users.data[i].mid+"' class='tab-pane fade'>";
            //}
            item +="</div>";
       }
    }
    item +="</div>";
    item +="</div>";
    return item;
}


function loadTestMessageUser(users) {
    for (var i in users.data) {
        loadMessageUser(users.data[i].mid, users.data[i].company_id, users.data[i].dimId, +users.data[i].id);
    }
}

function changeShowPhoto(photoSrc, mid, companyId, dimID, userID){
    $("#message_text").val("");
    if($("#li_user_"+mid).length > 0){

        // $("#userShowPhoto").attr("src",'');
        setObjectData(mid, companyId, dimID, userID);
        $("#AvatarUser").attr("src", photoSrc);
    }
}

function setObjectData(mid, companyId, dimID, userID) {
    var chkHaveData = checkObjectDataUser(mid, companyId);
    if(!chkHaveData) {
        var obj = {};
        obj['inChat'] = true;
        obj['mid'] = mid;
        obj['operator_id'] = 1;
        obj['company_id'] = companyId;
        obj['dim_line_one_on_one_chat_id'] = dimID;
        obj['userID'] = userID;
        obj['message_type'] = null;
        obj['message_text'] = null;
        obj['stkID'] = null;
        obj['stkPKGID'] = null;
        obj['stkVer'] = null;
        dataMessagesUsers.push(obj);
    }


    //load Message
    //loadMessageUser(mid, companyId, dimID, userID);
}

function checkObjectDataUser(mid, companyId) {
    var data =[];
    dataMessagesUsers.map(function (person) {
        if (person.mid == mid) {
            person.inChat = true;
            $("#message_text").val(person.message_text);
        } else {
            person.inChat = false;
        }
    });
    for( var i in dataMessagesUsers) {
        data.push(dataMessagesUsers[i].mid);
    }
    if(data.indexOf(mid) != -1) {
        return true;
    }
    return false;
}
function deleteUser(mid) {
    $("#li_user_"+mid).remove();
    $("#hr_user_"+mid).remove();
    // $("#user_"+mid).hide();
    $("#user_"+mid).html("");
    $("#AvatarUser").attr("src", urlUsermoon);

    $.ajax({
        type: "DELETE",
        url: urlMessages+"/"+mid,
        // data:{mid:mid},
        success: function(data) {
            $("#AvatarUser").attr("src", urlUsermoon);

        },
        error: function() {
            // console.log('Ooops, something happened!');
        },
        complete: function() {
            $("#AvatarUser").attr("src", urlUsermoon);
             $("#user_"+mid).html("");

            //$("#user_"+mid).remove();

            oData = $.grep(oData, function(value) {
              return value != mid;
            });
            oData = oData.filter(function(itm,i,a){
                return i==a.indexOf(itm);
            });
        }
    });
}

function sent() {
    var obj = {};
    var dataStore = [];
    dataMessagesUsers.map(function (person) {
        if (person.inChat) {
            person.message_type = 'text';
            person.message_text = $("#message_text").val();
            person.stkID = null;
            person.stkPKGID = null;
            person.stkVer = null;
            dataStore.push(person);
        }
    });
    $.ajax({
        type: "POST",
        url: urlMessages,
        data:{dataStore},
        success: function(data) {
            //var messages = JSON.parse(data);
            //if( messages.data.length > 0 && messages.count !=count) {
                //genarateMessage(mid, messages.data);
            //}

           //setTimeout(loadMessageUser(mid, companyId, dimID, userID, messages.count), 1000);
        },
        error: function() {
            //console.log('Ooops, something happened!');
            //setTimeout(loadMessageUser(mid, companyId, dimID, userID), 5000);

        },
        complete: function() {
            dataMessagesUsers.map(function (person) {
                if (person.inChat) {
                    person.message_type = null;
                    person.message_text = null;
                    person.stkID = null;
                    person.stkPKGID = null;
                    person.stkVer = null;
                    dataStore.push(person);
                }
            });
        }

    });
    $("#message_text").val('');

    //console.log(dataStore);
    // obj['mid'] = '111';
    // obj['operator_id'] = '111';
    // obj['company_id'] = '111';
    // obj['dim_line_one_on_one_chat_id'] = '111';
    // obj['message_type'] = 'text';
    // obj['message_text'] = '111';
    // obj['stkID'] = null;
    // obj['stkPKGID'] = null;
    // obj['stkVer'] = null;

    // dataMessagesUsers
}

function genarateMessage(mid, messages){
    var text = '';
    for( var i in messages) {
        if(messages[i].operator_id === null) {
            //user
            // text +="<p class='col-xs-12'>";
            text +="<div class='col-xs-12'>";
            text +="<span class='pull-left'>";
            text +="<img src="+messages[i].pictureUrl+" alt='user-image' class='img-circle' width='50px' height='50px'/>";
            text +="</span>";
            text +="<span class='user-msg pull-left'>";
            text +="<div class='msg'>";
            text +="<p>";
            text +=messages[i].message_text;
            text +="</p>";
            text +="</div>";
            text +="</span>";
            text +="<span class='timeread pull-left'>";
            text +="<div><time>"+messages[i].created_at+"</time></div>";
            text +="</span>";
            text +="</div>";
        } else {
            // operator
            text +="<div class='col-xs-12'>";
            text +="<span class='pull-right'>";
            text +="<div class='self-msg' style='position:relative'>";
            text +="<p>";
            text +=messages[i].message_text;
            text +="</p>";
            text +="</div>";
            text +="</span>";
            text +="<span class='timeread pull-right'>";
            text +="<div><time>"+messages[i].created_at+"</time></div>";
            text +="</span>";
            text +="</div>";
        }
    }
    if($.trim(text) != "") {
        $("#user_"+mid).html(text);
    }
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
       // e.target // newly activated tab
        //e.relatedTarget // previous active tab
        $('.onchat').animate({ scrollTop: $(".onchat")[0].scrollHeight }, 0);
    });
}

function loadMessageUser(mid, companyId, dimID, userID, count){
    if(currentRequestMessage !== null) {
        currentRequestMessage.abort();
    }

    var oldMid = mid;
    var oldCompanyId = companyId;
    var oldDimID = dimID;
    var oldUserID = userID;
    var oldCount = null;
    currentRequestMessage = $.ajax({
        type: "GET",
        url: urlMessages,
        timeout: 10000,
         // async: true, /* If set to non-async, browser shows page as "Loading.."*/
        cache: false,
        data:{mid:mid,companyId:companyId,dimID:dimID,count:count},
        success: function(data) {
            var messages = JSON.parse(data);
            if( messages.data.length > 0 ) {
                genarateMessage(mid, messages.data);
            }
            oldMid = mid;
            oldCompanyId = companyId;
            oldDimID = dimID;
            oldUserID = userID;
            if(messages.count != null) {
                oldCount = messages.count;
            }
            // setTimeout(loadMessageUser(mid, companyId, dimID, userID, messages.count), 1000);
        },
        error: function() {
            //console.log('Ooops, loadMessageUser something happened!');
            // setTimeout(loadMessageUser(mid, companyId, dimID, userID), 5000);
        },
        complete: function() {
          //console.log('complete loadMessageUser');

          setTimeout(loadMessageUser(oldMid, oldCompanyId, oldDimID, oldUserID, oldCount), 2000);
        }
    });
}

$(function () {
    dataMessagesUsers =[];
    $("#message_text").keyup(function() {
        dataMessagesUsers.map(function (person) {
            if (person.inChat) {
                person.message_type = "text";
                person.message_text = $("#message_text").val();

            }
        });
    });

   getUser();
});


