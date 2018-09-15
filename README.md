# Web_labs
<!DOCTYPE html>
<html>
  <head>
      <meta charset="utf-8">
    <title>Local Storage - Dive into HTML5</title>
      </head>
  <body leftmargin = "200" rightmargin = "200" topmargin = "150">
    
     <style>
      p {
        font-size: 19px;
        line-height: 160%;
      }
      ul {
        font-size: 19px;
      }
      pre {
        font-size: 17px;
      }
      blockquote {
        font-size: 19px;
        line-height: 160%;
      }
      a {color: #EB3B3B;}
    </style>  

    <h1 align="center"><font face="Bahnschrift"><strong style = "font-size: 70px; line-height: 80% ">№7 <br> 
    The Past, Present & Future of Local Storage for Web Applications </strong></font></h1>

  <h2 align="center"> Contents</h2>
     <style>
     .ul {color: #EB3B3B;
      text-align: center;
      list-style: none;     }
     </style>
    <ul class="ul">
      <li><a href="#divingin">Diving In</a></li>
      <li><a href="#history">A Brief History of Local Storage Hacks Before HTML5</a></li>
      <li><a href="#intro">Introducing HTML5 Storage</a></li>
      <li><a href="#using">Using HTML5 Storage</a></li>
      <li><a href="#track">Tracking Changes to the HTML5 Storage Area</a></li>
      <li><a href="#limit">Limitations in Current Browsers</a></li>
      <li><a href="#htmlst">HTML5 Storage in Action</a></li>
      <li><a href="#beyond">Beyond Named Key-Value Pairs: Competing Visions</a></li>
      <li><a href="#further">Further Reading</a></li>
    </ul>           
    
         <p align="center"><strong style = "font-size: 30px">❧</strong></p>
   
    <h1 id="divingin" align="center"><font face="Bahnschrift"><strong style = "font-size: 50px">Diving In</strong></font></h1> 
    <style>
    .firstimg
    {float: left;
    margin:  7px 7px 7px 0;}
  </style>     
     <p><img src="http://diveinto.html5doctor.com/i/aoc-p.png" width="100" height="100" class="firstimg"> ersistent local storage is one of the areas where native client applications have held an advantage over web applications. For native applications, the operating system typically provides an abstraction layer for storing and retrieving application-specific data like preferences or runtime state. These values may be stored in the registry, INI files, XML files, or some other place according to platform convention. If your native client application needs local storage beyond key/value pairs, you can embed your own database, invent your own file format, or any number of other solutions.</p> 
     <p> Historically, web applications have had none of these luxuries. Cookies were invented early in the web’s history, and indeed they can be used for persistent local storage of small amounts of data. But they have three potentially dealbreaking downsides:</p>
     <ul>
      <li>Cookies are included with every HTTP request, thereby slowing down your web application by needlessly transmitting the same data over and over </li>
      <li>Cookies are included with every HTTP request, thereby sending data unencrypted over the internet (unless your entire web application is served over SSL) </li>
      <li>Cookies are limited to about 4 KB of data — enough to slow down your application (see above), but not enough to be terribly useful </li>
    </ul>
    <p>What we really want is </p>
    <ul>
      <li>a lot of storage space </li>
      <li>on the client </li>
      <li>that persists beyond a page refresh </li>
      <li>and isn’t transmitted to the server </li>
    </ul>
    <p>Before HTML5, all attempts to achieve this were ultimately unsatisfactory in different ways. </p>
        <p align="center"><strong style = "font-size: 30px">❧</strong></p>

    <h1 id="history" align="center"><font face="Bahnschrift"><strong style = "font-size: 50px">A Brief History of Local Storage Hacks Before HTML5</strong></font></h1> 
    <p>In the beginning, there was only Internet Explorer. Or at least, that’s what Microsoft wanted the world to think. To that end, as part of the <a href="https://en.wikipedia.org/wiki/Browser_wars#The_first_browser_war"> First Great Browser Wars</a>, Microsoft invented a great many things and included them in their browser-to-end-all-browser-wars, Internet Explorer. One of these things was called <a href="https://msdn.microsoft.com/en-us/library/ms531078(v=VS.85).aspx"> DHTML Behaviors</a>, and one of these behaviors was called <a href="https://msdn.microsoft.com/en-us/library/ms531424(VS.85).aspx"> userData</a>. </p>
    <p>userData allows web pages to store up to 64 KB of data per domain, in a hierarchical XML-based structure. (Trusted domains, such as intranet sites, can store 10 times that amount. And hey, <a href="https://en.wikiquote.org/wiki/Bill_Gates#Misattributed"> 640 KB ought to be enough for anybody</a>.) IE does not present any form of permissions dialog, and there is no allowance for increasing the amount of storage available. </p>
    <p>In 2002, Adobe introduced a feature in Flash 6 that gained the unfortunate and misleading name of “Flash cookies.” Within the Flash environment, the feature is properly known as <a href="http://kb2.adobe.com/cps/161/tn_16194.html"> Local Shared Objects</a>. Briefly, it allows Flash objects to store up to 100 KB of data per domain. Brad Neuberg developed an early prototype of a Flash-to-JavaScript bridge called <a href="http://codinginparadise.org/weblog/2005/10/amass-ajax-massive-storage-system.html">AMASS</a> (AJAX Massive Storage System), but it was limited by some of Flash’s design quirks. By 2006, with the advent of <a href="https://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/flash/external/ExternalInterface.html"> ExternalInterface</a> in Flash 8, accessing LSOs from JavaScript became an order of magnitude easier and faster. Brad rewrote  AMASS and integrated it into the popular <a href="http://dojotoolkit.org/"> Dojo Toolkit</a> under the moniker <a href="http://api.dojotoolkit.org/jsdoc/HEAD/dojox.storage.manager"> dojox.storage</a>. Flash gives each domain 100 KB of storage “for free.” Beyond that, it prompts the user for each order of magnitude increase in data storage (1 Mb, 10 Mb, and so on). </p>
    <p>In 2007, Google launched Gears, an open source browser plugin aimed at providing additional capabilities in browsers. (We’ve previously discussed <a href="http://gearsblog.blogspot.com/2011/03/stopping-gears.html"> Gears</a> in the context of <a href="http://diveinto.html5doctor.com/geolocation.html#ie"> providing a geolocation API in Internet Explorer</a>.) Gears provides <a href="https://developers.google.com/?csw=1"> an API to an embedded SQL database</a> based on <a href="https://www.sqlite.org/index.html"> SQLite</a>. After obtaining permission from the user once, Gears can store unlimited amounts of data per domain in SQL database tables. </p>
    <p>In the meantime, Brad Neuberg and others continued to hack away on dojox.storage to provide a unified interface to all these different plugins and APIs. By 2009, dojox.storage could auto-detect (and provide a unified interface on top of) Adobe Flash, Gears, Adobe AIR, and an early prototype of HTML5 storage that was only implemented in older versions of Firefox. </p>
    <p>As you survey these solutions, a pattern emerges: all of them are either specific to a single browser, or reliant on a third-party plugin. Despite heroic efforts to paper over the differences (in dojox.storage), they all expose radically different interfaces, have different storage limitations, and present different user experiences. So this is the problem that HTML5 set out to solve: to provide a standardized API, implemented natively and consistently in multiple browsers, without having to rely on third-party plugins. </p>
    <p align="center"><strong style = "font-size: 30px">❧</strong></p>

    <h1 id="intro" align="center"><font face="Bahnschrift"><strong style = "font-size: 50px">Introducing HTML5 Storage</strong></font></h1>
    <p>What I will refer to as “HTML5 Storage” is a specification named <a href="https://w3c.github.io/webstorage/"> Web Storage</a>, which was at one time part of the HTML5 specification proper, but was split out into its own specification for uninteresting political reasons. Certain browser vendors also refer to it as “Local Storage” or “DOM Storage.” The naming situation is made even more complicated by some related, similarly-named, emerging standards that I’ll discuss later in this chapter. </p>   
    <p>So what is HTML5 Storage? Simply put, it’s a way for web pages to store named key/value pairs locally, within the client web browser. Like cookies, this data persists even after you navigate away from the web site, close your browser tab, exit your browser, or what have you. Unlike cookies, this data is never transmitted to the remote web server (unless you go out of your way to send it manually). Unlike <a href="#history"> all previous attempts</a> at providing persistent local storage, it is implemented natively in web browsers, so it is available even when third-party browser plugins are not. </p>
    <p>Which browsers? Well, the latest version of pretty much every browser supports HTML5 Storage… even Internet Explorer! </p>
    
    <style>
    .tab {
      text-align: center; 
      vertical-align: middle;
      border-spacing: 50px 5px;
      margin: auto;
   }
   </style>
    <table class="tab" >
      <caption align="center"><font face="Book Antiqua"><strong style = "font-size: 20px">HTML5 STORAGE SUPPORT</strong></font></caption>
      <tr>
        <td><font face="Book Antiqua"><strong style = "font-size: 20px">IE</strong></font></td>
        <td><font face="Book Antiqua"><strong style = "font-size: 20px">FIREFOX</strong></font></td>
        <td><font face="Book Antiqua"><strong style = "font-size: 20px">SAFARI</strong></font></td>
        <td><font face="Book Antiqua"><strong style = "font-size: 20px">CHROME</strong></font></td>
        <td><font face="Book Antiqua"><strong style = "font-size: 20px">OPERA</strong></font></td>
        <td><font face="Book Antiqua"><strong style = "font-size: 20px">IPHONE</strong></font></td>
        <td><font face="Book Antiqua"><strong style = "font-size: 20px">ANDROID</strong></font></td>
      </tr>
      <tr>
        <td>8.0+</td>
        <td>3.5+</td>
        <td>4.0+</td>
        <td>4.0+</td>
        <td>10.5+</td>
        <td>2.0+</td>
        <td>2.0+</td>
      </tr>
    </table>  

    <p>From your JavaScript code, you’ll access HTML5 Storage through the localStorage object on the global window object. Before you can use it, you should <a href="http://diveinto.html5doctor.com/detect.html#storage"> detect whether the browser supports it</a>. </p>
    
    <style>   
       h3 {
    text-indent: 40px; 
   }
 </style>
   
   <h3><font face="Segoe Script"><strong style= "font-size: 25px" > ↶ check for HTML5 Storage </strong></font></h3>
  <pre>function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}
