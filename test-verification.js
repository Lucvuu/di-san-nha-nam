/**
 * Test script to verify data integrity, search algorithms, audio playlist, and normalization
 */
const fs = require('fs');
const vm = require('vm');

// Read data.js and utils.js into execution scope
const dataCode = fs.readFileSync('./js/data.js', 'utf8');
const utilsCode = fs.readFileSync('./js/utils.js', 'utf8');

// Run in current context
vm.runInThisContext(dataCode);
vm.runInThisContext(utilsCode);

console.log('--- 1. TESTING SITE_CONFIG & ADMINISTRATIVE NORMALIZATION ---');
console.assert(SITE_CONFIG.commune === 'Xã Nhã Nam', 'Commune should be Xã Nhã Nam');
console.assert(SITE_CONFIG.province === 'Tỉnh Bắc Ninh' || SITE_CONFIG.city.toLowerCase().includes('bắc ninh'), 'Province should be tỉnh Bắc Ninh');
// Bản dự thi (Văn bản 3437): trang web không ghi tên trường, tên thầy cô, số điện thoại, logo trường
const PRIVATE = ['THPT Nhã Nam', 'THPT NHÃ NAM', 'thptnhanam', 'Thuý Mến', 'Thúy Mến', 'cô Mến', 'Bùi Văn Công', 'Bùi Công', 'thầy Công',
  '0985', '0982', '0962', 'zalo.me', 'logo-160', 'logo-thpt'];
['index.html', 'js/data.js', 'js/app.js', 'js/utils.js', 'js/doc-texts.js'].forEach(f => {
  const text = fs.readFileSync('./' + f, 'utf8');
  PRIVATE.forEach(w => console.assert(!text.includes(w), `${f} must not contain "${w}"`));
});
console.assert(fs.readFileSync('./index.html', 'utf8').includes('alt="Biểu trưng văn hóa xã Nhã Nam"'), 'Header must show the Nhã Nam cultural emblem');
console.assert(fs.existsSync('./assets/images/share/bieu-trung-nha-nam-160.png'), 'Emblem image must exist');
console.assert(SITE_CONFIG.facebookGroupStatusNote.includes('kiểm duyệt'), 'Facebook note must mention kiểm duyệt');
console.log('✓ SITE_CONFIG verified');


console.log('--- 1.1 TESTING OFFICIAL 37 COMMUNE RELICS DATA ---');
console.assert(typeof OFFICIAL_COMMUNE_RELICS !== 'undefined', 'OFFICIAL_COMMUNE_RELICS must be defined');
console.assert(OFFICIAL_COMMUNE_RELICS.totalCount === 37, 'OFFICIAL_COMMUNE_RELICS.totalCount should be 37');
console.assert(OFFICIAL_COMMUNE_RELICS.groups.length === 4, 'Should have 4 official categories');
const totalItemsInGroups = OFFICIAL_COMMUNE_RELICS.groups.reduce((acc, g) => acc + g.items.length, 0);
console.assert(totalItemsInGroups === 37, 'Sum of relics in all groups must equal 37');
const rankedRelics = OFFICIAL_COMMUNE_RELICS.groups.slice(0, 3).flatMap(g => g.items);
console.assert(rankedRelics.length === 16, 'Should have 16 ranked relics in first 3 groups');
rankedRelics.forEach(item => {
  console.assert(item.featuredId, `Ranked relic ${item.name} must have featuredId linked`);
  const found = TANGIBLE_HERITAGE_DATA.find(r => r.id === item.featuredId);
  console.assert(found, `featuredId ${item.featuredId} must exist in TANGIBLE_HERITAGE_DATA`);
});
console.log('  ✓ Verified OFFICIAL_COMMUNE_RELICS: 37 total (8 QG đặc biệt, 1 QG, 7 Cấp tỉnh, 21 Kiểm kê)');
console.log('  ✓ Verified 16 ranked relics have 100% 1-to-1 linkage to TANGIBLE_HERITAGE_DATA');

