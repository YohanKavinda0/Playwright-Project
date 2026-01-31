const { test, expect } = require('@playwright/test');


const scenarios = [
  { 
    id: 'Neg_Fun_0001', 
    name: 'Incorrect word merging', 
    input: 'mamapansalyanavaa', 
    expected: 'මමපන්සල්යනවා'
  },
  { 
    id: 'Neg_Fun_0002', 
    name: 'Invalid / incomplete input', 
    input: 'magee ID eka nathi unaa.', 
    expected: 'මගේ ID එක නති උනා.' 
  },
  { 
    id: 'Neg_Fun_0003', 
    name: 'Gibberish / invalid characters', 
    input: '!! ?? "hi" ...', 
    expected: '!! ?? "හි" ...' 
  },
  { 
    id: 'Neg_Fun_0004', 
    name: 'Gibberish long sentence duplicate', 
    input: 'mama gedhara yanavaa, passe call ekak denn" ...', 
    expected: 'මමම ගෙදර යනවා, පස්සේ call එකක් දෙන්නදරයනවා' 
  },
  { 
    id: 'Neg_Fun_0005', 
    name: 'Gibberish long sentence duplicate', 
    input: 'oyaa hariyata???', 
    expected: 'ඔයා හරියට???' 
  },

   { 
    id: 'Neg_Fun_0006', 
    name: 'Gibberish long sentence duplicate', 
    input: 'mama!!! gedhara??? yanavaa.....', 
    expected: 'මම!!! ගෙදර??? යනවා.....' 
  },

   { 
    id: 'Neg_Fun_0007', 
    name: 'Gibberish long sentence duplicate', 
    input: 'ado enwa kiwaanm wren bw', 
    expected: 'ado එනwඅ කිwආන්ම් wren බw' 
  },
   { 
    id: 'Neg_Fun_0008', 
    name: 'Single Word Gibberish Mapping', 
    input: 'kiwaanm', 
    expected: 'කිwආන්ම්' 
  },
   { 
    id: 'Neg_Fun_0009', 
    name: 'Long unstructured paragraph', 
    input: 'mama adha gedhara yanavaa namuth office ekee vaeda godak thiyenavaa ethakota mama hari amaruyi kiyalaa hithenavaa namuth yanna oneda naedhdha kiyalaa', 
    expected: 'මම අද ගෙදර යනවා නමුත් office එකේ වැඩ ගොඩක් තියෙනවා එතකොට මම හරි අමරුයි කියලා හිතෙනවා නමුත් යන්න ඔනෙඩ නැද්ද කියලා' 
  },
    { 
    id: 'Neg_Fun_0010', 
    name: 'Multi-line input formatting issue', 
    input: 'mama gedhara yanavaa.\n\enne naddha?', 
    expected: 'මම ගෙදර යනවා.\n\ එන්නෙ නඩ්ද?' 
  },
 
 

];

for (const scenario of scenarios) {
  test(`${scenario.id}: ${scenario.name}`, async ({ page }) => {
    // 1. Navigate to the site
    await page.goto('https://www.swifttranslator.com/');

    // 2. Select the input area
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    
    // 3. Type the "wrong" input
    if (scenario.input !== '') {
        await inputArea.pressSequentially(scenario.input, { delay: 30 });
    } else {
        await inputArea.fill(''); // Handle empty case
    }

    // 4. Locate the output div
    const outputDiv = page.locator('div.whitespace-pre-wrap.overflow-y-auto').first();

    // 5. Wait for the translation to occur (using a short delay for stability)
    await page.waitForTimeout(2000); 
    
    const actualOutput = (await outputDiv.innerText()).trim();
    console.log(`TC ID: ${scenario.id} | Input: "${scenario.input}" | Actual: "${actualOutput}"`);

    // 6. Capture screenshot for evidence
    await page.screenshot({ path: `screenshots/${scenario.id}.png` });

    // 7. THE FIX: Direct assertion. 
    // If actualOutput is NOT EXACTLY equal to scenario.expected, the test FAILS.
    expect(actualOutput).toBe(scenario.expected);
  });
}