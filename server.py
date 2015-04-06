import BaseHTTPServer, SimpleHTTPServer
import ssl

httpd = BaseHTTPServer.HTTPServer(('localhost', 4443), SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket (httpd.socket,keyfile='./keyfiles/rootCA.key', certfile='./keyfiles/server.pem', server_side=True)
httpd.serve_forever()