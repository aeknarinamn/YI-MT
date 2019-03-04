function test(count) {
    $.ajax({
        type: "GET",
        url: 'http://yellowproject.app/api/v1/line-1-on-1-chat-data',
        data:{count:count},
        success: function(data) {
            var users = JSON.parse(data);
            var items = '';
            if(users.count != count) {
            items = setDataUser(users);

            $("#left").html(items);
            }
            setTimeout(test(users.count), 1000);
        },
        error: function() {
            console.log('Ooops, something happened!');
            setTimeout(test, 5000);

        },

    });
}

function setDataUser(users) {
    var item ='';
    item  += "<ul class='nav nav-pills nav-stacked'>";
    for (var i in users.data) {
        item  += "<li class='active relative'>";
        item  += "<a data-toggle='tab' href='#user_"+users.data[i].id+"'>";
        item  += "<div class='row relative'>";
        item  += "<div class='col-xs-9'>";
        item  += "<div class='media'>";
        item  += "<div class='media-left media-middle'>";
        item  += "<img src="+users.data[i].pictureUrl+" alt='user-image' class='img-circle' width='50px' height='50px'/>";
        item  += "</div>";
        item  += "<div class='media-body'>";
        item  += "<h4 class='media-heading'>"+  users.data[i].displayName +"</h4>";
        item  += "<span class='text-muted'>Cras sit amet nibh libero, in gravida nulla.</span>";
        item  += "</div>";
        item  += "</div>";
        item  += "</div>";
        item  += "</div class='col-xs-3 text-right'>";
        item  += " 9.00 PM";
        item  += "</div>";
        item  += "</div>";
        item  += "</a>";
        item  += "</li>";
    }
    item  += "</ul>";
    return item;

}


function changeShowPhoto(obj){
    // $("#userShowPhoto").attr("src",'');
    // $("#userShowPhoto").attr("src",'');

}


$(function () {
    test();
});


