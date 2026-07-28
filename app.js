// ============ 工具 ============
const $ = (s)=>document.querySelector(s);
const $$ = (s)=>document.querySelectorAll(s);

// ============ 导航 ============
function setupNav(){
  $$('.tn-item').forEach(item=>{
    item.addEventListener('click',()=>{
      const page = item.dataset.page;
      $$('.tn-item').forEach(x=>x.classList.remove('active'));
      item.classList.add('active');
      $$('.subpage').forEach(sp=>sp.classList.remove('show'));
      const target = $(`.subpage[data-page="`+page+`"]`);
      if(target) target.classList.add('show');
    });
  });
}

// ============ 日期条 ============
const dates = Array.from({length:7},(_,i)=>({day:25+i,val:i===3?1:0}));
function renderDateStrip(){
  $('#dateStrip').innerHTML = dates.map((d,i)=>{
    return '<div class="d'+(i===3?' sel':'')+'" data-i="'+i+'">'+d.day+'</div>';
  }).join('');
  $$('#dateStrip .d').forEach(function(el){el.addEventListener('click',function(){$$('#dateStrip .d').forEach(function(x){x.classList.remove('sel');});el.classList.add('sel');});});
}

// ============ 计时器 ============
const TOTAL_SECONDS = 40*60; let remaining=TOTAL_SECONDS,timerId=null,running=false;
const R=108,CIRC=2*Math.PI*R;
function fmtTime(s){var m=Math.floor(s/60),ss=s%60;return String(m).padStart(2,'0')+':'+String(ss).padStart(2,'0');}
function renderTimer(){var pct=remaining/TOTAL_SECONDS;$('#ringFg').setAttribute('stroke-dashoffset',CIRC*(1-pct));$('#timerText').textContent=fmtTime(remaining);}
function tick(){if(remaining<=0){stopTimer();alert('训练完成！记得拉伸');return;}remaining--;renderTimer();}
function startTimer(){if(running)return;running=true;$('#btnStart').textContent='暂停';timerId=setInterval(tick,1000);}
function stopTimer(){running=false;$('#btnStart').textContent='继续训练';if(timerId)clearInterval(timerId);timerId=null;}
function resetTimer(){stopTimer();remaining=TOTAL_SECONDS;renderTimer();$('#btnStart').textContent='开始训练';}
function toggleTimer(){running?stopTimer():startTimer();}
function setupIntensity(){$$('.intensity-bar .chip').forEach(function(c){c.addEventListener('click',function(){$$('.intensity-bar .chip').forEach(function(x){x.classList.remove('on');});c.classList.add('on');});});}

// ============ 课程卡片 ============
const COURSES = [
  {color:'green',title:'帕梅拉·全身塑形',meta:'25分钟 · 力量+燃脂',cls:'half'},
  {color:'peach',title:'核心收紧·马甲线',meta:'15分钟 · 紧致腰腹',cls:'half'},
  {color:'blue',title:'低冲击HIIT·全身燃脂',meta:'20分钟 · 保护膝盖',cls:'full'},
];
function renderCourses(){
  $('#courseGrid').innerHTML=COURSES.map(function(c){
    return '<div class="course-card '+c.cls+'"><div class="course-thumb '+c.color+'"><div class="play-btn"></div></div><div class="course-info"><div class="title">'+c.title+'</div><div class="meta">● '+c.meta+'</div></div></div>';
  }).join('');
}

// ============ 饮食 ============
const DIET=[{meal:'🍳',name:'早餐·高蛋白',kcal:'鸡蛋+牛奶+燕麦 ≈320kcal'},{meal:'🥗',name:'午餐·均衡',kcal:'糙米+鸡胸+时蔬 ≈450kcal'},{meal:'🍎',name:'加餐·控糖',kcal:'无糖酸奶+坚果 ≈150kcal'},{meal:'🐟',name:'晚餐·轻量',kcal:'鱼+蔬菜沙拉 ≈280kcal'}];
function renderDiet(){
  $('#dietCard').innerHTML='<h3>🥗 今日饮食</h3>'+DIET.map(function(d){return '<div class="diet-row"><span class="meal">'+d.meal+'</span><div class="info"><div class="name">'+d.name+'</div><div class="kcal">'+d.kcal+'</div></div><div class="check">✓</div></div>';}).join('');
  $$('#dietCard .check').forEach(function(c){c.addEventListener('click',function(){c.classList.toggle('on');});});
}