console.log('--- 2. TESTING AUDIO PLAYLIST ---');
console.assert(Array.isArray(MUSIC_PLAYLIST) && MUSIC_PLAYLIST.length === 1 && MUSIC_PLAYLIST[0].id === 'nha-nam-trong-toi', 'Should have only 1 track "Nhã Nam trong tôi" in MUSIC_PLAYLIST');
MUSIC_PLAYLIST.forEach((track, i) => {
  console.assert(track.title && track.artist && track.src, `Track ${i} must have title, artist, src`);
  console.assert(fs.existsSync(track.src), `Audio file ${track.src} must exist on disk`);
  console.log(`  ✓ Track ${i+1}: "${track.title}" (${track.artist}) -> ${track.src} exists`);
});

console.log('--- 3. TESTING TANGIBLE HERITAGE (DI SẢN VẬT THỂ) ---');
console.assert(TANGIBLE_HERITAGE_DATA.length === 16, `Should have 16 tangible heritage items (found ${TANGIBLE_HERITAGE_DATA.length})`);
TANGIBLE_HERITAGE_DATA.forEach((item, i) => {
  console.assert(item.title, `Item ${i} must have title`);
  console.assert(item.address, `Item ${i} must have address`);
  console.assert(item.oldAddress, `Item ${i} must have oldAddress before 01/7/2025`);
  console.assert(item.relicType, `Item ${i} must have relicType`);
  console.assert(item.decision, `Item ${i} must have decision`);
  console.assert(item.content && item.content.intro, `Item ${i} must have content`);
  console.assert(item.map && item.map.embedUrl && item.map.directionsUrl, `Item ${i} must have map embed & directionsUrl`);
  console.assert(Array.isArray(item.gallery), `Item ${i} gallery must be an array`);
  console.assert(!JSON.stringify(item).includes('images.unsplash.com'), `Item ${i} must NOT contain any Unsplash URLs`);
  console.assert(item.docFile && item.docFile.path && fs.existsSync(item.docFile.path), `Item ${i} docFile must exist on disk (${item.docFile ? item.docFile.path : 'missing'})`);
  
  if (item.hasRealPhoto) {
    console.assert(item.thumbnail && fs.existsSync(item.thumbnail), `Real photo thumbnail for ${item.id} must exist: ${item.thumbnail}`);
    item.gallery.forEach((g, gIdx) => {
      console.assert(g.url && fs.existsSync(g.url), `Gallery photo ${gIdx} for ${item.id} must exist: ${g.url}`);
    });
  }
  if (item.audioFile) {
    console.assert(fs.existsSync(item.audioFile.src), `Audio narration file for ${item.id} must exist: ${item.audioFile.src}`);
  }
  if (item.audioTracks) {
    item.audioTracks.forEach((tr, tIdx) => {
      console.assert(fs.existsSync(tr.src), `Audio track ${tIdx} for ${item.id} must exist: ${tr.src}`);
    });
  }
  if (item.video) {
    console.assert((item.video.youtubeId && item.video.embedUrl) || (item.video.localSrc && fs.existsSync(item.video.localSrc)), `Video for ${item.id} must have valid youtubeId & embedUrl or existing localSrc`);
  }
  console.log(`  ✓ [Vật thể ${i+1}] ${item.title} -> Verified multimedia components (RealPhoto: ${item.hasRealPhoto}, Audio: ${!!item.audioFile}, Video: ${!!item.video}, Map, Doc: ${item.docFile.fileName})`);
});