</pre>
<p>Instead of writing this function yourself, you can use <a href="http://diveinto.html5doctor.com/detect.html#modernizr"> Modernizr</a> to detect support for HTML5 Storage. </p>
<pre>if (Modernizr.localstorage) {
  // window.localStorage is available!
} else {
  // no native support for HTML5 storage :(
  // maybe try dojox.storage or a third-party solution
}
</pre>
 <p align="center"><strong style = "font-size: 30px">❧</strong></p>

 <h1 id="using" align="center"><font face="Bahnschrift"><strong style = "font-size: 50px">Using HTML5 Storage</strong></font></h1> 
 <p>HTML5 Storage is based on named key/value pairs. You store data based on a named key, then you can retrieve that data with the same key. The named key is a string. The data can be any type supported by JavaScript, including strings, Booleans, integers, or floats. However, the data is actually stored as a string. If you are storing and retrieving anything other than strings, you will need to use functions like parseInt() or parseFloat() to coerce your retrieved data into the expected JavaScript datatype. </p>
 <pre>interface Storage {
  getter any getItem(in DOMString key);
  setter creator void setItem(in DOMString key, in any data);
};
</pre>
 <p>Calling setItem() with a named key that already exists will silently overwrite the previous value. Calling getItem() with a  non-existent key will return null rather than throw an exception. </p>
 <p>Like other JavaScript objects, you can treat the localStorage object as an associative array. Instead of using the getItem() and setItem() methods, you can simply use square brackets. For example, this snippet of code: </p>
 <style>
   .back {
    background: #FFFF99;
    border : 1px dotted black ;
       }
 </style>
 <pre>
  var foo = localStorage.<span class="back"> getItem</span>("bar");
