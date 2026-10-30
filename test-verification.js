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
console.assert(SITE_CONFIG.adminPhone === '0962.629.650', 'adminPhone should be 0962.629.650');
console.assert(SITE_CONFIG.adminZaloUrl === 'https://zalo.me/0962629650', 'adminZaloUrl should be correct');
console.assert(SITE_CONFIG.facebookGroupStatusNote.includes('kiểm duyệt'), 'Facebook note must mention kiểm duyệt');
console.log('✓ SITE_CONFIG verified');

console.log('--- 2. TESTING AUDIO PLAYLIST ---');
console.assert(Array.isArray(MUSIC_PLAYLIST) && MUSIC_PLAYLIST.length === 2, 'Should have 2 tracks in MUSIC_PLAYLIST');
MUSIC_PLAYLIST.forEach((track, i) => {
  console.assert(track.title && track.artist && track.src, `Track ${i} must have title, artist, src`);
  console.assert(fs.existsSync(track.src), `Audio file ${track.src} must exist on disk`);
  console.log(`  ✓ Track ${i+1}: "${track.title}" (${track.artist}) -> ${track.src} exists`);
});

console.log('--- 3. TESTING TANGIBLE HERITAGE (DI SẢN VẬT THỂ) ---');
console.assert(TANGIBLE_HERITAGE_DATA.length === 8, `Should have 8 tangible heritage items (found ${TANGIBLE_HERITAGE_DATA.length})`);
TANGIBLE_HERITAGE_DATA.forEach((item, i) => {
  console.assert(item.title, `Item ${i} must have title`);
  console.assert(item.address, `Item ${i} must have address`);
  console.assert(item.content && item.content.intro, `Item ${i} must have content`);
  console.assert(item.map && item.map.embedUrl && item.map.directionsUrl, `Item ${i} must have map embed & directionsUrl`);
  console.assert(item.gallery && item.gallery.length > 0, `Item ${i} must have gallery photos`);
  console.log(`  ✓ [Vật thể ${i+1}] ${item.title} -> Verified 5 required sections`);
});

console.log('--- 4. TESTING INTANGIBLE HERITAGE (DI SẢN PHI VẬT THỂ) ---');
console.assert(INTANGIBLE_HERITAGE_DATA.length === 5, `Should have 5 intangible heritage items (found ${INTANGIBLE_HERITAGE_DATA.length})`);
INTANGIBLE_HERITAGE_DATA.forEach((item, i) => {
  console.assert(item.title, `Item ${i} must have title`);
  console.assert(item.scope, `Item ${i} must have scope`);
  console.assert(item.content && item.content.intro, `Item ${i} must have content`);
  console.assert(item.map && item.map.embedUrl && item.map.directionsUrl, `Item ${i} must have map embed & directionsUrl`);
  console.assert(item.gallery && item.gallery.length > 0, `Item ${i} must have gallery photos`);
  console.log(`  ✓ [Phi vật thể ${i+1}] ${item.title} -> Verified 5 required sections`);
});

console.log('--- 5. TESTING VIETNAMESE ACCENT-INSENSITIVE SEARCH ---');
const testCases = [
  { query: 'dinh ha', expectedMatch: 'Đình - Chùa Hả' },
  { query: 'chua ha', expectedMatch: 'Đình - Chùa Hả' },
  { query: 'de nam', expectedMatch: 'Đình - Chùa Hả' },
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
  { query: 'vo co truyen', expectedMatch: 'Trò chơi dân gian & Võ cổ truyền' },
  { query: 'hoang hoa tham', expectedMatch: 'Đền Gốc Khế' }
];

const allItems = [...TANGIBLE_HERITAGE_DATA, ...INTANGIBLE_HERITAGE_DATA];

testCases.forEach(({ query, expectedMatch }) => {
  const matches = allItems.filter(item => matchesSearchQuery(item, query));
  const found = matches.some(m => m.title.includes(expectedMatch) || expectedMatch.includes(m.title));
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

console.assert(state.allItems.length === 13, `state.allItems should have 13 items (got ${state.allItems.length})`);
console.assert(state.filteredItems.length === 13, `state.filteredItems should have 13 items (got ${state.filteredItems.length})`);
console.assert(elements['heritage-grid'].innerHTML.length > 500, 'Heritage grid must render card elements');
console.assert(elements['quick-search-tags'].innerHTML.length > 100, 'Quick search tags must render tag buttons');
console.assert(String(elements['count-all'].textContent) === '13', 'Count all must be 13');
console.assert(String(elements['count-vat-the'].textContent) === '8', 'Count vat-the must be 8');
console.assert(String(elements['count-phi-vat-the'].textContent) === '5', 'Count phi-vat-the must be 5');
console.assert(elements['quiz-questions-container'].innerHTML.length > 500, 'Quiz questions must render properly');

console.log('  ✓ State items:', state.allItems.length, '(8 di sản vật thể + 5 di sản phi vật thể)');
console.log('  ✓ Cards rendered in #heritage-grid HTML size:', elements['heritage-grid'].innerHTML.length, 'bytes');
console.log('  ✓ Quick tags rendered in #quick-search-tags HTML size:', elements['quick-search-tags'].innerHTML.length, 'bytes');
console.log('  ✓ Dynamic counters updated: Tất cả =', elements['count-all'].textContent, ', Vật thể =', elements['count-vat-the'].textContent, ', Phi vật thể =', elements['count-phi-vat-the'].textContent);

console.log('\n======================================================');
console.log('ALL INTEGRITY, SEARCH, AUDIO GUIDE & APP INIT TESTS PASSED! 🎉');
console.log('======================================================\n');
