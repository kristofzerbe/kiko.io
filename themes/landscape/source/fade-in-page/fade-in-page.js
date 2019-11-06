function fadeInPage() {
    if (!window.AnimationEvent) { return; }
    var fader = document.getElementById('fader');
    fader.classList.add('fade-out');
}

document.addEventListener('DOMContentLoaded', function() {
if (!window.AnimationEvent) { return; }

var anchors = document.getElementsByTagName('a');

for (var idx=0; idx<anchors.length; idx+=1) {

    if (anchors[idx].hostname !== window.location.hostname || anchors[idx].pathname === window.location.pathname) {
        return;
    }

    anchors[idx].addEventListener('click', function(event) {
        if (event.metaKey || event.ctrlKey) return;

        var fader = document.getElementById('fader'),
            anchor = event.currentTarget;

        var listener = function() {
            window.location = anchor.href;
            fader.removeEventListener('animationend', listener);
        };
        fader.addEventListener('animationend', listener);

        event.preventDefault();
        fader.classList.add('fade-in');
        });
    }
});

window.addEventListener('pageshow', function (event) {
if (!event.persisted) {
    return;
}
var fader = document.getElementById('fader');
fader.classList.remove('fade-in');
});

//RUN
var fader = document.createElement("svg");
fader.setAttribute("id", "fader");
document.body.prepend(fader);
fadeInPage();