// ...
localStorage.<span class="back">setItem</span>("bar", foo);
</pre>
 <p>…could be rewritten to use square bracket syntax instead: </p>
<pre>var foo = localStorage<span class="back">["bar"]</span>;
// ...
localStorage<span class="back">["bar"]</span> = foo;
</pre>
 <p>There are also methods for removing the value for a given named key, and clearing the entire storage area (that is, deleting all the keys and values at once). </p>
 <pre>interface Storage {
  deleter void removeItem(in DOMString key);
  void clear();
};
</pre>
<p>Calling removeItem() with a non-existent key will do nothing. </p>
<p>Finally, there is a property to get the total number of values in the storage area, and to iterate through all of the keys by index (to get the name of each key). </p>
<pre>
  interface Storage {
  readonly attribute unsigned long length;
  getter DOMString key(in unsigned long index);
};
</pre>
<p>If you call key() with an index that is not between 0–(length-1), the function will return null. </p>
<h2 id="track" align="center"><font face="Bahnschrift"><strong style = "font-size: 40px">Tracking Changes to the HTML5 Storage Area</strong></font></h2>
  <p>If you want to keep track programmatically of when the storage area changes, you can trap the storage event. The storage event is fired on the window object whenever setItem(), removeItem(), or clear() is called and actually changes something. For example, if you set an item to its existing value or call clear() when there are no named keys, the storage event will not fire, because nothing actually changed in the storage area. </p>
  <p>The storage event is supported everywhere the localStorage object is supported, which includes Internet Explorer 8. IE 8 does not support the W3C standard addEventListener (although that will finally be added in IE 9). Therefore, to hook the storage event, you’ll need to check which event mechanism the browser supports. (If you’ve done this before with other events, you can skip to the end of this section. Trapping the storage event works the same as every other event you’ve ever trapped. If you prefer to use jQuery or some other JavaScript library to register your event handlers, you can do that with the storage event, too.) </p>
  <pre>if (window.addEventListener) {
  window.addEventListener("storage", handle_storage, false);
} else {
  window.attachEvent("onstorage", handle_storage);
};</pre>
<p>The handle_storage callback function will be called with a StorageEvent object, except in Internet Explorer where the event object is stored in window.event. </p>
<pre>function handle_storage(e) {
  if (!e) { e = window.event; }
}</pre>
<p>At this point, the variable e will be a StorageEvent object, which has the following useful properties. </p>

