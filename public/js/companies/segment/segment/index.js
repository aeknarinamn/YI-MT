$(function () {
    $("#segmentFolderID").change(function () {
        $("input[name=segmentFolderID]").val($(this).val());
        $("#filterForm").submit();
    });
});