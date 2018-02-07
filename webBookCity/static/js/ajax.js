

// var baseUrl="http://api.phei.kingchannels.cn";
var baseUrl="http://demo.bridge.kingchannels.cn";
var transferUrl="http://phei.kingchannels.cn/bridge/transfer";
var transferLoginUrl="http://phei.kingchannels.cn/bridge/login";

var ymUrl="http://localhost:8080/#";
var ymUr2="http://localhost:8080";

var env = "dev";    //dev  -- 开发环境   prod -- 生产环境


// console.log(systemParams)

var deviceToken = '';

// function setDeviceToken() {
//     localStorage.setItem('deviceToken','a775b63a7de149168b44a11d88a07e6f');
//     deviceToken = localStorage.deviceToken;

//     return deviceToken;
// }

var cookie = document.cookie;

function getCookie(name) {
	 var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr = cookie.match(reg))
        return decodeURIComponent(arr[2]); 
    else 
        return null; 
}


//系统参数
var systemParams = {
    BridgePlatformName:"cabp_web",
    random:Math.random(),
    appId:7
}

//如果accessToken发生变化，立即更新
// setInterval(()=>{
//    systemParams.deviceToken = setDeviceToken();
//    systemParams.accessToken = localStorage.accessToken;
// },500)



