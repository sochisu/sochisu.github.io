jQuery(document).ready(function(){

    var jsFolder = "https://sochisu.github.io/js/audioplayer/";

    jQuery("#audio-player").amazingaudioplayer({

        jsfolder:jsFolder,

        titleinbarwidthmode:"fixed",

        timeformatlive:"%CURRENT% / LIVE",

        volumeimagewidth:24,

        barbackgroundimage:"",

        showtime:true,

        titleinbarwidth:80,

        showprogress:true,

        random:false,

        titleformat:"%TITLE%",

        height:600,

        loadingformat:"Loading...",

        prevnextimage:"prevnext-24-24-1.png",

        showinfo:false,

        imageheight:100,

        skin:"BarWhiteTitle",

        loopimage:"loop-24-24-2.png",

        loopimagewidth:24,

        showstop:false,

        prevnextimageheight:24,

        infoformat:"By %ARTIST% %ALBUM%<br />%INFO%",

        stopotherplayers:true,

        showloading:false,

        forcefirefoxflash:false,

        showvolumebar:true,

        imagefullwidth:false,

        width:420,

        showtitleinbar:true,

        showloop:true,

        volumeimage:"volume-24-24-2.png",

        playpauseimagewidth:24,

        loopimageheight:24,

        tracklistitem:10,

        tracklistitemformat:"%ID%. %TITLE% <span style='position:absolute;top:0;right:0;'>%DURATION%</span>",

        prevnextimagewidth:24,

        tracklistarrowimage:"tracklistarrow-48-16-1.png",

        playpauseimageheight:24,

        showbackgroundimage:false,

        imagewidth:100,

        stopimage:"stop-24-24-1.png",

        playpauseimage:"playpause-24-24-1.png",

        showprevnext:true,

        backgroundimage:"",

        autoplay:false,

        volumebarpadding:8,

        progressheight:8,

        showtracklistbackgroundimage:false,

        titleinbarscroll:true,

        showtitle:false,

        defaultvolume:-1,

        tracklistarrowimageheight:16,

        heightmode:"auto",

        titleinbarformat:"%TITLE%",

        showtracklist:true,

        stopimageheight:24,

        volumeimageheight:24,

        stopimagewidth:24,

        volumebarheight:80,

        noncontinous:false,

        tracklistbackgroundimage:"",

        showbarbackgroundimage:false,

        showimage:false,

        tracklistarrowimagewidth:48,

        timeformat:"%CURRENT% / %DURATION%",

        showvolume:true,

        fullwidth:true,

        loop:1,

        preloadaudio:true

    });

});
