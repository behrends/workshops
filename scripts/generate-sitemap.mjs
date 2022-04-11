import fs from 'fs';

function generateSiteMap() {
  const baseUrl = 'https://workshops.progcontent.com';

  // prog, mobile, web-prog, etc.
  const topics = fs.readdirSync('pages').filter((fileOrFolder) => {
    return fs.statSync('pages/' + fileOrFolder).isDirectory();
  });

  // https://workshops.progcontent.com/prog etc.
  const pages = [...topics];

  // section folders: 01-intro, 04-arrays, etc.
  topics.forEach(function (dir) {
    const sections = fs
      .readdirSync(`pages/${dir}`)
      .filter((fileOrFolder) =>
        fs.statSync(`pages/${dir}/${fileOrFolder}`).isDirectory()
      );
    sections.forEach((section) => {
      const files = fs
        .readdirSync(`pages/${dir}/${section}`)
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => file.substring(0, file.indexOf('.')))
        .map((file) => `${dir}/${section}/${file}`);
      pages.push(...files);
    });
  });

  topics.forEach(function (dir) {
    const sections = fs
      .readdirSync('pages/' + dir)
      .filter((fileOrFolder) =>
        fs.statSync(`pages/${dir}/${fileOrFolder}`).isDirectory()
      );
    pages.push(...sections);
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>   
      </url>
      <url>
        <loc>${baseUrl}/impressum</loc>   
      </url>
      ${pages
        .map((page) => {
          return `
      <url>
        <loc>${baseUrl}/${page}</loc>
      </url>`;
        })
        .join('')}
   </urlset>
 `;
  fs.writeFileSync('public/sitemap.xml', sitemap);
}

generateSiteMap();