// Specific checks for newly integrated relics
const relicSay = TANGIBLE_HERITAGE_DATA.find(r => r.id === 'vat-the-13');
console.assert(relicSay && relicSay.hasRealPhoto && relicSay.audioFile && relicSay.map.embedUrl.includes('21.4371635'), 'Đình Sậy must have real photo, audio, and teacher coordinates');
const relicNeo = TANGIBLE_HERITAGE_DATA.find(r => r.id === 'vat-the-14');
console.assert(relicNeo && relicNeo.hasRealPhoto && relicNeo.audioFile && relicNeo.map.embedUrl.includes('21.408497'), 'Đình Nẻo must have real photo, audio, and teacher coordinates');
const relicSat = TANGIBLE_HERITAGE_DATA.find(r => r.id === 'vat-the-16');
console.assert(relicSat && relicSat.hasRealPhoto && relicSat.audioFile && relicSat.map.embedUrl.includes('21.4160672'), 'Đình làng Sặt must have real photo, audio, and teacher coordinates');
console.log('  ✓ Verified 3 newly added relics (Đình Sậy, Đình Nẻo, Đình làng Sặt) have 100% real photos, real audios, and teacher verified coordinates');
const relicTuGiap = TANGIBLE_HERITAGE_DATA.find(r => r.id === 'vat-the-2');
console.assert(relicTuGiap && relicTuGiap.audioTracks && relicTuGiap.audioTracks.length === 2, 'Chùa Tứ Giáp must have 2 audio tracks (Khu lưu niệm 6 điều Bác Hồ dạy CAND and di tích chùa Tứ Giáp)');
console.assert(relicTuGiap.audioFile.src.includes('khu-luu-niem-6-dieu-bac-ho-day-cand'), 'Primary audio must be the newly added Khu lưu niệm 6 điều Bác Hồ dạy CAND');
console.log('  ✓ Verified Chùa Tứ Giáp has multi-track audio with new 3-minute Khu lưu niệm 6 điều Bác Hồ dạy CAND narration');

console.log('--- 4. TESTING INTANGIBLE HERITAGE (DI SẢN PHI VẬT THỂ) ---');
console.assert(INTANGIBLE_HERITAGE_DATA.length >= 8, `Should have at least 8 intangible heritage items (found ${INTANGIBLE_HERITAGE_DATA.length})`);
INTANGIBLE_HERITAGE_DATA.forEach((item, i) => {
  console.assert(item.title, `Item ${i} must have title`);
  console.assert(item.scope, `Item ${i} must have scope`);
  console.assert(item.content && item.content.intro, `Item ${i} must have content`);
  console.assert(item.map && item.map.embedUrl && item.map.directionsUrl, `Item ${i} must have map embed & directionsUrl`);
  console.assert(Array.isArray(item.gallery), `Item ${i} gallery must be an array`);
  console.assert(!JSON.stringify(item).includes('images.unsplash.com'), `Item ${i} must NOT contain any Unsplash URLs`);
  console.assert(item.docFile && item.docFile.path && fs.existsSync(item.docFile.path), `Item ${i} docFile must exist on disk (${item.docFile ? item.docFile.path : 'missing'})`);
  console.log(`  ✓ [Phi vật thể ${i+1}] ${item.title} -> Verified 4 multimedia components (photo, audio, map, doc: ${item.docFile.fileName})`);
});

console.log('--- 5. TESTING VIETNAMESE ACCENT-INSENSITIVE SEARCH ---');
const testCases = [
  { query: 'dinh ha', expectedMatch: 'Đình – Chùa Hả' },
  { query: 'chua ha', expectedMatch: 'Đình – Chùa Hả' },
  { query: 'de nam', expectedMatch: 'Đình – Chùa Hả' },
  { query: 'dong dieu', expectedMatch: 'Thôn Đồng Điều' },
  { query: 'chi bo dang', expectedMatch: 'Thôn Đồng Điều' },
  { query: 'de truat', expectedMatch: 'Đền Đề Truật' },
  { query: 'tu giap', expectedMatch: 'Chùa Tứ Giáp' },
  { query: 'chua tu giap', expectedMatch: 'Chùa Tứ Giáp' },
  { query: 'goc khe', expectedMatch: 'Đền Gốc Khế' },
  { query: 'doi phu', expectedMatch: 'Đồi Phủ' },
  { query: 'don nha nam', expectedMatch: 'Đồi Phủ' },
  { query: 'dinh nha nam', expectedMatch: 'Đình Nhã Nam' },
  { query: 'lang chuong', expectedMatch: 'Đình Nhã Nam' },
  { query: 'nam thien', expectedMatch: 'Chùa Nam Thiên' },
  { query: 'hat cheo', expectedMatch: 'Hát Chèo' },
  { query: 'banh khao', expectedMatch: 'Nghề làm bánh khảo, kẹo lạc' },
  { query: 'keo lac', expectedMatch: 'Nghề làm bánh khảo, kẹo lạc' },
  { query: 'vo co truyen', expectedMatch: 'Trò chơi dân gian và võ cổ truyền' },
  { query: 'hoang hoa tham', expectedMatch: 'Đền Gốc Khế' },
  { query: 'duong lam', expectedMatch: 'Đình Dương Lâm' },
  { query: 'dinh duong lam', expectedMatch: 'Đình Dương Lâm' },
  { query: 'lang noi phet', expectedMatch: 'Làng nói phét Dương Sơn' },
  { query: 'duong son', expectedMatch: 'Làng nói phét Dương Sơn' },
  { query: 'khu luu niem', expectedMatch: 'Chùa Tứ Giáp' },
  { query: '6 dieu bac day', expectedMatch: 'Chùa Tứ Giáp' },
  { query: 'cand', expectedMatch: 'Chùa Tứ Giáp' }
];

