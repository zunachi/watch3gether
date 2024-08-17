var mic = document.querySelector('[data-is-muted]');
var parent = mic.parentElement.parentElement.parentElement.parentElement.parentElement;
var rightnotif = parent.children[10];
var targetNode = rightnotif;
var bottom = parent.children[8];
var config = {
  attributes: true,
  childList: true,
  subtree: true,
};
css = document.createElement('style');
css.innerHTML = ".e-card{background:#222;color:#eee;user-select: none;padding:10px;width:100%;filter:invert(.8);border-radius:50px;margin:10px}.e-button{appearance:none;border:none;border-radius:50%;height:40px;width:40px;cursor:pointer;transition:.4s ease;float:right;margin:-4px}.e-button:hover{background:#7fffd4;}.e-title{margin:10px;font-weight: 600;}"
document.head.appendChild(css)

var movieTab = false

var callbackMonitor = function (mutationsList) {
    msg = rightnotif.children[0].children[2].children[0].children[0].children[2].innerText
    if(movieTab){
        movieTab.postMessage(msg,"*");
    }else console.log("Tab not Open, ReHost Party")
    if(chatListObserver){
        chatListObserver.disconnect();
        chatListObserver = false;
    }
    console.log(msg)
};

bottom.children[2].children[3].addEventListener('click',()=>{
    setTimeout(()=>{
        bottomMenu = document.querySelectorAll('[role="menu"]')[0]
        ChgLayout = bottomMenu.children[0].children[0].children[0];
        MovieParty = ChgLayout.cloneNode(1);
        MovieParty.removeAttribute('jsslot');
        MovieParty.children[2].children[0].children[0].innerText = "Watch Party"
        MovieParty.children[1].children[0].innerHTML="<span class=\"google-material-icons\">theaters</span>";
        MovieParty.children[2].children[0].children[1].innerText = "Host a Watch Party";
        MovieParty.addEventListener('click',OpenMovieTab)
        if(!document.getElementById('movieParty')){
            MovieParty.id="movieParty";
            bottomMenu.children[0].children[0].insertBefore(MovieParty,ChgLayout);
        }
    },200);
});
var chatListObserver = false;
chatButton = parent.children[0].children[2].children[0].children[1].children[2]
chatButton.addEventListener('click', ()=>{
    setTimeout(()=>{ RenderChatCommands()  },300);
    rescan = function(mutationsList){
        RenderChatCommands();
    }
    chatsList = parent.children[3].children[0].children[1].children[1].children[1].children[1].children[0].children[1];
    chatListObserver = new MutationObserver(rescan);
    chatListObserver.observe(chatsList, config);
});


function RenderChatCommands(){
    if(chatListObserver){
        chatListObserver.disconnect();
        chatListObserver = false;
    }
    chatsList = parent.children[3].children[0].children[1].children[1].children[1].children[1].children[0].children[1].children;
    for (i=0;i<chatsList.length;i++){
        chatMsgs = chatsList[i].children;
        for (j=0;j<chatMsgs.length;j++){
            if(chatMsgs[j].innerText.includes(">cmd")){
                chatsList[i].children[1].style.width="85%";
                ele = RenderControl(chatMsgs[j].innerText)
                chatMsgs[j].innerHTML = ""
                chatMsgs[j].appendChild(ele)
            }
        }
    }
    if(!chatListObserver){
        chatsList = parent.children[3].children[0].children[1].children[1].children[1].children[1].children[0].children[1];
        chatListObserver = new MutationObserver(rescan);
        chatListObserver.observe(chatsList, config);    
    }
}

function RenderControl(msg){
    action = msg.split(" ")[1];
    html = '<div class="e-card"><button class="e-button google-material-icons">play_arrow</button><p class="e-title">Player Control</p></div>'
    div = document.createElement('div')
    div.innerHTML = html
    if(action=="play"){
        div.children[0].children[0].innerText = "pause";
        div.children[0].children[1].innerText = "Player is Resumed";
        div.children[0].children[0].addEventListener('click',()=>{command(">cmd pause")})
    }else if(action=="pause"){
        div.children[0].children[0].innerText = "play_arrow";
        div.children[0].children[1].innerText = "Player is Paused";
        div.children[0].children[0].addEventListener('click',()=>{command(">cmd play")})
    }else{
        div.children[0].children[0].innerText = "play_arrow";
        div.children[0].children[1].innerText = "Player Control";
        div.children[0].children[0].addEventListener('click',()=>{command(">cmd play")})
    }
    return div.children[0];
}

function command(text){
    chatBox = document.getElementsByTagName('textarea')[0];
    chatBox.parentElement.parentElement.children[0].innerText="";
    chatBox.style.height="50px";
    chatBox.value = text+" *";
}

var OpenMovieTab = function(){
    movieTab = window.open("http://127.0.0.1:5500/", "Media Source");
}
//http://elvistony.github.io/movieparty/
var observer = new MutationObserver(callbackMonitor);
observer.observe(targetNode, config);