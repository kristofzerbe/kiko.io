---
title: Create your own Deployment Server for .NET-based clients
subtitle: Implementing a self updating client/server environment
photograph:
  file: 19-07 Schottland-0490.jpg
  name: Fishermans Home
  socialmedia: /static/images/social-media/create-deployment-server-net-based-clients.png
syndication:
  - host: Mastodon
    url: 
---
Deploying .NET clients (WPF or WinForms) under Windows is usually easy, because copying the assemblies is enough, if the client machines have installed the required .NET framework. You can use specialized software packages like [Octopus Deploy](https://octopus.com/), which in the best case integrate into your build pipeline ... or you write your own mechanism to let update the clients itself.

All these approaches have something in common: they need a server on the one hand, to provide the update packages, and a client on the other hand, which retrieves these packages automatically. In this post I will show you how easy it is to implement this by your own, by using .NET and WCF (Windows Communication Foundation). #### WebAPI?

<!-- more -->

The cheapest way to implement this, would be a conversation like this:

**Client**: Hey Server, I have version 1.1.53. Do have something newer?  
**Server**: Yes, Client. Here are all files of the new version. Initiating transfer...

![Simple Deployment](Create-your-own-Deployment-Server-for-NET-based-clients/deploy-server-1.png)

Not very smart, because it would transfering always the complete (maybe huge) software package and doesn't consider unmodified files. Furthermore it wouldn't be possible to roll back a version if needed.

## Goal

Our deployment mechanism should work with some kind file comparing, in order to minimize the amount of transfered files and make it possible to even repair broken installations. A conversation could look like this:

**Client**: Hey Server, I have version 1.1.54 with the files A, B, and C, which looks like this.
**Server**: Ok, Client. I have the *different* version with a changed file A and two new files D and E. Initiating transfer ...

![Smart Deployment](Create-your-own-Deployment-Server-for-NET-based-clients/deploy-server-2.png)
