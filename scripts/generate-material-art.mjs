// Simple replaceable Stage 2 SVGs. Run from the project root with Node.
import { mkdirSync, writeFileSync } from 'node:fs'

const ink = '#211D2B', skin = '#F4C49E', mint = '#81E4B9', pink = '#FF99C2', blue = '#92C9F5', yellow = '#FFDF57', purple = '#C2ACF3'
const defs = `<defs>
<marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M2 2 8 5 2 8" fill="none" stroke="${ink}" stroke-width="2" stroke-linejoin="round"/></marker>
<g id="brush"><rect x="-7" y="-8" width="14" height="100" rx="7" fill="${mint}"/><rect x="-12" y="-45" width="24" height="42" rx="7" fill="white"/><path d="M-10-34H5m-15 10H5m-15 10H5"/></g>
<g id="cup"><path d="M-25-30H25L20 35H-20Z" fill="white"/><path d="M-22-9H22" stroke="${blue}" stroke-width="7"/></g>
<g id="hand"><path d="M-27 20V-7q0-13 9-9V-29q0-12 9-5v-5q0-12 10-3v10q10-9 10 5v14q10-8 13 4l-3 34q-24 13-48-5Z" fill="${skin}"/></g>
<g id="soap"><rect x="-42" y="-22" width="84" height="44" rx="16" fill="${pink}"/><path d="M-22-6Q0-14 22-6" fill="none"/></g>
<g id="foam" fill="white"><circle cx="-23" cy="0" r="16"/><circle cx="0" cy="-8" r="20"/><circle cx="23" cy="0" r="16"/></g>
<g id="shirt"><path d="M-25-45-65-22-46 7-30-4V63H30V-4L46 7 65-22 25-45Q0-22-25-45Z" fill="${mint}"/><path d="M-25-45Q0-10 25-45M-30 52H30" fill="none"/></g>
<g id="shoe"><path d="M-49-28Q-20-7-6-36L12-24Q22-4 44 0Q61 5 60 25H-54V-9Q-54-28-49-28Z" fill="white"/><path d="M-54 17H60V30H-54Z" fill="${yellow}"/><path d="M-4-29 16-16 0 3-21-10Z" fill="${purple}"/></g>
<g id="spoon"><ellipse cy="-25" rx="14" ry="23" fill="white"/><rect x="-5" y="-3" width="10" height="63" rx="5" fill="${blue}"/></g>
<g id="plate"><ellipse rx="68" ry="40" fill="white"/><ellipse rx="51" ry="28" fill="${yellow}"/></g>
<g id="rice"><path d="M-28 8Q-23-22 0-19 24-24 29 8Z" fill="white"/><path d="M-11-3h5M7-7h5"/></g>
<g id="tap"><path d="M-68-35V-58H10Q33-58 33-34V-13H11V-28Q11-35 3-35Z" fill="white"/><path d="M-24-58V-75m-14 0h28"/><path d="M13 0V30m14-30v40" stroke="${blue}" stroke-width="6"/></g>
<g id="spark"><path d="M0-14 4-4 14 0 4 4 0 14-4 4-14 0-4-4Z" fill="${yellow}"/></g>
</defs>`
const use = (id,x,y,scale=1,angle=0) => `<use href="#${id}" transform="translate(${x} ${y}) rotate(${angle}) scale(${scale})"/>`
const path = (d,fill='none',extra='') => `<path d="${d}" fill="${fill}" ${extra}/>`
const arrow = d => path(d,'none','stroke-width="4" marker-end="url(#arrow)"')
const limb = d => path(d,'none',`stroke="${ink}" stroke-width="22"`)+path(d,'none',`stroke="${skin}" stroke-width="15"`)
const head = (x=240,y=100,mouth='smile') => `<g transform="translate(${x} ${y})"><circle r="43" fill="${skin}"/>${path('M-42-10Q-44-52 0-46 44-46 43-10L28-25Q10-9-11-24L-29-9Z',ink)}<path d="M-15 1v5m30-5v5"/>${mouth==='open'?'<ellipse cy="22" rx="16" ry="11" fill="white"/>':mouth==='closed'?path('M-11 22Q0 26 11 22'):path('M-12 19Q0 33 12 19')}</g>`
const torso = (x=240,y=155,color=mint) => path(`M${x-25} ${y-15}Q${x} ${y} ${x+25} ${y-15}L${x+55} ${y+12} ${x+44} ${y+35} ${x+33} ${y+25}V${y+103}H${x-33}V${y+25}L${x-44} ${y+35} ${x-55} ${y+12}Z`,color)
const bust = (color=mint,mouth='smile') => torso(240,155,color)+head(240,98,mouth)
const water = (x,y) => `<g stroke="${blue}" stroke-width="6"><path d="M${x} ${y}v15m18-5v22m18-30v15m-28 21v14m27-3v12"/></g>`
const sink = () => path('M85 245H395Q380 280 240 280 100 280 85 245Z','white')
const bath = () => torso(240,152,skin)+head(240,95)+use('foam',220,250,1.7)+use('foam',289,250,1.3)
const shower = () => path('M305 35H334Q362 35 362 60V69','none','stroke-width="7"')+path('M346 68H379L385 85H340Z','white')+water(343,100)
const seated = (table=false) => `<rect x="170" y="139" width="140" height="94" rx="8" fill="${purple}"/><path d="M172 235v55m136-55v55"/><rect x="164" y="217" width="152" height="18" rx="6" fill="${purple}"/>${torso(240,135,mint)}${head(240,77)}${path('M206 217H274V253H253V281H227V253H206Z',blue)}${limb('M196 158 195 218M284 158 285 218')}${table?path('M117 203H363V219H117Z','white')+path('M137 220v70m206-70v70'):''}`
const wrap = content => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320" width="480" height="320"><g stroke="${ink}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${defs}${content}</g></svg>`

const scenes = {
  'tooth-brushing': [
    use('cup',173,214,1.6)+use('brush',171,139,1,-12)+use('hand',289,125,1.2,-65)+arrow('M270 88Q225 69 198 96'),
    use('brush',235,207,1.35,-90)+'<g transform="translate(-65 0)">'+path('M255 48 329 67 306 131 246 111Z','white')+path('M246 111 256 114 252 131 242 128Z',blue)+path('M246 137Q224 147 244 154Q261 163 249 170','none',`stroke="${mint}" stroke-width="11"`)+arrow('M338 113 327 153')+'</g>',
    bust(mint,'open')+path('M226 116h28m-21-5v17m14-17v17','none','stroke-width="2"')+use('brush',248,120,.72,-90)+limb('M284 180 313 163 321 124')+arrow('M208 137 258 137'),
    `<g transform="translate(0 9)">${head(133,130,'open')}${head(346,130,'open')}${use('brush',111,153,.62,90)}${use('brush',367,153,.62,-90)}${arrow('M99 198 136 198')}${arrow('M376 198 339 198')}</g>`,
    bust(mint,'closed')+use('cup',304,130,.8,22)+limb('M282 180 308 158 311 144')+path('M260 119q16 4 20 14','none',`stroke="${blue}" stroke-width="5"`)+sink()+water(240,205),
    use('tap',255,89,1.45)+use('brush',271,177,1.0,-45)+use('hand',342,249,1,-43)+sink()+water(272,149),
  ],
  bathing: [
    bath()+shower()+water(270,152)+limb('M198 178 172 171 165 135'),
    limb('M103 231 193 183')+limb('M377 231 280 177')+use('hand',212,169,1.4,-65)+use('soap',243,146,1.1,-10)+use('foam',252,107,.8)+use('hand',289,168,1.15,60),
    bath()+limb('M283 180 308 221 190 192')+use('foam',192,190,.72)+arrow('M143 170Q157 212 183 224'),
    bath()+shower()+water(276,145)+water(299,211)+use('foam',170,236,.58)+arrow('M350 162 327 222'),
    bath()+path('M175 141Q230 165 267 136L297 239Q237 263 188 243Z',yellow)+path('M185 164 200 232m77-61 10 60')+limb('M283 180 263 167')+use('hand',268,165,.55,60),
    bust(mint)+limb('M194 179 180 220M286 179 300 220')+use('spark',324,106,1.4)+use('spark',165,205,.8),
  ],
  dressing: [
    use('shirt',240,162,1.35)+use('hand',113,99,1,-40)+arrow('M110 160 151 139')+use('spark',334,87),
    torso(240,155,skin)+use('shirt',240,137,1.3)+head(240,101)+path('M210 146Q240 160 270 146','none','stroke-width="6"')+limb('M195 176 159 144M284 177 321 144')+arrow('M240 35V58'),
    torso(240,155,skin)+head(240,88)+use('shirt',240,175,1.05)+limb('M194 160 161 149 123 142')+arrow('M161 122 124 113')+path('M200 150 190 168','none','stroke-width="5"'),
    torso(240,155,skin)+head(240,88)+use('shirt',240,175,1.05)+limb('M285 160 319 149 357 142')+limb('M195 170 159 189')+arrow('M320 122 356 113')+path('M279 151 288 168','none','stroke-width="5"'),
    bust(mint)+limb('M191 179 185 238 208 247M289 179 295 238 272 247')+arrow('M167 222V267')+arrow('M313 222V267'),
    bust(mint)+limb('M191 179 193 228 220 245M289 179 287 228 260 245')+path('M207 249h66')+use('spark',337,141,1.3),
  ],
  eating: [
    use('tap',237,88,1.4)+limb('M105 230 205 183')+limb('M370 228 268 183')+use('hand',220,175,1,-65)+use('hand',267,185,1,70)+use('foam',244,166,.8)+sink()+water(258,130),
    seated(true)+use('plate',240,205,.6)+path('M215 277h20m14 0h20','none','stroke-width="9"'),
    use('plate',210,186,1.55)+use('rice',193,171,1.2)+use('spoon',267,156,1,-55)+use('rice',251,142,.42)+use('hand',359,218,1,-50)+arrow('M339 102Q296 85 265 117'),
    bust(mint,'open')+limb('M285 178 317 160 309 128')+use('spoon',281,123,.7,-86)+use('rice',264,118,.35)+arrow('M292 80 262 100')+use('plate',239,266),
    bust(mint,'closed')+path('M192 113q-9 9 1 18m95-18q9 9-1 18','none','stroke-width="3"')+limb('M194 179 190 228M286 179 290 228')+use('plate',240,272),
    path('M94 179H388L411 252H72Z',mint)+use('plate',222,216,1.25)+use('spoon',271,199,.7,72)+use('hand',338,146,1.1,28)+arrow('M347 90Q382 120 350 167'),
  ],
  shoes: [
    use('shoe',163,220,1.1,-9)+use('shoe',313,220,1.1,9)+use('hand',159,99,1.05,170)+use('hand',316,99,1.05,190)+arrow('M101 116V169')+arrow('M379 116V169'),
    seated(false)+use('shoe',153,276,.7)+use('shoe',329,276,.7)+path('M212 281h20m17 0h20','none','stroke-width="8"'),
    path('M149 54H187V153Q203 165 207 184L166 197 146 171Z',skin)+path('M144 44H192V91H144Z',blue)+use('shoe',190,231,1.15)+path('M177 212 163 180 180 173 198 207Z',purple)+use('shoe',332,231,.95)+arrow('M115 148 139 198'),
    path('M293 54H331V153Q347 165 351 184L310 197 290 171Z',skin)+path('M288 44H336V91H288Z',blue)+use('shoe',334,231,1.15)+path('M321 212 307 180 324 173 342 207Z',purple)+use('shoe',164,231,.95)+arrow('M386 148 363 198'),
    path('M148 55H181V196H148ZM302 55H335V196H302Z',blue)+use('shoe',171,223,1.12)+use('shoe',325,223,1.12)+use('hand',213,150,.78,-130)+use('hand',369,150,.78,-130)+arrow('M221 133Q257 173 206 200'),
    path('M148 55H181V196H148ZM302 55H335V196H302Z',blue)+use('shoe',171,223,1.12)+use('shoe',325,223,1.12)+use('spark',103,145,1.2)+use('spark',392,146,1.2)+path('M98 278H396'),
  ],
}

for (const [id, steps] of Object.entries(scenes)) {
  const dir = `public/assets/illustrations/materials/${id}`
  mkdirSync(dir, { recursive: true })
  steps.forEach((scene, i) => writeFileSync(`${dir}/${i + 1}.svg`, wrap(scene)))
}
writeFileSync('public/assets/illustrations/system/celebrate.svg', wrap(bust(mint)+limb('M193 177 157 146 136 98M287 177 323 146 344 98')+use('hand',130,82,.75,-12)+use('hand',350,82,.75,12)+use('spark',91,153,1.2)+use('spark',390,148,1.2)+use('spark',239,28,.7)))
console.log('Generated 30 distinct learning scenes and 1 completion SVG.')
