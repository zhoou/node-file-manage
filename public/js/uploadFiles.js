function handleEvent (event) {
  var info = "",
  output = document.getElementById("out-input"),
  files,i,len;
  EventUtil.preventDefault(event); //阻止事件的默认行为
  var formData = new FormData();
  if (event.type == "drop") {
    files = event.dataTransfer.files;
    i = 0;
    len= files.length;
    while ( i < len) {
      info += files[i].name +"("+ files[i].type + "," +files[i].size +"bytes)<br/>";
      formData.append("file", files[i]);
      i++;
    }
    output.innerHTML = info;
    $.ajax({
      type: "post",
      url: "/uploadFile",
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      processData: false, //此处指定对上传数据不做默认的读取字符串的操作
      success:function (rs) {
        output.innerHTML+= ('<p style="color:red;">' + rs.message + "</p>");
      },
      error:function (r) {
        output.innerHTML+= ('<p style="color:red;">文件上传出错</p>');
        alert("文件上传出错！");
      }
    });
  }
}
$(function() {
  var a1 = document.getElementById("a1");
  EventUtil.addHandler(a1, "dragenter", handleEvent);
  EventUtil.addHandler(a1, "dragover", handleEvent);
  EventUtil.addHandler(a1, "drop", handleEvent);
})
