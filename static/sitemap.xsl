<xsl:stylesheet version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>kiko.io Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          body {
            font-family: Helvetica, Arial, sans-serif;
            margin: 0;
            color: #555;
            background: #f1f1f1;
            font-size: 1rem;
          }
          header {
            position: fixed;
            width: 100%;
            background-color: rgb(4, 67, 145);
            height: 55px;
            line-height: 55px;
            text-align: center;
          }
          header a {
            color: #fff;
            text-transform: uppercase;
            font-weight: 600;
            font-family: 'Open Sans';
            font-size: 32px;
            text-decoration: none !important;
          }
          #content {
            max-width: 1220px;
            margin: 0 auto;
            padding: 55px 2rem;
          }
          h1 {
            margin: 2.5rem 0;
            text-transform: uppercase;
            font-size: 1.6rem;
            font-weight: 400;
          }
          a {
            color: #555;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          p {
            margin: 2rem 0rem;
            line-height: 1.5rem;
          }
          p a {
            color: #ff8c00;
          }
          table {
            table-layout: fixed;
            width: 100%;
            border: none;
            border-collapse: collapse;
          }
          tr:nth-child(odd) td {
            background-color: #fff;
          }
          tbody tr:hover td, 
          tbody tr:hover td a {
            color: #ff8c00;
          }
          th, td {
            padding: 0.5rem 0.6rem;
            text-align: left;
            font-weight: normal;
          }
          td a {
            word-break: break-all;
          }
        </style>
      </head>
      <body>
        <header><a href="/">kiko.io</a></header>
        <div id="content">
          <h1>Sitemap</h1>
          <p>
            This is a XML Sitemap, meant for consumption by search engines. You can find more information  
            on <a href="http://sitemaps.org" target="_blank" rel="noopener noreferrer">sitemaps.org</a>.
          </p>
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
            <table>
              <thead>
              <tr>
                <th><strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URL's</strong> ... https://kiko.io</th>
                <th style="width: 30%; text-align: right"><strong>Last Modified</strong></th>
              </tr>
              </thead>
              <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="sitemap:loc"/>
                <tr>
                  <td>
                    <xsl:variable name="itemURL"><xsl:value-of select="sitemap:loc"/></xsl:variable>
                    <a href="{$itemURL}"><xsl:value-of select="concat('/', substring-after(sitemap:loc, 'https://kiko.io/'))"/></a>
                  </td>
                  <td style="width: 30%; text-align: right">
                    <xsl:value-of select="substring(sitemap:lastmod,0,11)"/>
                  </td>
                </tr>
              </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>