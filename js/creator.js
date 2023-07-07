function Areator(){
	document.getElementById("output").disabled=false;
	var inp = document.getElementById("input").value;
	inp = inp.replace(/\n+$/m, '');
	inp = inp.split(/[\r\n]+/);
	var out="";
	if(document.form1.list[0].checked){
		//.m3u
		if(document.form1.format[0].checked){
			if(document.getElementById("input").value!=""){
				var c = 0;
				for(i=0; i<inp.length; i++){
					if(c == 1){
						c=0;
						out = out + inp[i] + "\n";
					}else{
						c=1;
						out = out + '#EXTINF:-1,' + inp[i] + "\n";
					}
				}
				document.getElementById("output").value = '#EXTM3U' + "\n" + out;
			}else{
				alert('Enter your text in the first window!');
				document.getElementById("input").focus();
			}
		}
		//.xspf
		if(document.form1.format[1].checked){
			if(document.getElementById("input").value!=""){
				var c = 0;
				for(i=0; i<inp.length; i++){
					if(c == 1){
						c=0;
						out = out + "\t\t\t" + '<location>' + inp[i] + '</location>' + "\n" + "\t\t" + '</track>' + "\n";
					}else{
						c=1;
						out = out + "\t\t" + '<track>' + "\n" + "\t\t\t" + '<title>' + inp[i] + '</title>' + "\n";
					}
				}
				document.getElementById("output").value = '<?xml version="1.0" encoding="UTF-8"?>' + "\n" + '<playlist version="1" xmlns="http://xspf.org/ns/0/">' + "\n" + "\t" + '<trackList>' + "\n" + out  +  "\t" + '</trackList>' + "\n" + '</playlist>';
			}else{
				alert('Enter your text in the first window!');
				document.getElementById("input").focus();
			}	
		}
		//.wpl
		if(document.form1.format[2].checked){
			if(document.getElementById("input").value!=""){
				var c = 0;
				for(i=0; i<inp.length; i++){
					if(c == 1){
						c=0;				
						out = out + "\t\t\t" + '<media src="' + inp[i] + '" />' + "\n";
					}else{
						c=1;
					}
				}
				out = out + "\t\t" + '</seq>' + "\n" + "\t" + '</body>' + "\n";
				var lenght2 = inp.length/2;
				document.getElementById("output").value = '<?wpl version="1.0"?>' + "\n" + '<smil>' + "\n" + "\t" + '<head>' + "\n" + "\t\t" + '<meta name="Generator" content="Microsoft Windows Media Player -- 11.0.5721.5145"/>' + "\n"  + "\t\t" + '<meta name="AverageRating" content="0"/>' + "\n" + "\t\t" + '<meta name="TotalDuration" content="0"/>' + "\n" + "\t\t" + '<meta name="ItemCount" content="' + lenght2 + '"/>' + "\n" + "\t\t" + '<author/>' + "\n" + "\t\t" + '<title></title>' + "\n" + "\t" + '</head>' + "\n" + "\t" + '<body>' + "\n" + "\t\t" + '<seq>' + "\n" + out + '</smil>';
			}else{
				alert('Enter your text in the first window!');
				document.getElementById("input").focus();
			}
		}
		//.pls
		if(document.form1.format[3].checked){
			if(document.getElementById("input").value!=""){
				var out2="";
				var c = 1;
				var co = 1;
				for(i=0; i<inp.length; i++){
					if(c == 1){
						c=0;
						out2 =  "\n" + 'Title'+co+'=' + inp[i] + "\n" + 'Length'+co+'=0' + "\n";
					}else{
						c=1;
						out = out + 'File'+co+'=' + inp[i] + out2 + "\n";
						co++;
					}
				}
				var lenght2 = inp.length/2;
				document.getElementById("output").value = '[playlist]' + "\n\n" + out + 'NumberOfEntries=' + lenght2 + "\n\n" + 'Version=2';
			}else{
				alert('Enter your text in the first window!');
				document.getElementById("input").focus();
			}	
		}
		//Azbox
		if(document.form1.format[4].checked){
			if(document.getElementById("input").value!=""){
				var out2="";
				var c = 1;
				var buffersize = '256';
				for(i=0; i<inp.length; i++){
					if(c == 1){
						c=0;
						out2 = inp[i];
					}else{
						c=1;
						out = out + ((i+1)/2) + ',' + out2 + ',' + buffersize + ',' + inp[i] + "\n";
					}
				}
				document.getElementById("output").value = out;
			}else{
				alert('Enter your text in the first window!');
				document.getElementById("input").focus();
			}	
		}
	}else if(document.form1.list[1].checked){
		//.m3u
		if(document.form1.format[0].checked){
			if(document.getElementById("input").value!=""){
				for(i=0; i<inp.length; i++){
					out = out + '#EXTINF:-1,Channel '+(i+1) + "\n" + inp[i] + "\n";
				}
				document.getElementById("output").value = '#EXTM3U' + "\n" + out;
			}else{
				alert('Enter your text in the first window!');
				document.getElementById("input").focus();
			}
		}
		//.xspf
		if(document.form1.format[1].checked){
			if(document.getElementById("input").value!=""){
				for(i=0; i<inp.length; i++){
					out = out + "\t\t" + '<track>' + "\n" + "\t\t\t" + '<title>Channel '+(i+1)+'</title>' + "\n" + "\t\t\t" + '<location>' + inp[i] + '</location>' + "\n" + "\t\t" + '</track>' + "\n";
				}
				document.getElementById("output").value = '<?xml version="1.0" encoding="UTF-8"?>' + "\n" + '<playlist version="1" xmlns="http://xspf.org/ns/0/">' + "\n" + "\t" + '<trackList>' + "\n" + out  +  "\t" + '</trackList>' + "\n" + '</playlist>';
			}else{
				alert('Enter your text in the first window!');
				document.getElementById("input").focus();
			}	
		}
		//.wpl
		if(document.form1.format[2].checked){
			if(document.getElementById("input").value!=""){
				for(i=0; i<inp.length; i++){			
					out = out + "\t\t\t" + '<media src="' + inp[i] + '" />' + "\n";
				}
				out = out + "\t\t" + '</seq>' + "\n" + "\t" + '</body>' + "\n";
				document.getElementById("output").value = '<?wpl version="1.0"?>' + "\n" + '<smil>' + "\n" + "\t" + '<head>' + "\n" + "\t\t" + '<meta name="Generator" content="Microsoft Windows Media Player -- 11.0.5721.5145"/>' + "\n"  + "\t\t" + '<meta name="AverageRating" content="0"/>' + "\n" + "\t\t" + '<meta name="TotalDuration" content="0"/>' + "\n" + "\t\t" + '<meta name="ItemCount" content="' + inp.length + '"/>' + "\n" + "\t\t" + '<author/>' + "\n" + "\t\t" + '<title></title>' + "\n" + "\t" + '</head>' + "\n" + "\t" + '<body>' + "\n" + "\t\t" + '<seq>' + "\n" + out + '</smil>';
			}else{
				alert('Enter your text in the first window!');
				document.getElementById("input").focus();
			}
		}
		//.pls
		if(document.form1.format[3].checked){
			if(document.getElementById("input").value!=""){
				var co = 1;
				for(i=0; i<inp.length; i++){
					out = out + 'File'+co+'=' + inp[i] + "\n" + 'Title'+co+'=Channel' +co + "\n" + 'Length'+co+'=0' + "\n\n";
					co++;
				}
				document.getElementById("output").value = '[playlist]' + "\n\n" + out + 'NumberOfEntries=' + inp.length + "\n\n" + 'Version=2';
			}else{
				alert('Enter your text in the first window!');
				document.getElementById("input").focus();
			}	
		}
		//Azbox
		if(document.form1.format[4].checked){
			if(document.getElementById("input").value!=""){
				var buffersize = '256';
				for(i=0; i<inp.length; i++){
					out = out + (i+1) + ',' + 'Channel ' + (i+1) + ',' + buffersize + ',' + inp[i] + "\n";
				}
				document.getElementById("output").value = out;
			}else{
				alert('Enter your text in the first window!');
				document.getElementById("input").focus();
			}	
		}
		//
	}
}