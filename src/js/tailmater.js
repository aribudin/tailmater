(function () {
  "use strict";

/***********************************/
/*     Tailmater Js            
/*     by Ari budin            
/*     https://github.com/aribudin/tailmater     
/*==================================
 *     01.  Navbar Toggle          *
 *     02.  Dark Mode              *
 *     03.  Tabs                   *
 *     04.  Range Slider           *
 *     05.  Show Nav Scroll Up     *
 *     06.  Snackbar               *
 *     07.  Dialogs                *
 *     08.  Sheets                 *
 *     09.  Sidebar Menu           *
 *     10.  Dropdown Menus         *
 *     11.  Circle Progress        *
 *     12.  Segmented button       *
 *     13.  Themes Color           *
 *     14.  Preloader              *
 *     15.  Custom JS              *
 ==================================*/

  // ########## 01. Navbar Toggle ##########
  const toggle_func = function () {
    const set_toggle = document.querySelectorAll('[data-type="toggle"]');
    
    if ( set_toggle != null) {
      // show
      function ToggleClicks(ToggleClickEvent) {
        const clickTarget = ToggleClickEvent.currentTarget;
        const ToggleId = clickTarget.getAttribute("data-target");
        const activeToggle = document.querySelector(ToggleId);
        activeToggle.classList.toggle("show");
        clickTarget.classList.toggle("show");
      }
      for (let i = 0; i < set_toggle.length; i++) {
        set_toggle[i].addEventListener("click", ToggleClicks);
      }
    }
  };
  toggle_func();

  // ########## 02. Dark Mode ##########
  // load dark mode from local Storage
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.querySelector("html").classList.add('dark');
    const lightdark = document.querySelectorAll('[data-type="theme"]');

    for ( let i = 0; i < lightdark.length; i++) {
      lightdark[i].checked = true;
    }
  }
  const darkmode_func = function () {
    const lightdark = document.querySelectorAll('[data-type="theme"]');

    if ( lightdark != null) {
      for ( let i = 0; i < lightdark.length; i++) {
        lightdark[i].addEventListener("click", function(){
          const result = document.querySelector("html").classList.toggle("dark");
          if (result) {
            localStorage.setItem("theme", "dark");
          } else {
            localStorage.setItem("theme", "");
          }
        });
      }
    }
  }
  darkmode_func();

  // ########## 03. Tabs ##########
  const tabs_func = function () {
    const set_tabs = document.querySelectorAll('[data-type="tabs"]');
    const tabIndicator =  document.querySelectorAll('[role="indicator"]');

    if ( set_tabs != null) {
      function TabClicks(tabClickEvent) {
          const clickTarget = tabClickEvent.currentTarget;
          const tabParent = tabClickEvent.currentTarget.parentNode.parentNode;
          const set_tabs = tabParent.querySelectorAll('[data-type="tabs"]');
          const tabIndicator = tabParent.querySelectorAll('[role="indicator"]');
          const w_set = clickTarget.offsetWidth;

          for ( let i = 0; i < set_tabs.length; i++) {
            set_tabs[i].classList.remove("active");
            
            for ( let j = 0; j < tabIndicator.length; j++) {
              if ( clickTarget === set_tabs[i] ) {
                tabIndicator[j].style.left = w_set * i + 'px';
              }
            }
          }
          clickTarget.classList.add("active");

          // content
          tabClickEvent.preventDefault();
          const isTab = tabParent.querySelectorAll('[role="tabpanel"]');
          for ( let i = 0; i < isTab.length; i++) {
              isTab[i].classList.remove("active");
          }
          const activePaneId = clickTarget.getAttribute("data-target");
          const activePane = tabParent.querySelector(activePaneId);
          activePane.classList.add("active");
      }
      
      for ( let i = 0; i < set_tabs.length; i++) {
        set_tabs[i].addEventListener("click", TabClicks);
      }
    }
  };
  tabs_func();

  // ########## 04. Range Slider ##########
  const range_slider_func = function () {
    var range = document.querySelectorAll('[data-type="slider"]');

    if ( range != null) {
      for( let i = 0; i < range.length; i++) {
        range[i].nextElementSibling.style.width = range[i].value + "%";

        range[i].oninput = function(){
          // console.log( range[i].value );
          range[i].nextElementSibling.style.width = range[i].value + "%";
        }
      }
    }
  }
  range_slider_func();

  // ########## 05. Show Scroll Up ##########
  const scrollup_func = function () {
    var previousTop = 0;

    window.addEventListener("scroll", function(){
      var show_back_top = document.querySelector('[role="navtop"]');
      var currentTop = document.body.scrollTop || document.documentElement.scrollTop;

      if ( show_back_top !=null) {
        var min_header = document.querySelector('header').offsetHeight;
        var classTest = show_back_top.classList.contains("is-visible");

        if ( currentTop >= previousTop){
          //scroll down
          if (currentTop >= min_header) {
            show_back_top.classList.add("is-fixed");
            
            //remove if scroll to top
            if (classTest) {
              show_back_top.classList.remove("is-visible");
            }
          }
        } else {
          //scroll up
          if (currentTop >= min_header) {
            show_back_top.classList.add("is-visible");
          } else {
            show_back_top.classList.remove("is-visible","is-fixed");
          }
        }
      }
      previousTop =currentTop <= 0 ? 0 :currentTop;
    }, false);
  }
  scrollup_func();

  // ########## 06. Snackbar ##########
  const snackbar_func = function () {
    const set_snackbars = document.querySelectorAll('[data-type="snackbar"]');

    if ( set_snackbars != null) {
      const close_snackbar = document.querySelectorAll('[data-close]');
      // show
      function SnackbarClicks(SnackbarClickEvent) {
        const clickTarget = SnackbarClickEvent.currentTarget;
        const SnackbarId = clickTarget.getAttribute("data-target");
        const activeSnackbar = document.querySelector(SnackbarId);
        activeSnackbar.classList.toggle("show");
        setTimeout(function(){ activeSnackbar.classList.remove("show"); }, 5000);
      }
      // close
      function SnackbarCloses(SnackbarCloseEvent) {
        const closeTarget = SnackbarCloseEvent.currentTarget;
        const SnackbarId = closeTarget.getAttribute("data-close");
        const activeSnackbar = document.querySelector(SnackbarId);
        activeSnackbar.classList.remove("show");
      }

      for ( let i = 0; i < set_snackbars.length; i++) {
        set_snackbars[i].addEventListener("click", SnackbarClicks);
      }
      for ( let j = 0; j < close_snackbar.length; j++) {
        close_snackbar[j].addEventListener("click", SnackbarCloses);
      }
    }
  }
  snackbar_func();

  // ########## 07. Dialogs ##########
  const dialogs_func = function () {
    const set_dialogs = document.querySelectorAll('[data-type="dialogs"]');
    const body = document.querySelector("body");

    if ( set_dialogs != null) {
      const close_dialog = document.querySelectorAll('[data-close]')

      function DialogClicks(DialogClickEvent) {
        const clickTarget = DialogClickEvent.currentTarget;
        const DialogId = clickTarget.getAttribute("data-target");
        const activeDialog = document.querySelector(DialogId);
        activeDialog.classList.add("show");
        body.style.overflow = "hidden";
      }
      function DialogCloses(DialogCloseEvent) {
        const closeTarget = DialogCloseEvent.currentTarget;
        const DialogId = closeTarget.getAttribute("data-close");
        const activeDialog = document.querySelector(DialogId);
        activeDialog.classList.remove("show");
        body.style.overflow = "auto";
      }

      for ( let i = 0; i < set_dialogs.length; i++) {
        set_dialogs[i].addEventListener("click", DialogClicks);
      }
      for ( let j = 0; j < close_dialog.length; j++) {
        close_dialog[j].addEventListener("click", DialogCloses);
      }
    }
  };
  dialogs_func();

  // ########## 08. Sheets ##########
  const sheets_func = function () {
    const set_sheets = document.querySelectorAll('[data-type="sheets"]');

    if ( set_sheets != null) {
      const close_sheet = document.querySelectorAll('[data-close]');
      // show
      function SheetClicks(SheetClickEvent) {
        const clickTarget = SheetClickEvent.currentTarget;
        const SheetId = clickTarget.getAttribute("data-target");
        const activeSheet = document.querySelector(SheetId);
        activeSheet.classList.toggle("show");
      }
      // close
      function SheetCloses(SheetCloseEvent) {
        const closeTarget = SheetCloseEvent.currentTarget;
        const SheetId = closeTarget.getAttribute("data-close");
        const activeSheet = document.querySelector(SheetId);
        activeSheet.classList.remove("show");
      }

      for ( let i = 0; i < set_sheets.length; i++) {
        set_sheets[i].addEventListener("click", SheetClicks);
      }
      for ( let j = 0; j < close_sheet.length; j++) {
        close_sheet[j].addEventListener("click", SheetCloses);
      }
    }
  };
  sheets_func();

  // ########## 09. Sidebar Accordion ##########
  const accordion_func = function () {
    const set_accordion = document.querySelectorAll('[data-type="collapse"]');

    if ( set_accordion != null) {
      const is_accordion = document.querySelectorAll('[role="collapsed"]');
      // show
      function AccordionClicks(AccordionClickEvent) {
        const clickTarget = AccordionClickEvent.currentTarget;
        const AccordionId = clickTarget.getAttribute("data-target");
        const activeAccordion = document.querySelector(AccordionId);

        for (let j = 0; j < is_accordion.length; j++) {
          if (set_accordion[j] != clickTarget ){
            is_accordion[j].classList.remove("active");
            set_accordion[j].classList.remove("active");
          }
        }

        activeAccordion.classList.toggle("active");
        clickTarget.classList.toggle("active");
      }

      for ( let i = 0; i < set_accordion.length; i++) {
        set_accordion[i].addEventListener("click", AccordionClicks);
      }
    }
  };
  accordion_func();

  // ########## 10. Dropdown Menus ##########
  const dropdown_func = function () {
    const set_drop = document.querySelectorAll('[data-type="dropdown"]');

    if ( set_drop != null) {
      const is_drop = document.querySelectorAll('[role="dropdownmenu"]');
      // show
      function DropClicks(DropClickEvent) {
        const clickTarget = DropClickEvent.currentTarget;
        const DropId = clickTarget.getAttribute("data-target");
        const activeDrop = document.querySelector(DropId);

        for (let j = 0; j < is_drop.length; j++) {
          if (set_drop[j] != clickTarget ){
            is_drop[j].classList.remove("show");
            set_drop[j].classList.remove("show");
          }
        }
        activeDrop.classList.toggle("show");
        clickTarget.classList.toggle("show");
      }

      for ( let i = 0; i < set_drop.length; i++) {
        set_drop[i].addEventListener("click", DropClicks);

        // close dropdown
        window.onclick = function(event) {
          if (!event.target.matches('[data-type="dropdown"]')) {
            is_drop[i].classList.remove("show");
            set_drop[i].classList.remove("show");
            // close other dropdown
            for (let j = 0; j < is_drop.length; j++) {
              is_drop[j].classList.remove("show");
              set_drop[j].classList.remove("show");
            }
          }
        }
      }
    }
  };
  dropdown_func();

  // ########## 11. Progress ##########
  // Circle progress
  const circleprogress_func = function () {
    var counts = document.querySelectorAll('[role="progress_bg"]');

    if ( counts != null) {
      var circle = document.querySelectorAll('[role="progress_fill"]');

      for( let i = 0; i < counts.length; i++) {
        var val = counts[i].getAttribute('data-percent');
        
        if (isNaN(val)) {
         val = 100; 
        } else {
          var r = circle[i].getAttribute('r');
          var c = Math.PI*(r*2);
          if (val < 0) { val = 0;}
          if (val > 100) { val = 100;}
          var pct = ((100-val)/100)*c;
          circle[i].style.strokeDashoffset = pct + "px";
        }
      }
    }
  }
  circleprogress_func();
  
  // ########## 12. Segmented button ##########
  const segmented_func = function () {
    const set_check = document.querySelectorAll(".segmented-item > input");
    
    if ( set_check !=null) {
      for (let i = 0; i < set_check.length; i++) {
        set_check[i].addEventListener("click", function () {
          if (set_check[i].checked == true){
            set_check[i].parentNode.classList.add("active");
          } else {
            set_check[i].parentNode.classList.remove("active");
          }
          for (let x = 0; x < set_check.length; x++) {
            if (set_check[x].checked == false){
              set_check[x].parentNode.classList.remove("active");
            }
          }
        });
      }
    }
  };
  segmented_func();

  // ########## 13. Themes ##########
  const themes_func = function () {
    var ele = document.getElementsByName('themes');
    const themes = localStorage.getItem('themes');
    var body = document.body;
    var prev = null;

    const setThemes = (themes) => {
      body.classList.add( themes );
    }
    themes && setThemes(themes);

    if ( ele !=null) {
      for( let i = 0; i < ele.length; i++) {
        ele[i].addEventListener('change', function() {
          (prev) ? body.classList.remove( prev.value ) : body.classList.remove( themes ) ;
          if (this !== prev) {
              prev = this;
          }
          body.classList.add( this.value );

          localStorage.setItem('themes', this.value );
          console.log(this.value)
        })
      }
    }
  }
  themes_func();

  // ########## 14. Preloader ##########
  const preloader_func = function () {
    var xpre = document.querySelector(".preloader");
    if ( xpre != null) {
      window.addEventListener('load',function(){
        document.querySelector('body').classList.add("loaded-success")  
      });
    }
  }
  preloader_func();

  // ########## 15. Custom JS ##########
  const myCustom = function () {

    // insert your javascript in here
    
  }
  myCustom();

})();
