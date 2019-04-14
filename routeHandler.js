var ops = require('./operations');


exports.enableRoute=function(url,request,response){ 
    var pathname=url.pathname;
    switch(pathname){
        case '/insert': ops.insertRecord(pathname, request, response);
        break;
        case '/fetch' : ops.fetchRecord(pathname,request,response);
        break;
        case '/delete' : ops.deleteRecord(pathname, request, response);
        break;
        case '/' : ops.redir_home(pathname, request, response);
        break;
        default : ops.redir_home(pathname, request, response);

    }


}
