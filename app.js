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

function renderOutfit(){
  var key='outfit_today',dateKey=new Date().toISOString().slice(0,10);
  var data={};try{data=JSON.parse(localStorage.getItem(key)||'{}');}catch(e){}
  var current=data[dateKey]||{};
  var slots=[{type:'top',icon:'👚',label:'上衣',val:current.top||'点击选择'},{type:'bottom',icon:'👖',label:'下装',val:current.bottom||'点击选择'},{type:'shoes',icon:'👠',label:'鞋子',val:current.shoes||'点击选择'},{type:'accessory',icon:'👜',label:'配饰',val:current.accessory||'点击选择'}];
  var h='';
  for(var i=0;i<slots.length;i++){var s=slots[i];h+='<div class="outfit-slot" data-type="'+s.type+'"><div class="icon">'+s.icon+'</div><div class="label">'+s.label+'</div><div class="val">'+s.val+'</div></div>';}
  $('#outfitGrid').innerHTML=h;
  var presets={top:['白色T恤','黑色修身针织衫','条纹衬衫','短款牛仔外套','V领开衫','碎花雪纺衫'],bottom:['高腰直筒牛仔裤','黑色烟管裤','A字短裙','垂感阔腿裤','九分西裤','百褶半身裙'],shoes:['厚底小白鞋','尖头猫跟鞋','帆布鞋','方头乐福鞋','细带凉鞋','马丁靴'],accessory:['链条斜挎包','金属耳环','细腰带','丝巾','珍珠项链','手表']};
  $$('.outfit-slot').forEach(function(slot){slot.addEventListener('click',function(){var type=slot.dataset.type;var list=presets[type]||[];var msg=list.map(function(x,i){return (i+1)+'. '+x;}).join('\n');var choice=prompt('选择:\n'+msg+'\n\n或直接输入');if(choice){var val=list[parseInt(choice)-1]||choice;slot.querySelector('.val').textContent=val;if(!data[dateKey])data[dateKey]={};data[dateKey][type]=val;localStorage.setItem(key,JSON.stringify(data));}});});
  var videos=[{icon:'🎬',title:'158cm·韩系温柔风',style:'针织+半裙+猫跟鞋',color:'#FFE0EB'},{icon:'🎬',title:'158cm·通勤显高',style:'西装+高腰裤+尖头鞋',color:'#E0F0FF'},{icon:'🎬',title:'158cm·休闲运动',style:'短卫衣+瑜伽裤+老爹鞋',color:'#FFF3E0'},{icon:'🎬',title:'158cm·甜酷风',style:'短上衣+工装裤+马丁靴',color:'#F0E8FF'},{icon:'🎬',title:'158cm·法式慵懒',style:'衬衫+直筒裤+乐福鞋',color:'#E8F5DC'},{icon:'🎬',title:'158cm·约会甜美',style:'碎花裙+开衫+细带鞋',color:'#FFF0F5'}];
  var vh='';
  for(var j=0;j<videos.length;j++){var v=videos[j];vh+='<div class="video-row"><div class="thumb" style="background:'+v.color+'">'+v.icon+'</div><div class="info"><div class="vtitle">'+v.title+'</div><div class="style">'+v.style+'</div></div></div>';}
  $('#outfitVideos').innerHTML=vh;
  var styles=[{name:'韩系温柔',color:'#FF6B9D'},{name:'通勤显高',color:'#5B9BD5'},{name:'休闲运动',color:'#FF8C42'},{name:'甜酷街头',color:'#9B7ED8'},{name:'法式慵懒',color:'#7AC74F'},{name:'约会甜美',color:'#FF85A2'},{name:'极简高级',color:'#6B6B6B'},{name:'复古文艺',color:'#D4A853'}];
  var sh='';
  for(var k=0;k<styles.length;k++){var st=styles[k];sh+='<div class="style-tag" style="background:'+st.color+'">'+st.name+'</div>';}
  $('#styleInspo').innerHTML='<div class="style-tags">'+sh+'</div>';
}
// ============ 英语学习 ============
const ENG_DATA={daily:{sentences:[{en:"How's your day going?",cn:'今天过得怎么样？',pron:'/haʊz jər deɪ ˈɡoʊɪŋ/'},{en:"I'll get back to you soon.",cn:'我很快回复你。',pron:'/aɪl ɡɛt bæk tə ju sun/'},{en:"That sounds like a plan!",cn:'这个主意不错！',pron:'/ðæt saʊndz laɪk ə plæn/'},{en:"No worries, take your time.",cn:'没事，慢慢来。',pron:'/noʊ ˈwʌriz teɪk jər taɪm/'},{en:"Let me think about it.",cn:'让我考虑一下。',pron:'/lɛt mi θɪŋk əˈbaʊt ɪt/'},{en:"What do you recommend?",cn:'你有什么推荐？',pron:'/wʌt du jʊ ˌrɛkəˈmɛnd/'},{en:"Could you do me a favor?",cn:'能帮我一个忙吗？',pron:'/kʊd ju du mi ə ˈfeɪvər/'},{en:"I really appreciate it!",cn:'非常感谢！',pron:'/aɪ ˈrɪli əˈpriːʃieɪt ɪt/'}],words:[{en:'recommend',cn:'推荐',pron:'/ˌrɛkəˈmɛnd/'},{en:'appreciate',cn:'感激',pron:'/əˈpriːʃieɪt/'},{en:'absolutely',cn:'绝对地',pron:'/ˌæbsəˈluːtli/'},{en:'definitely',cn:'肯定地',pron:'/ˈdɛfɪnətli/'}]},travel:{sentences:[{en:"Where is the nearest subway station?",cn:'最近的地铁站在哪里？',pron:'/wɛr ɪz ðə ˈnɪrɪst ˈsʌbweɪ ˈsteɪʃən/'},{en:"Could I have the menu, please?",cn:'请给我看一下菜单。',pron:'/kʊd aɪ hæv ðə ˈmɛnju pliz/'},{en:"How much does this cost?",cn:'这个多少钱？',pron:'/haʊ mʌtʃ dʌz ðɪs kɔst/'},{en:"Can I get a taxi to the airport?",cn:'能打一辆去机场的出租车吗？',pron:'/kæn aɪ ɡɛt ə ˈtæksi tə ði ˈɛrpɔrt/'},{en:"Is there a pharmacy nearby?",cn:'附近有药店吗？',pron:'/ɪz ðɛr ə ˈfɑrməsi ˈnɪrbaɪ/'},{en:"I'd like to check in, please.",cn:'我想办理入住。',pron:'/aɪd laɪk tə tʃɛk ɪn pliz/'},{en:"What time is breakfast served?",cn:'早餐几点供应？',pron:'/wʌt taɪm ɪz ˈbrɛkfəst sɜrvd/'},{en:"Could you take a photo for me?",cn:'能帮我拍张照片吗？',pron:'/kʊd ju teɪk ə ˈfoʊtoʊ fər mi/'}],words:[{en:'reservation',cn:'预订',pron:'/ˌrɛzərˈveɪʃən/'},{en:'departure',cn:'出发',pron:'/dɪˈpɑrtʃər/'},{en:'luggage',cn:'行李',pron:'/ˈlʌɡɪdʒ/'},{en:'currency',cn:'货币',pron:'/ˈkʌrənsi/'}]},bags:{sentences:[{en:"This bag is made of genuine leather.",cn:'这款包是真皮材质。',pron:'/ðɪs bæɡ ɪz meɪd əv ˈdʒɛnjʊɪn ˈlɛðər/'},{en:"What's the size of this handbag?",cn:'这款手提包尺寸多大？',pron:'/wʌts ðə saɪz əv ðɪs ˈhændbæɡ/'},{en:"We offer free shipping worldwide.",cn:'我们提供全球免费配送。',pron:'/wi ˈɔfər fri ˈʃɪpɪŋ ˈwɜrldwaɪd/'},{en:"The shoulder strap is adjustable.",cn:'肩带可以调节。',pron:'/ðə ˈʃoʊldər stræp ɪz əˈdʒʌstəbl/'},{en:"This tote bag has a large capacity.",cn:'这款托特包容积很大。',pron:'/ðɪs toʊt bæɡ hæz ə lɑrdʒ kəˈpæsəti/'},{en:"It comes with a dust bag and gift box.",cn:'附带防尘袋和礼盒包装。',pron:'/ɪt kʌmz wɪð ə dʌst bæɡ ænd ɡɪft bɑks/'},{en:"How many colors are available?",cn:'有多少种颜色可选？',pron:'/haʊ ˈmɛni ˈkʌlərz ɑr əˈveɪləbl/'},{en:"The hardware is gold-plated.",cn:'五金件是镀金不锈钢的。',pron:'/ðə ˈhɑrdwɛr ɪz ɡoʊld ˈpleɪtɪd/'},{en:"This style is our bestseller.",cn:'这款是我们本季热卖款。',pron:'/ðɪs staɪl ɪz aʊr ˈbɛstˌsɛlər/'},{en:"We use YKK zippers.",cn:'我们所有包都用YKK拉链。',pron:'/wi juz YKK ˈzɪpərz/'}],words:[{en:'genuine leather',cn:'真皮',pron:'/ˈdʒɛnjʊɪn ˈlɛðər/'},{en:'adjustable',cn:'可调节的',pron:'/əˈdʒʌstəbl/'},{en:'capacity',cn:'容量',pron:'/kəˈpæsəti/'},{en:'hardware',cn:'五金件',pron:'/ˈhɑrdwɛr/'},{en:'crossbody',cn:'斜挎包',pron:'/ˈkrɔsbɑdi/'},{en:'backpack',cn:'双肩背包',pron:'/ˈbækpæk/'},{en:'tote bag',cn:'托特包',pron:'/toʊt bæɡ/'},{en:'zipper',cn:'拉链',pron:'/ˈzɪpər/'},{en:'lining',cn:'内衬',pron:'/ˈlaɪnɪŋ/'},{en:'stitching',cn:'缝线',pron:'/ˈstɪtʃɪŋ/'},{en:'bestseller',cn:'热卖款',pron:'/ˈbɛstˌsɛlər/'},{en:'wholesale price',cn:'批发价',pron:'/ˈhoʊlˌseɪl praɪs/'}]}};
let engScene='daily',engLearned={},fcIdx=0;
function loadEngLearned(){try{engLearned=JSON.parse(localStorage.getItem('eng_learned_'+engScene)||'{}');}catch(e){engLearned={};}}
function saveEngLearned(){localStorage.setItem('eng_learned_'+engScene,JSON.stringify(engLearned));}
function speakText(text){if(!window.speechSynthesis)return;window.speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=0.85;var voices=speechSynthesis.getVoices();var ev=voices.find(function(v){return v.lang==='en-US';});if(ev)u.voice=ev;window.speechSynthesis.speak(u);}
function updateFlashcard(){var data=ENG_DATA[engScene];if(!data.sentences.length)return;var s=data.sentences[fcIdx%data.sentences.length];$('#fcEn').textContent=s.en;$('#fcCn').textContent=s.cn;$('#fcPron').textContent=s.pron;document.getElementById('flashcard').classList.remove('flipped');}
function renderEngContent(){
  var data=ENG_DATA[engScene],total=data.sentences.length;
  var learned=Object.keys(engLearned).filter(function(k){return engLearned[k];}).length;
  $('#engBar').style.width=Math.round(learned/total*100)+'%';$('#engStats').textContent=learned+'/'+total;
  $('#engContent').innerHTML=data.sentences.map(function(s,i){var done=engLearned[i];return '<div class="sentence-card" style="'+(done?'opacity:.65':'')+'" data-idx="'+i+'"><div class="en">'+(done?'✅ ':'')+s.en+'</div><div class="cn">'+s.cn+'</div><div class="tags"><span class="tag tip">'+s.pron+'</span>'+(done?'<span class="tag" style="background:var(--green-light);color:var(--green-dark)">已掌握</span>':'')+'</div><button class="speak-mini" data-idx="'+i+'">🔊</button></div>';}).join('');
  $$('#engContent .sentence-card').forEach(function(card){card.addEventListener('click',function(e){if(e.target.closest('.speak-mini'))return;var idx=parseInt(card.dataset.idx);engLearned[idx]=!engLearned[idx];saveEngLearned();renderEngContent();updateFlashcard();});});
  $$('.speak-mini').forEach(function(btn){btn.addEventListener('click',function(e){e.stopPropagation();speakText(data.sentences[parseInt(btn.dataset.idx)].en);});});
  $('#engWords').innerHTML='<h3>📝 核心词汇</h3>'+data.words.map(function(w,i){return '<div class="phrase-item"><div class="num">'+(i+1)+'</div><div class="body"><div class="eng">'+w.en+'</div><div class="chn">'+w.cn+'</div><div class="pron">'+w.pron+'</div></div><button class="speak-mini" data-word="'+i+'">🔊</button></div>';}).join('');
  $$('#engWords .speak-mini').forEach(function(btn){btn.addEventListener('click',function(e){e.stopPropagation();speakText(data.words[parseInt(btn.dataset.word)].en);});});
  updateFlashcard();
}
function setupFlashcard(){var card=document.getElementById('flashcard');var sx=0,sy=0,lt=null;card.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY;lt=setTimeout(function(){var s=ENG_DATA[engScene].sentences[fcIdx%ENG_DATA[engScene].sentences.length];speakText(s.en);},500);});card.addEventListener('touchmove',function(){clearTimeout(lt);});card.addEventListener('touchend',function(e){clearTimeout(lt);var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)<20&&Math.abs(dy)<20){card.classList.toggle('flipped');return;}if(Math.abs(dx)<30||Math.abs(dy)>Math.abs(dx))return;var data=ENG_DATA[engScene];if(dx>0){engLearned[fcIdx%data.sentences.length]=true;saveEngLearned();renderEngContent();}fcIdx=(fcIdx+1)%data.sentences.length;updateFlashcard();card.classList.remove('flipped');});card.addEventListener('click',function(){card.classList.toggle('flipped');});}
function setupEngTabs(){$$('.eng-tab').forEach(function(tab){tab.addEventListener('click',function(){$$('.eng-tab').forEach(function(t){t.classList.remove('on');});tab.classList.add('on');engScene=tab.dataset.scene;loadEngLearned();fcIdx=0;renderEngContent();});});}
const DAILY_QUOTES=[{en:"The secret of getting ahead is getting started.",cn:'前进的秘诀就是开始行动。',from:'Mark Twain'},{en:"Small daily improvements lead to staggering results.",cn:'每天的小进步，成就惊人的结果。',from:''},{en:"Don't watch the clock; do what it does.",cn:'不要盯着时钟，像它一样不断前进。',from:'Sam Levenson'},{en:"The only way to do great work is to love what you do.",cn:'伟大工作的唯一途径是热爱。',from:'Steve Jobs'},{en:"You don't have to be great to start.",cn:'不需要很厉害才能开始。',from:'Zig Ziglar'},{en:"Every expert was once a beginner.",cn:'每个专家都曾是初学者。',from:'Helen Hayes'},{en:"Believe you can and you're halfway there.",cn:'相信你可以，你就成功了一半。',from:'Roosevelt'},{en:"Action is the foundational key to all success.",cn:'行动是一切成功的基础。',from:'Picasso'},{en:"Stay hungry, stay foolish.",cn:'求知若饥，虚心若愚。',from:'Steve Jobs'},{en:"The future depends on what you do today.",cn:'未来取决于你今天做了什么。',from:'Gandhi'}];
function renderDailyQuote(){var today=new Date();var idx=(today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate())%DAILY_QUOTES.length;var q=DAILY_QUOTES[idx];$('#dailyQuote').innerHTML='<div class="dq-label">📜 每日一句 · '+(today.getMonth()+1)+'月'+today.getDate()+'日</div><div class="dq-en">'+q.en+'</div><div class="dq-cn">'+q.cn+'</div>'+(q.from?'<div class="dq-from">— '+q.from+'</div>':'')+'<button class="dq-speak">🔊</button>';$('#dailyQuote .dq-speak').addEventListener('click',function(){speakText(q.en);});}