<style>
  .table {
  border-collapse: collapse;
  border: 1px solid black;
  line-height: 160%;
  }
  .backgroung {
     background-color: lightgrey ;
      }
  .bottom {
    border-bottom: 1px solid black; 
  }
  td {
    font-size: 19px;
  }

</style>
<table class="table">
  <caption align="center"><font face="Book Antiqua"><strong style = "font-size: 30px">StorageEvent Object</strong></font></caption>
    <tr class="bottom">
      <td><font face="Book Antiqua"><strong style = "font-size: 30px">Property</font> </td>
      <td><font face="Book Antiqua"><strong style = "font-size: 30px">Type</font> </td>
      <td><font face="Book Antiqua"><strong style = "font-size: 30px">Description</font> </td>
    </tr>
    <tr class="backgroung">
      <td>key</td>
      <td>string</td>
      <td>the named key that was added, removed, or modified </td>
    </tr>
      <tr>
      <td>oldValue</td>
      <td>any</td>
      <td>the previous value (now overwritten), or null if a new item was added </td>
    </tr>
    <tr class="backgroung">
      <td>newValue</td>
      <td>any</td>
      <td>the new value, or null if an item was removed </td>
    </tr>
    <tr>
      <td>url*</td>
      <td>string</td>
      <td>the page which called a method that triggered this change </td>
    </tr>
    <tr>
      <td colspan="3" style="font-size: 15px">* Note: the url property was originally called uri. Some browsers shipped with that property before the specification changed. For maximum compatibility, you should check whether the url property exists, and if not, check for the uri property instead. 
      </td>
      </tr>
   </table>
   <p>The storage event is not cancelable. From within the handle_storage callback function, there is no way to stop the change from occurring. It’s simply a way for the browser to tell you, “hey, this just happened. There’s nothing you can do about it now; I just wanted to let you know.” </p>
  
   <h2 id="limit" align="center"><font face="Bahnschrift"><strong style = "font-size: 40px">Limitations in Current Browsers</strong></font></h2>
    <p>In talking about the history of local storage hacks using third-party plugins, I made a point of mentioning the limitations of each technique, such as storage limits. I just realized that I haven’t mentioned anything about the limitations of the now-standardized HTML5 Storage. I’ll give you the answers first, then explain them. The answers, in order of importance, are “5 megabytes,” “QUOTA_EXCEEDED_ERR,” and “no.” </p>
    <p>“5 megabytes” is how much storage space each origin gets by default. This is surprisingly consistent across browsers, although it is phrased as no more than a suggestion in the HTML5 Storage specification. One thing to keep in mind is that you’re storing strings, not data in its original format. If you’re storing a lot of integers or floats, the difference in representation can really add up. Each digit in that float is being stored as a character, not in the usual representation of a floating point number. </p>
    <p>“QUOTA_EXCEEDED_ERR” is the exception that will get thrown if you exceed your storage quota of 5 megabytes. “No” is the answer to the next obvious question, “Can I ask the user for more storage space?” At time of writing (February 2011), no browser supports any mechanism for web developers to request more storage space. Some browsers (like Opera) allow the user to control each site’s storage quota, but it is purely a user-initiated action, not something that you as a web developer can build into your web application.</p> 
      <p align="center"><strong style = "font-size: 30px">❧</strong></p>

    <h2 id="htmlst" align="center"><font face="Bahnschrift"><strong style = "font-size: 50px">HTML5 Storage in Action</strong></font></h2> 
    <p>Let’s see HTML5 Storage in action. Recall <a href="http://diveinto.html5doctor.com/canvas.html#halma"> the Halma game we constructed in the canvas chapter</a>. There’s a small problem with the game: if you close the browser window mid-game, you’ll lose your progress. But with HTML5 Storage, we can save the progress locally, within the browser itself. Here is <a href="http://diveinto.html5doctor.com/examples/localstorage-halma.html"> a live demonstration</a>. Make a few moves, then close the browser tab, then re-open it. If your browser supports HTML5 Storage, the demonstration page should magically remember your exact position within the game, including the number of moves you’ve made, the position of each of the pieces on the board, and even whether a particular piece is selected. </p> 
    <p>How does it work? Every time a change occurs within the game, we call this function: </p>
    <pre>function saveGameState() {
    if (!supportsLocalStorage()) { return false; }
    localStorage["halma.game.in.progress"] = gGameInProgress;
    for (var i = 0; i < kNumPieces; i++) {
  localStorage["halma.piece." + i + ".row"] = gPieces[i].row;
  localStorage["halma.piece." + i + ".column"] = gPieces[i].column;
    }
    localStorage["halma.selectedpiece"] = gSelectedPieceIndex;
    localStorage["halma.selectedpiecehasmoved"] = gSelectedPieceHasMoved;
    localStorage["halma.movecount"] = gMoveCount;
    return true;
    } 
