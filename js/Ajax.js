// Simple AJAX wrapper used in Freemap and also in EWT
// Licence: LGPL, (c) nickw 2005-12
// You can use this in any EWT or DFTI assignment work as long as you 
// credit it. Detailed comments provided for use in EWT.

// Constructor
// Sets up the internal XMLHttpRequest object.
function Ajax()
{

    this.xmlHTTP = null;

    // This test is necessary as old versions of Internet Explorer have
    // a different implementation of AJAX.
    if(window.XMLHttpRequest)
    {
        // Set up the AJAX variable on Firefox, Chrome, IE9, etc.
        this.xmlHTTP = new XMLHttpRequest();
    }
    else
    {
        // Set up the AJAX variable on old versions of Internet Explorer 
        this.xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
    }
}


// init() method
// Initialises the AJAX by setting the options and opening the connection
// to the server.
Ajax.prototype.init = function(URL,options,addData)
{
    // Setup defaults
    options.errorCallback = options.errorCallback || null;
    options.callback = options.callback || null;
    options.parameters = options.parameters||'';
    options.method = options.method || 'GET';
    options.async = options.async || true;
    this.postData='';

    // If a POST request is used, we send the query string parameters as
    // an argument to the send() method of XMLHttpRequest. If it's GET,
    // we simply append them to the end of the URL.
    if(options.method=='POST')
        this.postData = options.parameters;
    else
        URL += '?' + options.parameters;
    

    // Open a connection using the specified HTTP method
    this.xmlHTTP.open(options.method,URL, options.async);
	this.xmlHTTP.url = URL;

    // Need to specify in the HTTP header that it's a web form if it's a 
    // POST request.
    if(options.method=='POST')
    {
        this.xmlHTTP.setRequestHeader('Content-Type',
                    'application/x-www-form-urlencoded');
    }

    // If we are doing an asynchronous request (i.e. almost always)...
    if(options.async===true)
    {
        // Store the current value of "this" so that it is in scope when the
        // callback runs.
        var self=this;

        // Setup the "onreadystatechange" function which will run when we
        // get something back from the server.
        this.xmlHTTP.onreadystatechange =  function()
        {
            // 4 indicates an HTTP response was received
            if(self.xmlHTTP.readyState==4)
            {
                // If the HTTP code is not 200 and an error callback was
                // provided, cll the error callback. Otherwise, call the
                // ordinary callback.
                if(self.xmlHTTP.status!=200 && options.errorCallback)
                    options.errorCallback(self.xmlHTTP.status);
                else if(options.callback)
                    options.callback(self.xmlHTTP,addData);
            }
        }
    }
}

// sendRequest() calls init() and doSendRequest() consecutively to do the
// whole AJAX request. init() is provided as a separate method as 
// setRequestHeader() can only be called after opening the connection and
// the user might want to add additional lines to the header (e.g. HTTP auth.)
Ajax.prototype.sendRequest = function(URL,options,addData)
{
    this.init(URL,options,addData);
    this.doSendRequest();
}


// Actually send the request
Ajax.prototype.doSendRequest = function()
{
    // Send the data.
    this.xmlHTTP.send(this.postData);
}

