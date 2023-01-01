const openedMenu = document.querySelector('.opened-menu');
const closedMenu = document.querySelector('.closed-menu');
const navbarMenu = document.querySelector('.navbar');
const menuOverlay = document.querySelector('.overlay');

// Opened navbarMenu
// Closed navbarMenu
// Closed navbarMenu by Click Outside
openedMenu.addEventListener('click', toggleMenu);
closedMenu.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// Toggle Menu Function
function toggleMenu() {
   navbarMenu.classList.toggle('active');
   menuOverlay.classList.toggle('active');
   document.body.classList.toggle('scrolling');
}

navbarMenu.addEventListener('click', (event) => {
   if (event.target.hasAttribute('data-toggle') && window.innerWidth <= 992) {
      // Prevent Default Anchor Click Behavior
      event.preventDefault();
      const menuItemHasChildren = event.target.parentElement;

      // If menuItemHasChildren is Expanded, Collapse It
      if (menuItemHasChildren.classList.contains('active')) {
         collapseSubMenu();
      } else {
         // Collapse Existing Expanded menuItemHasChildren
         if (navbarMenu.querySelector('.menu-item-has-children.active')) {
            collapseSubMenu();
         }
         // Expand New menuItemHasChildren
         menuItemHasChildren.classList.add('active');
         const subMenu = menuItemHasChildren.querySelector('.sub-menu');
         subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
      }
   }
});

// Collapse Sub Menu Function
function collapseSubMenu() {
   navbarMenu.querySelector('.menu-item-has-children.active .sub-menu').removeAttribute('style');
   navbarMenu.querySelector('.menu-item-has-children.active').classList.remove('active');
}

// Fixed Resize Screen Function
function resizeScreen() {
   // If navbarMenu is Open, Close It
   if (navbarMenu.classList.contains('active')) {
      toggleMenu();
   }

   // If menuItemHasChildren is Expanded, Collapse It
   if (navbarMenu.querySelector('.menu-item-has-children.active')) {
      collapseSubMenu();
   }
}

window.addEventListener('resize', () => {
   if (this.innerWidth > 992) {
      resizeScreen();
   }
});