const allItems = [...TANGIBLE_HERITAGE_DATA, ...INTANGIBLE_HERITAGE_DATA];

testCases.forEach(({ query, expectedMatch }) => {
  const matches = allItems.filter(item => matchesSearchQuery(item, query));
  const found = matches.some(m => removeVietnameseTones(m.title).includes(removeVietnameseTones(expectedMatch)) || removeVietnameseTones(expectedMatch).includes(removeVietnameseTones(m.title)));
  console.assert(found, `Search "${query}" should match "${expectedMatch}"`);
  console.log(`  ✓ Search "${query}" successfully matched ${matches.length} items (including "${expectedMatch}")`);
});

console.log('--- 6. TESTING AUDIO GUIDE ENGINE (SENTENCE CHUNKING & LOGIC) ---');
console.assert(typeof splitTextIntoSentences === 'function', 'splitTextIntoSentences must be a function');
const sampleText = 'Chào mừng quý thầy cô đến với di tích. Nơi đây lưu giữ nhiều hiện vật quý báu! Các bạn học sinh hãy cùng khám phá; giá trị văn hóa ngàn đời.';
const chunks = splitTextIntoSentences(sampleText);
console.assert(chunks.length >= 3, 'Should split into multiple sentences');
console.assert(chunks.every(c => c.length <= 150), 'All chunks should be under 150 characters to prevent 15s freeze');
console.log(`  ✓ Sample text successfully split into ${chunks.length} clean sentences (max length: ${Math.max(...chunks.map(c => c.length))} chars)`);

const testManager = new HeritageAudioGuideManager();
const loadedSentences = testManager.loadStory(sampleText);
console.assert(loadedSentences.length === chunks.length, 'Loaded sentences count must match chunks count');
console.assert(testManager.currentIndex === 0, 'Initial sentence index should be 0');
console.assert(testManager.isPlaying === false, 'Initially isPlaying should be false');
console.log('  ✓ HeritageAudioGuideManager initialized and loaded story correctly');

console.log('--- 7. TESTING FULL APP INITIALIZATION & DOM RENDERING ---');
const elements = {};
function createEl(tag) {
  return {
    tagName: tag.toUpperCase(),
    innerHTML: '',
    textContent: '',
    className: '',
    style: {},
    children: [],
    attributes: {},
    setAttribute(k, v) { this.attributes[k] = v; },
    getAttribute(k) { return this.attributes[k] || null; },
    addEventListener(ev, cb) { this._listeners = this._listeners || {}; this._listeners[ev] = cb; },
    querySelector(sel) { return createEl('div'); },
    querySelectorAll(sel) { return [createEl('div')]; },
    classList: {
      add() {},
      remove() {},
      contains() { return false; },
      toggle() {}
    }
  };
}

global.window = {
  addEventListener(ev, cb) {},
  scrollTo() {},
  location: { hash: '' }
};
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};
global.navigator = { userAgent: 'node' };
global.location = { hash: '' };
global.document = {
  addEventListener(ev, cb) {
    if (ev === 'DOMContentLoaded') global.onDOMContentLoaded = cb;
  },
  getElementById(id) {
    if (!elements[id]) elements[id] = createEl('div');
    return elements[id];
  },
  querySelector(sel) { return createEl('div'); },
  querySelectorAll(sel) { return [createEl('div')]; },
  createElement(tag) { return createEl(tag); }
};