// ============ 周计划 ============
const WEEK_PLAN=[{day:'一',focus:'全身力量',detail:'深蹲+硬拉+推举',min:'45min',rest:false},{day:'二',focus:'核心+有氧',detail:'马甲线+椭圆机',min:'40min',rest:false},{day:'三',focus:'休息日',detail:'拉伸放松/散步',min:'轻量',rest:true},{day:'四',focus:'上肢塑形',detail:'背+肩+手臂',min:'40min',rest:false},{day:'五',focus:'臀腿塑形',detail:'臀桥+箭步蹲',min:'45min',rest:false},{day:'六',focus:'有氧燃脂',detail:'低冲击HIIT',min:'30min',rest:false},{day:'日',focus:'休息日',detail:'完全休息/瑜伽',min:'恢复',rest:true}];
function renderWeekPlan(){
  $('#weekPlan').innerHTML='<h3>📅 本周训练</h3>'+WEEK_PLAN.map(function(d){return '<div class="row'+(d.rest?' rest':'')+'"><div class="day">'+d.day+'</div><div class="focus">'+d.focus+'<small>'+d.detail+'</small></div><div class="min">'+d.min+'</div></div>';}).join('');
}

// ============ 英语学习 ============
const ENG_DATA = {
  daily: [
    {en:"How are you doing?",cn:"你最近怎么样？",pron:"/haʊ ɑːr ju ˈduːɪŋ/"},
    {en:"I really appreciate it.",cn:"我真的很感激。",pron:"/aɪ ˈrɪəli əˈpriːʃieɪt ɪt/"},
    {en:"Could you give me a hand?",cn:"能帮我一下吗？",pron:"/kʊd ju ɡɪv mi ə hænd/"},
    {en:"Let me think about it.",cn:"让我想想。",pron:"/let mi θɪŋk əˈbaʊt ɪt/"},
    {en:"What's on your mind?",cn:"你在想什么呢？",pron:"/wɒts ɒn jɔːr maɪnd/"},
    {en:"I'm on my way.",cn:"我在路上了。",pron:"/aɪm ɒn maɪ weɪ/"},
    {en:"That sounds great!",cn:"听起来不错！",pron:"/ðæt saʊndz ɡreɪt/"},
    {en:"No worries at all.",cn:"完全不用担心。",pron:"/noʊ ˈwʌriz æt ɔːl/"},
  ],
  travel: [
    {en:"Where is the nearest subway?",cn:"最近的地铁站在哪？",pron:"/weər ɪz ðə ˈnɪərɪst ˈsʌbweɪ/"},
    {en:"Can I have the menu please?",cn:"能给我看看菜单吗？",pron:"/kæn aɪ hæv ðə ˈmenjuː pliːz/"},
    {en:"How much does it cost?",cn:"这个多少钱？",pron:"/haʊ mʌtʃ dʌz ɪt kɒst/"},
    {en:"I'd like to check in.",cn:"我想办理入住。",pron:"/aɪd laɪk tə tʃek ɪn/"},
    {en:"Could you take a photo for me?",cn:"能帮我拍张照吗？",pron:"/kʊd ju teɪk ə ˈfoʊtoʊ fɔːr mi/"},
    {en:"Is there free Wi-Fi here?",cn:"这里有免费Wi-Fi吗？",pron:"/ɪz ðeər friː waɪfaɪ hɪər/"},
    {en:"What time does it open?",cn:"几点开门？",pron:"/wɒt taɪm dʌz ɪt ˈoʊpən/"},
    {en:"I'll have the same, please.",cn:"我要一样的，谢谢。",pron:"/aɪl hæv ðə seɪm pliːz/"},
  ],
  bags: [
    {en:"This bag is made of genuine leather.",cn:"这款包是真皮的。",pron:"/ðɪs bæɡ ɪz meɪd əv ˈdʒenjuɪn ˈleðər/"},
    {en:"Do you have this in black?",cn:"这款有黑色的吗？",pron:"/du ju hæv ðɪs ɪn blæk/"},
    {en:"What's the capacity of this bag?",cn:"这个包的容量是多少？",pron:"/wɒts ðə kəˈpæsɪti əv ðɪs bæɡ/"},
    {en:"This is our best-selling item.",cn:"这是我们的爆款。",pron:"/ðɪs ɪz aʊər best ˈselɪŋ ˈaɪtəm/"},
    {en:"The quality is excellent.",cn:"质量非常好。",pron:"/ðə ˈkwɒləti ɪz ˈeksələnt/"},
    {en:"It comes with a dust bag.",cn:"配有防尘袋。",pron:"/ɪt kʌmz wɪð ə dʌst bæɡ/"},
    {en:"We offer worldwide shipping.",cn:"我们支持全球配送。",pron:"/wi ˈɒfər ˈwɜːldwaɪd ˈʃɪpɪŋ/"},
    {en:"This style is very popular this season.",cn:"这个款式这季很流行。",pron:"/ðɪs staɪl ɪz ˈveri ˈpɒpjələr ðɪs ˈsiːzn/"},
  ]
};
let engScene='daily',engIdx=0,engLearned=JSON.parse(localStorage.getItem('engLearned')||'[]');

