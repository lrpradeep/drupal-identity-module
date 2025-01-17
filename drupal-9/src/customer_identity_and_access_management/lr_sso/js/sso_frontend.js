jQuery(document).ready(function () {
    if (jQuery(".interfacecontainerdiv").length) {
        var appName = drupalSettings.ciam.appName
        jQuery.ajax({
            type: "GET",
            url: "https://" + appName + ".hub.loginradius.com/ssologin/login",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function (response) {
                if (response.token) {
                    jQuery(document).ready(function($a){
                        $a.ajax({
                            url: drupalSettings.sso.validationUrl, 
                            method :'POST',
                            data: ({ ssotoken : response.token}),
                            dataType: "json", 
                            success: function(result){
                                if(result.ispermitted){
                            var form = document.createElement("form");
                            form.action = drupalSettings.sso.loginUrl;
                            form.method = "POST";
                            var hidden = document.createElement("input");
                            hidden.type = "hidden";
                            hidden.name = "token";
                            hidden.value = response.token;
                            form.appendChild(hidden);
                            document.body.appendChild(form);
                            form.submit();
                                }
                            }
                        });
                    })
                }
            },
        });
    }
});

jQuery("#lr-loading").hide();