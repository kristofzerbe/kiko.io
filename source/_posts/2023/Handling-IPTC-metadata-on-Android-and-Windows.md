---
slug: Handling-IPTC-metadata-on-Android-and-Windows
title: Handling IPTC metadata on Android and Windows
subtitle: 
date: 2023-10-28 14:00:55
photograph:
  file: 19-12 Kroatien-0045.jpg
  name: Split Junk
  socialmedia: /static/images/social-media/Handling-IPTC-metadata-on-Android-and-Windows.png
categories:
  - Photo
tags:
  - Android
  - Imaging
  - Metadata
  - Windows
related:
  - Image-Masonry-Tag-Plugin-for-Hexo
  - Automatic-Header-Images-in-Hexo
  - Folder-based-publishing-in-Lightroom
syndication:
  - host: Mastodon
    url: null
---

Most of the photos that I prepare for this website for example, I take with my big Nikon camera in RAW format and then edit them under Windows in **Adobe Lightroom Classic**. I always give the image a name and a few keywords, which are then also displayed on the photo page. Lightroom stores these as [**IPTC metadata**](https://www.iptc.org/standards/photo-metadata/) in the sidecar file and writes them, when exporting the image, directly into the header of the generated JPG file.

Now, however, I take pictures on the go with my Pixel smartphone and process them with the Google Photos Android app, and although the **IPTC** standard is only 30 years old, **Google doesn't support it!** You can give the image a "description" but it is not written into the image as a metadata, but is probably lying around somewhere on the Google servers.

<!-- more -->

![Google Photos Properties](google-photos-properties.png)

Downloading the image via Google Photos and giving it a name and a few keywords using on-board tools under Windows doesn't work either. There is the display of metadata in File Explorer under PROPERTIES and DETAILS, but editing TITLE or DESCRIPTION does not lead to IPTC metadata either, because these are **not supported by Microsoft**.

![Windows Explorer Properties Metadata](windows-explorer-properties-metadata.png)

Now you can ask yourself why IPTC is not important to the big companies, especially since it doesn't seem to be the problem technically, as Adobe and other companies prove, but so what ... I need a solution for my problem.

---

## Android Solution

For Android, there is probably no better image metadata app than [**EXIF Pro**](https://play.google.com/store/apps/details?id=net.xnano.android.exifpro). Besides the GALLERY, which lists all images on the smartphone, it also has a browser to load other images and it supports all metadata formats, including IPTC. All metadata can be edited, added or deleted if you want to save space, for example.

In my case, I just have to select the image in the app and use ADD in the IPTC section to select the ``ObjectName`` (for the name) and ``Keywords`` (for the keywords), enter the values and save the file. Done.

![Android EXIF Pro](android-exif-pro.png)

The app is based on the platform-independent Perl library [**ExifTool by Phil Harvey**](https://exiftool.org/) ... and as often as you research for ways to manipulate image metadata and whatever platform on the net, you will always come across Phil's tool. It is the gold standard in this area, so to speak. The list of supported formats is more than impressive and that of meta formats leaves nothing to be desired.

---

## Windows Solution

My problem described above is actually already solved with the Android solution, but under Windows there is this IPTC gap too and it can be filled with ... what do you think ... the ExifTool from Phil Harvey ;)

First of all, ExifTool is a pure command line tool and also comes without an installer or anything like that. For Windows there is a ZIP download with a single file inside: ``exiftool(-k).exe``. You save it in a folder of your choice and drag & drop an image file onto it and the metadata will be displayed in a terminal window. "-k" in the name means that ExifTool is called with this parameter, which makes sure that the terminal window stays open after processing.

For use in the command line it is best to copy the file and rename it to ``exiftool.exe`` or you can download the [installer variant by Oliver Betz](https://oliverbetz.de/pages/Artikel/ExifTool-for-Windows), which also makes a PATH entry to be able to call it from anywhere.

To add the name and the keywords to a file, the following call is sufficient:

```cmd (lines wrapped for readability)
exiftool 
  -overwrite_original
  -iptc:ObjectName="My New Name"
  -iptc:Keywords="keyword1,keyword2,keyword3"
  "C:\Pictures\MyImage.jpg"
```

Okay ... You don't buy Windows to use the command line. There is also a GUI called [ExifToolGUI for Windows v5.xx](https://exiftool.org/gui/) by Bogdan Hrastnik. It is already more than 10 years old and also comes without an installer, but it works great ... if you have understood the somewhat strange concept of workspaces and adding new fields to them, or if you have somehow muddled your way through.

![ExifTool GUI Editing](exiftool-gui-edit.png)

---

## Conclusion

I wish IPTC would not only be supported by the [handful of programs](https://www.iptc.org/standards/photo-metadata/software-support/), but like the technical meta format EXIF would become a standard in every image processing software, especially in the Big Five, who neglect it so far. But maybe my contribution here helped you to deal with it.