function speakText(text){
  if(!('speechSynthesis' in window)){alert('你的浏览器不支持语音');return;}
  window.speechSynthesis.cancel();
  var u=new SpeechSynthesisUtterance(text);
  u.lang='en-US';u.rate=0.85;
  window.speechSynthesis.speak(u);
}

function renderFlashcard(){
  var card=ENG_DATA[engScene][engIdx];
  $('#fcEn').textContent=card.en;
  $('#fcCn').textContent=card.cn;
  $('#fcPron').textContent=card.pron;
  $('#flashcard').classList.remove('flipped');
  var learned=engLearned.filter(function(x){return x.scene===engScene;});
  $('#engStats').textContent=learned.length+'/'+ENG_DATA[engScene].length;
  $('#engBar').style.width=(learned.length/ENG_DATA[engScene].length*100)+'%';
}

function renderEngContent(){
  var sceneData=ENG_DATA[engScene];
  var learned=engLearned.filter(function(x){return x.scene===engScene;}).map(function(x){return x.en;});
  var html='<div class="subpage-card"><h3>📝 今日词句</h3>';
  sceneData.forEach(function(item,i){
    var isLearned=learned.indexOf(item.en)>-1;
    html+='<div class="phrase-item"><div class="num" style="'+(isLearned?'background:var(--green);color:#fff':'')+'">'+(i+1)+'</div><div class="body"><div class="eng">'+item.en+'</div><div class="chn">'+item.cn+'</div><div class="pron">'+item.pron+'</div></div><button class="speak-mini" data-text="'+item.en+'">🔊</button></div>';
  });
  html+='</div>';
  $('#engContent').innerHTML=html;
  $$('#engContent .speak-mini').forEach(function(btn){
    btn.addEventListener('click',function(e){e.stopPropagation();speakText(this.dataset.text);});
  });
}

function setupEngTabs(){
  $$('#engTabs .eng-tab').forEach(function(tab){
    tab.addEventListener('click',function(){
      $$('#engTabs .eng-tab').forEach(function(t){t.classList.remove('on');});
      tab.classList.add('on');
      engScene=tab.dataset.scene;
      engIdx=0;
      renderFlashcard();
      renderEngContent();
    });
  });
}

function setupFlashcard(){
  var fc=$('#flashcard');
  var touchStartX=0;
  fc.addEventListener('click',function(){fc.classList.toggle('flipped');});
  fc.addEventListener('touchstart',function(e){touchStartX=e.touches[0].clientX;});
  fc.addEventListener('touchend',function(e){
    var diff=e.changedTouches[0].clientX-touchStartX;
    if(diff>60){
      var item=ENG_DATA[engScene][engIdx];
      if(engLearned.filter(function(x){return x.scene===engScene&&x.en===item.en;}).length===0){
        engLearned.push({scene:engScene,en:item.en,date:new Date().toISOString().slice(0,10)});
        localStorage.setItem('engLearned',JSON.stringify(engLearned));
      }
      engIdx=(engIdx+1)%ENG_DATA[engScene].length;
      renderFlashcard();
      renderEngContent();
    }else if(diff<-60){
      engIdx=(engIdx+1)%ENG_DATA[engScene].length;
      renderFlashcard();
      renderEngContent();
    }
  });
  var longPressTimer;
  fc.addEventListener('touchstart',function(e){
    longPressTimer=setTimeout(function(){speakText(ENG_DATA[engScene][engIdx].en);},500);
  });
  fc.addEventListener('touchend',function(){clearTimeout(longPressTimer);});
  fc.addEventListener('touchmove',function(){clearTimeout(longPressTimer);});
}

