/* ==================================================
   运动锻炼工作台 - 核心逻辑
   ================================================== */

// ============ 日期条（25-31 号模拟一周）============
const dates = [
  { day:25, val:0 },
  { day:26, val:0 },
  { day:27, val:0 },
  { day:28, val:1 },   // 默认选中 28 号
  { day:29, val:0 },
  { day:30, val:0 },
  { day:31, val:0 },
];

function renderDateStrip(){
  $('#dateStrip').innerHTML = dates.map((d,i)=>
    `<div class="d${i===3?' sel':''}" data-i="${i}">${d.day}</div>`
  ).join('');
  $$('#dateStrip .d').forEach(el=>{
    el.addEventListener('click',()=>{
      $$('#dateStrip .d').forEach(x=>x.classList.remove('sel'));
      el.classList.add('sel');
    });
  });
}

// ============ 计时器 ============
// 小基数减脂：单次 40 分钟（5 分钟热身 + 25 分钟力量/塑形 + 10 分钟有氧）
const TOTAL_SECONDS = 40 * 60;
let remaining = TOTAL_SECONDS;
let timerId = null;
let running = false;
const R = 108;
const CIRC = 2 * Math.PI * R;

function fmtTime(sec){
  const m = Math.floor(sec/60);
  const s = sec % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function renderTimer(){
  const pct = remaining / TOTAL_SECONDS;
  const offset = CIRC * (1 - pct);
  $('#ringFg').setAttribute('stroke-dashoffset', offset);
  $('#timerText').textContent = fmtTime(remaining);
}

function tick(){
  if(remaining <= 0){
    stopTimer();
    alert('🎉 今日训练完成！记得拉伸 + 补充蛋白质');
    return;
  }
  remaining--;
  renderTimer();
}

function startTimer(){
  if(running) return;
  running = true;
  $('#btnStart').textContent = '暂停';
  timerId = setInterval(tick, 1000);
}

function stopTimer(){
  running = false;
  $('#btnStart').textContent = '继续训练';
  if(timerId) clearInterval(timerId);
  timerId = null;
}

function resetTimer(){
  stopTimer();
  remaining = TOTAL_SECONDS;
  renderTimer();
  $('#btnStart').textContent = '开始训练';
}

function toggleTimer(){
  if(running) stopTimer();
  else startTimer();
}

// ============ 课程卡片（小基数减脂专属）============
const COURSES = [
  { color:'green',  title:'帕梅拉·全身塑形',     meta:'25分钟 · 力量+燃脂',   cls:'half' },
  { color:'peach',  title:'核心收紧·马甲线',     meta:'15分钟 · 紧致腰腹',     cls:'half' },
  { color:'blue',   title:'低冲击 HIIT · 全身燃脂', meta:'20分钟 · 保护膝盖不粗腿', cls:'full' },
];

// ============ 本周训练计划（小基数减脂专属）============
const WEEK_PLAN = [
  { day:'一', focus:'全身力量',   detail:'深蹲+硬拉+推举', min:'45min', rest:false },
  { day:'二', focus:'核心+有氧', detail:'马甲线+椭圆机',   min:'40min', rest:false },
  { day:'三', focus:'休息日',     detail:'拉伸放松/散步',   min:'轻量',  rest:true  },
  { day:'四', focus:'上肢塑形',   detail:'背+肩+手臂',     min:'40min', rest:false },
  { day:'五', focus:'臀腿塑形',   detail:'臀桥+箭步蹲',     min:'45min', rest:false },
  { day:'六', focus:'有氧燃脂',   detail:'低冲击 HIIT',     min:'30min', rest:false },
  { day:'日', focus:'休息日',     detail:'完全休息/瑜伽',   min:'恢复',  rest:true  },
];

function renderWeekPlan(){
  $('#weekPlan').innerHTML = `
    <h3>📅 本周训练计划 · 小基数减脂</h3>
    ${WEEK_PLAN.map(d=>`
      <div class="row${d.rest?' rest':''}">
        <div class="day">${d.day}</div>
        <div class="focus">${d.focus}<small>${d.detail}</small></div>
        <div class="min">${d.min}</div>
      </div>
    `).join('')}
  `;
}

// ============ 饮食打卡交互 ============
function setupDietCheck(){
  $$('.diet-row .check').forEach(c=>{
    c.addEventListener('click',()=>{
      c.classList.toggle('on');
    });
  });
}

// ============ 强度切换 ============
function setupIntensity(){
  $$('.intensity-bar .chip').forEach(chip=>{
    chip.addEventListener('click',()=>{
      $$('.intensity-bar .chip').forEach(x=>x.classList.remove('on'));
      chip.classList.add('on');
    });
  });
}

// ============ 英语学习 ============
// 三个场景的短句数据
const ENG_DATA = {
  daily: {
    title:'日常通用英语',
    sentences:[
      { en:"How's your day going?",        cn:'今天过得怎么样？',         pron:'/haʊz jər deɪ ˈɡoʊɪŋ/'  },
      { en:"I'll get back to you soon.",   cn:'我很快回复你。',          pron:'/aɪl ɡɛt bæk tə ju sun/'  },
      { en:"That sounds like a plan!",     cn:'这个主意不错！',          pron:'/ðæt saʊndz laɪk ə plæn/' },
      { en:"No worries, take your time.",  cn:'没事，慢慢来。',          pron:'/noʊ ˈwʌriz teɪk jər taɪm/' },
      { en:"Let me think about it.",       cn:'让我考虑一下。',          pron:'/lɛt mi θɪŋk əˈbaʊt ɪt/'   },
      { en:"What do you recommend?",       cn:'你有什么推荐？',          pron:'/wʌt du jʊ ˌrɛkəˈmɛnd/'    },
      { en:"Could you do me a favor?",     cn:'能帮我一个忙吗？',        pron:'/kʊd ju du mi ə ˈfeɪvər/'  },
      { en:"I really appreciate it!",      cn:'非常感谢！',              pron:'/aɪ ˈrɪli əˈpriːʃieɪt ɪt/'  },
    ],
    words:[
      { en:'recommend', cn:'推荐',   pron:'/ˌrɛkəˈmɛnd/' },
      { en:'appreciate',cn:'感激',   pron:'/əˈpriːʃieɪt/' },
      { en:'absolutely',cn:'绝对地', pron:'/ˌæbsəˈluːtli/' },
      { en:'definitely',cn:'肯定地', pron:'/ˈdɛfɪnətli/' },
    ]
  },
  travel: {
    title:'旅游出行英语',
    sentences:[
      { en:"Where is the nearest subway station?", cn:'最近的地铁站在哪里？',    pron:'/wɛr ɪz ðə ˈnɪrɪst ˈsʌbweɪ ˈsteɪʃən/' },
      { en:"Could I have the menu, please?",       cn:'请给我看一下菜单。',       pron:'/kʊd aɪ hæv ðə ˈmɛnju pliz/'          },
      { en:"How much does this cost?",             cn:'这个多少钱？',             pron:'/haʊ mʌtʃ dʌz ðɪs kɔst/'              },
      { en:"Can I get a taxi to the airport?",     cn:'能打一辆去机场的出租车吗？',pron:'/kæn aɪ ɡɛt ə ˈtæksi tə ði ˈɛrpɔrt/'  },
      { en:"Is there a pharmacy nearby?",          cn:'附近有药店吗？',           pron:'/ɪz ðɛr ə ˈfɑrməsi ˈnɪrbaɪ/'         },
      { en:"I'd like to check in, please.",        cn:'我想办理入住。',           pron:'/aɪd laɪk tə tʃɛk ɪn pliz/'           },
      { en:"What time is breakfast served?",       cn:'早餐几点供应？',           pron:'/wʌt taɪm ɪz ˈbrɛkfəst sɜrvd/'       },
      { en:"Could you take a photo for me?",       cn:'能帮我拍张照片吗？',       pron:'/kʊd ju teɪk ə ˈfoʊtoʊ fər mi/'      },
    ],
    words:[
      { en:'reservation', cn:'预订',     pron:'/ˌrɛzərˈveɪʃən/' },
      { en:'departure',   cn:'出发',     pron:'/dɪˈpɑrtʃər/'   },
      { en:'luggage',     cn:'行李',     pron:'/ˈlʌɡɪdʒ/'     },
      { en:'currency',    cn:'货币',     pron:'/ˈkʌrənsi/'     },
    ]
  },
  bags: {
    title:'箱包电商英语',
    sentences:[
      { en:"This bag is made of genuine leather.",        cn:'这款包是真皮材质。',         pron:'/ðɪs bæɡ ɪz meɪd əv ˈdʒɛnjʊɪn ˈlɛðər/' },
      { en:"What's the size of this handbag?",            cn:'这款手提包尺寸多大？',       pron:'/wʌts ðə saɪz əv ðɪs ˈhændbæɡ/'      },
      { en:"We offer free shipping worldwide.",           cn:'我们提供全球免费配送。',     pron:'/wi ˈɔfər fri ˈʃɪpɪŋ ˈwɜrldwaɪd/'     },
      { en:"The shoulder strap is adjustable.",           cn:'肩带可以调节。',             pron:'/ðə ˈʃoʊldər stræp ɪz əˈdʒʌstəbl/'   },
      { en:"This tote bag has a large capacity.",         cn:'这款托特包容积很大。',       pron:'/ðɪs toʊt bæɡ hæz ə lɑrdʒ kəˈpæsəti/' },
      { en:"It comes with a dust bag and gift box.",      cn:'附带防尘袋和礼盒包装。',    pron:'/ɪt kʌmz wɪð ə dʌst bæɡ ænd ɡɪft bɑks/' },
      { en:"How many colors are available?",              cn:'有多少种颜色可选？',         pron:'/haʊ ˈmɛni ˈkʌlərz ɑr əˈveɪləbl/'    },
      { en:"The hardware is gold-plated stainless steel.",cn:'五金件是镀金不锈钢的。',     pron:'/ðə ˈhɑrdwɛr ɪz ɡoʊld ˈpleɪtɪd ˈsteɪnlɪs stil/' },
      { en:"This style is our bestseller this season.", cn:'这款是我们本季的热卖款。',     pron:'/ðɪs staɪl ɪz aʊr ˈbɛstˌsɛlər ðɪs ˈsizən/' },
      { en:"We use YKK zippers for all our bags.",      cn:'我们所有包都使用 YKK 拉链。', pron:'/wi juz waɪ-keɪ-keɪ ˈzɪpərz fɔr ɔl aʊr bæɡz/' },
    ],
    words:[
      { en:'genuine leather',  cn:'真皮',     pron:'/ˈdʒɛnjʊɪn ˈlɛðər/' },
      { en:'adjustable',       cn:'可调节的', pron:'/əˈdʒʌstəbl/'    },
      { en:'capacity',         cn:'容量',     pron:'/kəˈpæsəti/'    },
      { en:'hardware',         cn:'五金件',   pron:'/ˈhɑrdwɛr/'     },
      { en:'crossbody',        cn:'斜挎包',   pron:'/ˈkrɔsbɑdi/'    },
      { en:'backpack',         cn:'双肩背包', pron:'/ˈbækpæk/'      },
      { en:'tote bag',         cn:'托特包',   pron:'/toʊt bæɡ/' },
      { en:'zipper',           cn:'拉链',     pron:'/ˈzɪpər/' },
      { en:'lining',           cn:'内衬',     pron:'/ˈlaɪnɪŋ/' },
      { en:'stitching',        cn:'缝线/针脚', pron:'/ˈstɪtʃɪŋ/' },
      { en:'logo plate',       cn:'LOGO牌',   pron:'/ˈloʊɡoʊ pleɪt/' },
      { en:'dust bag',         cn:'防尘袋',   pron:'/dʌst bæɡ/' },
      { en:'bestseller',       cn:'热卖款',   pron:'/ˈbɛstˌsɛlər/' },
      { en:'wholesale price',  cn:'批发价',   pron:'/ˈhoʊlˌseɪl praɪs/' },
      { en:'MOQ',              cn:'最小起订量', pron:'/ˌɛm oʊ ˈkju/' },
    ]
  }
};

let engScene = 'daily';
let engLearned = {};  // key: sentence index

// 加载学习记录
function loadEngLearned(){
  try{
    const key = 'eng_learned_'+engScene;
    engLearned = JSON.parse(localStorage.getItem(key)||'{}');
  }catch(e){ engLearned = {}; }
}
function saveEngLearned(){
  localStorage.setItem('eng_learned_'+engScene, JSON.stringify(engLearned));
}

// 闪卡逻辑
let fcIdx = 0;
function updateFlashcard(){
  const data = ENG_DATA[engScene];
  if(data.sentences.length===0) return;
  const s = data.sentences[fcIdx % data.sentences.length];
  $('#fcEn').textContent = s.en;
  $('#fcHint').textContent = '点击翻转看释义';
  $('#fcCn').textContent = s.cn;
  $('#fcPron').textContent = s.pron;
  document.getElementById('flashcard').classList.remove('flipped');
}

// ============ 发音引擎（Web Speech API）============
function speakText(text){
  if(!window.speechSynthesis){
    console.log('语音不支持');
    return;
  }
  window.speechSynthesis.cancel(); // 停止之前的朗读
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.85;  // 稍慢，适合学习
  u.pitch = 1;
  // 优先使用美式英语女声
  const voices = speechSynthesis.getVoices();
  const enVoice = voices.find(v=>v.lang==='en-US' && v.name.includes('Female'))
               || voices.find(v=>v.lang==='en-US')
               || voices.find(v=>v.lang.startsWith('en'));
  if(enVoice) u.voice = enVoice;
  window.speechSynthesis.speak(u);
  return u;
}

// 发音按钮动画
function animateSpeakBtn(btn){
  btn.classList.add('speaking');
  const check = ()=>{
    if(window.speechSynthesis.speaking){
      requestAnimationFrame(check);
    } else {
      btn.classList.remove('speaking');
    }
  };
  requestAnimationFrame(check);
}

function setupFlashcard(){
  const card = document.getElementById('flashcard');
  let touchStartX = 0, touchStartY = 0;
  let longPressTimer = null;

  // 长按发音（500ms）
  card.addEventListener('mousedown',(e)=>{
    longPressTimer = setTimeout(()=>{
      const data = ENG_DATA[engScene];
      const s = data.sentences[fcIdx % data.sentences.length];
      speakText(s.en);
    }, 500);
  });
  card.addEventListener('mouseup',()=>{ clearTimeout(longPressTimer); });
  card.addEventListener('mouseleave',()=>{ clearTimeout(longPressTimer); });

  card.addEventListener('touchstart',(e)=>{
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    longPressTimer = setTimeout(()=>{
      const data = ENG_DATA[engScene];
      const s = data.sentences[fcIdx % data.sentences.length];
      speakText(s.en);
      // 长按发音触发时不翻转
    }, 500);
  });
  card.addEventListener('touchmove',()=>{ clearTimeout(longPressTimer); });
  card.addEventListener('touchend',(e)=>{
    clearTimeout(longPressTimer);
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    const data = ENG_DATA[engScene];
    const total = data.sentences.length;

    if(Math.abs(dx) < 20 && Math.abs(dy) < 20){
      // 轻点 = 翻转
      card.classList.toggle('flipped');
      return;
    }
    if(Math.abs(dx) < 30 || Math.abs(dy) > Math.abs(dx)) return;

    if(dx > 0){
      // 右滑 = 标记已学
      const idx = fcIdx % total;
      engLearned[idx] = true;
      saveEngLearned();
      renderEngContent();
    }
    fcIdx = (fcIdx + 1) % total;
    updateFlashcard();
    card.classList.remove('flipped');
  });

  // 点击翻转（桌面端）
  card.addEventListener('click',(e)=>{
    // 如果是长按触发，跳过
    if(longPressTimer && !longPressTimer._cleared) return;
    if(Math.abs(touchStartX - e.clientX) > 30 || Math.abs(touchStartY - e.clientY) > 30) return;
    card.classList.toggle('flipped');
  });
}

// ============ 每日一句 ============
const DAILY_QUOTES = [
  { en:"The secret of getting ahead is getting started.", cn:'前进的秘诀就是开始行动。', from:'— Mark Twain' },
  { en:"It always seems impossible until it's done.",    cn:'事情在完成之前，总是看似不可能。', from:'— Nelson Mandela' },
  { en:"Small daily improvements are the key to staggering long-term results.", cn:'每天的小进步，是惊人长期成果的关键。', from:'' },
  { en:"Don't watch the clock; do what it does. Keep going.", cn:'不要盯着时钟看，像时钟一样不断前进。', from:'— Sam Levenson' },
  { en:"The only way to do great work is to love what you do.", cn:'做出伟大工作的唯一途径是热爱你所做的事。', from:'— Steve Jobs' },
  { en:"Success is not final, failure is not fatal: it is the courage to continue that counts.", cn:'成功不是终点，失败也非末日，重要的是继续前进的勇气。', from:'— Churchill' },
  { en:"You don't have to be great to start, but you have to start to be great.", cn:'你不需要很厉害才能开始，但你需要开始才会很厉害。', from:'— Zig Ziglar' },
  { en:"Opportunities don't happen, you create them.",   cn:'机会不会主动发生，而是你创造出来的。', from:'— Chris Grosser' },
  { en:"In the middle of difficulty lies opportunity.",   cn:'困难之中蕴藏着机遇。', from:'— Albert Einstein' },
  { en:"The best time to plant a tree was 20 years ago. The second best time is now.", cn:'种树最好的时间是二十年前，其次是现在。', from:'— Chinese Proverb' },
  { en:"Every expert was once a beginner.",               cn:'每个专家都曾是初学者。', from:'— Helen Hayes' },
  { en:"Believe you can and you're halfway there.",       cn:'相信你可以，你就已经成功了一半。', from:'— Theodore Roosevelt' },
  { en:"Action is the foundational key to all success.",  cn:'行动是一切成功的基础。', from:'— Pablo Picasso' },
  { en:"The future depends on what you do today.",        cn:'未来取决于你今天做了什么。', from:'— Mahatma Gandhi' },
];

function getDailyQuote(){
  // 根据日期固定选择一句
  const today = new Date();
  const idx = (today.getFullYear()*10000 + (today.getMonth()+1)*100 + today.getDate()) % DAILY_QUOTES.length;
  return DAILY_QUOTES[idx];
}

function renderDailyQuote(){
  const q = getDailyQuote();
  $('#dailyQuote').innerHTML = `
    <div class="dq-label">📜 每日一句 · ${new Date().getMonth()+1}月${new Date().getDate()}日</div>
    <div class="dq-en">${q.en}</div>
    <div class="dq-cn">${q.cn}</div>
    ${q.from?`<div class="dq-from">${q.from}</div>`:''}
    <button class="dq-speak" title="朗读">🔊</button>
  `;
  $('#dailyQuote .dq-speak').addEventListener('click',()=>{
    speakText(q.en);
  });
}

// ============ 短句列表朗读按钮 ============
function renderEngContent(){
  const data = ENG_DATA[engScene];
  const total = data.sentences.length;
  let learned = Object.keys(engLearned).filter(k=>engLearned[k]).length;

  // 进度条
  const pct = Math.round(learned/total*100);
  $('#engBar').style.width = pct+'%';
  $('#engStats').textContent = `${learned}/${total}`;

  // 短句列表
  $('#engContent').innerHTML = data.sentences.map((s,i)=>{
    const done = engLearned[i];
    return `<div class="sentence-card" style="${done?'opacity:.65':''}" data-idx="${i}">
      <div class="en">${done?'✅ ':''}${s.en}</div>
      <div class="cn">${s.cn}</div>
      <div class="tags">
        <span class="tag tip">${s.pron}</span>
        ${done?'<span class="tag" style="background:var(--green-light);color:var(--green-dark)">已掌握</span>':''}
      </div>
      <button class="speak-mini" data-idx="${i}" title="朗读">🔊</button>
    </div>`;
  }).join('');

  // 点击短句标记已学
  $$('#engContent .sentence-card').forEach(card=>{
    card.addEventListener('click',(e)=>{
      if(e.target.closest('.speak-mini')) return; // 不拦截朗读按钮
      const idx = parseInt(card.dataset.idx);
      engLearned[idx] = !engLearned[idx];
      saveEngLearned();
      renderEngContent();
      updateFlashcard();
    });
  });

  // 朗读按钮
  $$('.speak-mini').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const idx = parseInt(btn.dataset.idx);
      speakText(data.sentences[idx].en);
    });
  });

  // 单词卡（每个词也可以朗读）
  $('#engWords').innerHTML = `
    <h3>📝 核心词汇</h3>
    ${data.words.map((w,i)=>
      `<div class="phrase-item">
        <div class="num">${i+1}</div>
        <div class="body">
          <div class="eng">${w.en}</div>
          <div class="chn">${w.cn}</div>
          <div class="pron">${w.pron}</div>
        </div>
        <button class="speak-mini" data-word="${i}" title="朗读">🔊</button>
      </div>`
    ).join('')}
  `;

  // 词汇朗读
  $$('#engWords .speak-mini').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const wi = parseInt(btn.dataset.word);
      speakText(data.words[wi].en);
    });
  });

  updateFlashcard();
}

