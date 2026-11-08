import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';

const scenes = [
 {start:0,len:840,place:'ГОСТИНАЯ · ВЕЧЕР',title:'ПРОБЛЕМА',lines:[['СЫН','Блин... Какая красивая.'],['СЫН','Привет... Нет. Как дела?.. Нет, слишком скучно.'],['СЫН','Пап, а как подкатить к любой девушке?'],['ПАПА','Сынок... садись. Сегодня ты узнаешь секрет настоящего мужчины.']]},
 {start:840,len:900,place:'УРОК №1 · УВЕРЕННОСТЬ',title:'УВЕРЕННОСТЬ',lines:[['ПАПА','Первое правило: уверенность. Девушки чувствуют, когда ты неуверенный.'],['СЫН','И как стать уверенным?'],['ПАПА','Представь, что ты уже миллионер.'],['СЫН','Привет, красавица. У меня есть бизнес... доставка пельменей.'],['ПАПА','Сынок, уверенность — это хорошо. Но не надо врать даже самому себе.']]},
 {start:1740,len:900,place:'УРОК №2 · ЛЕГЕНДАРНЫЙ ПОДКАТ',title:'ЛЕГЕНДАРНЫЙ ПОДКАТ',lines:[['ПАПА','Сейчас покажу, как это делается. Смотри и учись.'],['ПАПА','Девушка, вы случайно не Wi-Fi?'],['СЫН','Почему?'],['ПАПА','Потому что я чувствую между нами соединение!'],['СЫН','Пап... это же 2012 год.'],['ПАПА','Классика не стареет!']]},
 {start:2640,len:840,place:'УРОК №3 · КОМПЛИМЕНТЫ',title:'КОМПЛИМЕНТЫ И ЮМОР',lines:[['ПАПА','Комплименты должны быть искренними. Скажи: у тебя очень красивая улыбка.'],['СЫН','У тебя очень красивая улыбка... зубы, наверное, дорогие?'],['ПАПА','Всё. Урок юмора окончен.']]},
 {start:3480,len:720,place:'УРОК №4 · ПРАКТИКА',title:'БУДЬ СОБОЙ',lines:[['ПАПА','Подойди, поздоровайся, представься. Или начни с общего интереса.'],['СЫН','А если она не захочет общаться?'],['ПАПА','Спокойно принимаешь это. Уважение — самое главное.']]},
 {start:4200,len:720,place:'УЛИЦА · ВЕЧЕР',title:'ПЕРВАЯ ПОПЫТКА',lines:[['СЫН','Привет! Я давно хотел познакомиться. Меня зовут Артём.'],['ДЕВУШКА','Привет! Очень приятно.'],['СЫН','ПАПА, ПОЛУЧИЛОСЬ!!!']]},
 {start:4920,len:840,place:'ГОСТИНАЯ · ФИНАЛ',title:'ПРЕДАТЕЛЬ!',lines:[['ПАПА','Вот он! Мой сын! Настоящий мужчина!'],['СЫН','Пап, она спросила, откуда я научился знакомиться.'],['ПАПА','И что ты ответил?'],['СЫН','Сказал, что сам придумал.'],['ПАПА','ПРЕДАТЕЛЬ!']]}
];

const Bubble:React.FC<{speaker:string;text:string;index:number}> = ({speaker,text,index}) => {
 const f=useCurrentFrame(); const {fps}=useVideoConfig();
 const enter=spring({frame:f, fps, config:{damping:14, stiffness:110}});
 return <div style={{position:'absolute',bottom:100,left:120,right:120,display:'flex',justifyContent:speaker==='СЫН'?'flex-start':speaker==='ДЕВУШКА'?'center':'flex-end',transform:`translateY(${interpolate(enter,[0,1],[35,0])}px)`,opacity:enter}}>
  <div style={{maxWidth:1250,background:speaker==='ПАПА'?'#fff0c9':speaker==='ДЕВУШКА'?'#f7e7ff':'#e3f4ff',border:'5px solid #24233b',borderRadius:34,padding:'28px 42px',boxShadow:'0 12px 0 #24233b',fontFamily:'Arial,sans-serif'}}>
   <div style={{fontSize:24,fontWeight:900,color:'#7952a3',letterSpacing:3,marginBottom:10}}>{speaker}</div>
   <div style={{fontSize:42,fontWeight:800,lineHeight:1.18,color:'#24233b'}}>{text}</div>
  </div>
 </div>
};

