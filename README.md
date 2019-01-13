## Database Tables

page
```
id INTEGER PRIMARY KEY AUTOINCREMENT,
pageType TEXT NOT NULL,
created INTEGER NOT NULL,
title TEXT NOT NULL
```

tags
```
id INTEGER PRIMARY KEY AUTOINCREMENT,
pageId INTEGER NOT NULL,
content TEXT NOT NULL,
FOREIGN KEY(pageId) REFERENCES page(id)
ON DELETE CASCADE ON UPDATE CASCADE
```

pdf
```
id INTEGER PRIMARY KEY,
highlights TEXT NOT NULL,
content BLOB NOT NULL,
FOREIGN KEY(id) REFERENCES page(id)
ON DELETE CASCADE ON UPDATE CASCADE
```

## Reference

![electron-react-webpack](https://github.com/pastahito/electron-react-webpack)
