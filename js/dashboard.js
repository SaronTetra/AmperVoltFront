const menuIcon = document.querySelectorAll('.menu-icon');
const sidenav = document.querySelectorAll('.sidenav');
const sidenavClose = document.querySelectorAll('.sidenav_close-icon');

function toggleClassName(x, className) { 
    if(x.classList.contains(className)) {
        x.classList.remove(className);
    }
    else {
        x.classList.add(className);
    }
}

menuIcon[0].addEventListener('click', function() {
    toggleClassName(sidenav[0], 'active');
});


sidenavClose[0].addEventListener('click', function() {
    toggleClassName(sidenav[0], 'active');
});