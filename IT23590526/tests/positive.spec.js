const { test, expect } = require('@playwright/test');


const scenarios = [
  { 
    id: 'Pos_Fun_0001', 
    name: 'Simple Past Tense Sentence', 
    input: 'mama gedhara giyaa', 
    expected: 'මම ගෙදර ගියා' 
  },
  { 
    id: 'Pos_Fun_0002', 
    name: 'Mixed Language', 
    input: 'mata help ekak karanna puluvandha?', 
    expected: 'මට help එකක් කරන්න පුලුවන්ද?' 
  },
  { 
    id: 'Pos_Fun_0003', 
    name: 'Convert compound sentence', 
    input: 'mama gedhara yanavaa, passe call ekak dhenna', 
    expected: 'මම ගෙදර යනවා, පස්සෙ call එකක් දෙන්න' 
  },
 
  {
    id: 'Pos_Fun_0004',
    name: 'Convert complex sentence',
    input: 'oyaa enavaa nam api yamu',
    expected: 'ඔයා එනවා නම් අපි යමු'

  },
  {
    id: 'Pos_Fun_0005', 
    name: 'Convert interrogative sentence', 
    input: 'oyaa ennee kavadhdha? ', 
    expected: 'ඔයා එන්නේ කවද්ද?' 
  },
 
  {
    id: 'Pos_Fun_0006',
    name: 'Convert imperative sentence',
    input: 'vahaama enna',
    expected: 'වහාම එන්න'
  },
    {
    id: 'Pos_Fun_0007', 
    name: 'Convert positive sentence', 
    input: 'mama ehema karanavaa ', 
    expected: 'මම එහෙම කරනවා' 
  },
 
  {
    id: 'Pos_Fun_0008',
    name: 'Convert negative sentence',
    input: 'mama ehema karanne naehae',
    expected: 'මම එහෙම කරන්නේ නැහැ'
  },
   {
    id: 'Pos_Fun_0009', 
    name: 'Convert polite phrasing', 
    input: 'karuNaakaralaa mata podi udhavvak karanna ', 
    expected: 'කරුණාකරලා මට පොඩි උදව්වක් කරන්න' 
  },
  {
    id: 'Pos_Fun_0010', 
    name: 'Convert frequent expression', 
    input: 'mata baya hithenavaa ', 
    expected: 'මට බය හිතෙනවා' 
  },
 
  {
    id: 'Pos_Fun_0011',
    name: 'Convert repeated word emphasis',
    input: 'hari hari lassanayi',
    expected: 'හරි හරි ලස්සනයි'
  },
   
 
  {
    id: 'Pos_Fun_0012',
    name: 'Convert past tense',
    input: 'api iye game ekak gahuvaa',
    expected: 'අපි ඉයෙ game එකක් ගහුවා'
  },
   {
    id: 'Pos_Fun_0013', 
    name: 'Convert present tense', 
    input: 'mama dhaen vaeda karanavaa ', 
    expected: 'මම දැන් වැඩ කරනවා' 
  },
 
  {
    id: 'Pos_Fun_0014',
    name: 'Convert future tense',
    input: 'mama heta enavaa',
    expected: 'මම හෙට එනවා'
  },
  {
    id: 'Pos_Fun_0015', 
    name: 'Convert mixed-language question', 
    input: 'heta Zoom meeting ekak thiyenavadha?', 
    expected: 'හෙට Zoom meeting එකක් තියෙනවද?' 
  },
 
  {
    id: 'Pos_Fun_0016',
    name: 'Convert exclamatory sentence',
    input: 'eLa machQQ!',
    expected: 'එළ මචං!'
  },
  {
    id: 'Pos_Fun_0017', 
    name: 'Convert a short daily greeting phrase', 
    input: 'aayuboovan!', 
    expected: 'ආයුබෝවන්!' 
  },
 
  {
    id: 'Pos_Fun_0018',
    name: 'Convert complex sentence',
    input: 'mama ehema karannee naehae.',
    expected: 'මම එහෙම කරන්නේ නැහැ.'
  },
   {
    id: 'Pos_Fun_0019', 
    name: 'Convert compound sentence', 
    input: 'mata nidhimathayi.', 
    expected: 'මට නිදිමතයි.' 
  },
 
  {
    id: 'Pos_Fun_0020',
    name: 'Convert short question sentence',
    input: 'eyaa enavadha?',
    expected: 'එයා එනවද?'
  },
   {
    id: 'Pos_Fun_0021', 
    name: 'Convert mixed-language sentence', 
    input: 'mama Colombo giyaa', 
    expected: 'මම Colombo ගියා' 
  },
 
  {
    id: 'Pos_Fun_0022',
    name: 'Convert simple sentence',
    input: 'hari lassanama dheyak',
    expected: 'හරි ලස්සනම දෙයක්'
  },
   {
    id: 'Pos_Fun_0023', 
    name: 'Convert polite request sentence	', 
    input: 'karuNaakaralaa mata kiyalaa dhenna puLuvandha?', 
    expected: 'කරුණාකරලා මට කියලා දෙන්න පුළුවන්ද?' 
  },
 
  {
    id: 'Pos_Fun_0024',
    name: 'Convert sentence with numbers and time	',
    input: 'mama parakku vunee maarga thadhabadhaya nisaa',
    expected: 'මම පරක්කු වුනේ මාර්ග තදබදය නිසා'
  },
  



];

for (const scenario of scenarios) {
  test(`${scenario.id}: ${scenario.name}`, async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');

    // Input: Singlish text box [cite: 303]
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.pressSequentially(scenario.input, { delay: 30 });

    // Output: The specific results div we found in your DevTools
    const outputDiv = page.locator('div.whitespace-pre-wrap.overflow-y-auto').first();

    // Verification: Real-time update check [cite: 372, 392]
    await expect(outputDiv).not.toBeEmpty({ timeout: 10000 });
    
    const actualOutput = await outputDiv.innerText();
    console.log(`TC ID: ${scenario.id} | Actual: ${actualOutput}`);

    // Requirements check: Save a screenshot for your report evidence
    await page.screenshot({ path: `screenshots/${scenario.id}.png` });

    // Status Check
    // Note: For Neg_Fun tests, you might expect the output to be messy
    if (scenario.id.startsWith('Pos')) {
        expect(actualOutput.trim()).toBe(scenario.expected);
    }
  });
}