// ============ 穿搭 ============
function renderMood(){
  var moods=[{emoji:'😄',label:'超开心',color:'#FFD93D'},{emoji:'😊',label:'开心',color:'#FFB347'},{emoji:'😌',label:'平静',color:'#7AC74F'},{emoji:'🤔',label:'思考中',color:'#5B9BD5'},{emoji:'😣',label:'有点烦',color:'#FF8C42'},{emoji:'😢',label:'难过',color:'#9B7ED8'},{emoji:'😤',label:'生气',color:'#FF6B6B'},{emoji:'😴',label:'好累',color:'#A0A0A0'}];
  var today=new Date().toISOString().slice(0,10);
  var saved=localStorage.getItem('mood_'+today);
  $('#moodWheel').innerHTML=moods.map(function(m){return '<div class="mood-emoji'+(saved===m.emoji?' selected':'')+'" data-emoji="'+m.emoji+'"><span style="font-size:36px">'+m.emoji+'</span><span class="label">'+m.label+'</span></div>';}).join('');
  $$('.mood-emoji').forEach(function(el){el.addEventListener('click',function(){$$('.mood-emoji').forEach(function(x){x.classList.remove('selected');});el.classList.add('selected');localStorage.setItem('mood_'+today,el.dataset.emoji);renderMoodJournal();});});
  renderMoodJournal();
}
function renderMoodJournal(){
  var today=new Date().toISOString().slice(0,10);
  var note=localStorage.getItem('mood_note_'+today)||'';
  var history='';
  for(var i=6;i>=0;i--){var d=new Date();d.setDate(d.getDate()-i);var ds=d.toISOString().slice(0,10);var m=localStorage.getItem('mood_'+ds);if(m){history+='<div class="day"><div>'+m+'</div><div class="date">'+(d.getMonth()+1)+'/'+d.getDate()+'</div></div>';}}
  $('#moodJournal').innerHTML='<h3>📝 今日心情记录</h3><textarea id="moodNote" placeholder="今天发生了什么…" style="width:100%;min-height:80px;margin-top:8px;padding:10px;border-radius:12px;border:1px solid #ddd;font-size:13px;resize:none;outline:none">'+note+'</textarea><button class="btn-sm" id="saveMoodBtn" style="margin-top:8px;background:var(--pink);color:#fff;padding:8px 16px">💾 保存</button><h4 style="margin-top:12px">📅 最近心情</h4><div class="history">'+(history||'<span style="font-size:12px;color:var(--gray-600)">还没有记录~</span>')+'</div>';
  document.getElementById('saveMoodBtn').addEventListener('click',function(){localStorage.setItem('mood_note_'+today,document.getElementById('moodNote').value);alert('已保存 ✅');});
}

