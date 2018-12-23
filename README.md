## TODO

How to store PDFs?

- copy under the application directory and save path
- store encoded base64 string in store/DB

## Reference

![electron-react-webpack](https://github.com/pastahito/electron-react-webpack)


## Document State

```
{
  _id: string,
  pageType: string,
  created: number,
  title: string,
  tags: Array<string>,
  highlights: ?string,  # serialized string of all highlights for id
  _attachment: {
    ?pdf: {
      content_type: 'text/plain',
      data: string     # Blob
    }
  }
}
```
