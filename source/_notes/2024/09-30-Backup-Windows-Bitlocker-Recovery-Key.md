---
title: "#TIL | Backup Windows Bitlocker Recovery Key"
date: 2024-09-30
type: til
syndication: 
- host: Mastodon
  url: 
---

Even Microsoft can screw up an update so badly that the box no longer starts, as was proven in July with KB 5040442. So it's good to at least have everything you need to tackle the problem. First and foremost, this includes the Bitlocker keys if the hard disks are encrypted.

To find out whether they are, look somewhere in the depths of the system settings or simply use the command line:

```txt
manage-bde -status
```

Reading the keys for hard disk D:, for example, and storing them on an external hard disk (here Y:) is similarly easy:

```txt
manage-bde -protectors -get d: > y:\backup\bitlocker.txt
```

If the machine was set up with a Microsoft account, the keys can also be found here: [https://account.microsoft.com/devices/recoverykey](https://account.microsoft.com/devices/recoverykey).

#windows #bitlocker #backup