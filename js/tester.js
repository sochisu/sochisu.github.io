<!--

function init()
{
 inputTracker = new Bs_Slider();
 if (inputTracker)
 {
 inputTracker.attachOnChange(oninputTrackerChange);
 inputTracker.attachOnSlideStart(oninputTrackerScrollStart);
 inputTracker.attachOnSlideEnd(oninputTrackerScrollEnd);
 inputTracker.width = 530 ;
 inputTracker.height = 15;
 inputTracker.minVal = 0;
 inputTracker.maxVal = 1.0;
 inputTracker.valueDefault = 0;
 inputTracker.valueInterval = 1/530;
 inputTracker.setDisabled(true);
 inputTracker.imgDir = '';
 inputTracker.setBackgroundImage('', 'repeat');
 inputTracker.setArrowIconLeft('', 2, 19);
 inputTracker.setArrowIconRight('', 2, 19);
 inputTracker.setSliderIcon('', 15, 19);
 inputTracker.useinputField = 0;
 inputTracker.draw('inputTrackerdiv');
 }

 if( navigator.appName.indexOf("Microsoft Internet")==-1 )
 {
 onVLCPluginReady()
 }
 else if( document.readyState == 'complete' )
 {
 onVLCPluginReady();
 }
 else
 {
 /* Explorer loads plugins asynchronously */
 document.onreadystatechange=function()
 {
 if( document.readyState == 'complete' )
 {
 onVLCPluginReady();
 }
 }
 }
}

function getVLC(name)
{
 if (window.document[name])
 {
 return window.document[name];
 }
 if (navigator.appName.indexOf("Microsoft Internet")==-1)
 {
 if (document.embeds && document.embeds[name])
 return document.embeds[name];
 }
 else // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
 {
 return document.getElementById(name);
 }
}

function onVLCPluginReady()
{
 updateVolume(0);
}

var rate = 0;
var prevState = 0;
var monitorTimerId = 0;
var inputTracker;
var inputTrackerScrolling = false;
var inputTrackerIgnoreChange = false;
var telxState = false;

function doSetSlider()
{
 var vlc = getVLC("vlc");

 // set slider to new position
 if( vlc )
 vlc.input.time = (vlc.input.length/2);
}

function doMarq()
{
 alert("bubu");
 var vlc = getVLC("vlc");
 // set slider to new position
 if( vlc )
 {
 vlc.video.marquee.enable();
 vlc.video.marquee.text = "??????? POSLE";
 vlc.video.marquee.size = "2";
 vlc.video.marquee.x = "60";
 vlc.video.marquee.y = "180";
 }
}

function doLogo()
{ 
 var vlc = getVLC("vlc");
 // set slider to new position
 if( vlc )
 {
 vlc.video.logo.enable();
 vlc.video.logo.file("logo.png");
 }
}

function doGetPosition()
{
 var vlc = getVLC("vlc");

 // set slider to new position
 if (vlc)
 alert( "position is " + vlc.input.time);
}

function doReverse(rate)
{
 var vlc = getVLC("vlc");
 if( vlc )
 vlc.input.rate = -1.0 * vlc.input.rate;
}

function doAudioChannel(value)
{
 var vlc = getVLC("vlc");
 if( vlc )
 vlc.audio.channel = parseInt(value);
}

function doAudioTrack(value)
{
 var vlc = getVLC("vlc");
 if( vlc )
 {
 vlc.audio.track = vlc.audio.track + value;
 document.getElementById("trackTextField").innerHTML = vlc.audio.track;
 }
}

function doAspectRatio(value)
{
 var vlc = getVLC("vlc");
 if( vlc )
 vlc.video.aspectRatio = value;
}

function doSubtitle(value)
{
 var vlc = getVLC("vlc");
 if( vlc )
 {
 vlc.video.subtitle = vlc.video.subtitle + value;
 document.getElementById("spuTextField").innerHTML = vlc.video.subtitle;
 }
}

function doTelxPage(value)
{
 var vlc = getVLC("vlc");
 if( vlc )
 vlc.video.teletext = parseInt(value);
}

function doToggleTeletext()
{
 var vlc = getVLC("vlc");

 if( vlc )
 {
 vlc.video.toggleTeletext();
 if (telxState)
 {
 document.getElementById("telx").innerHTML = "????????? ???????";
 telxState = true;
 }
 else
 {
 document.getElementById("telx").innerHTML = "????????? ????????";
 telxState = false;
 }
 }
}

