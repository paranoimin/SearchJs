$(function() {

  var projects = {
    "content": [
      {"user_num": 289,"user_name": "한나여성아이병원","user_id": "100241"},
      {"user_num": 573,"user_name": "제일병원","user_id": "107289"},
      {"user_num": 573,"user_name": "제일병원","user_id": "345345"},
      {"user_num": 573,"user_name": "해피병원","user_id": "107289"},
      {"user_num": 573,"user_name": "정성병원","user_id": "107289"},
      {"user_num": 573,"user_name": "초앤병원","user_id": "107289"},
      {"user_num": 573,"user_name": "가병원","user_id": "107289"},
      {"user_num": 573,"user_name": "나병원","user_id": "107289"},
      {"user_num": 573,"user_name": "다병원","user_id": "107289"}
    ]
  };


  function getAutoCompleteData(data) {
    var res = [];

    res = $.map(data.content, function(item, idx) {
      return {
        value: item.user_name,
        label: item.user_name,
        num: item.user_num,
        desc: item.user_id
      };
      //console.log("name : " + item.user_name);
    });
    console.log('res');
    console.log(res);
    return res;
  }
  console.log('projects : ' + projects);

  $("#search").keydown(function() {
    $("#search").autocomplete("enable");
  });
  $("#search").autocomplete({
    minLength: 1,
    source: getAutoCompleteData(projects),
    focus: function(event, ui) {
      $("#search").val(ui.item.label);
      return false;
    },
    select: function(event, ui) {
      $("#result").html("");
      $("#result").append("<li><p class='userID'><span>고객ID</span>" + ui.item.desc + "</p><p class='hospName'><span>병원명</span>" + ui.item.label + "</p></li>");
      return false;
    }
  }).autocomplete("instance")._renderItem = function(ul, item) {
    var re = new RegExp($.trim(this.term.toLowerCase()));
    var t = item.label.replace(re, "<span style='font-weight:600;color:#0068c3;'>" + $.trim(this.term.toLowerCase()) +
      "</span>");
    return $("<li>")
      .append("<a>" + t + "</a>")
      .appendTo(ul);
  };

  $("#search").keydown(function(event, ui) {
    if (event.keyCode == 13){
      var word = $("#search").val();
      var items = projects.content.length;
      var result = "";

      for (var i = 0; i < items; i++) {
        if(projects.content[i].user_name.indexOf(word) != -1) {
          result += "<li><p class='userID'><span>고객ID</span>"+projects.content[i].user_id+"</p><p class='hospName'><span>병원명</span>"+projects.content[i].user_name+"</p></li>";
        }
      }
      $("#result").html(result);
      $("#search").autocomplete("disable");
    }

  });

  $(".c_icon").click(function() {
    $("#search").val("");
    $("#resultWrap").hide();

  });

});
