var height = $(window).height();
var width = 400;
var isCollapsed = false;

var html;
if (document.documentElement) {
    html = $(document.documentElement);
} else if (document.getElementsByTagName('html') && document.getElementsByTagName('html')[0]) {
    html = $(document.getElementsByTagName('html')[0]);
} else if ($('html').length > -1) {
    html = $('html');
} else {
    throw 'nothing fetched';
}

if (html.css('position') === 'static') {
    html.css('position', 'relative');
}

var iframeId = 'AIW-Sidebar';
if (document.getElementById(iframeId)) {
    alert('id:' + iframeId + ' Refresh page!');
    throw 'id:' + iframeId + 'Side bar already launched!';
}

html.append(
    '<div id="collapsableContainer">' +
    '<div id="collapseButton" style="color: black;">x</div>' +
    '<iframe id="' + iframeId + '" scrolling="no" frameborder="0" allowtransparency="false" ' +
    'style="position: fixed; height: ' + height + 'px; width: ' + width + 'px;' +
    'right: 0px; top: 0px; bottom: 0px; z-index:1;' +
    'box-shadow: rgb(0 0 0 / 70%) 2px 1px 12px;' +
    'transition: all 0.35s ease 0s;' +
    '">' +
    '</iframe>' +
    '</div>'
);

var iframe = document.getElementById(iframeId);
iframe.src = "chrome-extension:/kkemeoacfdmckedhpkkacbkdpjfmdnll/ui/popup.html";
// iframe.src = "https://chat.openai.com/";

$("#collapseButton").click(function () {
    isCollapsed = !isCollapsed;
    if (isCollapsed) {
        $("#collapsableContainer").animate({ width: '0' });
        $("#" + iframeId).animate({ height: '0' });
    } else {
        $("#collapsableContainer").animate({ width: width + 'px' });
        $("#" + iframeId).animate({ height: height + 'px' });
    }
});

$("#collapsableContainer").css({
    'position': 'fixed',
    'right': '0px',
    'top': '0px',
    'bottom': '0px',
    'width': width + 'px',
    'z-index': '2147483647'
});

$("#collapseButton").css({
    'padding': '8px 12px',
    'line-height': '1em',
    'cursor': 'pointer',
    'position': 'absolute',
    'background': 'rgb(224, 217, 217)',
    'font-family': 'monospace',
    'font-size': '20px',
    'color': 'white',
    'border-radius': '50%',
    'right': '8px',
    'top': '8px',
    'z-index': '2147483647',
    'box-shadow': '0 0 10px rgb(0, 0, 0, 0.25)'
});