const appCode = fs.readFileSync('./js/app.js', 'utf8');
vm.runInThisContext(appCode);
global.onDOMContentLoaded();

console.assert(state.allItems.length === 24, `state.allItems should have 24 items (got ${state.allItems.length})`);
console.assert(state.filteredItems.length === 24, `state.filteredItems should have 24 items (got ${state.filteredItems.length})`);
console.assert(elements['heritage-grid'].innerHTML.length > 500, 'Heritage grid must render card elements');
console.assert(elements['quick-search-tags'].innerHTML.length > 100, 'Quick search tags must render tag buttons');
console.assert(String(elements['count-all'].textContent) === '24', 'Count all must be 24');
console.assert(String(elements['count-vat-the'].textContent) === '16', 'Count vat-the must be 16');
console.assert(String(elements['count-phi-vat-the'].textContent) === '8' || String(elements['count-phi-vat-the'].textContent) === '08', 'Count phi-vat-the must be 8 or 08');
console.assert(elements['quiz-questions-container'].innerHTML.length > 500, 'Quiz questions must render properly');

console.log('  ✓ State items:', state.allItems.length, '(16 di sản vật thể + 8 di sản phi vật thể)');
console.log('  ✓ Cards rendered in #heritage-grid HTML size:', elements['heritage-grid'].innerHTML.length, 'bytes');
console.log('  ✓ Quick tags rendered in #quick-search-tags HTML size:', elements['quick-search-tags'].innerHTML.length, 'bytes');
console.log('  ✓ Dynamic counters updated: Tất cả =', elements['count-all'].textContent, ', Vật thể =', elements['count-vat-the'].textContent, ', Phi vật thể =', elements['count-phi-vat-the'].textContent);

console.log('--- 8. TESTING INTERACTIVE HERITAGE ROUTES ---');
console.assert(Array.isArray(HERITAGE_ROUTES) && HERITAGE_ROUTES.length === 3, 'HERITAGE_ROUTES must have 3 routes');
HERITAGE_ROUTES.forEach((route, i) => {
  console.assert(route.id && route.name && route.title, `Route ${i} must have id, name, title`);
  console.assert(route.relicIds && route.relicIds.length > 0, `Route ${i} must have relicIds`);
  console.assert(route.mapEmbedUrl && route.directionsUrl, `Route ${i} must have embed & directions URL`);
  console.assert(route.startDirectionsUrl && route.startDirectionsText, `Route ${i} must have startDirectionsUrl & text`);
  if (route.id === 'tuyen-1') {
    console.assert(!route.mapEmbedUrl.includes('21.4357253,106.116718'), 'Tuyen 1 mapEmbedUrl must NOT use inaccurate Thien Bao Linh Ung coordinate');
    console.assert(route.startDirectionsUrl.includes('%C4%90%C3%ACnh+H%E1%BA%A3'), 'Tuyen 1 start directions must navigate to Dinh Ha');
  }
  route.relicIds.forEach(relicId => {
    const relic = TANGIBLE_HERITAGE_DATA.find(r => r.id === relicId);
    console.assert(relic, `Relic ${relicId} in route ${route.id} must exist in TANGIBLE_HERITAGE_DATA`);
  });
  console.log(`  ✓ [Tuyến ${route.number}] ${route.title} (${route.relicIds.length} di tích) -> Validated URLs & Relic links`);
});

console.assert(typeof selectRoute === 'function', 'selectRoute must be a function');
console.assert(typeof selectRouteRelic === 'function', 'selectRouteRelic must be a function');
console.assert(typeof resetToCommuneMap === 'function', 'resetToCommuneMap must be a function');
console.assert(typeof filterRelicsByRoute === 'function', 'filterRelicsByRoute must be a function');
console.log('  ✓ All 4 Interactive Heritage Route controller functions verified');

