// What a house can contain on any run: loose items, dirt, hazards and where each
// may appear. Pure data so rules and selection can be tested without a browser.
// `legacy` marks the original first-house items, kept exactly for saved progress.

const labelPeel=(kind,id)=>({button:'라벨 분리',touch:'라벨<br>분리',step:'비닐 라벨 분리',need:'비닐 라벨을 먼저 분리해 주세요.',hide:['label'],
 parts:[{id:`${id}-label`,name:`${kind}에서 떼어 낸 비닐 라벨`,bin:'vinyl',shape:'sheet'}],
 toast:'비닐 라벨을 분리했어요. 바닥에 둔 라벨도 비닐 수거함으로 가져가 주세요.'});

export const ITEM_POOL=[
 // Bedroom
 {id:'book1',name:'책',room:'bedroom',storage:'books',legacy:true,pos:[-2.61,.028,.82],angle:.35},
 {id:'book2',name:'공책',room:'bedroom',storage:'books',legacy:true,pos:[-.41,.028,-1.13],angle:-.5},
 {id:'pencil',name:'연필',room:'bedroom',storage:'books'},
 {id:'shirt',name:'입었던 옷',room:'bedroom',storage:'laundry',legacy:true,pos:[-2.8,.028,-.85],angle:.3},
 {id:'socks',name:'벗어 둔 양말',room:'bedroom',storage:'laundry'},
 {id:'pet1',name:'음료가 남은 투명 페트병',cleanName:'깨끗한 투명 페트병',room:'bedroom',bin:'pet',prep:true,peel:labelPeel('페트병','pet1'),legacy:true,pos:[-1.98,.025,-.68],angle:.2,rinse:{height:.35}},
 {id:'pet2',name:'글씨가 인쇄된 페트병',cleanName:'헹군 인쇄 페트병',room:'bedroom',bin:'plastic',prep:true,tricky:true,rinse:{height:.35},
  tip:'몸체에 글씨가 직접 인쇄된 페트병은 무색 투명 페트병이 아니에요. 비우고 헹군 뒤 플라스틱으로 모아요.',
  reason:'몸체에 인쇄된 페트병은 무색 투명하지 않아 투명 페트병과 따로, 플라스틱으로 모아요.'},
 {id:'tissue',name:'더러운 휴지',room:'bedroom',bin:'general',legacy:true,pos:[-2.54,.026,-2.17]},
 {id:'battery',name:'다 쓴 건전지',room:'bedroom',bin:'battery',legacy:true,pos:[-.15,.852,-3.94],angle:1.2},
 {id:'snack',name:'빈 과자 봉지',room:'bedroom',bin:'vinyl',tip:'과자 봉지는 비닐류예요. 부스러기를 털어 내고 비닐 수거함에 넣어요.'},
 {id:'receipt',name:'영수증',room:'bedroom',bin:'general',tricky:true,
  tip:'영수증은 열에 반응하는 감열지라 종이로 재활용되지 않아요. 일반 쓰레기로 버려요.',
  reason:'영수증은 감열지라서 종이류와 섞으면 재활용을 방해해요. 일반 쓰레기로 버려요.'},
 {id:'parcel',name:'택배 상자',room:'bedroom',bin:'paper',tricky:true,
  tip:'택배 상자는 테이프와 송장을 떼고 펼쳐서 종이로 모아요.',
  reason:'테이프와 송장을 뗀 상자는 펼쳐서 종이로 모아요.',
  peel:{button:'테이프·송장 떼기',touch:'테이프<br>떼기',step:'테이프·송장 떼기',need:'테이프와 송장을 먼저 떼어 주세요.',hide:['label'],
   parts:[{id:'parcel-tape',name:'상자에서 떼어 낸 테이프와 송장',bin:'general',shape:'sheet'}],
   toast:'테이프와 송장을 뗐어요. 떼어 낸 것은 일반 쓰레기, 상자는 펼쳐서 종이로 모아요.'}},
 // Kitchen
 {id:'carton1',name:'우유가 남은 종이팩',cleanName:'깨끗한 종이팩',room:'kitchen',bin:'carton',prep:true,prepStep:'비우고 헹구기 · 펼쳐 말리기',legacy:true,pos:[3.11,.905,-4.35],angle:.13,
  rinseDone:'비우고 헹군 종이팩을 펼쳐 말렸어요. 종이팩 수거함으로 가져가요.'},
 {id:'can1',name:'알루미늄 캔',room:'kitchen',bin:'can',prep:true,legacy:true,pos:[2.44,.025,.75],angle:.7},
 {id:'peel',name:'바나나 껍질',room:'kitchen',bin:'food',legacy:true,pos:[3.17,.025,.7]},
 {id:'shell',name:'달걀 껍데기',room:'kitchen',bin:'general',legacy:true,pos:[3.22,.905,-4.07]},
 {id:'plate',name:'깨끗한 접시',room:'kitchen',storage:'dishes',legacy:true,pos:[4.35,.93,-.4]},
 {id:'cup',name:'씻어 둔 컵',room:'kitchen',storage:'dishes'},
 {id:'papercup',name:'커피가 남은 종이컵',cleanName:'헹군 종이컵',room:'kitchen',bin:'carton',prep:true,tricky:true,rinse:{height:.11,color:'#6b4a2b'},
  tip:'종이컵은 안쪽이 비닐로 코팅되어 일반 종이와 섞지 않아요. 비우고 헹군 뒤 종이팩과 함께 모아요.',
  reason:'종이컵은 안쪽이 코팅되어 있어 일반 종이가 아니라 종이팩과 함께 모아요.',
  rinseDone:'종이컵을 비우고 헹궜어요. 종이팩 수거함으로 가져가요.'},
 {id:'jar',name:'소스가 남은 유리병',cleanName:'헹군 유리병',room:'kitchen',bin:'glass',prep:true,tricky:true,rinse:{height:.2,color:'#9b3b22'},
  tip:'유리병은 내용물을 비우고 헹군 뒤, 금속 뚜껑을 따로 분리해요.',
  peel:{button:'뚜껑 분리',touch:'뚜껑<br>분리',step:'금속 뚜껑 분리',need:'금속 뚜껑을 먼저 분리해 주세요.',hide:['lid'],
   parts:[{id:'jar-lid',name:'유리병에서 뺀 금속 뚜껑',bin:'can',shape:'cap'}],
   toast:'금속 뚜껑을 분리했어요. 뚜껑은 캔 · 고철로, 유리병은 유리병 수거함으로 가져가요.'}},
 {id:'bones',name:'치킨 뼈',room:'kitchen',bin:'general',tricky:true,
  tip:'뼈는 동물이 먹을 수 없고 딱딱해서 음식물 쓰레기가 아니에요. 일반 쓰레기로 버려요.',
  reason:'닭뼈처럼 딱딱한 뼈는 음식물이 아니라 일반 쓰레기예요.'},
 // Bathroom
 {id:'plastic',name:'빈 샴푸통',room:'bathroom',bin:'plastic',prep:true,legacy:true,pos:[3.66,.025,4.5],
  peel:{button:'라벨·펌프 분리',touch:'분리<br>하기',step:'펌프와 라벨 분리',need:'펌프와 라벨을 먼저 분리해 주세요.',hide:['label','pump'],
   parts:[{id:'plastic-label',name:'샴푸통에서 떼어 낸 비닐 라벨',bin:'vinyl',shape:'sheet'},{id:'plastic-pump',name:'금속 스프링이 든 샴푸 펌프',bin:'general',shape:'pump'}],
   toast:'펌프와 라벨을 분리했어요. 바닥에 둔 라벨은 비닐류, 복합재질 펌프는 일반 쓰레기로 처리해요.'}},
 {id:'toothbrush',name:'낡은 칫솔',room:'bathroom',bin:'general',legacy:true,pos:[3.49,.932,2.81],angle:.5},
 {id:'towel',name:'깨끗한 수건',room:'bathroom',storage:'towels',legacy:true,pos:[3.68,.933,2.5],angle:.05},
 {id:'spraycan',name:'다 쓴 탈취제 스프레이',room:'bathroom',bin:'can',tricky:true,
  tip:'스프레이 캔에 가스가 남아 있으면 터질 수 있어요. 어른과 함께 남은 가스를 다 뺀 뒤 캔 · 고철로 모아요.',
  reason:'가스를 다 뺀 스프레이 캔은 캔 · 고철로 모아요.',
  peel:{button:'어른과 가스 빼기',touch:'가스<br>빼기',step:'어른과 남은 가스 빼기',need:'어른과 함께 남은 가스를 먼저 빼 주세요.',hide:[],parts:[],
   toast:'어른과 함께 불이 없고 바람이 잘 통하는 바깥에서 남은 가스를 끝까지 뺐어요. 이제 캔 · 고철로 모아요.'}},
 {id:'tpcore',name:'다 쓴 휴지심',room:'bathroom',bin:'paper',tip:'휴지심은 종이예요. 젖지 않았다면 납작하게 펴서 종이로 모아요.'}
];