const Character:React.FC<{kind:'dad'|'son'|'girl';x:number;active:boolean}> = ({kind,x,active}) => {
 const f=useCurrentFrame(); const bob=Math.sin(f/8)*4; const isDad=kind==='dad'; const shirt=isDad?'#3e6c85':kind==='son'?'#e6a34a':'#9b6ac8'; const hair=isDad?'#39313b':kind==='son'?'#513b34':'#4a2d48';
 const blink=(f%113)<5;
 return <div style={{position:'absolute',left:x, bottom:245, width:360,height:570,transform:`translateY(${bob}px) scale(${active?1.03:1})`,transformOrigin:'bottom center'}}>
  <svg viewBox="0 0 360 570" width="100%" height="100%">
   <ellipse cx="180" cy="550" rx="125" ry="18" fill="#18223c" opacity=".2"/>
   <path d="M65 555 Q55 420 92 345 Q180 300 268 345 Q305 420 295 555Z" fill={shirt} stroke="#29283d" strokeWidth="9"/>
   <path d="M130 335 Q180 375 230 335" fill="none" stroke="#29283d" strokeWidth="8"/>
   <rect x="145" y="265" width="70" height="95" rx="28" fill="#e9ad83" stroke="#29283d" strokeWidth="8"/>
   <ellipse cx="180" cy="190" rx="112" ry="132" fill="#f2bd94" stroke="#29283d" strokeWidth="9"/>
   <path d={isDad?'M70 170 Q55 30 180 45 Q300 25 290 170 Q250 110 205 115 Q135 80 70 170Z':kind==='son'?'M70 160 Q60 40 170 48 Q260 25 290 145 Q240 100 200 112 Q130 95 70 160Z':'M62 190 Q40 35 175 35 Q300 25 300 205 L270 120 Q200 65 105 120Z'} fill={hair} stroke="#29283d" strokeWidth="9"/>
   {kind==='girl'&&<path d="M72 150 Q20 250 60 390 L115 355 L105 205 M280 145 Q335 250 300 390 L245 355 L255 205" fill={hair} stroke="#29283d" strokeWidth="8"/>}
   <ellipse cx="138" cy="195" rx="15" ry={blink?3:21} fill="#29283d"/><ellipse cx="222" cy="195" rx="15" ry={blink?3:21} fill="#29283d"/>
   <path d="M157 245 Q180 263 203 245" fill="none" stroke="#9c4e50" strokeWidth="8" strokeLinecap="round"/>
   {isDad&&<path d="M135 225 Q180 270 225 225 Q218 315 180 310 Q142 305 135 225Z" fill="#55404a"/>}
   {kind==='son'&&<path d="M105 165 Q135 140 155 160 M205 160 Q230 140 252 165" fill="none" stroke="#29283d" strokeWidth="8"/>}
   {kind==='girl'&&<path d="M145 245 Q180 270 215 245" fill="none" stroke="#a9436e" strokeWidth="8" strokeLinecap="round"/>}
  </svg>
 </div>
};