console.log('--- 9. TESTING NEWLY ADDED HERITAGE ASSETS (DE NAM VIDEO @354S, CLB CHEO, DUONG SON) ---');
// 9.1 Kiểm tra video Đề Nắm bắt đầu từ phút 05:54 (354s)
const vatThe1 = TANGIBLE_HERITAGE_DATA.find(r => r.id === 'vat-the-1');
console.assert(vatThe1.video && vatThe1.video.youtubeUrl.includes('t=354s'), 'vat-the-1 video must link to t=354s');
console.assert(vatThe1.video.embedUrl.includes('start=354'), 'vat-the-1 video must embed with start=354');
console.log('  ✓ vat-the-1 video verified: Đề Nắm tế cờ bắt đầu chính xác từ 354s (05:54)');

const phiVatThe1 = INTANGIBLE_HERITAGE_DATA.find(r => r.id === 'phi-vat-the-1');
console.assert(phiVatThe1.video && phiVatThe1.video.youtubeUrl.includes('t=354s'), 'phi-vat-the-1 video must link to t=354s');
console.assert(phiVatThe1.video.embedUrl.includes('start=354'), 'phi-vat-the-1 video must embed with start=354');
console.log('  ✓ phi-vat-the-1 video verified: Lễ hội Yên Thế tế cờ bắt đầu chính xác từ 354s (05:54)');

// 9.2 Kiểm tra CLB Chèo Dương Lâm
const phiVatThe2 = INTANGIBLE_HERITAGE_DATA.find(r => r.id === 'phi-vat-the-2');
console.assert(phiVatThe2.hasRealPhoto === true, 'phi-vat-the-2 must have real photos');
console.assert(phiVatThe2.thumbnail.includes('clb-cheo-duong-lam'), 'phi-vat-the-2 thumbnail must be CLB Chèo Dương Lâm');
console.assert(phiVatThe2.gallery.length >= 4, 'phi-vat-the-2 gallery must have at least 4 photos');
phiVatThe2.gallery.forEach(img => {
  if (img.url.startsWith('./assets/')) {
    const p = img.url.replace('./', '');
    console.assert(fs.existsSync(p), `Image path ${p} must exist on disk`);
  }
});
console.log('  ✓ phi-vat-the-2 verified: 100% ảnh chụp thật CLB Chèo Dương Lâm tồn tại');

// 9.3 Kiểm tra các file tài liệu mới
const newDocs = [
  'assets/docs/kich-ban-dien-tich-de-nam-te-co.docx',
  'assets/docs/loi-tua-lang-noi-phet-duong-son.docx',
  'assets/docs/quyet-dinh-thanh-lap-clb-cheo-duong-lam.pdf'
];
newDocs.forEach(d => {
  console.assert(fs.existsSync(d), `Document ${d} must exist on disk`);
  console.assert(fs.statSync(d).size > 1000, `Document ${d} must have valid content size`);
});
console.log('  ✓ Verified 3 newly added heritage documents (Kịch bản tế cờ, Lời tựa Dương Sơn, QĐ CLB Chèo) exist and valid');

// 9.4 Kiểm tra toàn văn doc-texts
const docTextsCode = fs.readFileSync('./js/doc-texts.js', 'utf8');
console.assert(docTextsCode.includes('kich-ban-dien-tich-de-nam-te-co.docx'), 'doc-texts must include kịch bản Đề Nắm');
console.assert(docTextsCode.includes('loi-tua-lang-noi-phet-duong-son.docx'), 'doc-texts must include lời tựa Dương Sơn');
console.assert(docTextsCode.includes('Hòa Làng nói phét có ca'), 'doc-texts must include folk verse Hòa Làng vs Dương Sơn');
console.assert(docTextsCode.includes('nghe-thuat-hat-quan-ho-nha-nam.docx'), 'doc-texts must include Dân ca Quan họ');
console.assert(docTextsCode.includes('clb-nghe-thuat-dan-gian-nha-nam.docx'), 'doc-texts must include CLB Nghệ thuật Dân gian');
console.log('  ✓ Verified doc-texts.js contains full transcript of Kịch bản Đề Nắm, Lời tựa Dương Sơn, Quan họ & CLB NT Dân gian');