// Places a loose item can be left: floor pads plus tabletop spots.
export const ITEM_SPOTS={
 bedroom:[[-2.61,.028,.82],[-.41,.028,-1.13],[-2.8,.028,-.85],[-1.98,.025,-.68],[-2.54,.026,-2.17],[-1.4,.026,1.2],[-.15,.852,-3.94],[-1.35,.852,-4.05]],
 kitchen:[[2.44,.025,.75],[3.17,.025,.7],[2.5,.025,-1.3],[3.0,.025,1.25],[3.11,.905,-4.35],[3.42,.905,-4.05],[5.05,.905,-4.35],[4.35,.93,-.4],[4.1,.93,-.2]],
 bathroom:[[3.66,.025,4.5],[4.0,.025,3.5],[3.8,.025,5.4],[2.05,.025,4.75],[3.49,.932,2.81],[3.68,.933,2.5]]
};

export const DIRT_KINDS={
 dust:{label:'먼지',hint:'마른 먼지 → 높은 곳은 먼지떨이, 바닥은 청소기로 먼저',
  method:'물을 뿌리지 말고 높은 곳부터 먼지떨이로 털고, 바닥의 먼지는 청소기로 먼저 치워요.'},
 mud:{label:'진흙 발자국',hint:'진흙 발자국 → 분무기로 불린 뒤 밀대로',
  method:'굳은 흙은 분무기로 충분히 불린 뒤 밀대로 닦아요. 마른 먼지를 먼저 치워야 번지지 않아요.'},
 grease:{label:'기름때',hint:'기름때 → 물로 충분히 불린 뒤 문질러 닦기',
  method:'기름때는 물로 충분히 불려 부드럽게 만든 뒤, 벽·조리대는 솔로, 바닥은 밀대로 문질러 닦아요.'},
 soap:{label:'물때',hint:'물때 → 물로 불린 뒤 문지르고 물기 없애기',
  method:'물때는 물로 불린 뒤 솔이나 밀대로 문지르고, 남은 물기를 닦아야 다시 잘 생기지 않아요.'},
 mould:{label:'곰팡이',hint:'곰팡이 → 마른 채로 털지 말고, 물로 적신 뒤 솔로',
  method:'환기한 뒤 마른 채로 털거나 빨아들이지 말고, 물로 적셔 솔로 닦은 다음 물기를 없애고 말려요. 곰팡이 제거제는 어른이 쓰고 다른 세제와 절대 섞지 않아요.',
  done:'곰팡이를 닦았어요. 물기를 닦고 환기해 말려야 다시 생기지 않아요. 곰팡이 제거제는 어른이 쓰고, 다른 세제와 절대 섞지 않아요.'}
};
export function dirtTool(kind,y){return kind==='dust'?(y>.5?'duster':'vacuum'):kind==='mould'?'brush':y<.1?'mop':'brush';}
export function dirtName(slot,kind){return `${slot.place} ${kind==='dust'&&slot.room==='bathroom'?'머리카락과 먼지':DIRT_KINDS[kind].label}`;}

