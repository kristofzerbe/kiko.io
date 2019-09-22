---
title: 'How-To: Visual Studio Database Project and ADSI'
date: 2019-09-17 17:03:00
updated: 2019-09-22 12:45:00
tags: 
    - ADSI
    - Visual Studio
    - Database Project
categories: 
    - SQL
---
If you are working with a database project and try to work with data from the Active Directory via a linked server, you have the problem that you have to announce the data structure of the AD data in order to get the project compiled.

### Linking to the Active Directory

First of all you have to connect your SQL Server to the AD permanently, via following SQL script:

    USE [master]
    GO
    EXEC master.dbo.sp_addlinkedserver @server = N'ADSI', 
        @srvproduct=N'Active Directory Service Interfaces', 
        @provider=N'ADSDSOObject', 
        @datasrc=N'adsdatasource'
    
    EXEC master.dbo.sp_addlinkedsrvlogin @rmtsrvname=N'ADSI',
        @useself=N'False',
        @locallogin=NULL,
        @rmtuser=N'mydomain\myadminuser',
        @rmtpassword='mypassword'
    GO
    
    EXEC master.dbo.sp_serveroption @server=N'ADSI', 
        @optname=N'collation compatible', @optvalue=N'false'
    GO
    EXEC master.dbo.sp_serveroption @server=N'ADSI', 
        @optname=N'data access', @optvalue=N'true'
    GO
    EXEC master.dbo.sp_serveroption @server=N'ADSI', 
        @optname=N'dist', @optvalue=N'false'
    GO
    EXEC master.dbo.sp_serveroption @server=N'ADSI', 
        @optname=N'pub', @optvalue=N'false'
    GO
    EXEC master.dbo.sp_serveroption @server=N'ADSI', 
        @optname=N'rpc', @optvalue=N'false'
    GO
    EXEC master.dbo.sp_serveroption @server=N'ADSI', 
        @optname=N'rpc out', @optvalue=N'false'
    GO
    EXEC master.dbo.sp_serveroption @server=N'ADSI', 
        @optname=N'sub', @optvalue=N'false'
    GO
    EXEC master.dbo.sp_serveroption @server=N'ADSI', 
        @optname=N'connect timeout', @optvalue=N'0'
    GO
    EXEC master.dbo.sp_serveroption @server=N'ADSI', 
        @optname=N'collation name', @optvalue=null
    GO
    EXEC master.dbo.sp_serveroption @server=N'ADSI', 
        @optname=N'lazy schema validation', @optvalue=N'false'
    GO
    EXEC master.dbo.sp_serveroption @server=N'ADSI', 
        @optname=N'query timeout', @optvalue=N'0'
    GO
    EXEC master.dbo.sp_serveroption @server=N'ADSI', 
        @optname=N'use remote collation', @optvalue=N'true'
    GO
    EXEC master.dbo.sp_serveroption @server=N'ADSI', 
        @optname=N'remote proc transaction promotion', @optvalue=N'true'
    GO

### Fetching ADSI data  

