var fnDropText_txtEmailContent = function (ev, ui) {
    var _element = $(ui.draggable["0"]).data("formats");
    var _oldtext = $('#txtEmailContent').summernote('code');
    var xtext = ui.draggable.text();
    $('#txtEmailContent').summernote('code', _oldtext+" "+_element+""+xtext);
}

var fnDropText_txtTankyouActivity = function (ev, ui) {
    var _element = $(ui.draggable["0"]).data("formats");
    var _oldtext = $('#txtTankyouActivity').summernote('code');
    var xtext = ui.draggable.text();
    $('#txtTankyouActivity').summernote('code', _oldtext+" "+_element+""+xtext);
}



$(function () {
//    tinymce.init({
//        selector: ".textAreaEditor",
//        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | emoticons | forecolor backcolor | print | report_design "
//    });

    $('#txtEmailContent , #txtTankyouActivity').summernote({
        height: 200, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null // set maximum height of editor
    });



    $("#DragWordList li").draggable({helper: 'clone'});

    $("#editorcontainer1").droppable({
        accept: "#DragWordList li",
        drop: fnDropText_txtEmailContent
    });
    $("#editorcontainer2").droppable({
        accept: "#DragWordList li",
        drop: fnDropText_txtTankyouActivity
    });
});