// ============ 读书 ============
const BOOKS_SPEECH=[{icon:'📕',title:'《即兴演讲》',author:'Judith Humphrey',color:'#FFE0E0'},{icon:'📗',title:'《沟通的艺术》',author:'Ronald Adler',color:'#D4F5F0'},{icon:'📙',title:'《关键对话》',author:'Kerry Patterson',color:'#FFF3E0'},{icon:'📘',title:'《影响力》',author:'Robert Cialdini',color:'#E8E4FF'}];
const BOOKS_PARENT=[{icon:'📓',title:'《正面管教》',author:'Jane Nelsen',color:'#F5E6F0'},{icon:'📔',title:'《如何说孩子才会听》',author:'Adele Faber',color:'#E8F5DC'},{icon:'📕',title:'《游戏力》',author:'Lawrence Cohen',color:'#FFE8E0'},{icon:'📗',title:'《园丁与木匠》',author:'Alison Gopnik',color:'#E0F0FF'}];
const BOOKS_NOVEL=[{icon:'📙',title:'《活着》',author:'余华',color:'#FFF8E0'},{icon:'📘',title:'《百年孤独》',author:'马尔克斯',color:'#E8F0FF'},{icon:'📓',title:'《小王子》',author:'圣埃克苏佩里',color:'#FFF0E8'},{icon:'📔',title:'《月亮与六便士》',author:'毛姆',color:'#E8FFE8'}];
function renderBookSection(id,books,storageKey){
  var progress={};try{progress=JSON.parse(localStorage.getItem(storageKey)||'{}');}catch(e){}
  $('#'+id).innerHTML=books.map(function(b,i){var pct=progress[i]||0;var done=pct>=100;return '<div class="book-card"><div class="cover" style="background:'+b.color+'">'+b.icon+'</div><div class="info"><div class="btitle">'+b.title+'</div><div class="author">'+b.author+'</div><div class="pbar"><div class="fill" style="width:'+pct+'%;background:'+b.color+'"></div></div><div class="pct">'+(done?'✅ 已读完':'📖 '+pct+'%')+'</div></div><div class="check-btn'+(done?' done':'')+'" data-bidx="'+i+'">'+(done?'✓':'')+'</div></div>';}).join('');
  $$('#'+id+' .check-btn').forEach(function(btn){btn.addEventListener('click',function(){var i=parseInt(btn.dataset.bidx);if(progress[i]>=100){progress[i]=0;}else{progress[i]=Math.min(100,(progress[i]||0)+25);}localStorage.setItem(storageKey,JSON.stringify(progress));renderBookSection(id,books,storageKey);});});
}
function renderBooks(){renderBookSection('bookSpeech',BOOKS_SPEECH,'book_speech');renderBookSection('bookParent',BOOKS_PARENT,'book_parent');renderBookSection('bookNovel',BOOKS_NOVEL,'book_novel');var note=localStorage.getItem('reading_note')||'';document.getElementById('readingNote').value=note;document.getElementById('saveNoteBtn').addEventListener('click',function(){localStorage.setItem('reading_note',document.getElementById('readingNote').value);alert('笔记已保存 ✅');});}