// ============ 每日金句 ============
const QUOTES=[
  {en:"The best time to plant a tree was 20 years ago. The second best time is now.",cn:"种一棵树最好的时间是二十年前，其次是现在。",from:"Chinese Proverb"},
  {en:"It does not matter how slowly you go as long as you do not stop.",cn:"走得慢没关系，只要不停下。",from:"Confucius"},
  {en:"Believe you can and you're halfway there.",cn:"相信你能做到，你就已经成功了一半。",from:"Theodore Roosevelt"},
  {en:"The secret of getting ahead is getting started.",cn:"前进的秘诀就是开始行动。",from:"Mark Twain"},
  {en:"Don't watch the clock; do what it does. Keep going.",cn:"别盯着时钟看，像它一样——继续前进。",from:"Sam Levenson"},
  {en:"Everything you've ever wanted is on the other side of fear.",cn:"你想要的都在恐惧的另一边。",from:"George Addair"},
  {en:"Success is not final, failure is not fatal: it is the courage to continue that counts.",cn:"成功不是终点，失败也不致命——继续前行的勇气才最重要。",from:"Winston Churchill"},
];
function renderQuote(){
  var q=QUOTES[Math.floor(Math.random()*QUOTES.length)];
  $('#dailyQuote').innerHTML='<div class="dq-label">📖 每日金句</div><div class="dq-en">"'+q.en+'"</div><div class="dq-cn">'+q.cn+'</div><div class="dq-from">—— '+q.from+'</div><button class="dq-speak" data-text="'+q.en+'">🔊</button>';
  var btn=$('#dailyQuote .dq-speak');
  if(btn)btn.addEventListener('click',function(e){e.stopPropagation();speakText(this.dataset.text);});
}

// ============ 穿搭 ============
const OUTFIT_PRESETS=[
  {icon:'👗',label:'通勤优雅',items:[{name:'法式收腰茶歇裙',desc:'V领显瘦+膝盖下长度，158cm友好',color:'#7AC74F'},{name:'针织短开衫+阔腿裤',desc:'上短下长拉高腰线',color:'#9B7ED8'}]},
  {icon:'👖',label:'休闲逛街',items:[{name:'短款卫衣+高腰直筒裤',desc:'遮胯显腿长',color:'#5B9BD5'},{name:'条纹T+牛仔A字裙',desc:'经典不出错',color:'#FF8C42'}]},
  {icon:'🎀',label:'甜美约会',items:[{name:'泡泡袖方领上衣+百褶裙',desc:'温柔甜美，优化头身比',color:'#FF6B9D'},{name:'蕾丝边针织+鱼尾半裙',desc:'小个子也能穿的鱼尾裙',color:'#E8A0BF'}]},
  {icon:'🏃',label:'运动户外',items:[{name:'短款运动背心+高腰leggings',desc:'拉长腿部线条',color:'#A6CC8A'},{name:'防晒衫+运动短裤',desc:'轻便透气，显高显瘦',color:'#7FB7E8'}]},
];

