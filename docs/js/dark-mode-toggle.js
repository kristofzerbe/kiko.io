/* https://stackoverflow.com/questions/56300132/how-to-over-ride-css-prefers-color-scheme-setting
*/

function detectColorScheme(){
    var theme = "light"; //default

    if(localStorage.getItem("theme")){
        if(localStorage.getItem("theme") == "dark"){
            theme = "dark";
        }
    } else if(!window.matchMedia) { //matchMedia not supported    
        return false;
    } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
            theme = "dark";
    }
    document.documentElement.setAttribute("data-theme", theme);
}
detectColorScheme();

const toggleTheme = document.querySelector('input#theme-switch[type="checkbox"]');

function setThemeDark() {
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleTheme.checked = true;
}
function setThemeLight() {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
    toggleTheme.checked = false;
}

//listener for theme change by toggle
toggleTheme.addEventListener('change', function(e) {
    if (e.target.checked) {
        setThemeDark();
    } else {
        setThemeLight();
    }
}, false);

//listener for theme change by OS
var toggleOS = window.matchMedia('(prefers-color-scheme: dark)');
toggleOS.addEventListener('change', function (e) {
    if (e.matches) {
        setThemeDark();
    } else {
        setThemeLight();
    }
});

//pre-check toggle
toggleTheme.checked = (document.documentElement.getAttribute("data-theme") == "dark");