</pre>
<p>As you can see, it uses the localStorage object to save whether there is a game in progress (gGameInProgress, a Boolean). If so, it iterates through the pieces (gPieces, a JavaScript Array) and saves the row and column number of each piece. Then it saves some additional game state, including which piece is selected (gSelectedPieceIndex, an integer), whether the piece is in the middle of a potentially long series of hops (gSelectedPieceHasMoved, a Boolean), and the total number of moves made so far (gMoveCount, an integer). </p>
<p>On page load, instead of automatically calling a newGame() function that would reset these variables to hard-coded values, we call a resumeGame() function instead. Using HTML5 Storage, the resumeGame() function checks whether a state about a game-in-progress is stored locally. If so, it restores those values using the localStorage object. </p>
<pre>

  function resumeGame() {
    if (!supportsLocalStorage()) { return false; }
    gGameInProgress = (localStorage["halma.game.in.progress"] == "true");
    if (!gGameInProgress) { return false; }
    gPieces = new Array(kNumPieces);
    for (var i = 0; i < kNumPieces; i++) {
  var row = parseInt(localStorage["halma.piece." + i + ".row"]);
  var column = parseInt(localStorage["halma.piece." + i + ".column"]);
  gPieces[i] = new Cell(row, column);
    }
    gNumPieces = kNumPieces;
    gSelectedPieceIndex = parseInt(localStorage["halma.selectedpiece"]);
    gSelectedPieceHasMoved = localStorage["halma.selectedpiecehasmoved"] == "true";
    gMoveCount = parseInt(localStorage["halma.movecount"]);
    drawBoard();
    return true;
}</pre>
<p>The most important part of this function is the caveat that I mentioned earlier in this chapter, which I’ll repeat here: Data is stored as strings. If you are storing something other than a string, you’ll need to coerce it yourself when you retrieve it. For example, the flag for whether there is a game in progress (gGameInProgress) is a Boolean. In the saveGameState() function, we just stored it and didn’t worry about the datatype: </p>
<pre>localStorage["halma.game.in.progress"] = <span class="back">gGameInProgress</span>;</pre>
<p>But in the resumeGame() function, we need to treat the value we got from the local storage area as a string and manually construct the proper Boolean value ourselves: </p>
<pre>gGameInProgress = (localStorage["halma.game.in.progress"] <span class="back">== "true")</span>;</pre>
<p>Similarly, the number of moves is stored in gMoveCount as an integer. In the saveGameState() function, we just stored it: </p>
<pre>localStorage["halma.movecount"] = <span class="back">gMoveCount</span>;</pre>
<p>But in the resumeGame() function, we need to coerce the value to an integer, using the parseInt() function built into JavaScript:
</p>
<pre>gMoveCount = <span class="back">parseInt</span>(localStorage["halma.movecount"]);</pre>
   <p align="center"><strong style = "font-size: 30px">❧</strong></p>

