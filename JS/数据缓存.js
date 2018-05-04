//便于操作cookie的工具类  读 写 删除
var CookieUtil ={

    get:function (name) {
        var cookieName = encodeURIComponent(name) + "=",
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null;
        if (cookieStart > -1){
            var cookieEnd = document.cookie.indexOf(";",cookieStart);
            if (cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));
        }
        return cookieValue;

    },
    set:function (name,value,expires,path,domain,secure) {

        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date){
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path){
            cookieText += "; path=" + path;
        }
        if (domain){
            cookieText += "; doamin=" + domain;
        }
        if (secure){
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    //由于没有删除已有cookie的直接方法，所以需要使用相同的路径，域或安全选项再次设置cookie，并将失效时间设置为过去时间
    unset:function (name,path,domain,secure) {
        this.set(name,"",new Date(0),path,domain,secure);
    }
};

//子cookie工具
var SubCookieUtil = {
    get:function (name,subName) {
        var subCookies = this.getAll(name);
        if (subCookies){
            return subCookies(subName);
        }else {
            return null;
        }
    },
    getAll:function (name) {
        var cookieName = encodeURIComponent(name) +"=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd,
            subCookies,
            i,
            parts,
            result= {};
        if (cookieStart > -1){
            var cookieEnd = document.cookie.indexOf(";",cookieStart);
            if (cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));
            if (cookieValue.length > 0){
                subCookies = cookieValue.split("&");
                for (i = 0,len = subCookies.length;i<len;i++){
                    parts = subCookies[i].split("=");
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
                return result;
            }
        }
        return null;
    },

}











