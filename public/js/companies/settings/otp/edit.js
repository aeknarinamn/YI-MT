$(function () {
    init_DragDrop();
});

function init_DragDrop() {
    $("#DragWordList li").draggable({helper: 'clone'});
    $(".txtDropTarget").droppable({
        accept: "#DragWordList li",
        drop: function (ev, ui) {
            var _element = $(ui.draggable["0"]).data("formats");
            var _prev_text = $(this).val();
            // var myValue = _prev_text + " " + _element + "" + ui.draggable.text() + " ";
            var myValue = _prev_text + " " + "(["+ui.draggable.text()+"])" + " ";
            console.log(myValue);
            $(this).val(myValue);
            $(this).focus();
            //$(this).append(myValue);
        }
    });
}