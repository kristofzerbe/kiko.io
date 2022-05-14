---
slug: Thanks-Dropbox-but-I-m-off
title: Thanks Dropbox, but I'm off
subtitle: How to do homework or say goodbye to the market
date: 2022-05-13 19:57:43
photograph:
  file: 20-08 Mallorca-7134.jpg
  name: Boombox Reflections I
  link: https://500px.com/photo/1023572696
  socialmedia: /static/images/social-media/Thanks-Dropbox-but-I-m-off.png
categories:
  - Misc
tags:
  - Rant
related:
---

I'm a customer of Dropbox many, many years, a paying customer, and was always happy about the service, as it is fast and easy to use. No problems ... until now! Be aware ... this will be a rant :/

But first a step back:

Nowadays it is normal to work with different classes of devices: stationary PCs, different types of laptops, tablets and also smartphones. You start writing a text on your laptop at home in the garden, have to interrupt it because of an appointment and continue writing on your tablet on your way, only to finish it at home on your PC, because it has started to rain. All of these used devices to write the text may have a different hard- and software configuration, but today we have synchronisation services like Dropbox, OneDrive, GoogleDrive and man others, which ensures that the same version of the text is available at all times at all devices.

To me it is obvious that software manufacturers cannot support every operating system, but I can expect that if they support a particular OS, they will do so on any hardware that the OS manufacturer also supports!

## What has happened...

I have similar hardware as described above, but with a gap: a Windows tablet. I have one with Android and manage my synchronization with a tool called [DropSync](https://play.google.com/store/apps/details?id=com.ttxapps.dropsync&hl=de&gl=US), but due to limited disc space I can't sync bigger projects with thousands of files, like this blog. Whenever I want to continue writing an article on the road, I download the corresponding MD file and then upload it again afterwards. A bit cumbersome. Since the first appearance of Microsoft's Surface several years ago, I thought this type of hardware, which includes the same OS I'm using all the time - Windows - could be close my device gap and a couple of days ago, I put a bunch of Euros in the hand of a local dealer to finally close it with a Surface Pro X. 256GB SSD, 16GB RAM and the size of a sheet of paper should be good to work on stuff while on the road.

As with any new piece of hardware, I began to install my setup, [essential tools that I use very often](/about). This included Dropbox, of course ... with an unexpected result.

<!-- more -->

While all the tools installed without a murmur, Dropbox bitched by saying that my device is not compatible with this version of the Dropbox client and that I should install the [Dropbox S Mode](https://apps.microsoft.com/store/detail/dropbox-for-s-mode/9WZDNCRFJ0PK) app via the Windows Store instead. Yes sure, a Surface has an ARM processor instead of an x32/x64 from Intel or AMD, but what's the problem? Every single tool in my list works with Windows 10 under ARM, but not Dropbox? I know quite well how to compile code for "Any CPU"...

To say it loud and clear: the UWP app "Dropbox S Mode" is a disgrace! Not only does it use a technology that Microsoft is just saying goodbye to, no, it also offers less functionality than the actual Dropbox website. Folders cannot be downloaded as a whole, but only individual files, and a synchronization of some kind has been completely omitted. The thing is really just dirt. This kind of software is for grannies who already have a hard time holding a mouse, but not for power users, with several gigabytes of data!

I don't let something like that sit on me so easily, but tried to find a trick via some research how to get the Dropbox client to work under ARM after all.  And on Dropbox's own forum alone, I found a bunch of posts on the topic:

* [Is Windows 10 on ARM going to be compatible with the Dropbox desktop app?](https://www.dropboxforum.com/t5/Dropbox-installs-integrations/Is-Windows-10-on-ARM-going-to-be-compatible-with-the-Dropbox/td-p/385120)
* [Can I have the desktop app installed on my Surface Pro X?](https://www.dropboxforum.com/t5/Dropbox-installs-integrations/Can-I-have-the-desktop-app-installed-on-my-Surface-Pro-X/td-p/370956/page/7)
* [Dropbox client for Windows 11 ARM?](https://www.dropboxforum.com/t5/Dropbox-installs-integrations/Dropbox-client-for-Windows-11-ARM/td-p/559111)
* [Can't install the desktop app on a new PC](https://www.dropboxforum.com/t5/Dropbox-installs-integrations/Can-t-install-the-desktop-app-on-a-new-PC/td-p/431247)

The oldest post I have found here was from 2019. Dropbox, you are not able to port your code to ARM within at least 3 years and the only answer you have for your paying users is *by a regular computer*. Are you nuts? Are you begging to go under or be bought by one of the big fish due to management incompetence? New Dropbox features like Paper, Capture or Replay are nice ones, but whenever a company neglects its base, the reason why became big, it is close to the abyss. Best examples are [Lego](https://knowledge.wharton.upenn.edu/article/innovation-almost-bankrupted-lego-until-it-rebuilt-with-a-better-blueprint/) and Marvel.

## A New Start

I was aware of OneDrive (formerly SkyDrive) since it was launched 2007, as Microsoft tried to counter the success of Dropbox, but it had its pitfalls and wasn't running so fluffy as the original. 15 years later, you can hardly resist the sync software from Redmont, because it is always included in everything that has Windows on it, but it has also become decisively better and more stable. The ARM disaster of Dropbox has now moved me to switch to OneDrive. I'm writing this article on my Surface tablet right now, and whenever I press CTRL-S, OneDrive syncs the MD file to my other machines.

At the end of the day, we're all about one thing: Convenience, and if you don't meet that standard (or abuse it), you die. Good Luck Dropbox ...