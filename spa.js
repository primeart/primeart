//lib
	function setCookie(name,value,hours) {
	var expires = "";
	if (hours) {
		var date = new Date();
		date.setTime(date.getTime() + (hours*60*60*1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function validateEmail(email)
	{
		var re = /\S+@\S+\.\S+/;
		return re.test(email);
	}


 //actions

function spa_authUser(userToLogin){
	if (window.spa_loginedUser && validateEmail(window.spa_loginedUser)){
		return  //already logined; malicious call
	}
	//window.userToLogin = userToLogin
	udir = userToLogin.replace(/^[a-zA-Z0-9-]/img,'_')
	const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700';
	loginWindow = window.open('https://accounts.google.com/AccountChooser/signinchooser?continue=https%3A%2F%2Fstorage.cloud.google.com%2Froyal-art%2Fu%2F'+udir+'%2Fauth&flowEntry=AccountChooser',  '_blank', strWindowFeatures);
	//loginWindow = window.open('https://storage.cloud.google.com/royal-art/u/'+udir+'/auth',  '_blank', strWindowFeatures);
	loginWindow.focus();

/*
	open common /auth file (with all users set read access)
	auth will appear
	after success auth js in this popup will xmlhttprequest  unexisting url,
	 if "asdf@dasf.com does not have access"
		so email is "asdf@dasf.com",
		report it to opener and
		window.close
	else == will never happen, if user pass auth then js will open
	if pass auth but not in the sysstem -
	 "asdf@dasf.com does not have access" will load
	 so top frame monitors url, and if googleusercontent.com - then
	 send messsage and if no responce means error message in window
	 close the window, open hidden iframe with public access,
	 it will     xmlhttprequest  unexisting url,
	 and get email from error and report it top frame
	 now top frame knows auth was succes but user xxx have not yet registred in the system
	 (go to register process?)
	*/
	//&authuser=2&ogss=1
	/*
	open public iframe from gcs
	 it will try to xmlhttprequest  unexisting url,
	 if "asdf@dasf.com does not have access"
		we logined and email is this
	 else
		send top frame "auth required",


	*/
}

function spa_checkLogined(){
	//create iframe with public gcs /auth2 url
//	same file insida as in auth
	//return recieved message
}

 window.addEventListener("message", spa_receiveMessage, false);
window.spa_userAuthSuccessCallback = ''

function spa_receiveMessage(event)
{
 //if (event.origin !== "https://.*.apidata.googleusercontent.com")
 //   return;
/*
	 if (!event.data or !event.data.length or !event.data.length<1 event.data.indexOf('<Code>ExpiredToken</Code>')>0){
		console.log('bad responce; try different server. '+event.data);

		//tmp: nothing
		alert('Service unavailable. Try again later.');
		return
	 }
*/
	 if (true){ //so far only logined message expected; todo expect different message and check here
		 //setState('logined',[window.userToLogin, event.data])
		 ui_setLoginedInterface(window.userToLogin)
		 setCookie('stateData',JSON.stringify(event.data), 1)
		 setCookie('loginedUser',window.userToLogin, 1)
		 if (window.spa_userAuthSuccessCallback){
			 window.spa_userAuthSuccessCallback()
		 }
		 //setState(event.data)
	 }
}
function spa_init(){
/*
function httpGet(theUrl)
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	xmlHttp.send( null );
	return xmlHttp.responseText;
}
alert(httpGet('https://storage.cloud.google.com/royal-art/u/adsf/auth'))
*/
		//todo do before page content appears
		window.spa_loginedUser = getCookie('loginedUser');
		if (validateEmail(window.spa_loginedUser)){
			window.spa_requestUrl = getCookie('requestUrl');
			if(window.spa_requestUrl){
				ui_setLoginedInterface(window.spa_loginedUser)
			}
		}

		//if (window.location.indexOf('/?')>0){
		 //   setPage(window.location.split('/?')[1])
		//}
		//stateData = getCookie('stateData');
		//if (stateData && (stateData=JSON.parse(stateData)) && stateData.length==3){

		//}
	}

	//function setPage()

//	function setState(data){
			 //console.log(event.data)
//		 window.iframeMessage = [data[1],data[2]]
//		 document.body.innerHTML = '<iframe id="workerIframe" src="'+data[0]+'" onload="messageIframe()" width="100%" height="100%"></iframe>'
//		 setCookie('stateData',JSON.stringify(event.data), 1)
//	}

function messageIframe(){
	 const iFrame = document.getElementById('workerIframe');
	 iFrame.contentWindow.postMessage(window.iframeMessage, 'https:/'+'/storage.googleapis.com/'); //domain of event.data[0]

}