const Room:React.FC<{outside?:boolean}> = ({outside}) => <>
 <AbsoluteFill style={{background:outside?'linear-gradient(#f49b83 0%,#f7c58b 55%,#546b82 56%,#293d59 100%)':'linear-gradient(#f3cfa4 0%,#f3cfa4 68%,#b8795c 68%,#9a5f4c 100%)'}}/>
 {!outside&&<><div style={{position:'absolute',top:90,left:110,width:450,height:300,background:'#a8d5e6',border:'18px solid #76513e',borderRadius:10}}/><div style={{position:'absolute',top:90,left:320,width:12,height:300,background:'#76513e'}}/><div style={{position:'absolute',top:230,left:110,width:450,height:12,background:'#76513e'}}/><div style={{position:'absolute',right:130,top:90,fontSize:130}}>📺</div><div style={{position:'absolute',bottom:200,left:480,width:950,height:170,background:'#bd665d',border:'10px solid #29283d',borderRadius:'70px 70px 25px 25px'}}/></>}
 {outside&&<><div style={{position:'absolute',top:80,right:170,fontSize:110}}>🌙</div><div style={{position:'absolute',bottom:180,left:0,right:0,height:220,background:'#34465b'}}/><div style={{position:'absolute',bottom:390,left:170,fontSize:150}}>🏢</div><div style={{position:'absolute',bottom:390,right:190,fontSize:160}}>🏢</div></>}
</>;

const Scene:React.FC<{scene:typeof scenes[number];number:number}> = ({scene,number}) => {
 const f=useCurrentFrame(); const local=f-scene.start; const {fps}=useVideoConfig();
 const lineDuration=scene.len/scene.lines.length; const lineIndex=Math.min(scene.lines.length-1,Math.floor(local/lineDuration)); const [speaker,dialogue]=scene.lines[lineIndex];
 const pop=spring({frame:local,fps,config:{damping:18}});
 const outside=number===5;
 return <AbsoluteFill>
  <Room outside={outside}/>
  <div style={{position:'absolute',top:35,left:55,fontFamily:'Arial',fontWeight:900,fontSize:25,color:'#fff',textShadow:'0 3px 5px #222',letterSpacing:3}}>{scene.place}</div>
  {number===5?<><Character kind="son" x={430} active={speaker==='СЫН'}/><Character kind="girl" x={1120} active={speaker==='ДЕВУШКА'}/></>:<><Character kind="dad" x={number===0?1050:1030} active={speaker==='ПАПА'}/><Character kind="son" x={number===0?400:430} active={speaker==='СЫН'}/></>}
  {number===0&&local<210&&<div style={{position:'absolute',top:175,right:250,fontSize:100,transform:`rotate(${Math.sin(f/6)*7}deg)`}}>📱💗</div>}
  {number===2&&local>360&&local<640&&<div style={{position:'absolute',top:190,left:500,right:500,textAlign:'center',fontSize:80,fontWeight:1000,color:'#fff',textShadow:'5px 5px #e34d91',transform:`scale(${1+Math.sin(f/3)*.04})`}}>WI-FI LOVE?!</div>}
  {number===6&&local>650&&<div style={{position:'absolute',top:220,left:0,right:0,textAlign:'center',fontSize:105,fontWeight:1000,color:'#ffdf53',textShadow:'7px 7px #29283d',transform:`rotate(${Math.sin(f)*3}deg)`}}>ПРЕДАТЕЛЬ!</div>}
  <Bubble key={lineIndex} speaker={speaker} text={dialogue} index={lineIndex}/>
  <div style={{position:'absolute',top:35,right:55,fontSize:22,fontWeight:900,color:'#fff',textShadow:'0 2px 5px #222'}}> {number+1} / 7 </div>
  {local<20&&<AbsoluteFill style={{background:'#fff',opacity:interpolate(local,[0,19],[1,0])}}/>}
 </AbsoluteFill>
};

export const PapaMultfilm:React.FC = () => {
 const f=useCurrentFrame(); const sceneIndex=scenes.findIndex((s,i)=>f>=s.start&&(i===scenes.length-1||f<scenes[i+1].start)); const scene=scenes[Math.max(0,sceneIndex)];
 return <AbsoluteFill style={{background:'#20243b'}}><Scene scene={scene} number={Math.max(0,sceneIndex)}/></AbsoluteFill>;
};
