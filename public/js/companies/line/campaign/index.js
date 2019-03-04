$(function () {
    $("#messageFolderID").change(function () {
        $("input[name=messageFolderID]").val($(this).val());
        $("#filterForm").submit();
    });
});