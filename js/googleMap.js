$(window).load(function () {
    var mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.2459017896326!2d-6.6362406241406635!3d4.727296941424638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf96130e33a3757f%3A0x728212498800d757!2sDEGNY%20PLAGE%20H%C3%94TEL%20SAN%20PEDRO!5e0!3m2!1sfr!2sci!4v1733906788518!5m2!1sfr!2sci",
        onLoadWebSite = false,
        googleMapHolder = $(".google_map"),
        mapWidth = googleMapHolder.css("width"),
        mapHeight = googleMapHolder.css("height"),
        borderRadius = googleMapHolder.css("borderRadius"),
        backgroundColor = googleMapHolder.css("backgroundColor"),
        addMap = false,
        idPage,
        intervalCall;

    if (backgroundColor === "rgba(0, 0, 0, 0)") {
        backgroundColor = "#ffffff";
    }

    verificationPageHandler();

    if (!onLoadWebSite) {
        $(window).bind("hashchange", verificationPageHandler);
    }

    function verificationPageHandler() {
        if (!onLoadWebSite) {
            idPage = "#" + window.location.hash.substring(3);
            if (idPage !== "#") {
                if (googleMapHolder.parents(idPage).length !== 0) {
                    addGoogleMapHandler();
                }
            }
        } else {
            addGoogleMapHandler();
        }
    }

    function addGoogleMapHandler() {
        if (!addMap) {
            addMap = true;
            $(window).unbind("hashchange", verificationPageHandler);
            googleMapHolder.css({ overflow: "hidden" });
            googleMapHolder.append(
                `<div id='loaderPart' style='
                    position: absolute; 
                    z-index: 1; 
                    width: ${mapWidth}; 
                    height: ${mapHeight}; 
                    background: ${backgroundColor}; 
                    border-radius: ${borderRadius};'>
                </div>`
            );
            intervalCall = setInterval(addIframe, 200);
        }

        function addIframe() {
            if ($(idPage).css("display") !== "none") {
                clearInterval(intervalCall);
                googleMapHolder.append(
                    `<iframe 
                        width='${mapWidth}' 
                        height='${mapHeight}' 
                        frameborder='0' 
                        src='${mapUrl}' 
                        style='
                            position: absolute; 
                            z-index: 0; 
                            border-radius: ${borderRadius};'>
                    </iframe>`
                );
                googleMapHolder.find("iframe").on("load", googleMapLoadCompleteHandler);
            }
        }
    }

    function googleMapLoadCompleteHandler() {
        var loaderPart = googleMapHolder.find("#loaderPart");
        loaderPart.delay(100).fadeOut(500, function () {
            loaderPart.css({ display: "none" });
        });
    }
});
