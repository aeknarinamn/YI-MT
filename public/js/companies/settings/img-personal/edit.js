$(document).ready(function(e) {   
    $('#photo').click(function(e) {
        var posX = $(this).offset().left, posY = $(this).offset().top;
        $('#relativeX').val(parseInt(e.pageX - posX));
		$('#relativeY').val(parseInt(e.pageY - posY));
    });


 

	$("#DragWordList li").draggable({helper: 'clone'});
    $(".txtDropTarget").droppable({
                accept: "#DragWordList li",
                drop: function(ev, ui) {
                	alert(" "+"(["+ui.draggable.text()+"])"+" ");
                    // myValue = " "+"(["+ui.draggable.text()+"])"+" ";
                    // $(this).append( myValue );
                    //   var id = $(this).attr('id');
                    // id = id.split("-");
                }
            });

});