function renderOutfit(){
  var html='';
  OUTFIT_PRESETS.forEach(function(style){
    html+='<div class="outfit-slot"><div class="icon">'+style.icon+'</div><div class="label">'+style.label+'</div><div class="val">'+style.items[0].name+'</div></div>';
    html+='<div class="outfit-slot"><div class="icon">'+style.icon+'</div><div class="label">'+style.label+'·备选</div><div class="val">'+style.items[1].name+'</div></div>';
  });
  $('#outfitGrid').innerHTML=html;

  // Video recommendations
  var videos=[
    {title:'158cm小个子一周穿搭不重样',style:'通勤+休闲',color:'#FF6B9D',icon:'🎬'},
    {title:'小个子显高10cm穿搭秘籍',style:'显高技巧',color:'#7AC74F',icon:'📐'},
    {title:'158cm梨形身材穿搭指南',style:'梨形专属',color:'#5B9BD5',icon:'🍐'},
    {title:'小个子夏日连衣裙推荐',style:'裙装合集',color:'#9B7ED8',icon:'👗'},
    {title:'158cm秋冬显瘦穿搭',style:'季节穿搭',color:'#FF8C42',icon:'🧥'},
  ];
  $('#outfitVideos').innerHTML=videos.map(function(v){
    return '<div class="video-row"><div class="thumb" style="background:linear-gradient(135deg,'+v.color+'33,'+v.color+'66)">'+v.icon+'</div><div class="info"><div class="vtitle">'+v.title+'</div><div class="style">'+v.style+'</div></div></div>';
  }).join('');

  // Style inspiration
  var styles=[
    {name:'法式极简',color:'#5B9BD5'},
    {name:'韩系温柔',color:'#FF6B9D'},
    {name:'日系通勤',color:'#7AC74F'},
    {name:'新中式',color:'#9B7ED8'},
    {name:'美式复古',color:'#FF8C42'},
    {name:'学院风',color:'#E8A0BF'},
  ];
  $('#styleInspo').innerHTML='<div class="style-tags">'+styles.map(function(s){
    return '<div class="style-tag" style="background:'+s.color+'">'+s.name+'</div>';
  }).join('')+'</div>';
}

// ============ 心情 ============
const MOODS=[
  {emoji:'😄',label:'超开心'},
  {emoji:'😊',label:'还不错'},
  {emoji:'😌',label:'很平静'},
  {emoji:'🤔',label:'有点懵'},
  {emoji:'😢',label:'有点丧'},
  {emoji:'😤',label:'很烦躁'},
  {emoji:'🥰',label:'被治愈'},
  {emoji:'💪',label:'充满能量'},
];

function renderMood(){
  $('#moodWheel').innerHTML=MOODS.map(function(m,i){
    return '<div class="mood-emoji" data-mood="'+i+'">'+m.emoji+'<span class="label">'+m.label+'</span></div>';
  }).join('');

  var savedMoods=JSON.parse(localStorage.getItem('moodHistory')||'[]');
  var today=new Date().toISOString().slice(0,10);
  var todayMood=savedMoods.find(function(m){return m.date===today;});

  if(todayMood!==undefined){
    var el=$('.mood-emoji[data-mood="'+todayMood.mood+'"]');
    if(el)el.classList.add('selected');
  }

  $$('#moodWheel .mood-emoji').forEach(function(el){
    el.addEventListener('click',function(){
      $$('#moodWheel .mood-emoji').forEach(function(e){e.classList.remove('selected');});
      el.classList.add('selected');
      var moodIdx=parseInt(el.dataset.mood);
      var existing=savedMoods.findIndex(function(m){return m.date===today;});
      if(existing>-1){savedMoods[existing].mood=moodIdx;}
      else{savedMoods.push({date:today,mood:moodIdx});}
      localStorage.setItem('moodHistory',JSON.stringify(savedMoods));
      renderMoodJournal();
    });
  });

  renderMoodJournal();
}

function renderMoodJournal(){
  var savedMoods=JSON.parse(localStorage.getItem('moodHistory')||'[]');
  var note=localStorage.getItem('moodNote_'+new Date().toISOString().slice(0,10))||'';
  var last7=savedMoods.slice(-7).reverse();
  var historyHtml='<div class="history">'+last7.map(function(m){
    var mood=MOODS[m.mood];
    return '<div class="day">'+mood.emoji+'<div class="date">'+m.date.slice(5)+'</div></div>';
  }).join('')+'</div>';

  $('#moodJournal').innerHTML='<h3>💭 心情记录</h3><textarea id="moodNote" placeholder="今天发生了什么..." style="width:100%;min-height:60px;padding:10px;border-radius:12px;border:1px solid #ddd;font-size:13px;resize:none;outline:none;margin-top:8px">'+note+'</textarea><button class="btn-sm" id="saveMoodBtn" style="margin-top:8px;background:var(--pink);color:#fff;padding:8px 16px">保存</button>'+historyHtml;

  setTimeout(function(){
    var saveBtn=$('#saveMoodBtn');
    if(saveBtn)saveBtn.addEventListener('click',function(){
      var text=$('#moodNote').value;
      localStorage.setItem('moodNote_'+new Date().toISOString().slice(0,10),text);
      alert('心情已保存 ❤️');
    });
  },100);
}

