---
slug: Simplest-Console-File-Logger
title: Simplest Console File Logger
subtitle: How to implement your own logger with just a StringBuilder in C#
date: 2022-06-19 13:31:25
photograph:
  file: DSC_8817.jpg
  name: DJing II
  socialmedia: /static/images/social-media/Simplest-Console-File-Logger.png
categories:
  - Coding
tags:
  - .NET
  - Logging
  - Visual Studio
related:
  - Custom-Caller-Authentication-with-ASP-NET-Core-5-0-WebApi
  - Meaningful-automatic-versioning-with-T4
  - Spice-Up-Windows-Terminal
---

When you need to do a task in IT and don't need a fancy user interface, you usually turn to a console application or develop one. But no UI means not, that you don't want to get some information about the status of the running program. The means of choice in C#/.NET is then the output of certain values in the console via ``console.WriteLine()``.

But often these applications are supposed to run in the background or hidden, so that crashes or errors are not immediately noticeable if you don't have at least a rudimentary logging built in. Such logging is also useful for the later evaluation of program runs. For this reason pretty much all programs log in some way. Currently there an incredible number of logging frameworks available, that make it to the news every now and then, like [Log4Shell](https://en.wikipedia.org/wiki/Log4Shell) for Java.

The best known in the .NET area is Microsoft's own [ILogger (Microsoft.Extensions.Logging)](https://docs.microsoft.com/en-us/dotnet/core/extensions/logging), [log4net](https://logging.apache.org/log4net/), [NLog](https://nlog-project.org/) and [Serilog](https://serilog.net/). What they all have in common is, that they are highly flexible in terms of configuration, usage and storage of the logs. On the other hand, they are fat beasts, you have to learn to handle first and you have to deliver with the program always. The latter does not apply to the ILogger, but Microsoft has been known to complicate things so unnecessarily that it is almost no fun anymore.

Many times this overload is simply not necessary, when you just need a log file for each run of your console application. Let me show you, how to achieve this with a dead simple ``StringBuilder``...

<!-- more -->

Lets start in the ``Program.cs`` of a new .NET Core 6 console application. As you may know, in this version MS has changed the entry point ``static void Main(string[] args)``, which has existed for what feels like centuries, to the so-called **Top-Level Statements**, which means nothing else, that the entry point is now automatically generated ... and what most old-school developer think sucks, because you have little control over it anymore. But for this approach we need a global variable and therefore I've recreated ``Main`` like this:

```C# Program.cs
// TOP-LEVEL STATEMENTS
Main.Start(args);

// MAIN MODULE
static public class Main {

  static public void Start(string[] args) 
  {
    //...
  }

}
```

## Preparation of a small senseless console application

Let's implement a little bit of the '*features*' first, like a new class called ``DoSomething`` that does the actual job:

```C# DoSomething.cs
public class DoSomething
{
  public void Work(string param1)
  {
    //... doing heavy work with param1
  }

  public void MoreWork(string param2)
  {
    //... doing more work with param2
  }
}
```

Now let's process the command line arguments for running the app called **SimplestConsoleFileLogger** like this...

``SimplestConsoleFileLogger.exe param1:this param2:that``

First we create a new class for holding the parameters...

```C# Parameters.cs
public class Parameter
{
    public string Param1 = "";
    public string Param2 = "";
}
```

... and then we populate a new instance of it with the values from the console arguments and run the worker class:

```C# Program.cs
static public class Main {

  static Parameter PARAMETER = new Parameter();

  static public void Start(string[] args) 
  {
    //Process Arguments
    foreach (string arg in args)
    {
      var a = arg.Split(':');
      switch (a[0].ToUpper())
      {
        case "PARAM1": PARAMETER.Param1 = a[1]; break;
        case "PARAM2": PARAMETER.Param1 = a[1]; break;
        default: break;
      }
    }

    DoSomething ds = new DoSomething();
    ds.Work(PARAMETER.Param1);
    ds.MoreWork(PARAMETER.Param2);
  }
}
```

## The Logging

Now we have our pretty senseless app and we want to log the jobs of the worker class. First, we have to implement a global variable for holding the log messages and secondly a small method to simplify the handling of the log:

```C# Program.cs
static public class Main {

  ...

  static StringBuilder LOGDATA = new StringBuilder();

  public static void Log(params string[] args)
  {
    var msg = string.Join(" ", args).TrimEnd();
    LOGDATA.AppendLine(msg);
  }  

}
```

The ``Log`` methods gets an infinite number of arguments (ParamArray) to assemble a message to log. This we can use now in our worker class:

```C# DoSomething.cs
public class DoSomething
{
  public void Work(string param1)
  {
    //... doing heavy work with param1
    Main.Log("Heavy work done with result", "SUCCESS");
  }

  public void MoreWork(string param2)
  {
    //... doing more work with param2
    Main.Log("More work done with result", "SUCCESS");
  }
}
```

You can use ``Main.Log(...)`` wherever you want, because its globally available.

### Writing the log file

Last, but not least, we have to persist the log messages into a file. This should done just before the application ends. For writing the log, we use a ``StreamWriter`` object, which accepts our ``StringBuilder``, where the messages are stored in seperate lines. By checking the length of the StringBuilder ``LOGDATA``, we ensure that the log file is only written, when there is something to write.

```C# Program.cs
static public class Main {

  static public void Start(string[] args) 
  {
    ...

    HandleEnd();
  }

  static void HandleEnd()
  {
    if (LOGDATA.Length > 0)
    {
      string logFile = $"{DateTime.Now.ToString("u").Replace(":","-")}.log";
      string logFilePath = Path.Combine(Environment.CurrentDirectory, logFile);
      StreamWriter logStream = new StreamWriter(logFilePath, true, Encoding.UTF8);
      logStream.Write(LOGDATA);
      logStream.Close();
    }
  }
}
```

That's it. As you see, the important parts are the globally available ``StringBuilder`` and the persistance of the messages in a file at the end. With this you can customize the messages as fancy as you want and you don't need one of the logging beasts.

**Download the files via [Gist](https://gist.github.com/kristofzerbe/4f80cb67e5a3d65c0f7d528af493bf5c)**
