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
          @font-face {
            font-family: 'Open Sans';
            font-weight: 600;
            font-style: normal;
            font-display: swap;
            src: url("/css/fonts/opensans/opensans-semibold.woff2") format("woff2"), 
                 url("/css/fonts/opensans/opensans-semibold.ttf") format("truetype");
          }
          @font-face {
            font-family: 'Lexend';
            font-weight: 300;
            font-style: normal;
            font-display: swap;
            src: url("fonts/lexend/webfonts/Lexend-Light.woff2") format("woff2"),
                 url("fonts/lexend/ttf/Lexend-Light.ttf") format("truetype")
          }
          @font-face {
            font-family: "Lexend";
            font-weight: 400;
            font-style: normal;
            font-display: swap;
            src: url("/css//fonts/lexend/webfonts/Lexend-Regular.woff2") format("woff2"),
                 url("/css/fonts/lexend/ttf/Lexend-Regular.ttf") format("truetype")
          }
          :root {
            --color: #555;
            --back-color: #f1f1f1;
            --accent-color: #587307;
            --header-height: 55px;
          }
          body {
            margin: 0;
            color: var(--color);
            background: var(--back-color);
            font-family: "Lexend","Open Sans","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
            font-size: 1rem;
            font-weight: 300;
          }
          header {
            position: fixed;
            width: 100%;
            background-color: var(--accent-color);
            height: var(--header-height);
            line-height: var(--header-height);
            text-align: center;
          }
          header a {
            color: #fff;
            text-transform: uppercase;
            font-weight: 600;
            font-family: "Open Sans";
            text-decoration: none !important;
            font-size: 31px;
          }
          @media screen and (max-width: 479px) {
            header a {
              font-size: 25px;
            }
          }
          #content {
            max-width: 1220px;
            margin: 0 auto;
            padding-block: var(--header-height);
            padding-inline: 2rem;
          }
          @media screen and (max-width: 479px) {
            #content {
              padding-inline: 1.5rem;
            }
          }
          h1 {
            margin: 2rem 0;
            text-transform: uppercase;
            font-family: "Lexend";
            font-weight: 400;
            font-size: 1.6rem;
          }
          a {
            color: var(--color);
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          p {
            margin: 2rem 0rem;
            line-height: 1.5rem;
            font-size: 0.9rem;
          }
          p a {
            color: var(--accent-color);
          }
          table {
            table-layout: fixed;
            width: 100%;
            border: none;
            border-collapse: collapse;
            font-size: 1rem;
          }
          @media screen and (max-width: 479px) {
            table {
              font-size: 0.9rem;
            }
          }
          tr:nth-child(odd) td {
            background-color: #fff;
          }
          tbody tr:hover td, 
          tbody tr:hover td a {
            color: var(--accent-color);
          }
          th, td {
            text-align: left;
            font-weight: 300;
          }
          th {
            vertical-align: top;
          }
          td {
            padding: 0.5rem 0.6rem;
          }
          td a {
            word-break: break-all;
            display: inline-block;
            width: 100%;
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
                <th>
                  <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URL's</strong>
                  <div style="margin: 1rem 0 0.5rem">https://kiko.io ...</div>
                </th>
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