// ============ 读书 ============
const BOOKS_SPEECH=[
  {title:'非暴力沟通',author:'马歇尔·卢森堡',cover:'🗣️',color:'#5B9BD5',progress:45},
  {title:'关键对话',author:'科里·帕特森',cover:'💬',color:'#7AC74F',progress:30},
  {title:'演讲的力量',author:'克里斯·安德森',cover:'🎤',color:'#FF8C42',progress:60},
  {title:'沟通的艺术',author:'罗纳德·B·阿德勒',cover:'🤝',color:'#9B7ED8',progress:15},
];
const BOOKS_PARENT=[
  {title:'正面管教',author:'简·尼尔森',cover:'👶',color:'#FF6B9D',progress:70},
  {title:'如何说孩子才会听',author:'阿黛尔·法伯',cover:'👂',color:'#7AC74F',progress:50},
  {title:'游戏力',author:'劳伦斯·科恩',cover:'🎮',color:'#5B9BD5',progress:25},
  {title:'好妈妈胜过好老师',author:'尹建莉',cover:'📖',color:'#FF8C42',progress:85},
];
const BOOKS_NOVEL=[
  {title:'活着',author:'余华',cover:'📕',color:'#E8A0BF',progress:100},
  {title:'百年孤独',author:'加西亚·马尔克斯',cover:'📗',color:'#7AC74F',progress:40},
  {title:'小王子',author:'圣埃克苏佩里',cover:'📘',color:'#5B9BD5',progress:100},
  {title:'月亮与六便士',author:'毛姆',cover:'📙',color:'#FF8C42',progress:55},
];

function loadBookProgress(){
  try{return JSON.parse(localStorage.getItem('bookProgress')||'{}');}catch(e){return {};}
}
function saveBookProgress(p){localStorage.setItem('bookProgress',JSON.stringify(p));}

function renderBookSection(containerId,books){
  var progress=loadBookProgress();
  var html='';
  books.forEach(function(b,i){
    var pct=progress[b.title]!==undefined?progress[b.title]:b.progress;
    html+='<div class="book-card"><div class="cover" style="background:'+b.color+'22">'+b.cover+'</div><div class="info"><div class="btitle">'+b.title+'</div><div class="author">'+b.author+'</div><div class="pbar"><div class="fill" style="width:'+pct+'%;background:'+b.color+'"></div></div><div class="pct">进度 '+pct+'%</div></div><button class="check-btn'+(pct>=100?' done':'')+'" data-book="'+b.title+'">✓</button></div>';
  });
  $(containerId).innerHTML=html;
  $$(containerId+' .check-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var title=btn.dataset.book;
      var prog=loadBookProgress();
      var current=prog[title]!==undefined?prog[title]:books.find(function(b){return b.title===title;}).progress;
      var newPct=Math.min(current+10,100);
      prog[title]=newPct;
      saveBookProgress(prog);
      renderAllBooks();
    });
  });
}

function renderAllBooks(){
  renderBookSection('#bookSpeech',BOOKS_SPEECH);
  renderBookSection('#bookParent',BOOKS_PARENT);
  renderBookSection('#bookNovel',BOOKS_NOVEL);
}

function setupReadingNotes(){
  var note=localStorage.getItem('readingNote')||'';
  $('#readingNote').value=note;
  $('#saveNoteBtn').addEventListener('click',function(){
    localStorage.setItem('readingNote',$('#readingNote').value);
    alert('笔记已保存 📝');
  });
}