<h2 id="beyond" align="center"><font face="Bahnschrift"><strong style = "font-size: 50px">Beyond Named Key-Value Pairs: Competing Visions</strong></font></h2> 
<p>While <a href="#history"> the past is littered with hacks and workarounds</a>, the present condition of HTML5 Storage is surprisingly rosy. A new API has been standardized and implemented across all major browsers, platforms, and devices. As a web developer, that’s just not something you see every day, is it? But there is more to life than “5 megabytes of named key/value pairs,” and the future of persistent local storage is… how shall I put it… well, there are competing visions. </p>
<p>One vision is an acronym that you probably know already: SQL. In 2007, Google launched <a href="http://gearsblog.blogspot.com/2011/03/stopping-gears.html">Gears</a>, an open source cross-browser plugin which included an embedded database based on <a href="https://www.sqlite.org/index.html"> SQLite</a>. This early prototype later influenced the creation of the <a href="https://dev.w3.org/html5/webdatabase/"> Web SQL Database</a> specification. Web SQL Database (formerly known as “WebDB”) provides a thin wrapper around a SQL database, allowing you to do things like this from JavaScript: </p>

 <style>   
       h3 {
    text-indent: 40px; 
   }
 </style>
   
<h3><font face="Segoe Script"><strong style= "font-size: 25px" > ↶ actual working code in 4 browsers  </strong></font></h3>
<pre> <span class="back"> openDatabase</span>('documents', '1.0', 'Local document storage', 5*1024*1024, function (db) {
  db.changeVersion('', '1.0', function (t) {
    t.<span class="back">executeSql</span>('CREATE TABLE docids (id, name)');
  }, error);
});</pre>
<p>As you can see, most of the action resides in the string you pass to the executeSql method. This string can be any supported SQL statement, including SELECT, UPDATE, INSERT, and DELETE statements. It’s just like backend database programming, except you’re doing it from JavaScript! Oh joy! </p>
<p>The Web SQL Database specification has been implemented by four browsers and platforms. </p>

    <style>
    .tab {
      text-align: center; 
      vertical-align: middle;
      border-spacing: 50px 5px;
   }
    </style> 
    <table class="tab">
      <caption align="center"><font face="Book Antiqua"><strong style = "font-size: 20px">WEB SQL DATABASE SUPPORT</strong></font></caption>
      <tr>
        <td><font face="Book Antiqua"><strong style = "font-size: 20px">IE</strong></font></td>
        <td><font face="Book Antiqua"><strong style = "font-size: 20px">FIREFOX</strong></font></td>
        <td><font face="Book Antiqua"><strong style = "font-size: 20px">SAFARI</strong></font></td>
        <td><font face="Book Antiqua"><strong style = "font-size: 20px">CHROME</strong></font></td>
        <td><font face="Book Antiqua"><strong style = "font-size: 20px">OPERA</strong></font></td>
        <td><font face="Book Antiqua"><strong style = "font-size: 20px">IPHONE</strong></font></td>
        <td><font face="Book Antiqua"><strong style = "font-size: 20px">ANDROID</strong></font></td>
      </tr>
      <tr>
        <td>.</td>
        <td>.</td>
        <td>4.0+</td>
        <td>4.0+</td>
        <td>10.5+</td>
        <td>3.0+</td>
        <td>2.0+</td>
      </tr>
    </table>  