// ============ 亲子启蒙 ============
const KIDS_DATA={
  literacy:[{icon:'🔤',name:'今日识字：5个新汉字',desc:'人、口、手、大、天'},{icon:'📖',name:'绘本指读练习',desc:'选一本绘本，手指指读10分钟'},{icon:'✏️',name:'描红练习',desc:'田字格描红，注意笔顺'},{icon:'🎯',name:'汉字配对游戏',desc:'图片与汉字配对卡片'}],
  math:[{icon:'🔢',name:'数数练习：1-100',desc:'正数倒数，跳数（2/5/10）'},{icon:'➕',name:'10以内加减法',desc:'用实物辅助理解'},{icon:'📐',name:'图形认知',desc:'圆形/方形/三角形/梯形'},{icon:'🎲',name:'比大小游戏',desc:'骰子比大小，认识大于小于'}],
  english:[{icon:'🌐',name:'字母认知A-G',desc:'大小写+自然拼读发音'},{icon:'🎵',name:'英文儿歌磨耳朵',desc:'ABC Song / Baby Shark'},{icon:'📱',name:'单词闪卡',desc:'apple/banana/cat/dog/fish'},{icon:'🎮',name:'英语互动游戏',desc:'Simon Says / I Spy'}],
  game:[{icon:'🧩',name:'拼图挑战',desc:'12-24片拼图，锻炼专注力'},{icon:'🎨',name:'创意手工',desc:'剪纸/折纸/橡皮泥'},{icon:'♟️',name:'五子棋入门',desc:'培养策略思维'},{icon:'🧠',name:'迷宫与找不同',desc:'观察力训练'}],
};
let kidsTab='literacy';
function renderKids(){
  var key='kids_'+kidsTab;var done={};try{done=JSON.parse(localStorage.getItem(key)||'{}');}catch(e){}
  var data=KIDS_DATA[kidsTab];
  $('#kidsContent').innerHTML='<div class="subpage-card"><h3>📋 今日任务</h3>'+data.map(function(d,i){var isDone=done[i];return '<div class="kids-card"><div class="kicon">'+d.icon+'</div><div class="kinfo"><div class="kname">'+(isDone?'✅ ':'')+d.name+'</div><div class="kdesc">'+d.desc+'</div></div><div class="kstar'+(isDone?' on':'')+'" data-kidx="'+i+'">⭐</div></div>';}).join('')+'</div>';
  $$('#kidsContent .kstar').forEach(function(star){star.addEventListener('click',function(){var i=parseInt(star.dataset.kidx);done[i]=!done[i];localStorage.setItem(key,JSON.stringify(done));renderKids();});});
}
function setupKidsTabs(){$$('.ktab').forEach(function(tab){tab.addEventListener('click',function(){$$('.ktab').forEach(function(t){t.classList.remove('on');});tab.classList.add('on');kidsTab=tab.dataset.ktab;renderKids();});});}

