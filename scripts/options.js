document.querySelector("#sidebar-button").addEventListener("click", function () {
    var iframe = document.createElement("iframe");
    iframe.src = "/ui/popup.html";
    iframe.style.width = "650px";
    iframe.style.height = "700px";
    document.body.replaceWith(iframe);
    
    // window.opener.close();
  });