function LoadMedia(){
    if(confirm("Upon Launch, Click the Player Listener Bookmarklet")){
        document.location = document.getElementsByClassName("m-url")[0].value;
    }
}