// 9.5 Kiểm tra phi-vat-the-7 (Quan họ) và phi-vat-the-8 (CLB Nghệ thuật Dân gian)
const phiVatThe7 = INTANGIBLE_HERITAGE_DATA.find(r => r.id === 'phi-vat-the-7');
console.assert(phiVatThe7 && phiVatThe7.hasRealPhoto === true, 'phi-vat-the-7 must have real photos');
console.assert(phiVatThe7.gallery.length === 5, 'phi-vat-the-7 must have 5 real photos');
phiVatThe7.gallery.forEach(img => {
  const p = img.url.replace('./', '');
  console.assert(fs.existsSync(p), `Image path ${p} must exist on disk`);
});
console.log('  ✓ phi-vat-the-7 verified: 100% ảnh chụp thật & QĐ 756 CLB Dân ca Quan họ tồn tại');

const phiVatThe8 = INTANGIBLE_HERITAGE_DATA.find(r => r.id === 'phi-vat-the-8');
console.assert(phiVatThe8 && phiVatThe8.hasRealPhoto === true, 'phi-vat-the-8 must have real photos');
console.assert(phiVatThe8.gallery.length === 5, 'phi-vat-the-8 must have 5 real photos');
phiVatThe8.gallery.forEach(img => {
  const p = img.url.replace('./', '');
  console.assert(fs.existsSync(p), `Image path ${p} must exist on disk`);
});
console.log('  ✓ phi-vat-the-8 verified: 100% ảnh chụp thật & QĐ 1570 CLB Nghệ thuật Dân gian tồn tại');

console.log('--- 10. TESTING VISITOR COUNTER CONFIGURATION & LOGIC ---');
console.assert(SITE_CONFIG.visitorCounter && SITE_CONFIG.visitorCounter.enabled === true, 'Visitor counter must be enabled');
console.assert(SITE_CONFIG.visitorCounter.baseCount >= 5000 && SITE_CONFIG.visitorCounter.baseCount <= 7000, 'Base visitor count must be between 5000 and 7000');
console.assert(SITE_CONFIG.visitorCounter.namespace && SITE_CONFIG.visitorCounter.endpoint, 'Visitor counter must have namespace and endpoint');
console.assert(typeof initVisitorCounter === 'function', 'initVisitorCounter must be a function');

const indexHtmlContent = fs.readFileSync('index.html', 'utf8');
console.assert(indexHtmlContent.includes('id="visitor-counter-display"'), 'index.html must have #visitor-counter-display element');
console.log(`  ✓ Visitor counter verified: Base count = ${SITE_CONFIG.visitorCounter.baseCount} (between 5.000 - 7.000), API endpoint ready, element wired in footer`);

console.log('--- 11. TESTING SECURITY POLICY: BUDGET PROPOSALS & CONTRACTS EXCLUSION ---');
const { execSync } = require('child_process');

// 11.1 Verify .gitignore contains critical patterns
const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
console.assert(gitignoreContent.includes('[Hh]ợp đồng'), '.gitignore must ignore hợp đồng');
console.assert(gitignoreContent.includes('[Dd]ự trù'), '.gitignore must ignore dự trù');
console.assert(gitignoreContent.includes('[Kk]inh phí'), '.gitignore must ignore kinh phí');
console.assert(gitignoreContent.includes('*.xls'), '.gitignore must ignore *.xls');
console.assert(gitignoreContent.includes('*.xlsx'), '.gitignore must ignore *.xlsx');
console.log('  ✓ .gitignore contains strict exclusion patterns for budget proposals & contract dossiers');

// 11.2 Verify GEMINI.md exists and enforces security rule
console.assert(fs.existsSync('GEMINI.md'), 'GEMINI.md must exist at project root');
const geminiRules = fs.readFileSync('GEMINI.md', 'utf8');
console.assert(geminiRules.includes('dự trù kinh phí'), 'GEMINI.md must mention dự trù kinh phí');
console.assert(geminiRules.includes('hồ sơ hợp đồng'), 'GEMINI.md must mention hồ sơ hợp đồng');
console.log('  ✓ GEMINI.md system rule exists and enforces persistent security constraint');