To get data, you use ``OpenQuery`` against the Linked Server.
In order to get only persons and no system accounts, you should filter out all users,which has no firstname (``givenName``) or lastname (``sn``):

    SELECT 
        UserPrincipalName, 
        DisplayName, 
        sAMAccountName AS [SamAccountName], 
        sn AS [LastName], 
        givenName AS [FirstName], 
        title AS [Title], 
        Mail as [MailAddress],
        department AS [Department],
        l AS [Location], 
        postalCode AS [PostCode], 
        streetAddress AS [Street],
        st AS [State]
    FROM OpenQuery(ADSI, '
        SELECT 
            UserPrincipalName, 
            DisplayName, 
            sAMAccountName, 
            sn, 
            givenName, 
            department,
            title, 
            Mail, 
            l, 
            postalCode, 
            streetAddress, 
            st
        FROM ''LDAP://mydomain.de/DC=mydomain,DC=de'' 
        WHERE objectClass =  ''User'' 
        AND objectCategory = ''Person'' 
        AND sn=''*'' 
        AND givenName = ''*'' 
    ')    

In most cases you're done with that ... except your organisation has more the 900 users!  
Then you have to split the fetch in several requests, because SQL Server quits with an error, when trying to read more than 900 records via ADSI.  

Best option is, to filter the ADSI statement by something like *'get all user starting with a to j'*, when you are sure, that in this case less than 900 records will be given back and repeat the statement several times and glue the data together via a ``UNION`` statement:

<pre>
<code>SELECT  
    UserPrincipalName,  
    DisplayName,  
    sAMAccountName AS [SamAccountName],  
    sn AS [LastName],  
    givenName AS [FirstName],  
    title AS [Title],  
    Mail as [MailAddress],  
    department AS [Department],  
    l AS [Location],  
    postalCode AS [PostCode],  
    streetAddress AS [Street],  
    st AS [State]  
FROM (  
    SELECT *  
    FROM OpenQuery(ADSI, '  
        SELECT  
            UserPrincipalName,  
            DisplayName,  
            sAMAccountName,  
            sn,  
            givenName,  
            department,  
            title,  
            Mail,  
            l,  
            postalCode,  
            streetAddress,  
            st  
        FROM ''LDAP://mydomain.de/DC=mydomain,DC=de''  
        WHERE objectClass =  ''User''  
        AND objectCategory = ''Person''  
        AND sn=''*''  
        AND givenName = ''*''  
        <strong>AND sAMAccountName &lt;= ''j''</strong>
    ')  

    <strong>UNION ALL</strong>  

    SELECT *  
    FROM OpenQuery(ADSI, '  
        SELECT <em>[...same as above]</em>  
        FROM ''LDAP://mydomain.de/DC=mydomain,DC=de''  
        WHERE objectClass =  ''User''  
        AND objectCategory = ''Person''  
        AND sn=''*''  
        AND givenName = ''*''  
        <strong>AND sAMAccountName &gt; ''j''</strong>  
        <strong>AND sAMAccountName &lt; ''p''</strong>  
    ')

    <strong>UNION ALL</strong>  

    SELECT *  
    FROM OpenQuery(ADSI,  '  
        SELECT <em>[...same as above]</em>  
        FROM ''LDAP://mydomain.de/DC=mydomain,DC=de''  
        WHERE objectClass =  ''User''  
        AND objectCategory = ''Person''  
        AND sn=''*'' AND givenName = ''*''  
        <strong>AND sAMAccountName &gt;= ''p''</strong>  
    ')  
) AD</code>
</pre>

When you store this as a VIEW, you can join it wherever you want on SQL Server:

<pre>
<code>CREATE VIEW [dbo].[vADUsers]
AS
    <em>[...SQL code from above]</em>

GO</code>
</pre>

### SQL Server Database Project

If you work with a SQL Server Database Project, to have the complete structure of your database available in a version control system, you will get some reference errors on compiling and publishing your newly added SQL-View ``vADUsers`` and some objects which rely on the View, because of following problems:

1. Project doesn't know the Linked Server `ADSI`
2. The structure (fields) of the data source is unknown

#### Declare the Linked Server

To show the Project that there is a Linked Server called ``ADSI``, just add following lines at the start of your view:

<pre>
<code><strong>sp_addlinkedserver 'ADSI'</strong>
<strong>GO</strong>

CREATE VIEW [dbo].[vADUsers]
AS
    <em>[...SQL code from above]</em></code>
</pre>

This mimics the adding of a Linked Server, but will be ignored by SQL Server on publish, because you already have a Linked Server with this name. The project is happy with it.

#### Declare the data structure

When you use the SQL-View ``vADUsers`` in a Stored Procedure for example, this object won't compile, because the project knows nothing about the fields of the ADSI data source. The SELECT in the view is not enough. You have to add an empty ``SELECT`` to the View ``vADUsers``, just for the declaration of the fields and without returning any records and join this via ``UNION`` with the other statements:

<pre>
<code>sp_addlinkedserver 'ADSI'
GO

CREATE VIEW [dbo].[vtADAllUsers]
AS

SELECT
    UserPrincipalName,
    DisplayName,
    sAMAccountName AS [SamAccountName],
    sn AS [LastName],
    givenName AS [FirstName],
    title AS [Title],
    Mail as [MailAddress],
    department AS [Department],
    l AS [Location],
    postalCode AS [PostCode],
    streetAddress AS [Street],
    st AS [State]
FROM (

    -- Fake SELECT to declare the structure of the view<strong>
    SELECT TOP 0
        '' UserPrincipalName,
        '' DisplayName,
        '' sAMAccountName,
        '' sn,
        '' givenName,
        '' department,
        '' title,
        '' Mail,
        '' l,
        '' postalCode,
        '' streetAddress,
        '' st

    UNION ALL</strong>

    SELECT *
    FROM OpenQuery(ADSI, '
        SELECT
            UserPrincipalName,
            DisplayName,
            sAMAccountName,
            sn,
            givenName,
            department,
            title,
            Mail,
            l,
            postalCode,
            streetAddress,
            st
        FROM ''LDAP://mydomain.de/DC=mydomain,DC=de''
        WHERE objectClass =  ''User''
        AND objectCategory = ''Person''
        AND sn=''*''
        AND givenName = ''*''
        AND sAMAccountName &gt;= ''j''  
    ')

    UNION ALL  

    SELECT *  
    FROM OpenQuery(ADSI, '  
        SELECT <em>[...same as above]</em>  
        FROM ''LDAP://mydomain.de/DC=mydomain,DC=de''  
        WHERE objectClass =  ''User''  
        AND objectCategory = ''Person''  
        AND sn=''*''  
        AND givenName = ''*''  
        AND sAMAccountName &lt; ''j''  
        AND sAMAccountName &gt; ''p''  
    ')

    UNION ALL  

    SELECT *  
    FROM OpenQuery(ADSI,  '  
        SELECT <em>[...same as above]</em>  
        FROM ''LDAP://mydomain.de/DC=mydomain,DC=de''  
        WHERE objectClass =  ''User''  
        AND objectCategory = ''Person''  
        AND sn=''*''  
        AND givenName = ''*''  
        AND sAMAccountName &lt;= ''p''  
    ')
) AD</code>
</pre>

Now, you can fetch data from Active Directory and store the code in a Database Project.

HAPPY CODING :)
