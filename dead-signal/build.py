# Wraps the artifact fragment (game.html) into a standalone page (index.html).
s = open('game.html').read()
i = s.index('</style>') + len('</style>')
open('index.html', 'w').write('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n' + s[:i] + '\n</head>\n<body>\n' + s[i:] + '\n</body>\n</html>\n')
