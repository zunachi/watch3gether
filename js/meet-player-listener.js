!function(){
    state = false;
    toast = document.createElement('div');
    toast.innerHTML = '<span onclick="toast.classList.add(\'hide\')" class="toast-close"> &#x2715 </span><p class="toast-msg">📺 Movie Party</p>';
    toast.classList.add("toast");
    document.body.appendChild(toast);
    css = document.createElement('style');
    css.innerHTML = ".toast-msg{padding:10px;}.toast{z-index:100000;user-select:none;font-size:1.3em;position:absolute;background:#141b29;color:#576580;font-family:sans-serif;padding:5px 20px;border-radius:50px;width:155px;top:5%;right:2%;transition:1s ease;}.toast-close{position:relative;float:right;height:20px;width:20px;color:#141b29;background:#576580;padding:10px;right:-14px;border-radius:50%;transition:.3s ease;text-align:center;cursor:pointer}.toast-close:hover{color:#576580;background:#141b29}.hide{opacity:0}";
    document.head.appendChild(css)
    setTimeout(()=>{ document.getElementsByTagName('video')[0].pause(); },1000);
    window.addEventListener ('message', (event) => {
        msg = event.data
        cmd = msg.split(" ")
        if(cmd[1]=="play"){
                document.getElementsByTagName('video')[0].play(); PostToast("Resuming Player",3000);
        }else if (cmd[1]=="pause"){
            document.getElementsByTagName('video')[0].pause(); PostToast("Pausing Player");
        }else
            console.log("Unknown Command",msg);
    });
    function PostToast(msg,timeout=5000){
        toast.children[1].innerText = msg;
        toast.classList.remove("hide");
        setTimeout(()=>{toast.classList.add("hide")},5000);
    }
    
}();