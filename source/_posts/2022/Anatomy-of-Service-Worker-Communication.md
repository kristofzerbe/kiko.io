---
slug: Anatomy-of-Service-Worker-Communication
title: Anatomy of Service Worker Communication
subtitle: Let your App communicate with its Service Worker
date: 2022-11-12 12:26:34
photograph:
  file: 22-05-Malta-8654.jpg
  name: Rocky Stairway
  socialmedia: /static/images/social-media/Anatomy-of-Service-Worker-Communication.png
categories:
  - Coding
tags:
  - JavaScript
  - PWA
  - SPA
related:
  - Application-Specific-Links-on-Windows-10
  - Implement-source-switch-for-SPA
  - Native-JavaScript-Multilanguage-Templating
syndication: 
- host: Mastodon
  url: https://indieweb.social/@kiko/109337328502493774
- host: Twitter
  url: https://twitter.com/kristofz/status/1591765769284878339
---

I have a SPA that works as a PWA, which means that in the background a service worker makes sure that the required files for the offline mode end up in the cache.

From time to time I also update the Service Worker, which defines which files it should keep offline and which not. Unfortunately, the app itself didn't get any of this because there was no communication channel for them to talk.

If you research this topic on the web, you have to dig through many architecture pages and documentations that have one thing in common: sometimes they just don't get to the point. So here are my 50 cents on the subject and my sample implementation.

<!-- more -->

## Preliminary Thoughts

In most examples I've read, the authors talk about code for the app itself and code for the Service Worker, but that falls short to me, because in my opinion there are THREE parts:

1. The **App**
2. The **Service Worker**
3. The **Service Worker Management**, which takes care of the proper registration and installation of the service worker

The last part of the code shouldn't be part of the app itself, in the meaning of SoC (Seperation of Concerns). It does not contribute to the functioning of the app.

---

## The App

Here's the general anatomy of my App:

```js app.js
var app = {
  'settings': { // some stuff on app settings
    ...
  },
  'pages': { // views of the SPA
    ...
  },
  'ui': { // some UI helper
    'dialog': function(msg, title) {
      // show the message in a toast, popup or elsewhere
    }
  },
  'starter': {
    'init': { // initializing of the app
      ...
    }
  }
}

window.app = app;
app.starter.init();
```

Nothing unlikely, as I guess. It is built according to the composite pattern and has one entry point, that is called at the end of the file after it is instantiated.

---

## The Service Worker

The Service Worker lives in its own JS file and its implementation is really straight forward:

```js service-worker.js
var cacheName = 'my-apps-cache-v1.2.3';

var appFiles = [
  // list of app relating files, that has to be handled
]

var excludeUrls = [ 
  // list if URL's that shouldn't be handled
]

self.addEventListener('install', function(e) {
  // on install, open the cache and add all appFiles
  ...
  
  //activate immediatly and dont wait for connected clients to disconnect
  self.skipWaiting();
}

self.addEventListener('activate', function(e) {
  // remove old caches

  //say to all clients: Now I'm responsible
  self.clients.claim();
}

self.addEventListener('fetch', function(e) {
  // intercept requests and serve the app files out of the cache
}
```

I won't go into the depth of my implementation here now, since it doesn't matter for the message exchange. It is only good for you to know that I have versioned the cache name to exchange it with new versions.

---

## The Service Worker Management

Now the management code for the Service Worker. It has to be loaded with the app code, because it is client code and later on it needs knowledge of the app.

```js sw-management.js
if('serviceWorker' in navigator) {

  navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {

      // detect Service Worker update available
      registration.addEventListener('updatefound', function() {

        if (registration.installing) {

          // detect install of new Service Worker
          registration.installing.addEventListener('statechange', function() {

            if (registration.waiting) {

              if (navigator.serviceWorker.controller) {
                // there is an existing controller that has been updated
                //TODO: Send a message to the app
              } else {
                // first install
              }

            }

          }
        }

      }

    }

}
```

---

## Lets Communicate...

In this setup, the communication code can be implemented. Let's do it as a round trip.

### 1. Client sends message to Service Worker

