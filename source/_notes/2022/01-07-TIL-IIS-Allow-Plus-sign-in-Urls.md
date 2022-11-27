---
title: "#TIL | IIS: Allow Plus sign in Url's"
date: 2022-01-07 12:00:00
---

Due to [security reasons](https://blogs.iis.net/thomad/iis7-rejecting-urls-containing) IIS only allows the ``+`` sign in query strings. But sometimes you may have an image file like ``landscape + night.jpg``, which won't be shown on your website.

The solution is, to allow unescaped plus signs in ``web.config`` and also do a rewrite to UrlDecode the requested Uri:

```xml
<configuration>
  <system.webServer>
    <security>
      <requestFiltering allowDoubleEscaping="True" />
    </security>
    <rewrite>
      <rules>
        <rule name="RewriteUserFriendlyURL1" stopProcessing="false">
          <match url="\+" />
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="{UrlDecode:{REQUEST_URI}}" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

[Source](http://n8v.enteuxis.org/2010/07/convincing-iis7-to-accept-urls-containing-plusses/)