<p>Of course, if you’ve used more than one database product in your life, you are aware that “SQL” is more of a marketing term than a hard-and-fast standard. (Some would say the same of “HTML5,” but never mind that.) Sure, there is an actual SQL specification (it’s called <a href=""> SQL-92</a>), but there is no database server in the world that conforms to that and only that specification. There’s Oracle’s SQL, Microsoft’s SQL, MySQL’s SQL, PostgreSQL’s SQL, and SQLite’s SQL. Indeed, each of these products adds new SQL features over time, so even saying “SQLite’s SQL” is not sufficient to pin down exactly what you’re talking about. You need to say “the version of SQL that shipped with SQLite version X.Y.Z.” </p>   
<p>All of which brings us to the following disclaimer, currently residing at the top of the Web SQL Database specification: </p> 
<blockquote>This specification has reached an impasse: all interested implementors have used the same SQL backend (Sqlite), but we need multiple independent implementations to proceed along a standardisation path. Until another implementor is interested in implementing this spec, the description of the SQL dialect has been left as simply a reference to Sqlite, which isn't acceptable for a standard. </blockquote>
<p>It is against this backdrop that I will introduce you to another competing vision for advanced, persistent, local storage for web applications: <a href=""> the Indexed Database API</a>, formerly known as “WebSimpleDB,” now affectionately known as “IndexedDB.” </p>
<p>The Indexed Database API exposes what’s called an object store. An object store shares many concepts with a SQL database. There are “databases” with “records,” and each record has a set number of “fields.” Each field has a specific datatype, which is defined when the database is created. You can select a subset of records, then enumerate them with a “cursor.” Changes to the object store are handled within “transactions.” </p>
<p>If you’ve done any SQL database programming, these terms probably sound familiar. The primary difference is that the object store has no structured query language. You don’t construct a statement like "SELECT * from USERS where ACTIVE = 'Y'". Instead, you use methods provided by the object store to open a cursor on the database named “USERS,” enumerate through the records, filter out records for inactive users, and use accessor methods to get the values of each field in the remaining records. <a href=""> An early walk-through of IndexedDB</a> is a good tutorial of how IndexedDB works, giving side-by-side comparisons of IndexedDB and Web SQL Database. </p>
<p>At time of writing, IndexedDB has only been implemented in <a href=""> a beta version of Firefox 4</a>. (By contrast, Mozilla has stated that <a href=""> they will never implement Web SQL Database</a>.) Google has stated that <a href=""> they are considering IndexedDB support</a> for Chromium and Google Chrome. And even Microsoft has said that IndexedDB “<a href=""> is a great solution for the web</a>.” </p>
<p>So what can you, as a web developer, do with IndexedDB? At the moment, virtually nothing beyond some technology demos. A year from now? Maybe something. Check the “Further Reading” section for links to some good tutorials to get you started.</p>
<p align="center"><strong style = "font-size: 30px">❧</strong></p>

