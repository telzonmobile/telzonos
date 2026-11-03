/* ===== privacy-guard.js ===== */
(function(){
    if(document.getElementById('tzpg-overlay')) return;
    var DEF={perms:{camera:'unknown',mic:'unknown',geo:'unknown',notif:'unknown'},confirm:true,history:true,notif:true,hist:[]};
    var PG=storageGet('tz_privacy',DEF); PG.perms=PG.perms||{}; PG.hist=PG.hist||[];
    var save=function(){ storageSet('tz_privacy',PG); };
    var permLabel={camera:'Camera',mic:'Microphone',geo:'Location',notif:'Notifications'};
    function logHist(perm,status){ if(!PG.history) return; PG.hist.unshift({p:permLabel[perm]||perm,s:status,t:Date.now()}); if(PG.hist.length>60) PG.hist.length=60; save(); }
    function fmtBytes(b){ if(!b&&b!==0) return '—'; if(b<1048576) return Math.round(b/1024)+' KB'; if(b<1073741824) return (b/1048576).toFixed(1)+' MB'; return (b/1073741824).toFixed(2)+' GB'; }

    var root=document.createElement('div');
    root.id='tzpg-overlay';
    root.innerHTML=
    '<div class="tzpg-head"><div class="tzpg-back" data-pg="dash">‹</div><div class="tzpg-title" id="tzpg-htitle">Privacy Guard</div></div>'+
    '<div class="tzpg-body">'+
      '<div class="tzpg-screen active" id="tzpg-dash"><div class="tzpg-ovcard"><h2>🔒 Privacy Overview</h2><p>Control what TelzonOS and this browser can access. Review permissions, test hardware and clear stored data.</p><div class="tzpg-score"><div class="tzpg-ring" id="tzpg-ring" style="--p:0%"><span id="tzpg-score">0/4</span></div><div><b id="tzpg-ovline" style="font-size:14px;color:#fff">Checking permissions…</b><br><small style="color:rgba(255,255,255,.55)">permissions granted</small></div></div></div>'+
      '<div class="tzpg-card" data-pg="camera"><div class="tzpg-ic">📷</div><div class="tzpg-info"><b>Camera</b><small>Photos, video calls & QR scanning</small></div><span class="tzpg-pill unknown" id="tzpg-pill-camera">UNKNOWN</span></div>'+
      '<div class="tzpg-card" data-pg="mic"><div class="tzpg-ic">🎤</div><div class="tzpg-info"><b>Microphone</b><small>Voice assistant & voice notes</small></div><span class="tzpg-pill unknown" id="tzpg-pill-mic">UNKNOWN</span></div>'+
      '<div class="tzpg-card" data-pg="geo"><div class="tzpg-ic">📍</div><div class="tzpg-info"><b>Location</b><small>Maps & weather accuracy</small></div><span class="tzpg-pill unknown" id="tzpg-pill-geo">UNKNOWN</span></div>'+
      '<div class="tzpg-card" data-pg="notif"><div class="tzpg-ic">🔔</div><div class="tzpg-info"><b>Notifications</b><small>Alerts, reminders & media</small></div><span class="tzpg-pill unknown" id="tzpg-pill-notif">UNKNOWN</span></div>'+
      '<div class="tzpg-card" data-pg="storage"><div class="tzpg-ic">💾</div><div class="tzpg-info"><b>Storage</b><small>Cache, photos & saved data</small></div><span class="tzpg-pill warn" id="tzpg-pill-storage">MANAGE</span></div>'+
      '<button class="tzpg-btn ghost" data-pg="hist">🕘 Activity History</button>'+
      '<button class="tzpg-btn ghost" data-pg="settings">⚙️ Privacy Settings</button></div>'+
      '<div class="tzpg-screen" id="tzpg-camera"><div class="tzpg-card" style="cursor:default"><div class="tzpg-ic">📷</div><div class="tzpg-info"><b>Camera Access</b><small id="tzpg-cam-stat">Status: not requested yet</small></div><span class="tzpg-pill unknown" id="tzpg-p2-camera">UNKNOWN</span></div><button class="tzpg-btn" data-act="req-camera">✋ Request Camera Access</button><div class="tzpg-stat" id="tzpg-cam-note">Camera access is used by the Camera app and video calls. Nothing is recorded unless you explicitly capture.</div></div>'+
      '<div class="tzpg-screen" id="tzpg-mic"><div class="tzpg-card" style="cursor:default"><div class="tzpg-ic">🎤</div><div class="tzpg-info"><b>Microphone Access</b><small id="tzpg-mic-stat">Status: not requested yet</small></div><span class="tzpg-pill unknown" id="tzpg-p2-mic">UNKNOWN</span></div><button class="tzpg-btn" data-act="req-mic">✋ Request Microphone Access</button><button class="tzpg-btn ghost" data-act="test-mic" id="tzpg-testmic">🎙️ Test Microphone</button><div class="tzpg-mic-live" id="tzpg-miclive">● Recording test… speak now <button class="tzpg-btn danger" style="width:auto;padding:8px 18px;margin:0" data-act="stop-mic">Stop</button></div><div class="tzpg-stat">Mic is used by TelzonAI voice mode and voice notes. Audio never leaves your device without your action.</div></div>'+
      '<div class="tzpg-screen" id="tzpg-geo"><div class="tzpg-card" style="cursor:default"><div class="tzpg-ic">📍</div><div class="tzpg-info"><b>Location Access</b><small id="tzpg-geo-stat">Status: not requested yet</small></div><span class="tzpg-pill unknown" id="tzpg-p2-geo">UNKNOWN</span></div><button class="tzpg-btn" data-act="req-geo">✋ Request Location Access</button><div class="tzpg-stat" id="tzpg-geo-note">Location improves Maps and weather. Coordinates never leave the device in this build.</div></div>'+
      '<div class="tzpg-screen" id="tzpg-notif"><div class="tzpg-card" style="cursor:default"><div class="tzpg-ic">🔔</div><div class="tzpg-info"><b>Notifications</b><small id="tzpg-ntf-stat">Status: not requested yet</small></div><span class="tzpg-pill unknown" id="tzpg-p2-notif">UNKNOWN</span></div><button class="tzpg-btn" data-act="req-notif">✋ Request Notification Access</button><button class="tzpg-btn ghost" data-act="test-notif">🔔 Send Test Notification</button><div class="tzpg-stat">Notifications show alerts, reminders and media controls on the lock screen.</div></div>'+
      '<div class="tzpg-screen" id="tzpg-storage"><div class="tzpg-card" style="cursor:default"><div class="tzpg-ic">💾</div><div class="tzpg-info"><b>Storage</b><small>Cache & saved data</small></div></div><div class="tzpg-stat" id="tzpg-stor-info">Calculating usage…</div><button class="tzpg-btn" data-act="clear-cache">🧹 Clear Cache</button><div class="tzpg-stat">Clearing cache removes temporary files. Your apps, photos and settings stay safe.</div></div>'+
      '<div class="tzpg-screen" id="tzpg-hist"><div id="tzpg-hist-list"></div></div>'+
      '<div class="tzpg-screen" id="tzpg-settings">'+
        '<div class="tzpg-row"><div><b>Permission alerts</b><small>Show a toast when a permission changes</small></div><div class="settings-toggle" id="tzpg-tg-notif"></div></div>'+
        '<div class="tzpg-row"><div><b>Confirm before requesting</b><small>Ask me first before any permission prompt</small></div><div class="settings-toggle" id="tzpg-tg-confirm"></div></div>'+
        '<div class="tzpg-row"><div><b>Activity history</b><small>Keep a log of permission requests</small></div><div class="settings-toggle" id="tzpg-tg-history"></div></div>'+
        '<button class="tzpg-btn danger" data-act="reset-pg">🗑️ Reset Privacy Data</button></div>'+
    '</div>';
    document.body.appendChild(root);

    var micStream=null;
    var screens=['dash','camera','mic','geo','notif','storage','hist','settings'];
    var titles={dash:'Privacy Guard',camera:'Camera',mic:'Microphone',geo:'Location',notif:'Notifications',storage:'Storage',hist:'Activity History',settings:'Privacy Settings'};
    function show(sc){ for(var i=0;i<screens.length;i++){ var el=document.getElementById('tzpg-'+screens[i]); if(el) el.classList.toggle('active',screens[i]===sc); } var h=document.getElementById('tzpg-htitle'); if(h) h.textContent=titles[sc]||'Privacy Guard'; if(sc==='hist') renderHist(); if(sc==='storage') renderStorage(); }
    function setPerm(perm,val){ PG.perms[perm]=val; save(); logHist(perm,val.toUpperCase()); refreshPills(); if(PG.notif){ try{ showToast('Privacy Guard',(permLabel[perm]||perm)+': '+val.toUpperCase(),'🔒'); }catch(e){} } }
    function refreshPills(){ var granted=0,total=0; var keys=['camera','mic','geo','notif']; for(var i=0;i<keys.length;i++){ var k=keys[i]; var v=PG.perms[k]||'unknown'; var p=document.getElementById('tzpg-pill-'+k); var p2=document.getElementById('tzpg-p2-'+k); var cls='tzpg-pill '+(v==='granted'?'granted':(v==='denied'?'denied':'unknown')); var txt=v.toUpperCase(); if(p){ p.className=cls; p.textContent=txt; } if(p2){ p2.className=cls; p2.textContent=txt; } if(v!=='unknown'){ total++; if(v==='granted') granted++; } }
      var ring=document.getElementById('tzpg-ring'); var sc=document.getElementById('tzpg-score'); var ov=document.getElementById('tzpg-ovline');
      if(ring) ring.style.setProperty('--p',(total?Math.round(granted/total*100):0)+'%');
      if(sc) sc.textContent=granted+'/'+total;
      if(ov) ov.textContent= total===0 ? 'No permissions requested yet' : (granted===total ? 'All permissions granted 🎉' : granted+' of '+total+' permissions granted');
    }
    function renderHist(){ var list=document.getElementById('tzpg-hist-list'); if(!list) return; if(!PG.hist.length){ list.innerHTML='<div class="tzpg-stat">No activity yet. Permission requests will appear here.</div>'; return; } var html=''; for(var i=0;i<PG.hist.length;i++){ var h=PG.hist[i]; var d=new Date(h.t); var when=d.toLocaleDateString()+' · '+d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}); html+='<div class="tzpg-hitem"><span>'+h.p+'</span><span style="text-align:right"><b style="color:'+(h.s==='GRANTED'?'#4ade80':'#f87171')+'">'+h.s+'</b><br><small style="color:rgba(255,255,255,.45)">'+when+'</small></span></div>'; } list.innerHTML=html; }
    function renderStorage(){ var info=document.getElementById('tzpg-stor-info'); if(!info) return; var ls=0; try{ for(var k in localStorage){ if(localStorage.hasOwnProperty(k)) ls+=(localStorage[k]||'').length; } }catch(e){}
      function paint(u,q){ info.innerHTML='📦 App data: <b style="color:#fff">'+fmtBytes(ls)+'</b><br>🗄️ Storage used: <b style="color:#fff">'+(u!=null?fmtBytes(u):'—')+'</b> of '+(q!=null?fmtBytes(q):'—'); }
      try{ if(navigator.storage&&navigator.storage.estimate){ navigator.storage.estimate().then(function(est){ paint(est.usage,est.quota); }).catch(function(){ paint(null,null); }); } else paint(null,null); }catch(e){ paint(null,null); } }
    function doConfirm(msg,cb){ if(!PG.confirm){ cb(); return; } try{ showConfirmPopup('Privacy Guard',msg,cb,'Allow'); }catch(e){ cb(); } }

    root.addEventListener('click',function(e){
      var nav=e.target.closest && e.target.closest('[data-pg]');
      if(nav){ try{ haptic(8); }catch(err){} show(nav.getAttribute('data-pg')); return; }
      var act=e.target.closest && e.target.closest('[data-act]');
      if(!act) return;
      var a=act.getAttribute('data-act'); try{ haptic(10); }catch(err){}
      if(a==='req-camera'){ doConfirm('Allow TelzonOS to request camera access?',function(){ try{ navigator.mediaDevices.getUserMedia({video:true}).then(function(st){ st.getTracks().forEach(function(t){t.stop();}); setPerm('camera','granted'); var n=document.getElementById('tzpg-cam-stat'); if(n) n.textContent='Status: granted ✓'; }).catch(function(){ setPerm('camera','denied'); var n=document.getElementById('tzpg-cam-stat'); if(n) n.textContent='Status: denied ✗'; }); }catch(err){ setPerm('camera','denied'); } }); }
      if(a==='req-mic'){ doConfirm('Allow TelzonOS to request microphone access?',function(){ try{ navigator.mediaDevices.getUserMedia({audio:true}).then(function(st){ st.getTracks().forEach(function(t){t.stop();}); setPerm('mic','granted'); var n=document.getElementById('tzpg-mic-stat'); if(n) n.textContent='Status: granted ✓'; }).catch(function(){ setPerm('mic','denied'); var n=document.getElementById('tzpg-mic-stat'); if(n) n.textContent='Status: denied ✗'; }); }catch(err){ setPerm('mic','denied'); } }); }
      if(a==='test-mic'){ try{ navigator.mediaDevices.getUserMedia({audio:true}).then(function(st){ micStream=st; var live=document.getElementById('tzpg-miclive'); if(live) live.classList.add('on'); var n=document.getElementById('tzpg-mic-stat'); if(n) n.textContent='Status: granted ✓'; setPerm('mic','granted'); }).catch(function(){ try{ showToast('Privacy Guard','Microphone not available','🎤'); }catch(e){} }); }catch(err){} }
      if(a==='stop-mic'){ if(micStream){ micStream.getTracks().forEach(function(t){t.stop();}); micStream=null; } var live=document.getElementById('tzpg-miclive'); if(live) live.classList.remove('on'); }
      if(a==='req-geo'){ doConfirm('Allow TelzonOS to request your location?',function(){ try{ navigator.geolocation.getCurrentPosition(function(pos){ setPerm('geo','granted'); var n=document.getElementById('tzpg-geo-stat'); if(n) n.textContent='Status: granted ✓ ('+pos.coords.latitude.toFixed(3)+', '+pos.coords.longitude.toFixed(3)+')'; },function(){ setPerm('geo','denied'); var n=document.getElementById('tzpg-geo-stat'); if(n) n.textContent='Status: denied ✗'; },{timeout:8000}); }catch(err){ setPerm('geo','denied'); } }); }
      if(a==='req-notif'){ doConfirm('Allow TelzonOS to send notifications?',function(){ try{ if(!('Notification' in window)){ setPerm('notif','denied'); return; } Notification.requestPermission().then(function(r){ setPerm('notif', r==='granted'?'granted':'denied'); var n=document.getElementById('tzpg-ntf-stat'); if(n) n.textContent='Status: '+(r==='granted'?'granted ✓':'denied ✗'); }); }catch(err){ setPerm('notif','denied'); } }); }
      if(a==='test-notif'){ try{ if('Notification' in window && Notification.permission==='granted'){ new Notification('TelzonOS Privacy Guard',{body:'🔔 Test notification — everything works!'}); } else { showToast('Privacy Guard','Enable notifications first','🔔'); } }catch(err){ showToast('Privacy Guard','Notifications blocked here','🔔'); } }
      if(a==='clear-cache'){ try{ if(window.caches){ caches.keys().then(function(ks){ ks.forEach(function(k){ caches.delete(k); }); }); } }catch(err){} try{ showToast('Privacy Guard','Cache cleared 🧹','💾'); }catch(e){} renderStorage(); }
      if(a==='reset-pg'){ try{ showConfirmPopup('Reset Privacy Data?','Permission statuses and activity history will be cleared.',function(){ PG=JSON.parse(JSON.stringify(DEF)); save(); micStream=null; refreshPills(); renderHist(); renderStorage(); try{ showToast('Privacy Guard','Privacy data reset','🗑️'); }catch(e){} },'Reset'); }catch(e){} }
    });

    function syncToggles(){ var t1=document.getElementById('tzpg-tg-notif'); if(t1) t1.classList.toggle('on',!!PG.notif); var t2=document.getElementById('tzpg-tg-confirm'); if(t2) t2.classList.toggle('on',!!PG.confirm); var t3=document.getElementById('tzpg-tg-history'); if(t3) t3.classList.toggle('on',!!PG.history); }
    root.addEventListener('click',function(e){ var tg=e.target.closest && e.target.closest('.settings-toggle'); if(!tg) return; var id=tg.id; if(id==='tzpg-tg-notif'){ PG.notif=!PG.notif; } if(id==='tzpg-tg-confirm'){ PG.confirm=!PG.confirm; } if(id==='tzpg-tg-history'){ PG.history=!PG.history; } save(); syncToggles(); });

    window.tzOpenPrivacyGuard=function(){ syncToggles(); refreshPills(); show('dash'); root.classList.add('active'); };
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&root.classList.contains('active')) root.classList.remove('active'); });
})();
