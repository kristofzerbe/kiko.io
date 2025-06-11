---
slug: Comparison-of-Lightroom-Classic-Denoise-with-Topaz-Photo-AI
title: Comparison of Lightroom Classic Denoise with Topaz Photo AI
subtitle: Removing photo noise with AI, a personal experience
date: 2023-12-24 13:38:51
photograph:
  file: 23-05-Holland-0709.jpg
  name: Used Lenses
  socialmedia: /static/images/social-media/Comparison-of-Lightroom-Classic-Denoise-with-Topaz-Photo-AI.jpg
categories:
  - Photo
tags:
  - Lightroom
  - AI
  - Imaging
related:
  - Breton-Presets-for-Lightroom
  - Speyer-Automotive
  - Photo-Workflow-Re-Thought
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/111636128937846531
---

I don't like to call myself a "photographer", as my friends sometimes do when they are enthusiastic about one of my pictures, but rather a "photo enthusiast", because I know that I have no idea about real photography and am simply too lazy to take the perfect photo.

My current gear is a **Nikon D500** and the incredible **Tamron 18-400mm f/3.5-6.3 Di II VC HLD**, which allows me to capture everything reasonably well from very close up to far away. When traveling, where I take most of my pictures, I usually also have my **Nikkor 35mm Ff/1.8** and a fisheye lens with me, but a change of lens is often not appropriate. Not that my wife doesn't understand that I often fiddle with my camera for minutes on end to then make the strangest contortions for the best shooting angle while she simply enjoys the beautiful view, but I don't want to overtax her patience either. So I usually leave the Tamron on and live with "ISO Auto" to compensate for the lack of luminous intensity of this lens monster in low light conditions.

The problem that naturally arises from this is **considerable grain** and often also **motion blur**. If, like me, you usually take photos according to the motto "Point & Shoot", some of the best photos, in terms of the scenic representation, are simply a mess afterwards, even with massive use of my favorite image editing tool **Lightroom Classic**.

To address this problem when post-processing photos, it was a step forward when Adobe added an AI-supported denoise function to Lightroom Classic in one of the latest versions. However, this has often not satisfied me, as the setting options are limited and the results often overshoot the mark.

Yesterday, [Stefan Münz drew my attention to the "Topaz Photo AI"](https://indieweb.social/@StefanMuenz@vivaldi.net/111631806056217261) tool and I used the morning to find out whether the additional around 150 USD required for a license would make sense ... as a Christmas present to myself.

<!-- more -->

Here's a problematic photo I took handheld with the Tamron at f/4.5 and a shutter speed of 1/400 at the Heineken brewery this spring, as edited without denoising and published here. ISO ... (drum roll) ... 40.000!

{% photo_list
  "23-05-Holland-0184"
%}

---

## Lightroom Classic

My first attempt to improve the image in terms of denoising with Lightroom Classics (13.1) denoise feature, set to 80%:

{% image_compare
  "0184-lrc-denoise.jpg"
  "0184-lrc-denoise-80-result.jpg"
  "Lightroom Classic Denoise (AI)"
%}

Ouch ... the result is a bit too bold, even if the noise reduction and sharpness are excellent. You can certainly adjust the colors and contrast with Lightroom's on-board tools, but you have few options to influence the result in advance and, in my opinion, the AI is a little freewheeling here.

In another image, which is not as extreme in terms of color, Adobe's AI performs much better:

{% image_compare
  "0557-lrc-before.jpg"
  "0557-lrc-after.jpg"
  "Lightroom Classic Denoise (AI)"
%}

---

## Topaz Photo AI

My second attempt with Topaz Photo AI 2.2.1 (2023 Release), accessed via the available Lightroom plugin, by calling it via ``File`` > ``Plug-in Extras`` > ``Process with Topaz Photo AI``, which takes the original RAW photo:

{% image_compare
  "0184-topaz-denoise-before.jpg"
  "0184-topaz-denoise-after.jpg"
  "Topaz Photo AI"
%}

Wow ... definitely better and closer to the original, because the Topaz AI is a little more careful and also gives the user a lot to influence the result. You can choose between different models for both individual actions and, for example, limit yourself to the main motif in the image.

The result of the second image is as good as that of Lightroom:

{% image_compare
  "0557-topaz-before.jpg"
  "0557-topaz-after.jpg"
  "Topaz Photo AI"
%}

---

## Conclusion

With [Photo AI](https://www.topazlabs.com/topaz-photo-ai), Topaz has created a tool for Mac and Windows that can save a photo or two, and for a passionate photo enthusiast, that could be worth the $149 USD holiday sale ;)

![Activated...](topaz-activation.png)

Yeah, Santa ... I'm coming.
