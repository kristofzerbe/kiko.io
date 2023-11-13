---
slug: Experimenting-with-the-font-LEXEND
title: Experimenting with the font LEXEND
subtitle: Easier reading for users and more beautiful typography
date: 2023-11-12 18:24:00
photograph:
  file: 22-08 Bretagne-Jersey-0920.jpg
  name: Watergate 9
  socialmedia: /static/images/social-media/Experimenting-with-the-font-LEXEND.png
categories:
  - UI/UX
tags:
  - CSS
  - Theming
related:
  - Get-and-use-a-dominant-color-that-matches-the-header-image
  - Pagefind-UI-and-URL-Parameters
  - The-State-of-the-Blog
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/111403133122810943
---

A few weeks ago, a blog entry (I can't remember which one) drew my attention to a font called [**LEXEND**](https://www.lexend.com/). In this article, the author also went into the scientific background of the font, which was developed to simplify reading and thus support those with reading difficulties. The website [lexend.com](https://www.lexend.com/), operated by The Lexend Group, therefore also advertises the font with all kinds of reading statistics, although it is open source and is also freely available via Google Fonts.

![Lexend](Experimenting-with-the-font-LEXEND/lexend.png)

I simply liked the font style and wanted to try it out on this blog, which has always used the [Open Sans](https://www.opensans.com/) font. It was harder than I thought...

<!-- more -->

---

## The Download Odyssey

At the bottom of the one-pager website lexend.com there is a form for the first name and e-mail address and a button "Subscribe & Send me these Fonts". Okay ... Seriously? Fuel for the spam machine? But my spam filter seems to be good enough and so I had the mail sent to me, only to be offered a file called ``readexpro-master.zip`` for download via the tracker button in the mail called "Download the Latest Fonts". Again ... Seriously? I expect the Lexend font files and I get something else, without any hint or description? How quickly do the people at The Lexend Group want to destroy their reputation on the net? Where was the UNSUBSCRIBE link in the mail again?  
But of course I could have used the less prominent [link to Google Fonts](https://fonts.google.com/?query=lexend) below the sample image in the mail, which actually leads to the expected font. But what the heck is ReadExPro? Research...

The font was designed in 2018 by Bonnie Shaver-Troup and Thomas Jockin and is based on the Quicksand project by Andrew Paglinawan, which was initiated in 2008 and improved by Thomas Jockin for Google Fonts in 2016. However, lexend.com only mentions Shaver-Troup and her team, who started working on Lexend with Google in 2017. In 2021, Thomas Jockin forked the project and worked with Nadine Chahine on an expansion for Arabic and renamed the font **Readex Pro**.

Ah ... ok. And why doesn't anyone tell you that on the Lexend site? So Lexend is only one half of the coin and Readex Pro makes it a whole? Why two names for it? And why do you get one when you expect the other? Mysterious and, in times of all kinds of dangers on the Internet, simply bordering on the dubious.

But unfortunately this is not the end of the inconsistencies. Since the files in my download of ReadEx Pro are quite large and I have no need for Arabic characters, I downloaded the Lexend font package from [**Google Fonts**](https://fonts.google.com/specimen/Lexend), which ONLY contains TTF files and no WOFF2 (Webfonts), the compressed version. Google itself writes the following in its own [Glossary of Web Fonts](https://fonts.google.com/knowledge/glossary/web_font), but then refrains from supplying them? Another: Seriously?

> WOFF (and its successor WOFF2) are compressed file formats created specifically for web fonts. Although regular OpenType fonts (TTF and OTF files) can be used as web fonts, such usage is not recommended as it usually contravenes licence agreements-and the files are significantly larger.

However, if you embed the font directly from Google Fonts instead of downloading it, only WOFF2 is delivered and TTF is out of the picture. It may be a consistent approach by Google to offer as much as possible only online in order to be able to better analyse the traffic behind it, but especially in Germany, where a [wave of warnings](https://inplp.com/latest-news/article/the-year-of-google-fonts-warning-letters) has swept over website operators in the last two years precisely because of this data collection via Google Fonts, this leaves a bitter aftertaste and forces developers to do additional work where it would not be necessary.

### Convert TTF to WOFF2

A short detour ...

The Web Open Font Format (WOFF) has been around since 2012. The second version (WOFF2), in which the extremely efficient Brotli compression method is used, was drafted in 2014. All browsers support WOFF2 nowadays, so there is no longer any need to include WOFF, as is often still the case. The same applies to other historical and dead formats EOT and SVG.

So if you have a font as TTF and want to use it on the web, you can either use the [open source compression from Google](https://github.com/google/woff2) on the command line or you can use a free online compressor such as the one from [Yabe Webfonts](https://webfont.yabe.land/en/misc/convert-ttf-woff2/).

To include the font in your CSS, you ONLY need the following code for modern browsers. If you have to support old favorites like IE 8 or similar, you have completely different problems anyway and should think about changing jobs.

```css
@font-face {
  font-family: 'MyWebFont';
  src: url('myfont.woff2') format('woff2');
}
```

---

But back to Lexend and a download that works. All fonts on Google Fonts can also be found on **GitHub** and so there is also a repository for Lexend: [**googlefonts/lexend**](https://github.com/googlefonts/lexend). In it you will find both TTF and WOFF2 files, at least for the standard font Lexend, although not for the variants (Deca, Lexa, Giga etc.), which I don't need for my part anyway.

```txt
\lexend-main\fonts\lexend

+---ttf
      Lexend-Black.ttf
      Lexend-Bold.ttf
      Lexend-ExtraBold.ttf
      Lexend-ExtraLight.ttf
      Lexend-Light.ttf
      Lexend-Medium.ttf
      Lexend-Regular.ttf
      Lexend-SemiBold.ttf
      Lexend-Thin.ttf
       
+---variable
      Lexend[HEXP,wght].ttf
       
+---webfonts
      Lexend-Black.woff2
      Lexend-Bold.woff2
      Lexend-ExtraBold.woff2
      Lexend-ExtraLight.woff2
      Lexend-Light.woff2
      Lexend-Medium.woff2
      Lexend-Regular.woff2
      Lexend-SemiBold.woff2
      Lexend-Thin.woff2
```

You might have noticed in the files list, that there are **no italic or oblique faces. There is a reason for this, because there are currently none for Lexend. Although there is a corresponding GitHub issue ([Update Lexend with Italics
](https://github.com/google/fonts/issues/4237)), but it hasn't really been going anywhere for over a year. Richard Hriech did publish a cursive variant called [LexendItalic](https://github.com/richardhriech/LexendItalic) last year, but the project looks more like a quick fix created within a day and therefore I haven't tried it out.  
However, the absence does not bother me, because according to the W3C, the browser mimics the so-called sloping effect if it cannot find an appropriate font. I think it does this quite well and saves me having to work with additional font files.

---

## The Integration Madness

Let's get straight to the point: My difficulties in using Lexend here on kiko.io were entirely homemade. Integrating the font made me realize all the CSS mistakes I've made in recent years, because Lexend has a significantly different character spacing than OpenSans I've been using so far. It has never been a good idea to lean too heavily on typography when designing layouts. The careless mixing of REM and PX was also my downfall. Everything looked pretty shitty ... and gave me the incentive to refactor the entire CSS (or Stylus), regardless of whether I would continue to use Lexend or not.

After many days of standardising, dismantling, recalculating, rewriting and also throwing away, the site had a completely new and better look for me, although (mostly) nothing had changed in the basic structure. The Lexend font, which I find much more suitable, also contributed to this and so I will leave it like that. Whether you can now read my posts faster, as the font promises, is for others to judge.

<button class="button" id="fontToggle" onclick="fontToggle();">Toggle to Open Sans</button>

<script>
  let bFontToggle = false;
  function fontToggle() {
    if (bFontToggle === false) {
      document.getElementById("body").style.fontFamily = "Open Sans";
      document.getElementById("body").style.fontWeight = 400;
      document.getElementById("fontToggle").textContent = "Reset to Lexend";
    } else {
      window.location.reload();
    }
    bFontToggle = !bFontToggle;
  }
</script>

---

## More Info

- [lexend.com](https://www.lexend.com/)
- [Lexend Italic Version](https://www.reddit.com/r/kindle/comments/zwdvil/lexend_italic_version_see_in_comments/?rdt=57956)
- [How to Convert a TTF Variable Font to WOFF2 for Improved Web Performance](https://medium.com/@ace_studio/how-to-convert-a-ttf-variable-font-to-woff2-for-improved-web-performance-3a89da8d3b04)
- [How To Convert Variable TTF Font Files To WOFF2](https://henry.codes/writing/how-to-convert-variable-ttf-font-files-to-woff2/)