// ============ 亲子启蒙 ============
const KIDS_DATA={
  literacy:[
    {char:'大',desc:'大人、大象 —— 一个人张开双臂就是"大"',icon:'🐘'},
    {char:'小',desc:'小孩、小鸟 —— 两只手靠很近就是"小"',icon:'🐦'},
    {char:'上',desc:'上面、上楼 —— 一横在上，箭头朝上',icon:'⬆️'},
    {char:'下',desc:'下面、下楼 —— 一横在下，箭头朝下',icon:'⬇️'},
    {char:'山',desc:'大山、山顶 —— 三个山峰连起来',icon:'⛰️'},
    {char:'水',desc:'喝水、河水 —— 像流动的水滴',icon:'💧'},
    {char:'火',desc:'火焰、火车 —— 像燃烧的火苗',icon:'🔥'},
    {char:'口',desc:'嘴巴、门口 —— 张开的嘴巴形状',icon:'👄'},
  ],
  math:[
    {char:'1+1=2',desc:'一个苹果加一个苹果，两个苹果',icon:'🍎'},
    {char:'5以内加法',desc:'用手指头数：1+2=3, 2+3=5',icon:'✋'},
    {char:'比大小',desc:'5比3大，3比5小 —— 用实物比较',icon:'⚖️'},
    {char:'认识形状',desc:'圆形○、方形□、三角形△',icon:'🔺'},
    {char:'分类游戏',desc:'把玩具按颜色/大小分堆',icon:'🧩'},
    {char:'数到20',desc:'一个一个数：1,2,3...20',icon:'🔢'},
    {char:'找规律',desc:'红蓝红蓝红_？下一个是什么',icon:'🔄'},
    {char:'认识钟表',desc:'长针短针，几点几分',icon:'🕐'},
  ],
  english:[
    {char:'Apple',desc:'苹果 —— A for Apple',icon:'🍎'},
    {char:'Cat',desc:'猫咪 —— C for Cat',icon:'🐱'},
    {char:'Dog',desc:'狗狗 —— D for Dog',icon:'🐶'},
    {char:'Fish',desc:'鱼 —— F for Fish',icon:'🐟'},
    {char:'Hello!',desc:'你好！见面打招呼',icon:'👋'},
    {char:'Thank you',desc:'谢谢你！收到礼物时说',icon:'🎁'},
    {char:'Red/Blue/Yellow',desc:'红/蓝/黄 —— 基础颜色',icon:'🎨'},
    {char:'One Two Three',desc:'一、二、三 —— 数数',icon:'🔢'},
  ],
  game:[
    {char:'七巧板拼图',desc:'用7块板拼出各种图案，锻炼空间思维',icon:'🧩'},
    {char:'找不同',desc:'两幅图中找出5处不同，训练观察力',icon:'🔍'},
    {char:'迷宫游戏',desc:'帮小兔子找到回家的路',icon:'🐰'},
    {char:'记忆翻牌',desc:'翻牌配对，记住位置，训练记忆力',icon:'🃏'},
    {char:'连线画图',desc:'按数字顺序连线，画出隐藏图案',icon:'✏️'},
    {char:'积木搭建',desc:'按图搭积木，锻炼手眼协调',icon:'🧱'},
    {char:'猜谜语',desc:'"上边毛下边毛，中间一颗黑葡萄"',icon:'❓'},
    {char:'剪纸手工',desc:'剪出各种形状，锻炼精细动作',icon:'✂️'},
  ]
};

let kidsTab='literacy';
let kidsStars=JSON.parse(localStorage.getItem('kidsStars')||'{}');

function renderKidsContent(){
  var data=KIDS_DATA[kidsTab];
  var html='';
  data.forEach(function(item,i){
    var starred=kidsStars[kidsTab+'_'+i];
    html+='<div class="kids-card"><div class="kicon">'+item.icon+'</div><div class="kinfo"><div class="kname">'+item.char+'</div><div class="kdesc">'+item.desc+'</div></div><div class="kstar'+(starred?' on':'')+'" data-tab="'+kidsTab+'" data-idx="'+i+'">⭐</div></div>';
  });
  $('#kidsContent').innerHTML=html;

  $$('#kidsContent .kstar').forEach(function(star){
    star.addEventListener('click',function(){
      var key=star.dataset.tab+'_'+star.dataset.idx;
      kidsStars[key]=!kidsStars[key];
      localStorage.setItem('kidsStars',JSON.stringify(kidsStars));
      star.classList.toggle('on',kidsStars[key]);
    });
  });
}

function setupKidsTabs(){
  $$('#kidsTabs .ktab').forEach(function(tab){
    tab.addEventListener('click',function(){
      $$('#kidsTabs .ktab').forEach(function(t){t.classList.remove('on');});
      tab.classList.add('on');
      kidsTab=tab.dataset.ktab;
      renderKidsContent();
    });
  });
}