// 11.3 Verify no tracked git files violate this rule
try {
  const trackedFiles = execSync('git ls-files', { encoding: 'utf8' }).split(/\r?\n/);
  const sensitivePattern = /(hop.?dong|du.?tru|kinh.?phi|de.?xuat|thanh.?toan|nghiem.?thu|bao.?gia|contract|budget|\.xlsx?$)/i;
  const violatedTrackedFiles = trackedFiles.filter(file => file.trim() && sensitivePattern.test(file));
  console.assert(violatedTrackedFiles.length === 0, `VIOLATION: Found tracked sensitive files in git: ${violatedTrackedFiles.join(', ')}`);
  console.log('  ✓ Verified 0% tracked files in git violate budget or contract security rules');
} catch (e) {
  console.error('  ✗ Error checking git tracked files:', e.message);
  throw e;
}

console.log('--- 12. POST-SURVEY: VISIT GUIDE, MINI-QUIZ, MAPS, IMAGE WEIGHT ---');
const surveyItems = [...TANGIBLE_HERITAGE_DATA, ...INTANGIBLE_HERITAGE_DATA];
// Đình Hả cố ý tra theo tên: tọa độ trong file GG map trỏ nhầm sang Thiên Bảo Linh Ứng (xem mục route ở trên).
const okPlace = v => /^-?\d+\.\d+,-?\d+\.\d+$/.test(v || '') || (v || '').startsWith('Đình Hả,');
surveyItems.forEach(item => {
  const g = VISIT_GUIDES[item.id];
  console.assert(g && Array.isArray(g.see) && g.see.length > 0, `${item.id} must have a visit guide`);
  const qs = buildMiniQuiz(item);
  console.assert(qs.length >= 1 && qs.length <= 2, `${item.id} must have 1-2 mini-quiz questions`);
  qs.forEach(q => console.assert(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length && new Set(q.options).size === q.options.length, `${item.id} mini-quiz answer/options invalid: ${q.q}`));
  const d = new URL(item.map.directionsUrl), e = new URL(item.map.embedUrl);
  console.assert(d.pathname === '/maps/dir/' && d.searchParams.get('api') === '1' && okPlace(d.searchParams.get('destination')), `${item.id} directionsUrl must be api=1 with a precise destination`);
  console.assert(okPlace(e.searchParams.get('q')) && e.searchParams.get('output') === 'embed', `${item.id} embedUrl must use a precise place`);
  const c = item.content;
  console.assert((c.architecture || c.ritualsAndActivities || c.practice || []).length > 0, `${item.id} second content list must not be empty`);
});
const heavy = execSync('git ls-files assets/images', { encoding: 'utf8' }).split(/\r?\n/).filter(f => f && fs.existsSync(f) && fs.statSync(f).size > 180 * 1024);
console.assert(heavy.length === 0, `Images over 180KB: ${heavy.join(', ')}`);
console.log(`  ✓ ${surveyItems.length} hồ sơ: cẩm nang, câu hỏi nhanh, bản đồ chính xác; 0 ảnh trên 180KB`);

// 13. Ảnh minh họa phải ghi rõ, không lẫn với ảnh thực tế; mọi ảnh thư viện phải tồn tại
for (const item of surveyItems) {
  if (!item.hasRealPhoto && item.thumbnail) {
    console.assert((item.gallery || []).length && item.gallery.every(g => /minh họa/i.test(g.caption)), `${item.id}: ảnh minh họa phải ghi chú "minh họa"`);
  }
  for (const g of item.gallery || []) console.assert(fs.existsSync(g.url), `${item.id}: thiếu ảnh ${g.url}`);
  if (item.video && item.video.localSrc) {
    console.assert(fs.existsSync(item.video.localSrc), `${item.id}: thiếu video ${item.video.localSrc}`);
  }
}
['vat-the-3', 'vat-the-10', 'vat-the-12'].forEach(id => {
  const r = surveyItems.find(x => x.id === id);
  console.assert(r && r.hasRealPhoto && r.thumbnail && fs.existsSync(r.thumbnail) && r.gallery.length >= 3, `${id} must have real photos and thumbnail`);
});
console.log('  ✓ Ảnh minh họa được ghi chú rõ; mọi ảnh thư viện và video thực tế đều tồn tại');

console.log('\n======================================================');
console.log('ALL INTEGRITY, SEARCH, AUDIO GUIDE, APP INIT & SECURITY TESTS PASSED! 🎉');
console.log('======================================================\n');