export const DIRT_SLOTS=[
 {id:'bed-floor-a',room:'bedroom',place:'러그 옆 바닥',x:-2.0,y:.029,z:.43,w:1.6,h:1.6,kinds:['dust','mud']},
 {id:'bed-floor-b',room:'bedroom',place:'침대 옆 바닥',x:-3.03,y:.029,z:-2.0,w:.66,h:1.8,kinds:['dust','mud']},
 {id:'bed-floor-c',room:'bedroom',place:'방문 앞 바닥',x:-.64,y:.025,z:.75,w:1.0,h:1.6,kinds:['mud','dust']},
 {id:'bed-desk',room:'bedroom',place:'책상 위',x:-.32,y:.852,z:-4.17,w:.69,h:.58,kinds:['dust'],high:true},
 {id:'bed-sill',room:'bedroom',place:'창틀',x:-3.35,y:1.016,z:-4.86,w:1.2,h:.2,kinds:['dust','mould'],high:true},
 {id:'kit-floor-a',room:'kitchen',place:'주방 입구 바닥',x:2.65,y:.023,z:-.35,w:1.4,h:1.4,kinds:['dust','grease','mud']},
 {id:'kit-floor-b',room:'kitchen',place:'아일랜드 앞 바닥',x:4.23,y:.023,z:1.0,w:1.4,h:.95,kinds:['grease','dust','mud']},
 {id:'kit-counter',room:'kitchen',place:'조리대',x:3.18,y:.906,z:-4.42,w:.87,h:.69,kinds:['grease']},
 {id:'kit-wall',room:'kitchen',place:'가스레인지 뒤 벽',x:2.25,y:1.2,z:-4.962,w:.9,h:.5,rotation:0,kinds:['grease']},
 {id:'bath-floor-a',room:'bathroom',place:'욕실 입구 바닥',x:2.79,y:.024,z:4.07,w:1.16,h:1.38,kinds:['dust','soap']},
 {id:'bath-floor-b',room:'bathroom',place:'샤워실 앞 바닥',x:4.04,y:.024,z:5.27,w:.92,h:1.6,kinds:['soap','mould']},
 {id:'bath-sink',room:'bathroom',place:'세면대 옆',x:2.37,y:.931,z:2.6,w:.35,h:.6,kinds:['soap','mould']},
 {id:'bath-wall',room:'bathroom',place:'샤워 벽',x:5.48,y:1.25,z:6.944,w:1.6,h:1.45,rotation:0,kinds:['soap','mould']},
 {id:'bath-corner',room:'bathroom',place:'타일 벽 모서리',x:5.2,y:.5,z:2.105,w:.9,h:.6,rotation:0,kinds:['mould','soap']}
];

