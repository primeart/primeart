
///interface

	function ui_signInDialog(show) {
		display = show?'block':'none'
		if(display=='none' && window.event && window.event.target !== window.event.currentTarget) {
			return false
		}
		document.getElementById('signInBox').style.display = display
	}

	function ui_toggleHamburgerMenu(show) {
		toggleHamburgerMenu(show)
	}
	function toggleHamburgerMenu(show) {
		if(show) {
			document.getElementById('site_root').className = 'site-root site-root--site-nav-popup-active';
			document.getElementById('hamburgerNav').className = 'site-nav__popup-root site-nav__popup-root--active';
			//document.getElementById('site-nav__dropdown-root').style.display = 'none'

		} else {
			document.getElementById('site_root').className = 'site-root';
			document.getElementById('hamburgerNav').className = 'site-nav__popup-root';
	}

		event.stopPropagation();
	}

	function ui_setLoginedInterface(userName){
		if (!userName){
			//unlogined look
			document.getElementById('signinButton').innerHTML = 'Sign In'
			document.getElementById('signInButtonHamburger').innerHTML = 'Sign In'
			document.getElementById('getStartedButton').innerHTML = 'Get Started'
			document.getElementById('getStartedButtonHamburger').innerHTML = 'Get Started'
			//document.getElementById('signinButton').style.display = 'block'
			//document.getElementById('getStartedButton').style.display = 'block'
			//document.getElementById('signedInAccountButton').style.display = 'none'
		}else{
			ui_signInDialog(false)
			document.getElementById('signinButton').innerHTML = userName
			document.getElementById('signInButtonHamburger').innerHTML = userName
			//document.getElementById('signinButton').style.display = 'none'
			//document.getElementById('getStartedButton').style.display = 'none'
			document.getElementById('getStartedButton').innerHTML = '⚙'
			document.getElementById('getStartedButtonHamburger').innerHTML = 'Account Settings'
			ui_signInDialog(false)


			//document.getElementById('signedInAccountButton').style.display = 'block'
		}
		document.getElementById('site_nav').style.display = 'block'

		//document.getElementById('signedInAccountButton').innerHTML = userName[0].toUpperCase()

		//document.getElementById('site-nav__dropdown-root').style.display = 'block'

				//set get started from  sign in to get started
			//sign in to sign out, also in hamburger menu
			//set username and icon at top
	}



	function ui_waiter(show){
		if (show){
			document.getElementById('load_screen_root').style.display='flex'
		}else{
		 document.getElementById('load_screen_root').style.display='none'
		}

	}

	function ui_authWithEmailClicked(){
		userToLogin = document.getElementById('sign_in_form_email').value
		if (!validateEmail(userToLogin)){

			document.getElementById('loginErrorText').style.display='block'

			return
		}
		document.getElementById('loginErrorText').style.display='none'
		spa_authUser(userToLogin)
	}

	function ui_signInClicked()
	{
		if (spa_isLogined()){
			spa_navigate('dashboard.html')
		}else{
			ui_signInDialog(true)

		}
	}
	function ui_getStartedClicked()
	{
		if (spa_isLogined()){
			//!tmp:
			spa_signOut()
			//!spa_navigate('account.html')
		}else{
			ui_signInDialog(true)

		}
	}
		   function ui_closeBtnClicked()
	{
		dashboard = location.href.indexOf('dashboard.html')>-1
		if (dashboard ){
			spa_navigate('index.html')
		}else{
			ui_signInDialog(false)
		}
	}

	function ui_checkboxContainerClicked(elem)
	{
		checked=true
		if (checked){
			elem.style.outline = '0'
			elem.style.boxShadow = '0 0 0 2px var(--focus-outline-color)'
			elem.style['box-shadow'] = '0 0 0 2px var(--focus-outline-color)'
		}else{

		}
		elem.getElementsByTagName('input')[0].checked=checked

	}




	function registerLazyImageContainer(){}