import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { CLASS_1_WORDS } from '../src/data/class1Words';
import { AUTH_JS_CODE, README_MD_CODE, generateStandaloneHtml } from '../src/utils/exportHtml';

async function main() {
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const htmlContent = generateStandaloneHtml();

  // Save standalone html to public
  const htmlPath = path.join(publicDir, 'cllo_ogden_app.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Saved standalone HTML to:', htmlPath);

  // Save auth.js to public
  const authPath = path.join(publicDir, 'auth.js');
  fs.writeFileSync(authPath, AUTH_JS_CODE, 'utf-8');
  console.log('Saved auth.js to:', authPath);

  // Create ZIP
  const zip = new JSZip();
  zip.file('index.html', htmlContent);
  zip.file('auth.js', AUTH_JS_CODE);
  zip.file('README.md', README_MD_CODE);

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
  const zipPath = path.join(publicDir, 'cllo_app_html.zip');
  fs.writeFileSync(zipPath, zipBuffer);
  console.log('Successfully created ZIP archive at:', zipPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
