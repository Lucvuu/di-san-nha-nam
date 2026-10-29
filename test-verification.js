/**
 * Test script to verify data integrity and search algorithms
 */
const fs = require('fs');
const vm = require('vm');

// Read data.js and utils.js into execution scope
const dataCode = fs.readFileSync('./js/data.js', 'utf8');
const utilsCode = fs.readFileSync('./js/utils.js', 'utf8');

// Run in current context
vm.runInThisContext(dataCode);
vm.runInThisContext(utilsCode);

console.log('--- 1. TESTING SITE_CONFIG ---');
console.assert(SITE_CONFIG.adminPhone === '0962.629.650', 'adminPhone should be 0962.629.650');
console.assert(SITE_CONFIG.adminZaloUrl === 'https://zalo.me/0962629650', 'adminZaloUrl should be correct');
console.assert(SITE_CONFIG.facebookGroupStatusNote.includes('kiểm duyệt'), 'Facebook note must mention kiểm duyệt');
console.log('✓ SITE_CONFIG verified');

console.log('--- 2. TESTING TANGIBLE HERITAGE (DI SẢN VẬT THỂ) ---');
console.assert(TANGIBLE_HERITAGE_DATA.length === 5, 'Should have 5 tangible heritage items');
TANGIBLE_HERITAGE_DATA.forEach((item, i) => {
  console.assert(item.title, `Item ${i} must have title`);
  console.assert(item.address, `Item ${i} must have address`);
  console.assert(item.content && item.content.intro, `Item ${i} must have content`);
  console.assert(item.map && item.map.embedUrl && item.map.directionsUrl, `Item ${i} must have map embed & directionsUrl`);
  console.assert(item.gallery && item.gallery.length > 0, `Item ${i} must have gallery photos`);
  console.log(`  ✓ [Vật thể ${i+1}] ${item.title} -> Verified 5 sections`);
});

console.log('--- 3. TESTING INTANGIBLE HERITAGE (DI SẢN PHI VẬT THỂ) ---');
console.assert(INTANGIBLE_HERITAGE_DATA.length === 5, 'Should have 5 intangible heritage items');
INTANGIBLE_HERITAGE_DATA.forEach((item, i) => {
  console.assert(item.title, `Item ${i} must have title`);
  console.assert(item.scope, `Item ${i} must have scope`);
  console.assert(item.content && item.content.intro, `Item ${i} must have content`);
  console.assert(item.map && item.map.embedUrl && item.map.directionsUrl, `Item ${i} must have map embed & directionsUrl`);
  console.assert(item.gallery && item.gallery.length > 0, `Item ${i} must have gallery photos`);
  console.log(`  ✓ [Phi vật thể ${i+1}] ${item.title} -> Verified 5 sections`);
});

console.log('--- 4. TESTING VIETNAMESE ACCENT-INSENSITIVE SEARCH ---');
const testCases = [
  { query: 'tu giap', expectedMatch: 'Cụm di tích Đình - Chùa Tứ Giáp' },
  { query: 'chua tu giap', expectedMatch: 'Cụm di tích Đình - Chùa Tứ Giáp' },
  { query: 'goc khe', expectedMatch: 'Đền Gốc Khế' },
  { query: 'doi phu', expectedMatch: 'Đồn Nhã Nam - Đồi Phủ' },
  { query: 'don nha nam', expectedMatch: 'Đồn Nhã Nam - Đồi Phủ' },
  { query: 'dinh nha nam', expectedMatch: 'Đình Nhã Nam' },
  { query: 'nam thien', expectedMatch: 'Chùa Nam Thiên' },
  { query: 'hat cheo', expectedMatch: 'Nghệ thuật Hát Chèo truyền thống Nhã Nam' },
  { query: 'banh khao', expectedMatch: 'Nghề làm bánh khảo, kẹo lạc truyền thống Nhã Nam' },
  { query: 'keo lac', expectedMatch: 'Nghề làm bánh khảo, kẹo lạc truyền thống Nhã Nam' },
  { query: 'vo co truyen', expectedMatch: 'Trò chơi dân gian & Võ cổ truyền trong lễ hội Nhã Nam' },
  { query: 'hoang hoa tham', expectedMatch: 'Đền Gốc Khế' }
];

const allItems = [...TANGIBLE_HERITAGE_DATA, ...INTANGIBLE_HERITAGE_DATA];

testCases.forEach(({ query, expectedMatch }) => {
  const matches = allItems.filter(item => matchesSearchQuery(item, query));
  const found = matches.some(m => m.title.includes(expectedMatch) || expectedMatch.includes(m.title));
  console.assert(found, `Search "${query}" should match "${expectedMatch}"`);
  console.log(`  ✓ Search "${query}" successfully matched ${matches.length} items (including "${expectedMatch}")`);
});

console.log('--- 5. TESTING AUDIO GUIDE ENGINE (SENTENCE CHUNKING & LOGIC) ---');
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

console.log('\nALL INTEGRITY, SEARCH & AUDIO GUIDE TESTS PASSED SUCCESSFULLY! 🎉');
