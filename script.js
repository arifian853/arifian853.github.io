    var i=0,text;
    
    var text = "You can find me on : ";
    
    function typing() {
        if(i<text.length){
            document.getElementById("text").innerHTML += text.charAt(i);
            i++;
            setTimeout(typing,100);
        }
    }
    typing();
    