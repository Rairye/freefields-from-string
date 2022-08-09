# freefields-from-string
Code for extracting field-like text from unformatted strings.

## Sample using get_fields.js

Note: The fields must be specified in order. The text is case-sensitive. 


```javascript

source = "Product: My product Price: 45 Qty: 3"
fields = ["Product:", "Price:", "Qty:"]
values = getFieldIValues(source, fields);

console.log(values);


```
