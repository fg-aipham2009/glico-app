$(function() {
    $(".prefectureSearch").click(function() {
        $(".prefectureModal").show();
    });
    $(".prefectureModal").click(function() {
        $(".prefectureModal").hide();
    });

    // 出生年月选择
    if ($('#dateinput').length > 0) {
        $('#dateinput').date();
    }

    // 自定义下拉框
    $(".selectInput").click(function() {
        $(this).closest(".customSelect").find(".list").slideToggle(300);
        $(this).toggleClass('active').toggleClass('')
    })

    $(".customSelect .list ul li").click(function() {
        var val = $(this).html();
        $(this).closest(".customSelect").find(".selectInput").html(val);
        $(this).closest(".customSelect").find(".selectInput").addClass('choose');
        $(this).closest(".customSelect").find(".selectInput").removeClass("active");
        $(this).closest(".customSelect").find(".list").hide();
    })
});