// ============ 每日爆款 ============
function renderHot(){
  var today=new Date();var dayIdx=(today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate())%10;
  var allProducts=[
    [{name:'云朵腋下包',price:'169',desc:'软皮褶皱设计·莫兰迪色系·腋下背',color:'#FFE0EB',rank:'1'},{name:'复古法棍包',price:'219',desc:'鳄鱼纹压花·金色锁扣·斜挎单肩',color:'#E0F0FF',rank:'2'},{name:'mini波士顿包',price:'259',desc:'定型包身·YKK拉链·通勤百搭',color:'#FFF3E0',rank:'3'},{name:'褶皱云朵包',price:'189',desc:'羊皮手感·磁吸扣·ins同款',color:'#F0E8FF',rank:'4'},{name:'托特通勤包',price:'299',desc:'大容量·子母袋·真皮手柄',color:'#E8F5DC',rank:'5'}],
    [{name:'菱格链条包',price:'149',desc:'小香风·金属链条·多色可选',color:'#FFF0F5',rank:'1'},{name:'马鞍包',price:'239',desc:'复古做旧五金·翻盖设计·宽肩带',color:'#FFE8E0',rank:'2'},{name:'水桶包',price:'199',desc:'抽绳束口·pu拼接·轻量设计',color:'#E0FFF0',rank:'3'},{name:'手机包',price:'89',desc:'超迷你·竖款设计·出门必备',color:'#FFE0FF',rank:'4'},{name:'双肩妈咪包',price:'329',desc:'防水面料·多分区·轻便出行',color:'#E8E8FF',rank:'5'}],
    [{name:'铆钉机车包',price:'279',desc:'朋克风·金属铆钉·软牛皮',color:'#F0F0F0',rank:'1'},{name:'编织草编包',price:'139',desc:'夏日限定·拉菲草·度假必备',color:'#FFF8DC',rank:'2'},{name:'枕头包',price:'209',desc:'蓬松柔软·尼龙面料·超大容量',color:'#FFE0EB',rank:'3'},{name:'剑桥包',price:'249',desc:'英伦学院风·磁吸翻盖·复古棕',color:'#FFF0E0',rank:'4'},{name:'流浪汉包',price:'179',desc:'慵懒随性·帆布拼接·斜挎',color:'#E0E8FF',rank:'5'}],
    [{name:'菜篮子包',price:'159',desc:'开口设计·帆布内袋·日常百搭',color:'#FFE8D0',rank:'1'},{name:'信封手拿包',price:'119',desc:'极简线条·卡位设计·晚宴必备',color:'#FFE0E0',rank:'2'},{name:'拼接邮差包',price:'229',desc:'撞色拼接·大容量·学院风',color:'#E0F0FF',rank:'3'},{name:'透明果冻包',price:'99',desc:'PVC材质·夏日清新·沙滩必备',color:'#E8FFE8',rank:'4'},{name:'羊皮饺子包',price:'269',desc:'软糯手感·褶皱设计·轻奢质感',color:'#FFF0F0',rank:'5'}],
    [{name:'鳄鱼纹凯莉包',price:'389',desc:'定型包·旋转锁扣·贵气名媛',color:'#F5E6E0',rank:'1'},{name:'毛毛流浪包',price:'199',desc:'仿兔毛·秋冬限定·柔软保暖',color:'#FFF0F5',rank:'2'},{name:'铆钉双肩包',price:'259',desc:'学院风·铆钉装饰·减龄必备',color:'#E8E0F0',rank:'3'},{name:'月牙包',price:'169',desc:'弧形设计·腋下包·法式优雅',color:'#FFE0D0',rank:'4'},{name:'风琴包',price:'299',desc:'多隔层·挺括包型·职场利器',color:'#E0F0E8',rank:'5'}],
    [{name:'珍珠链条包',price:'189',desc:'珍珠装饰·小香风·约会必备',color:'#FFF0F0',rank:'1'},{name:'帆布托特包',price:'149',desc:'文艺印花·超大容量·学生党',color:'#F0F0FF',rank:'2'},{name:'褶皱腋下包',price:'179',desc:'仿羊皮·褶皱纹理·高级感',color:'#FFE8F0',rank:'3'},{name:'圆环手柄包',price:'229',desc:'木质圆环·复古文艺·小众款',color:'#FFF0E0',rank:'4'},{name:'铆钉流浪包',price:'259',desc:'做旧五金·流浪感·明星同款',color:'#F0E8E0',rank:'5'}],
    [{name:'抽绳水桶包',price:'169',desc:'蝴蝶结抽绳·柔软皮质·少女感',color:'#FFE0F0',rank:'1'},{name:'口金包',price:'139',desc:'复古口金·刺绣面料·旗袍绝配',color:'#FFF8E0',rank:'2'},{name:'圆饼包',price:'189',desc:'圆形设计·可爱减龄·多色',color:'#FFE8E8',rank:'3'},{name:'编织托特',price:'279',desc:'手工编织·真皮拼接·度假风',color:'#FFF0D0',rank:'4'},{name:'机能胸包',price:'159',desc:'运动风·防水面料·街头潮人',color:'#E8E8E8',rank:'5'}],
    [{name:'祖母格编织包',price:'149',desc:'手工钩针·复古花纹·文艺范',color:'#FFE8D0',rank:'1'},{name:'透明托特包',price:'119',desc:'PVC大容量·内胆包·通勤',color:'#E0F8FF',rank:'2'},{name:'流苏水桶包',price:'219',desc:'流苏装饰·波西米亚·度假风',color:'#FFE0E0',rank:'3'},{name:'贝壳包',price:'239',desc:'贝壳造型·硬挺包身·轻熟风',color:'#FFF0F5',rank:'4'},{name:'丝绒晚宴包',price:'199',desc:'丝绒面料·钻扣·派对女王',color:'#F0E0F0',rank:'5'}],
    [{name:'毛呢格纹包',price:'269',desc:'秋冬限定·格纹毛呢·学院风',color:'#FFE8E8',rank:'1'},{name:'镂空编织包',price:'179',desc:'镂空设计·夏日清凉·手工感',color:'#FFF8E0',rank:'2'},{name:'撞色邮差包',price:'209',desc:'双色拼接·大容量·文艺复古',color:'#E0F0FF',rank:'3'},{name:'鳄鱼纹手机包',price:'129',desc:'竖款迷你·压花纹理·轻便',color:'#FFE0F0',rank:'4'},{name:'金属链腋下包',price:'189',desc:'粗链条·简约设计·ins爆款',color:'#F0F0F0',rank:'5'}],
    [{name:'毛球装饰包',price:'159',desc:'毛球挂饰·可爱减龄·少女心',color:'#FFF0F5',rank:'1'},{name:'鳄鱼纹托特',price:'329',desc:'压纹真皮·大容量·气场全开',color:'#F0E8E0',rank:'2'},{name:'mini双肩包',price:'199',desc:'巴掌大小·可爱迷你·装饰包',color:'#FFE8F0',rank:'3'},{name:'草编水桶包',price:'149',desc:'天然草编·棉布内衬·田园风',color:'#FFF8DC',rank:'4'},{name:'链条腰包',price:'139',desc:'可腰可斜挎·运动风·实用',color:'#E8E8E8',rank:'5'}],
  ];
  var products=allProducts[dayIdx];
  var dateStr=(today.getMonth()+1)+'月'+today.getDate()+'日';
  $('#hotList').innerHTML='<h3>📅 '+dateStr+' 箱包爆款榜单</h3>'+products.map(function(p){return '<div class="hot-card"><div class="himg" style="background:'+p.color+'">👜</div><div class="hinfo"><div class="hname">'+p.name+'</div><div class="hprice">¥'+p.price+'</div><div class="hdesc">'+p.desc+'</div></div><div class="hrank">🔥'+p.rank+'</div></div>';}).join('');
  var top=products[0];var second=products[1];
  var aiIdeas=['加入可拆卸链条，一包两背','改用撞色缝线，增加设计感','添加子母袋组合，提高实用性','内侧加卡位+拉链暗袋','换用竹节手柄，中国风元素','增加磁吸翻盖，防丢设计','压印品牌logo烫金工艺','推出mini+大号尺寸组合'];
  var pick=aiIdeas[dayIdx%aiIdeas.length];
  $('#aiRemix').innerHTML='<div class="ai-card"><h4>🤖 AI改款建议</h4><div class="ai-idea">基于今日爆款<b>「'+top.name+'」</b>（¥'+top.price+'）和<b>「'+second.name+'」</b>（¥'+second.price+'），AI建议：<br><br>📌 <b>'+pick+'</b><br><br>新款预估定价：¥'+(parseInt(top.price)+60)+'起</div><div class="ai-tags"><span class="ai-tag">#新款设计</span><span class="ai-tag">#差异化</span><span class="ai-tag">#箱包爆改</span><span class="ai-tag">#AI设计</span></div></div>';
}

// ============ 初始化 ============
function init(){
  setupNav();
  renderDateStrip();
  renderCourses();
  renderTimer();
  renderWeekPlan();
  renderDiet();
  setupIntensity();
  setupEngTabs();
  setupFlashcard();
  loadEngLearned();
  renderEngContent();
  renderDailyQuote();
  renderOutfit();
  renderMood();
  renderBooks();
  renderKids();
  setupKidsTabs();
  renderHot();
  $('#btnStart').addEventListener('click', toggleTimer);
  $('#btnReset').addEventListener('click', resetTimer);
}
document.addEventListener('DOMContentLoaded', init);