<h2 id="further" align="center"><font face="Bahnschrift"><strong style = "font-size: 50px">Further Reading</strong></font></h2> 
<p>HTML5 storage: </p>
<ul>
  <li><a href="">HTML5 Storage</a> specification </li>
  <li><a href="">Introduction to DOM Storage</a> on MSDN </li>
  <li><a href="">Web Storage: easier, more powerful client-side data storage</a> on Opera Developer Community </li>
  <li><a href="">DOM Storage</a> on Mozilla Developer Center. (Note: most of this page is devoted to Firefox’s prototype implementation of a globalStorage object, a non-standard precursor to localStorage. Mozilla added support for the standard localStorage interface in Firefox 3.5.) </li>
  <li><a href="">Unlock local storage for mobile Web applications with HTML5</a>, a tutorial on IBM DeveloperWorks </li>
</ul>  
<p>Early work by Brad Neuberg et. al. (pre-HTML5): </p>
<ul>
  <li><a href="">Internet Explorer Has Native Support for Persistence?!?!</a> (about the userData object in IE) </li>
  <li><a href="">Dojo Storage</a>, part of a larger tutorial about the (now-defunct) Dojo Offline library </li>
  <li><a href="">dojox.storage.manager API reference</a> </li>
  <li><a href="">dojox.storage</a> Subversion repository </li>
</ul>
<p>Web SQL Database: </p>
<ul>
  <li><a href="">Web SQL Database</a> specification </li>
  <li><a href="">Introducing Web SQL Databases</a> </li>
  <li><a href="">Web Database demonstration</a> </li>
  <li><a href="">persistence.js</a>, an “asynchronous JavaScript ORM” built on top of Web SQL Database and Gears </li>
</ul>
<p>IndexedDB: </p>
<ul>
  <li><a href="">Indexed Database API</a> specification </li>
  <li><a href="">Beyond HTML5: Database APIs and the Road to IndexedDB</a></li>
  <li><a href="">Firefox 4: An early walk-through of IndexedDB</a></li>
</ul>

<p align="center"><strong style = "font-size: 30px">❧</strong></p>
<p>This has been “The Past, Present & Future of Local Storage for Web Applications.” The <a href="http://diveinto.html5doctor.com/table-of-contents.html"> full table of contents</a> has more if you’d like to keep reading. </p>

<style>
  .rightimg
  {
    float: right;
  }
  .table {
  border: 1px solid black;,
   }
  .text {color: #FFFFFF;
    background-color: #000000;
    font-size: 19px;
    border-bottom: 1px solid black;
  }
  .txt {
     vertical-align: middle;
     text-align: left;
     padding: 40px;
     padding-left: 60px;
     padding-right: 20px;
     line-height: 1.5;
  }
</style>

<table class="table">
  <tr>
    <td class="text">
    Did You Know? </td>
  </tr>
  <tr class="txt">
    <td class="txt"><img src="http://diveinto.html5doctor.com/i/openclipart.org_johnny_automatic_bag_of_money.png" class="rightimg">
      In association with Google Press, O’Reilly is distributing this book in a variety of formats, including paper, ePub, Mobi, and DRM-free PDF. The paid edition is called “HTML5: Up & Running,” and it is available now. This chapter is included in the paid edition.
      <br>
      <br>
  If you liked this chapter and want to show your appreciation, you can buy “HTML5: Up & Running” with this affiliate link or buy an electronic edition directly from O’Reilly. You’ll get a book, and I’ll get a buck. I do not currently accept direct donations.</td>
  </tr>
</table>

  </body>
</html>
