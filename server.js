import http from 'http';
// var server = http.createServer( function(req, res){
//     if( req.url === '/'){
//         res.writeHead(200, {'content-type' : 'text/html'} )
//         res.write(' <html><body><p>Home Page</p></body></html>')
//         res.end();
//     } else if( req.url === '/student'){ 
//           res.writeHead(200, {'content-type' : 'text/html'} )
//         res.write(' <html><body><p>Student Page</p></body></html>')
//         res.end();
//     }else if( req.url === '/admin'){ 
//           res.writeHead(200, {'content-type' : 'text/html'} )
//         res.write(' <html><body><p>Admin Page</p></body></html>')
//         res.end();
//     }else{
//         res.writeHead(404, {'content-type' : 'text/plain'} )
//         res.write(' page not found')
//         res.end();
//     }
// });

server.listen(5000);

console.log('Server running at http://localhost:5000')