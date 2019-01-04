## TODO

How to store PDFs?

- copy under the application directory and save path
- store encoded base64 string in store/DB

## Reference

![electron-react-webpack](https://github.com/pastahito/electron-react-webpack)


## Document State

page
```
{
  id: number,
  pageType: string,
  created: number,
  title: string,
}
```

tags
```
{
  id: number,
  pageId: number,  # foreign key to page
  content: string
}
```

pdf
```
{
  id: number,          # foreign key to page
  highlights: ?string, # serialized string of all highlights for id
  content: blob
}
```