// ============ 每日爆款 ============
const HOT_PRODUCTS=[
  {name:'法式复古链条包',price:'¥269',desc:'鳄鱼纹PU 百搭斜挎 多色可选',icon:'👜',color:'#9B7ED8'},
  {name:'极简大容量托特包',price:'¥189',desc:'帆布+牛皮拼接 通勤必备',icon:'🛍️',color:'#5B9BD5'},
  {name:'糖果色迷你水桶包',price:'¥159',desc:'抽绳设计 轻便可爱 春夏爆款',icon:'🪣',color:'#FF6B9D'},
  {name:'菱格链条单肩包',price:'¥328',desc:'小香风经典款 气质名媛',icon:'✨',color:'#FFD93D'},
  {name:'牛皮邮差包',price:'¥245',desc:'复古学院风 大容量 耐造',icon:'📬',color:'#7AC74F'},
  {name:'透明果冻包',price:'¥128',desc:'PVC潮流款 夏日清凉感',icon:'🍬',color:'#FF8C42'},
  {name:'编织草编包',price:'¥99',desc:'度假风 田园清新 夏日必备',icon:'🌿',color:'#A6CC8A'},
  {name:'马鞍包半月包',price:'¥289',desc:'圆弧设计 简约高级 通勤约会两用',icon:'🌙',color:'#E8A0BF'},
  {name:'云朵包手拿包',price:'¥198',desc:'软糯蓬松 温柔气质 拍照出片',icon:'☁️',color:'#C4A6E8'},
  {name:'双肩背包',price:'¥210',desc:'轻量尼龙 大容量 妈妈包首选',icon:'🎒',color:'#7FB7E8'},
];

function renderHot(){
  var dayIdx=new Date().getDate()%HOT_PRODUCTS.length;
  var today=new Date().toISOString().slice(0,10);
  var rotated=[];
  for(var i=0;i<5;i++){
    rotated.push(HOT_PRODUCTS[(dayIdx+i)%HOT_PRODUCTS.length]);
  }

  var html='<h3>🏆 '+today+' 热销排行</h3>';
  rotated.forEach(function(p,i){
    html+='<div class="hot-card"><div class="himg" style="background:'+p.color+'22">'+p.icon+'</div><div class="hinfo"><div class="hname">'+p.name+'</div><div class="hprice">'+p.price+'</div><div class="hdesc">'+p.desc+'</div></div><div class="hrank">'+(i+1)+'</div></div>';
  });
  $('#hotList').innerHTML=html;

  // AI remix suggestions
  var remixes=[
    {idea:'把「链条包」的链条换成珍珠链，搭配「水桶包」的抽绳设计 —— 珍珠抽绳链条包，甜酷风拉满',tags:['珍珠元素','甜酷混搭','链条改造']},
    {idea:'「托特包」内部加可拆卸内胆包，秒变双面包 —— 一面通勤一面逛街，一包两用',tags:['可拆卸设计','一包多用','通勤百变']},
    {idea:'「草编包」+「果冻包」材质混搭 —— 透明PVC外层+草编内衬，夏日清凉又有质感',tags:['材质混搭','夏日限定','透明风']},
  ];
  var remix=remixes[dayIdx%remixes.length];
  $('#aiRemix').innerHTML='<div class="ai-card"><h4>🤖 AI 搭配灵感</h4><div class="ai-idea">'+remix.idea+'</div><div class="ai-tags">'+remix.tags.map(function(t){return '<span class="ai-tag">#'+t+'</span>';}).join('')+'</div></div>';
}

// ============ 初始化 ============
function init(){
  renderDateStrip();
  renderTimer();
  setupIntensity();
  renderCourses();
  renderDiet();
  renderWeekPlan();
  setupNav();
  setupEngTabs();
  setupFlashcard();
  renderFlashcard();
  renderEngContent();
  renderQuote();
  renderOutfit();
  renderMood();
  renderAllBooks();
  setupReadingNotes();
  setupKidsTabs();
  renderKidsContent();
  renderHot();

  // Timer buttons
  $('#btnStart').addEventListener('click',toggleTimer);
  $('#btnReset').addEventListener('click',resetTimer);
}

document.addEventListener('DOMContentLoaded',init);
