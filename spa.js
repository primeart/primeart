//lib
	function setCookie(name,value,seconds) {
	var expires = "";
	if (seconds) {
		var date = new Date();
		date.setTime(date.getTime() + (seconds*1000));
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

function httpRequest(url, type, data, callback){
	const Http = new XMLHttpRequest();
	Http.open(type, url, true);
	if (callback){
		Http.onreadystatechange = function() {
			if (this.readyState==4 && this.status==200){
				console.log(Http.responseText)
				try{
					parsed = JSON.parse(this.responseText)
				}catch(e){
					parsed={}
				}
				callback(parsed)
			}
		}
	}
	if (data){
		Http.setRequestHeader('Content-Type', data.type||'text/html');
		Http.send(data);
	}else{
		Http.send();
	}
}
function timeNow(){
	var d = new Date();
		return Math.floor( d   );
	}

/*
xhr.onload = () => {
  const status = xhr.status;
  if (status === 200) {
	alert("File is uploaded");
  } else {
	alert("Something went wrong!");
  }
};

xhr.onerror = () => {
  alert("Something went wrong");
};
*/

//function messageIframe(){
//	 const iFrame = document.getElementById('workerIframe');
//	 iFrame.contentWindow.postMessage(window.iframeMessage, 'https:/'+'/storage.googleapis.com/'); //domain of event.data[0]
//}

//function spa_putFileRequest(url, data, callback){
//		httpRequest(data.imagePutUrl, 'PUT',data) //, callback=waitResponce
//}
window.spa_apiRequestCallbacks={}
function spa_apiRequest(apiCommand, data, callback){
	console.log('spa_apiRequest :: apiCommand=',apiCommand)
	if (window.spa_apiRequestCallbacks.length>0){
		alert('Error #821088. Try again')
		location.reload()
		return false
	}
	spa_requestId = timeNow()
	window.spa_apiRequestCallbacks[spa_requestId]=callback
	//window.spa_apiRequestCallback = callback
	//window.spa_requestId=timeNow()
	window.spa_responceAwaitTries=0
	//httpRequest(window.requesturl, data=data, callback=waitResponce)
	//if (!data.type){
		data = JSON.stringify({'apiCommand':apiCommand, 'requestId':spa_requestId, 'data':data})
	//}
	httpRequest(window.spa_requestUrl, 'PUT', data, waitApiResponceAndCallback)
	//file = fileFromArray({'apiCommand':apiCommand,'data':data})
	//spa_putFileRequest(window.requesturl, file, waitApiResponceAndCallback)
	//httpRequest(data.imagePutUrl, 'PUT', data)
	//waitApiResponceAndCallback()
	ui_waiter(true)
}

function waitApiResponceAndCallback(){
	console.log('waitApiResponceAndCallback :: window.spa_apiRequestCallbacks=')
	console.log(window.spa_apiRequestCallbacks)
	httpRequest(window.spa_responceUrl, 'GET', {}, function(responce){
		/*
		if (responce.requestId != window.spa_requestId)
		{
			if (window.spa_responceAwaitTries++ > 600){
				alert('Failed to perform action. Login and try again.')
				spa_signOut()
				location.reload()
			}
			else{
				setTimeout(waitApiResponceAndCallback, 1500)

			}
		}else
		*///{
			console.log('waitApiResponceAndCallback responce:')
			console.log(responce)
			//we got responce for what we asked
//			window.spa_requestId=''
			window.spa_responceAwaitTries=0
			//window.imagePutUrl=responce.imagePutUrl
			window.spa_requestUrl=responce.requestUrl
			window.spa_responceUrl=responce.responceUrl
			ui_waiter(false)
			if (callback=window.spa_apiRequestCallbacks[responce.requestId]){
				delete window.spa_apiRequestCallbacks[responce.requestId]
				callback(responce.responceData)// !== false && ()
			}
			if (window.spa_apiRequestCallbacks.length>0){
				setTimeout(waitApiResponceAndCallback, 1500)
			}
						//window.spa_apiRequestCallback = ''
		//}
	})
}


 //actions

function spa_authUser(userToLogin){
	if (window.spa_loginedUser && validateEmail(window.spa_loginedUser)){
		return  //already logined; malicious call
	}
	window.userToLogin = userToLogin
	udir = userToLogin.replace(/[^a-zA-Z0-9-]/img,'_')
	const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700';
	loginWindow = window.open('https://accounts.google.com/AccountChooser/signinchooser?continue=https%3A%2F%2Fstorage.cloud.google.com%2Froyal-art%2Fu%2F'+udir+'%2Fauth&flowEntry=AccountChooser',  '_blank', strWindowFeatures);
	//    ?pli=1&authuser=2
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
//    same file insida as in auth
	//return recieved message
}

 window.addEventListener("message", spa_receiveMessage, false);
//document.addEventListener("DOMContentLoaded", function(){
 //  spa_init()
//});
document.addEventListener("DOMContentLoaded", spa_init);

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
		 //ui_setLoginedInterface(window.userToLogin)
		 timeout=event.data[1]
		 timeout2=event.data[3]
		 setCookie('requestUrl',event.data[0], timeout)
		 setCookie('responceUrl',event.data[2],timeout2)
		 setCookie('loginedUser',window.userToLogin, timeout)


		 //if (window.spa_userAuthSuccessCallback){
		 //     window.spa_userAuthSuccessCallback()
		 //}
		 spa_init()
		 //setState(event.data)
	 }
}

function spa_isLogined(){
	return  window.spa_loginedUser && validateEmail(window.spa_loginedUser)
}

function spa_navigate(page){
	location.href=page
}

function spa_signOut(){
	if (window.prompt('Sign out?'))
	{
		spa_apiRequest('signOut',{}) //to set monitoring rate from frequent to normal
		//spa_apiRequest('signOut', '')
		window.spa_loginedUser = undefined;
		eraseCookie('requestUrl')
		eraseCookie('responceUrl')
		eraseCookie('loginedUser')
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
	dashboard = location.href.indexOf('dashboard.html')>-1

	//todo do before page content appears
	userCandidate = getCookie('loginedUser');
	if (validateEmail(userCandidate)){
		window.spa_loginedUser = userCandidate;
		window.spa_requestUrl = getCookie('requestUrl');
		window.spa_responceUrl = getCookie('responceUrl');
		if(window.spa_requestUrl){
			ui_setLoginedInterface(window.spa_loginedUser)
		}

		  if (!dashboard ){
			spa_navigate('dashboard.html')
		 }else{
			ui_setLoginedInterface(window.spa_loginedUser)
		 }

	}else{
		//tmp
		//document.getElementById('main-content').innerHTML.indexOf('Sign in required to access this page')>-1
		if (dashboard){
			 ui_signInDialog(true)
			 //window.spa_userAuthSuccessCallback = location.reload
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

//    function setState(data){
			 //console.log(event.data)
//         window.iframeMessage = [data[1],data[2]]
//         document.body.innerHTML = '<iframe id="workerIframe" src="'+data[0]+'" onload="messageIframe()" width="100%" height="100%"></iframe>'
//         setCookie('stateData',JSON.stringify(event.data), 1)
//    }

