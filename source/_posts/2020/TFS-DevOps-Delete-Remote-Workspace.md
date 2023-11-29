---
alias: /categories/Tools/TFS-DevOps-Delete-Remote-Workspace/index.html
slug: TFS-DevOps-Delete-Remote-Workspace
title: 'TFS/DevOps: Delete Remote Workspace'
subtitle: null
date: 2020-02-28T00:00:00.000Z
photograph:
  file: 18-09-Kroatien-0061.jpg
  name: Abandonded Fitting
  socialmedia: /static/images/social-media/TFS-DevOps-Delete-Remote-Workspace.png
tags:
  - TFS/DevOps
  - Visual Studio
categories:
  - Tools
---

If you are working with freelance developers and Azure DevOps/TFS with TFVC (Team Foundation Version Control) in your company, maybe this will look familiar to you: You hire a new freelancer and you want to reuse the hardware, including the complete software setup, to bring him/her to work as fast and straightforward as possible. You set up a new Azure Devops account with all necessary permissions and you think you're done. No you are not...
<!-- more -->

Everytime a user connects to a Team Project on Azure DevOps via Visual Studio and gets the code, VS is creating a **remote workspace** on the server, with the **machine name** as default, therefor it is not enough to wipe the profile and any other legacies of the last user from the machine. You also have to remove the remote workspace. Otherwise you will get an error message like that, if you are using a unique file structure on the developers hard disc:

```txt
The working folder c://xxx is already in use by the workspace yyy;zzz on computer yyy
```

The variable xxx stands for the blocked folder, yyy for the workspace/machine name and zzz for the users id on Azure DevOps.

Unfortunately, there is no visual management console on Azure DevOps to manage your server workspaces, but there is a command line tool called **[tf.exe](https://docs.microsoft.com/en-us/azure/devops/repos/tfvc/use-team-foundation-version-control-commands?view=azure-devops)**.

The easiest way to get rid of the unused server workspace in 3 steps:

## Step 1

Run **Developer Command Prompt** with Administrator privileges from Visual Studio 2019 and login with your Azure DevOps credentials. If the Login dialog doesn't show up, force it by executing:

```txt
tf.exe workspace
```

## Step 2

Get a list of all remote workspaces available in your DevOps Collection by running the command:

```txt
tf.exe workspaces /computer:* /owner:* /format:xml > c:\temp\workspaces.xml
```

You can get a list of all your workspaces by running ``tf workspaces``, but the list only shows you the ``owner``, but not the necessary ``ownerid`` and ... it is nicer to have a file to search in.

## Step 3

Find the abandoned workspace in the list and note its ``name`` and  ``ownerid`` for running the command:

```txt
tf workspace /delete {WORKSPACE.name};{WORKSPACE.ownerid}
```

Now your new colleague can create his own workspace on the same machine.

## Update
In case you want to switch your own DevOps account to another and use the same folder as before, you can certainly delete the local workspace, but this wont help, because you are still logged in at TeamExplorer and the folder knows to whom it belongs. Solution is easy:

1. Quit Visual Studio
2. Rename folder in ``***_OLD`` or something
3. Create new folder with the same name
4. Enter ``C:\Users\YOUR-NAME\appdata\Local\Microsoft\Team Foundation\VS-VERSION\Cache`` and emtpy the folder to let Visual Studio forget who you are
5. Remove all your Remote Workspaces as described above
6. Start Visual Studio, connect in TeamExplorer to your TFS server and map the code to your folder

## More Info

{% moreinfo '{ "list": [
  [
    "Microsoft Docs", "Use Team Foundation version control commands",
    "https://docs.microsoft.com/en-us/azure/devops/repos/tfvc/use-team-foundation-version-control-commands?view=azure-devops"
  ],
  [
    "Stackoverflow", "How to remove TFS workspace mapping for another user",
    "https://stackoverflow.com/questions/28298771/how-to-remove-tfs-workspace-mapping-for-another-user/28299407"
  ]
]}' %}
