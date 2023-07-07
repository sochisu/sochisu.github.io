function playRing()
{
	if($.browser.mozilla || $.browser.webkit || $.browser.opera)
		document.getElementById('ring').play();
	else
		$('#stupid_msie_sound').html("<object data='/pub/img/tools/timer/ring.wav' type='application/x-mplayer2' width='0' height='0'><param name='filename' value='/pub/img/tools/timer/ring.wav'><param name='autostart' value='1'><param name='playcount' value='1'></object>");
}

function setTime()
{
	dir = $('#set_dir_field').val();
	
	if (dir === 'down')
	{
		hours = Number($('#set_hours_field').val()), minutes= Number($('#set_minutes_field').val()), secs = Number($('#set_secs_field').val());
		total_sec = hours*3600 + minutes*60 + secs;
	}
	else
	{
		hours = minutes = secs = 0;
		set_hours = Number($('#set_hours_field').val()), set_minutes= Number($('#set_minutes_field').val()), set_secs = Number($('#set_secs_field').val());
		$('#hours_display, #minutes_display, #secs_display').html('00');
		total_sec = set_hours*3600 + set_minutes*60 + set_secs;
	}

	abs_sec = 0;
	
	
	$('#hours_display').html(hours<10?'0'+hours:hours);
	$('#minutes_display').html(minutes<10?'0'+minutes:minutes);
	$('#secs_display').html(secs<10?'0'+secs:secs);
}

function countTimer()
{
	if (dir === 'down')
	{
		secs--;
		if (secs < 0)
		{
			minutes--;
			secs = 59;
			if (minutes < 0)
			{
				hours--;
				minutes = 59;
				if (hours < 0)
				{
					clearTimeout(t);
					if ($('#play_ring_field').attr('checked'))
						playRing();
					$('#pause_button').hide();
					$('#reset_button').show();
					$('#set_block').slideDown();
					return;
				}
			}
		}
		
	}
	else
	{
		if (hours != set_hours || minutes != set_minutes || secs != set_secs)
		{
			secs++;
			if (secs > 59)
			{
				minutes++;
				secs = 0;
				if (minutes > 59)
				{
					hours++;
					minutes = 0;
				}
			}
		}
		else
		{
			clearTimeout(t);
			if ($('#play_ring_field').attr('checked'))
				playRing();
			$('#pause_button').hide();
			$('#reset_button').show();
			$('#set_block').slideDown();
			
			return;
		}
	}
	
	$('#hours_display').html(hours<10?'0'+hours:hours);
	$('#minutes_display').html(minutes<10?'0'+minutes:minutes);
	$('#secs_display').html(secs<10?'0'+secs:secs);
	
	abs_sec++;
	
	if ($('#show_progress_field').attr('checked'))
		$('#pb_progressbar').css('width', Math.floor(abs_sec*100/total_sec)+'%');
	
	document.title = '['+$('#hours_display').html()+':'+$('#minutes_display').html()+':'+$('#secs_display').html()+'] ' + base_title;
	
	t = setTimeout("countTimer()", 1000);
}

$().ready(function() {
	$('#set_hours_field, #set_minutes_field, #set_secs_field, #set_dir_field').change(function(){
		setTime();
		$('#start_button').show();
	});
	
	$('#start_button').click(function(){
		$(this).hide();
		$("#pause_button").show();
		$("#reset_button").show();
		$('#set_block').slideUp();
		countTimer();
	});
	
	$('#pause_button').click(function(){
		if (t != undefined)
			clearTimeout(t);
		$(this).hide();
		$('#start_button').show();
		$('#set_block').slideDown();
		document.title = base_title;
	});
	
	$('#reset_button').click(function(){
		if (t != undefined)
			clearTimeout(t);
		setTime();
		$("#pause_button, #reset_button").hide();
		$('#start_button').show();
		$('#pb_progressbar').css('width', '0px');
		$('#set_block').slideDown();
		document.title = base_title;
	});
	
	$('#show_progress_field').click(function(){
		if ($(this).attr('checked'))
		{
			$('#timerbox').css('margin-top', '-132px');
			$('#progressbox').css('display', 'block');
		}
		else
		{
			$('#timerbox').css('margin-top', '0');
			$('#progressbox').css('display', 'none');
		}
	});
	
	base_title = document.title;
});