---
slug: Old-Sweetheart-Rediscovered
title: Old Sweetheart Rediscovered
subtitle: OutlookSignature lives on as Go application
date: 2022-06-21 13:21:15
photograph:
  file: D50_1092.jpg
  name: Nature Finds A Way
  socialmedia: /static/images/social-media/Old-Sweetheart-Rediscovered.png
categories:
  - Tools
tags:
  - Mail
  - Office
related:
  - Simplest-Console-File-Logger
  - Dopamine-How-Software-should-be
  - Checker-Plus-Gmail-in-better
syndication: 
- host: Twitter
  url:  https://twitter.com/kristofz/status/1539277770315943937
---

It seems like ages ago that I wrote a tool called **OutlookSignature** with Visual Basic 6 and put it on the web on my old German blog **zerbit.de**. But the [WayBackMachine](https://web.archive.org/web/20111116021952/http://www.zerbit.de/projekte/outlooksignature.aspx) says something different. Started in 2006, I released the last version 1.9 at the beginning of December 2008. Just 14 years ago...

![OutlookSignature on zerbit.de ten years ago](zerbit-outlooksignature.png)

The thing was a command line tool, that could be used to automatically generate signatures for Microsoft Outlook in the three formats TXT, RTF and HTML, for example centrally via a Windows login script for the entire organization. No hassle anymore for the users on creating an appropriate mail signature and no more stress for the marketing department in enforcing a uniform appearance. It was based on templates with placeholders for the data and configurable via an INI file. The data could come either from the ActiveDirectory via LDAP or from any database.

<!-- more -->

I had quite a large fan base and even years later I kept getting requests to integrate new features. The problem I faced after releasing the last version 1.9 in 2008 was on the one hand that Microsoft had fundamentally changed the handling of signatures in Outlook and on the other hand that VB6 was no longer really en-vogue, because everybody (and me too) was switching to VB.NET or C# and that would have meant a complete re-write for me. But there were already commercial alternatives to OutlookSignature at that time and I had turned to other projects, but it was available into 2012 until I decided to close my personal blog. However, to this day there are [one](https://www.outlook-stuff.com/tipps-tricks/problemloesungen/717-einheitliche-outlook-signaturen-zentral-im-firmennetz-verwalten.html) or [two](https://moximo.wordpress.com/2012/08/05/automatische-outlooksignaturen-mit-informationen-aus-der-ads/) websites where you can download or find information about it.

OutlookSignature was always freeware, but never Open Source, because of the fact, that I used some code, that did not come from me and was not approved for publication.

## Accidental Discovery of a Go-based Implementation

I own the domain *zerbit.de* until today and the other day I was looking on the web for some references to it and stumbled across a GitHub page with the title [**An open source reimplementation of Kristof Zerbe's (ZerbIT) "OutlookSignature"**](https://github.com/foobar0815/gosignature) ... What The Heck!?

I don't know who the user [*'foobar0815'*](https://github.com/foobar0815) is, but he/she is definitely German and had the patience to rebuild my tool in the modern language Go in 2019.

![GoSignature on GitHub](go-signature.png)

**GoSignature** uses the orginal INI configuation file, with the field mappings and all the other stuff, but the database connection feature. It works only with LDAP, which is quite enough today.

I have no idea about Go, but I will certainly look into it a bit in the near future and find out if this thing works. If you have already tried GoSignature or even if you are the author, please contact me. Would be fun to talk about it...

:)