(function($) {
    $(document).ready(function() {
        $('.styleswitch').click(function() {
            switchStylestyle(this.getAttribute("data-rel"));
            return false;
        });
        $('.styleswitch2').click(function() {
            switchStylestyle2(this.getAttribute("data-rel"));
            return false;
        });
        var c = readCookie('style');
        if (c) switchStylestyle(c);
        var c2 = readCookie('style2');
        if (c2) switchStylestyle2(c2);
    });

    function switchStylestyle(styleName) {
        $('link[href^="css/colors"][title]').each(function(i) {
            this.disabled = true;
            if (this.getAttribute('title') == styleName) this.disabled = false;
        });
        createCookie('style', styleName, 365);
    }

    function switchStylestyle2(styleName) {
        $('link[href^="css/base"][title]').each(function(i) {
            this.disabled = true;
            if (this.getAttribute('title') == styleName) this.disabled = false;
        });
        createCookie('style2', styleName, 365);
    }
})(jQuery);

function createCookie(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name)
{
	createCookie(name,"",-1);
}

// DEMO Swticher Base
jQuery('.demo_changer .demo-icon').click(function(){

	if(jQuery('.demo_changer').hasClass("active")){
		jQuery('.demo_changer').animate({"left":"-113px"},function(){
			jQuery('.demo_changer').toggleClass("active");
		});						
	}else{
		jQuery('.demo_changer').animate({"left":"0px"},function(){
			jQuery('.demo_changer').toggleClass("active");
		});			
	}

});