function doItemCount()
{
 var vlc = getVLC("vlc");
 if( vlc )
 {
 var count = vlc.playlist.items.count;
 document.getElementById("itemCount").value = "??????? " + count + " ";
 }
}

function doRemoveItem(item)
{
 var vlc = getVLC("vlc");
 if( vlc )
 vlc.playlist.items.remove(item);
}

function doPlaylistClearAll()
{
 var vlc = getVLC("vlc");
 if( vlc )
 {
 vlc.playlist.items.clear();
 while( vlc.playlist.items.count > 0)
 {
 // wait till playlist empties.
 }
 doItemCount();
 }
}

function updateVolume(deltaVol)
{
 var vlc = getVLC("vlc");
 if( vlc )
 {
 vlc.audio.volume += deltaVol;
 document.getElementById("volumeTextField").innerHTML = vlc.audio.volume+"%";
 }
}

function formatTime(timeVal)
{
 if( typeof timeVal != 'number' )
 return "-:--:--";

 var timeHour = Math.round(timeVal / 1000);
 var timeSec = timeHour % 60;
 if( timeSec < 10 )
 timeSec = '0'+timeSec;
 timeHour = (timeHour - timeSec)/60;
 var timeMin = timeHour % 60;
 if( timeMin < 10 )
 timeMin = '0'+timeMin;
 timeHour = (timeHour - timeMin)/60;
 if( timeHour > 0 )
 return timeHour+":"+timeMin+":"+timeSec;
 else
 return timeMin+":"+timeSec;
}

function doState(){
 var vlc = getVLC("vlc");
 var newState = 0;
 if(vlc){
 newState = vlc.input.state;
 }
 if(newState == 0){
 // current media has stopped
 onEnd();
 }
 else if(newState == 1){
 // current media is openning/connecting
 onOpen();
 }
 else if(newState == 2){
 // current media is buffering data
 onBuffer();
 }
 else if(newState == 3){
 // current media is now playing
 onPlay();
 }
 else if(newState == 4){
 // current media is now paused
 onPause();
 }
 else if(newState == 5){
 // current media has stopped
 onStop();
 }
 else if(newState == 6){
 // current media has ended
 onEnd();
 }
 else if(newState == 7){
 // current media encountered error
 onError();
 }
}

function monitor()
{
 var vlc = getVLC("vlc");
 var newState = 0;

 if( vlc )
 {
 newState = vlc.input.state;
 }

 if( prevState != newState )
 {
 if( newState == 0 )
 {
 // current media has stopped
 onEnd();
 }
 else if( newState == 1 )
 {
 // current media is openning/connecting
 onOpen();
 }
 else if( newState == 2 )
 {
 // current media is buffering data
 onBuffer();
 }
 else if( newState == 3 )
 {
 // current media is now playing
 onPlay();
 }
 else if( newState == 4 )
 {
 // current media is now paused
 onPause();
 }
 else if( newState == 5 )
 {
 // current media has stopped
 onStop();
 }
 else if( newState == 6 )
 {
 // current media has ended
 onEnd();
 }
 else if( newState == 7 )
 {
 // current media encountered error
 onError();
 }
 prevState = newState;
 }
 else if( newState == 3 )
 {
 // current media is playing
 onPlaying();
 }
 if( monitorTimerId == 0 )
 {
 monitorTimerId = setInterval("monitor()", 1000);
 }
};

/* actions */

function doGo(targetURL)
{
 var vlc = getVLC("vlc");

 if( vlc )
 {
 //var options = ':sub-filter=marq :marq-marquee="123" :marq-position=0';
 vlc.playlist.items.clear();
 while( vlc.playlist.items.count > 0 )
 {
 // clear() may return before the playlist has actually been cleared
 // just wait for it to finish its job
 }
 var options = [":rtsp-tcp"];
 var itemId = vlc.playlist.add(targetURL,"",options);
 options = [];
 if( itemId != -1 )
 {
 // play MRL
 vlc.playlist.playItem(itemId);
 if( monitorTimerId == 0 )
 {
 monitor();
 }
 }
 else
 {
 alert("?? ???????? ????????????? ? ?????? ??????!");
 }
 doItemCount();
 }
}

