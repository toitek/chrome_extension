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
    alert('no html tag retrieved...!');
    throw 'no html tag retrieved son.';
}

if (html.css('position') === 'static') {
    html.css('position', 'relative');
}

var iframeId = 'someSidebar';
if (document.getElementById(iframeId)) {
    alert('id:' + iframeId + 'taken please dont use this id!');
    throw 'id:' + iframeId + 'taken please dont use this id!';
}

html.append(
    '<div id="collapsableContainer">' +
    '<div id="collapseButton">x</div>' +
    '<iframe id="' + iframeId + '" scrolling="no" frameborder="0" allowtransparency="false" ' +
    'style="position: fixed; height: ' + height + 'px; width: ' + width + 'px; background-color: #000;' +
    'right: 0px; top: 0px; bottom: 0px;">' +
    '</iframe>' +
    '</div>'
);

var iframe = document.getElementById(iframeId);
iframe.src = "https://chat.openai.com/";

$("#collapseButton").click(function () {
    isCollapsed = !isCollapsed;
    if (isCollapsed) {
        $("#collapsableContainer").animate({ width: '25px' });
        $("#" + iframeId).animate({ height: '25px' });
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
    'width': width + 'px'
});

$("#collapseButton").css({
    'padding': '0px 6px 2px',
    'line-height': '1em',
    'cursor': 'pointer',
    'position': 'absolute',
    'background': 'rgb(224, 217, 217)',
    'font-family': 'monospace',
    'font-size': '20px',
    'color': 'rgb(85, 85, 85)',
    'z-index': '1'
});