As ``sw-management.js`` represents our Service Worker management code, we add a little function to send a message in here:

```js sw-management.js
function sendMessageToServiceWorker(type, msg) {
  if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(
        {'type': type, 'msg': msg }
      );
  }
}
```

We define a type for the purpose of our communcation and a message itself. The function can be called wherever, like this:

```js
sendMessageToServiceWorker("TEST", "Hey, Service Worker");
```

### 2. Service Worker receives the message

In the Service Worker code we need to add a recipient:

```js service-worker.js
self.addEventListener('message', function(event) { 
  if (!event.data) return;
  
  if (event.data.type === 'TEST') {
    // do something regarding to the type and/or with the message
  }
}
```

### 3. ... and sends a message back to the client

What we want to do with the message depends what we want to achive, but in this example, just let's greet back:

```js service-worker.js
function sendMessageToClients(type, msg) {
  // as the SW can control multiple clients, we have to catch them all
  self.clients.matchAll({ includeUncontrolled: true })
      .then(function(clients) {
          for (const client of clients) {
              client.postMessage(
                {'type': type, 'msg': msg }
              );
          }
      });
}

self.addEventListener('message', function(event) { 
  if (!event.data) return;
  
  if (event.data.type === 'TEST') {
    sendMessageToClients(event.data.type, 'Hi Clients...');
  }
}
```

### 4. Client receives the answer from the Service Worker

In order to get messages from the Service Worker, we have to implement a receiver in the client also:

```js sw-management.js
if('serviceWorker' in navigator) {

  //... 'navigator.serviceWorker.register' stuff

  navigator.serviceWorker.addEventListener('message', function(event) {
    if (event.data) {
        // do something with the message from the Service Worker
    }
  });
}
```

### 5. ... and shows it in the app

As I pointed out earlier, that the management code has to be loaded alongside with the app code, it's a breeze to show the message:

```js app.js
var app = {
  ...

  'ui': { // some UI helper
    'dialog': function(msg, title) {
      // show the message in a toast, popup or elsewhere
    }
  }

  ...
}

window.app = app;
...
```

```js sw-management.js
if('serviceWorker' in navigator) {

  //... 'navigator.serviceWorker.register' stuff

  navigator.serviceWorker.addEventListener('message', function(event) {
    if (event.data) {
        app.ui.dialog.info(event.data.msg, 'Service Worker says...');
    }
  });
}
```

---

## The Update Message

With this infrastructure, everything is there to show a message, when the Service Worker is updated:

```js sw-management.js
if('serviceWorker' in navigator) {

  navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {

      // detect Service Worker update available
      registration.addEventListener('updatefound', function() {

        if (registration.installing) {

          // detect install of new Service Worker
          registration.installing.addEventListener('statechange', function() {

            if (registration.waiting) {

              if (navigator.serviceWorker.controller) {
                // there is an existing controller that has been updated

                app.ui.dialog.info('New version installed', 'Service Worker');

              } else {
                // first install
              }

            }

          }
        }

      }

    }

  ...

}
```

Important to point out, that the Service Worker side of the communication is not involved in this case, because only the client-side management code knows when a new version has to be installed.

---

## More Info

{% moreinfo '{ "list": [
  [ "Jake Archibald", "The service worker lifecycle",
  "https://web.dev/service-worker-lifecycle/" ],
  [ "Demian Renzulli & Andrew Guan", "Two-way communication with service workers",
  "https://web.dev/two-way-communication-guide/" ],
  [ "Adam Bar", "Handling Service Worker updates – how to keep the app updated and stay sane",
  "https://whatwebcando.today/articles/handling-service-worker-updates" ],
  [ "Felix Gerschau", "Service Worker Lifecycle Explained",
  "https://www.peterkroener.de/postmessage-zwischen-service-worker-und-clients/" ],
  [ "Felix Gerschau", "How to communicate with Service Workers",
  "https://felixgerschau.com/how-to-communicate-with-service-workers/" ],
  [ "Peter Kröner", "PostMessage zwischen Service Worker und Client(s) (GERMAN)",
  "https://www.peterkroener.de/postmessage-zwischen-service-worker-und-clients/" ]
]}' %}