function doAdd(targetURL)
{
 var vlc = getVLC("vlc");
 var options = [":vout-filter=deinterlace", ":deinterlace-mode=linear"];
 if( vlc )
 {
 vlc.playlist.add(targetURL, "", options);
 options = [];
 doItemCount();
 }
}

function doPlayOrPause()
{
 var vlc = getVLC("vlc");
 if( vlc )
 {
 if( vlc.playlist.isPlaying )
 {
 vlc.playlist.togglePause();
 monitor();
 }
 else if( vlc.playlist.items.count > 0 )
 {
 vlc.playlist.play();
 monitor();
 }
 else
 {
 alert('?????? ?? ??????!');
 }
 }
}

function doStop()
{
 var vlc = getVLC("vlc");

 if( vlc )
 vlc.playlist.stop();

 if( monitorTimerId != 0 )
 {
 clearInterval(monitorTimerId);
 monitorTimerId = 0;
 }
 onStop();
}

function doPlaySlower()
{
 var vlc = getVLC("vlc");
 if( vlc )
 vlc.input.rate = vlc.input.rate / 2;
}

function doPlayFaster()
{
 var vlc = getVLC("vlc");
 if( vlc )
 vlc.input.rate = vlc.input.rate * 2;
}

/* events */

function onOpen()
{
 document.getElementById("state").innerHTML = "????????...";
 document.getElementById("PlayOrPause").value = "?????";
}

function onBuffer()
{
 document.getElementById("state").innerHTML = "???????????...";
 document.getElementById("PlayOrPause").value = "?????";
}

function onPlay()
{
 document.getElementById("state").innerHTML = "???????????????...";
 document.getElementById("PlayOrPause").value = "?????";
 onPlaying();
}

function onEnd()
{
 document.getElementById("state").innerHTML = "?????...";
 doStop();
}

var liveFeedText = ["?????? ????", "((?????? ????))", "(( ?????? ???? ))", "(( ?????? ???? ))"];
var liveFeedRoll = 0;

function onPlaying()
{
 if( !inputTrackerScrolling )
 {
 var vlc = getVLC("vlc");
 var info = document.getElementById("info");
 if( vlc )
 {
 var mediaLen = vlc.input.length;
 inputTrackerIgnoreChange = true;
 if( mediaLen > 0 )
 {
 // seekable media
 if( inputTracker )
 {
 if( inputTracker.maxVal == 1.0 )
 {
 inputTracker.setDisabled(false);
 inputTracker.maxVal = 1.0;
 }
 inputTracker.setValue(vlc.input.position);
 }
 info.innerHTML = formatTime(vlc.input.time)+"/"+formatTime(mediaLen);
 }
 else
 {
 // non-seekable "live" media
 if( inputTracker )
 {
 if( inputTracker.maxVal != 0.0 )
 {
 inputTracker.maxVal = 0.0;
 inputTracker.setValue(0.0);
 inputTracker.setDisabled(true);
 }
 }
 liveFeedRoll = liveFeedRoll & 3;
 info.innerHTML = liveFeedText[liveFeedRoll++];
 }
 inputTrackerIgnoreChange = false;
 }
 }
}

function onPause()
{
 document.getElementById("state").innerHTML = "??????????????...";
 document.getElementById("PlayOrPause").value = "???????????????";
}

function onStop()
{
 var vlc = getVLC("vlc");

 if( inputTracker )
 {
 if( !inputTracker.disabled )
 {
 inputTracker.setValue(inputTracker.minVal);
 inputTracker.setDisabled(true);
 }
 }

 document.getElementById("info").innerHTML = "-:--:--/-:--:--";
 document.getElementById("state").innerHTML = "???????????...";
 document.getElementById("PlayOrPause").value = "???????????????";
}

function onError()
{
 var vlc = getVLC("vlc");

 document.getElementById("state").innerHTML = "??????...";
}

function oninputTrackerScrollStart()
{
 inputTrackerScrolling = true;
}

function oninputTrackerScrollEnd(inputTracker, value, pos)
{
 inputTrackerScrolling = false;
}

function oninputTrackerChange(inputTracker, value, pos)
{
 if( !inputTrackerIgnoreChange )
 {
 var vlc = getVLC("vlc");
 if( vlc )
 {
 if( (vlc.input.state == 3) && (vlc.input.position != value) )
 {
 var info = document.getElementById("info");
 vlc.input.position = value;
 info.innerHTML = formatTime(vlc.input.time)+"/"+formatTime(vlc.input.length);
 }
 }
 }
}

//-->