// Every hazard is answered by choosing a response; the wrong answers explain why.
export const HAZARDS=[
 {id:'hazard-glass',room:'kitchen',short:'깨진 유리',name:'깨진 유리',question:'주방 바닥에 깨진 유리 조각이 흩어져 있어요. 어떻게 할까요?',
  options:[{text:'가까이 가지 않고, 만지지 말고 어른에게 알린다',ok:true},
   {text:'맨손으로 조심해서 주워 유리병 수거함에 넣는다',why:'맨손으로 만지면 크게 다칠 수 있어요. 깨진 유리는 유리병 수거함에 넣지도 않아요.'},
   {text:'청소기로 빨아들인다',why:'날카로운 조각이 청소기 안에서 튀거나 청소기를 망가뜨릴 수 있어요.'}],
  resolved:'어른이 두꺼운 장갑을 끼고 조각을 모은 뒤 신문지로 여러 번 감싸 ‘깨진 유리’라고 적고, 지역 안내에 따라 버렸어요.'},
 {id:'hazard-ceramic',room:'bedroom',short:'깨진 머그컵',name:'깨진 도자기 머그컵',question:'책상 옆에 도자기 머그컵이 깨져 있어요. 어떻게 할까요?',
  options:[{text:'만지지 말고 어른에게 알린다',ok:true},
   {text:'조각을 주워 유리병 수거함에 넣는다',why:'도자기는 유리병과 녹는 온도가 달라서 섞이면 재활용을 망쳐요. 맨손으로 줍는 것도 위험해요.'},
   {text:'휴지로 감싸 일반 쓰레기봉투에 넣는다',why:'날카로운 조각이 봉투를 뚫고 나와 치우는 분이 다칠 수 있어요. 깨진 도자기는 따로 버려요.'}],
  resolved:'어른이 조각을 신문지로 감싸 표시한 뒤, 불연성 쓰레기 전용 마대에 담았어요. 버리는 방법은 지역 안내를 따라요.'},
 {id:'hazard-strip',room:'bathroom',short:'젖은 멀티탭',name:'물에 젖은 멀티탭',question:'물이 고인 바닥에 드라이어가 꽂힌 멀티탭이 젖어 있어요. 어떻게 할까요?',
  options:[{text:'물기에서 떨어져 만지지 말고 어른에게 알린다',ok:true},
   {text:'얼른 플러그를 뽑는다',why:'젖은 곳의 전기 제품을 만지면 감전될 수 있어요. 손이 말라 있어도 위험해요.'},
   {text:'수건으로 물기를 닦고 계속 쓴다',why:'물에 젖었던 멀티탭은 마른 뒤에도 합선·화재 위험이 있어 다시 쓰지 않아요.'}],
  resolved:'어른이 차단기를 내린 뒤 마른 손으로 플러그를 뽑고, 젖은 멀티탭은 새것으로 바꾸기로 했어요. 욕실에서는 전기 제품을 물에서 멀리 둬요.'},
 {id:'hazard-pot',room:'kitchen',short:'끓는 냄비',name:'불 위에서 끓는 냄비',question:'가스레인지 불이 켜진 채 냄비가 끓어 넘치려 해요. 어떻게 할까요?',
  options:[{text:'가까이 가지 않고 어른에게 알려 불을 끄게 한다',ok:true},
   {text:'냄비를 손으로 들어 옮긴다',why:'냄비와 손잡이가 매우 뜨거워 화상을 입을 수 있어요.'},
   {text:'찬물을 부어 식힌다',why:'뜨거운 물이나 기름이 튀어 오르면서 화상을 입을 수 있어요.'}],
  resolved:'어른이 불을 끄고 냄비 손잡이를 안쪽으로 돌려 두었어요. 냄비는 다 식은 뒤에 치워요.'}
];