// 场景切换
function setupEngTabs(){
  $$('.eng-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      $$('.eng-tab').forEach(t=>t.classList.remove('on'));
      tab.classList.add('on');
      engScene = tab.dataset.scene;
      loadEngLearned();
      fcIdx = 0;
      renderEngContent();
    });
  });
}

function renderCourses(){
  $('#courseGrid').innerHTML = COURSES.map((c,i)=>`
    <div class="course-card ${c.cls}">
      <div class="course-thumb ${c.color}">
        <div class="play-btn"></div>
      </div>
      <div class="course-info">
        <div class="title">${c.title}</div>
        <div class="meta">
          <span class="dot">●</span>
          <span>${c.meta}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ============ 顶部标签导航 ============
function setupNav(){
  $$('.tn-item').forEach(item=>{
    item.addEventListener('click',()=>{
      const page = item.dataset.page;
      // 切换标签激活态
      $$('.tn-item').forEach(x=>x.classList.remove('active'));
      item.classList.add('active');
      // 切换子页面
      $$('.subpage').forEach(sp=>sp.classList.remove('show'));
      const target = $(`.subpage[data-page="${page}"]`);
      if(target) target.classList.add('show');
    });
  });
}

// ============ 子页面通用打卡按钮 ============
function setupDoneBtns(){
  $$('.done-btn').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      btn.classList.toggle('on');
      if(btn.classList.contains('on')){
        btn.textContent = '✅';
        btn.style.background = 'var(--green)';
        btn.style.color = '#fff';
      } else {
        btn.textContent = btn.dataset.origText || '完成';
        btn.style.background = '';
        btn.style.color = '';
      }
      // 保存初始文字
      if(!btn.dataset.origText){
        btn.dataset.origText = btn.textContent === '✅' ? '完成' : btn.textContent;
      }
    });
  });
}

// ============ 每日计划数据持久化 ============
function setupPlanStorage(){
  const key = 'plan_tasks';
  let tasks = {};
  try{ tasks = JSON.parse(localStorage.getItem(key)||'{}'); }catch(e){}
  
  $$('[data-page="plan"] .done-btn').forEach((btn,i)=>{
    if(tasks[i]){ btn.click(); btn.classList.add('on'); btn.textContent='✅'; btn.style.background='var(--green)'; btn.style.color='#fff'; }
    btn.addEventListener('click',()=>{
      tasks[i] = btn.classList.contains('on');
      localStorage.setItem(key, JSON.stringify(tasks));
    });
  });
}

// ============ 亲子启蒙打卡持久化 ============
function setupKidsStorage(){
  const key = 'kids_tasks';
  let tasks = {};
  try{ tasks = JSON.parse(localStorage.getItem(key)||'{}'); }catch(e){}
  
  $$('[data-page="kids"] .done-btn').forEach((btn,i)=>{
    if(tasks[i]){ btn.click(); btn.classList.add('on'); btn.textContent='✅'; btn.style.background='var(--green)'; btn.style.color='#fff'; }
    btn.addEventListener('click',()=>{
      tasks[i] = btn.classList.contains('on');
      localStorage.setItem(key, JSON.stringify(tasks));
    });
  });
}

// ============ 电商学习打卡持久化 ============
function setupEcomStorage(){
  const key = 'ecom_tasks';
  let tasks = {};
  try{ tasks = JSON.parse(localStorage.getItem(key)||'{}'); }catch(e){}
  
  $$('[data-page="ecom"] .done-btn').forEach((btn,i)=>{
    if(tasks[i]){ btn.click(); btn.classList.add('on'); btn.textContent='✅'; btn.style.background='var(--green)'; btn.style.color='#fff'; }
    btn.addEventListener('click',()=>{
      tasks[i] = btn.classList.contains('on');
      localStorage.setItem(key, JSON.stringify(tasks));
    });
  });
}

// ============ 经典书单 + 每日打卡 ============
const BOOKS = [
  { icon:'📕', title:'《原子习惯》', author:'James Clear', pages:'288页', color:'#FFE0E0' },
  { icon:'📗', title:'《被讨厌的勇气》', author:'岸见一郎', pages:'208页', color:'#D4F5F0' },
  { icon:'📙', title:'《思考，快与慢》', author:'Daniel Kahneman', pages:'512页', color:'#FFF3E0' },
  { icon:'📘', title:'《非暴力沟通》', author:'Marshall Rosenberg', pages:'244页', color:'#E8E4FF' },
  { icon:'📓', title:'《刻意练习》', author:'Anders Ericsson', pages:'304页', color:'#F5E6F0' },
  { icon:'📔', title:'《心流》', author:'Mihaly Csikszentmihalyi', pages:'320页', color:'#E8F5DC' },
];

function renderBooks(){
  const key = 'book_progress';
  let progress = {};
  try{ progress = JSON.parse(localStorage.getItem(key)||'{}'); }catch(e){}

  $('#bookList').innerHTML = '<h3>📚 今日阅读（点击✓打卡）</h3>' +
    BOOKS.map((b,i)=>{
      const pct = progress[i] || 0;
      const done = pct >= 100;
      return '<div class="book-card">'+
        '<div class="cover" style="background:'+b.color+'">'+b.icon+'</div>'+
        '<div class="info">'+
          '<div class="title">'+b.title+'</div>'+
          '<div class="author">'+b.author+'</div>'+
          '<div class="pages">'+b.pages+'</div>'+
          '<div class="progress-bar"><div class="fill" style="width:'+pct+'%"></div></div>'+
          '<div style="font-size:10px;color:var(--gray-600);margin-top:2px">'+(done?'✅ 已读完':'今日进度 '+pct+'%')+'</div>'+
        '</div>'+
        '<div class="check-btn'+(done?' done':'')+'" data-bidx="'+i+'">'+(done?'✓':'')+'</div>'+
      '</div>';
    }).join('');

  $$('#bookList .check-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const i = parseInt(btn.dataset.bidx);
      if(progress[i] >= 100){ progress[i] = 0; }
      else { progress[i] = Math.min(100, (progress[i]||0) + 25); }
      localStorage.setItem(key, JSON.stringify(progress));
      renderBooks();
    });
  });

  const savedNote = localStorage.getItem('reading_note')||'';
  const noteEl = document.getElementById('readingNote');
  if(noteEl && !noteEl.dataset.loaded){ noteEl.value = savedNote; noteEl.dataset.loaded = '1'; }
}

// ============ 电商视频 ============
const ECOM_VIDEOS = [
  { icon:'📊', title:'选品分析 · 蓝海词挖掘', dur:'15分钟', color:'#FFF3E0' },
  { icon:'📸', title:'主图设计 · 视觉营销', dur:'12分钟', color:'#FFE0E0' },
  { icon:'📝', title:'详情页文案 · FAB法则', dur:'10分钟', color:'#D4F5F0' },
  { icon:'📈', title:'直通车投放 · ROI优化', dur:'20分钟', color:'#E8E4FF' },
  { icon:'🛍️', title:'店铺装修 · 提高转化率', dur:'18分钟', color:'#F5E6F0' },
  { icon:'💬', title:'客服话术 · 询单转化', dur:'8分钟', color:'#E8F5DC' },
];

function renderEcom(){
  const key = 'ecom_progress';
  let done = {};
  try{ done = JSON.parse(localStorage.getItem(key)||'{}'); }catch(e){}

  $('#ecomList').innerHTML = '<h3>🎬 学习视频（点🔗跳转+打卡）</h3>' +
    ECOM_VIDEOS.map((v,i)=>{
      const isDone = done[i];
      const searchQuery = encodeURIComponent('电商 '+v.title.split('·')[0]);
      return '<div class="video-card">'+
        '<div class="thumb" style="background:'+v.color+'">'+v.icon+'</div>'+
        '<div class="info">'+
          '<div class="vtitle">'+(isDone?'✅ ':'')+v.title+'</div>'+
          '<div class="dur">⏱ '+v.dur+'</div>'+
        '</div>'+
        '<a class="play-icon" href="https://www.bilibili.com/search?keyword='+searchQuery+'" target="_blank" rel="noopener" data-vidx="'+i+'">🔗</a>'+
      '</div>';
    }).join('');

  $$('#ecomList .play-icon').forEach(link=>{
    link.addEventListener('click',()=>{
      const i = parseInt(link.dataset.vidx);
      done[i] = true;
      localStorage.setItem(key, JSON.stringify(done));
      setTimeout(()=>renderEcom(), 500);
    });
  });
}

// ============ 穿搭交互 ============
function setupOutfit(){
  const key = 'outfit_today';
  const dateKey = new Date().toISOString().slice(0,10);
  let data = {};
  try{ data = JSON.parse(localStorage.getItem(key)||'{}'); }catch(e){}

  if(data[dateKey]){
    if(data[dateKey].top) document.getElementById('outfitTop').textContent = data[dateKey].top;
    if(data[dateKey].bottom) document.getElementById('outfitBottom').textContent = data[dateKey].bottom;
    if(data[dateKey].shoes) document.getElementById('outfitShoes').textContent = data[dateKey].shoes;
    if(data[dateKey].accessory) document.getElementById('outfitAcc').textContent = data[dateKey].accessory;
  }

  const presets = {
    top: ['白色T恤','黑色卫衣','条纹衬衫','针织开衫','西装外套','碎花上衣'],
    bottom: ['直筒牛仔裤','黑色阔腿裤','A字裙','瑜伽裤','西裤','百褶裙'],
    shoes: ['白色运动鞋','黑色乐福鞋','帆布鞋','马丁靴','尖头单鞋','老爹鞋'],
    accessory: ['帆布包','金属项链','珍珠耳环','丝巾','手表','墨镜'],
  };

  $$('.outfit-slot').forEach(slot=>{
    slot.addEventListener('click',()=>{
      const type = slot.dataset.type;
      const list = presets[type] || [];
      const choice = prompt(type+'：\n'+list.map((x,i)=>(i+1)+'. '+x).join('\n'));
      if(choice){
        const val = list[parseInt(choice)-1] || choice;
        const cap = type.charAt(0).toUpperCase()+type.slice(1);
        const el = document.getElementById('outfit'+cap);
        if(el) el.textContent = val;
        if(!data[dateKey]) data[dateKey] = {};
        data[dateKey][type] = val;
        localStorage.setItem(key, JSON.stringify(data));
      }
    });
  });
}
const $ = (s)=>document.querySelector(s);
const $$ = (s)=>document.querySelectorAll(s);

// ============ 初始化 ============
function init(){
  renderDateStrip();
  renderCourses();
  renderTimer();
  renderWeekPlan();
  setupNav();
  setupDoneBtns();
  setupPlanStorage();
  setupKidsStorage();
  setupEcomStorage();
  setupDietCheck();
  setupIntensity();
  setupEngTabs();
  setupFlashcard();
  loadEngLearned();
  renderEngContent();
  renderDailyQuote();
  renderBooks();
  renderEcom();
  setupOutfit();
  $('#btnStart').addEventListener('click', toggleTimer);
  $('#btnReset').addEventListener('click', resetTimer);

  // 读书笔记保存
  const saveNoteBtn = document.getElementById('saveNoteBtn');
  if(saveNoteBtn){
    saveNoteBtn.addEventListener('click',()=>{
      const note = document.getElementById('readingNote').value;
      localStorage.setItem('reading_note', note);
      alert('笔记已保存 ✅');
    });
  }

  // 心情按钮交互 + 持久化
  $$('.mood-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      $$('.mood-btn').forEach(b=>b.style.transform='');
      btn.style.transform='scale(1.4)';
      localStorage.setItem('mood_today', btn.dataset.mood);
    });
  });
  const savedMood = localStorage.getItem('mood_today');
  if(savedMood){
    const btn = document.querySelector(`.mood-btn[data-mood="${savedMood}"]`);
    if(btn) btn.style.transform = 'scale(1.4)';
  }
}

document.addEventListener('DOMContentLoaded', init);