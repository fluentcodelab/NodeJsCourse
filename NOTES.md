ObjectId

_id: 65090f387e844eaae1d1d8ca  
12 bytes  
- 4 bytes: timestamp
- 3 bytes: machine identifier
- 2 bytes: process identifier
- 3 bytes: counter

For complex password enforcement, we can use the package joi-password-complexity

New feature to implement: Returning a rental  
API route will be: POST /api/returns with payload {customerId, movieId}
- returns 401 if client is not logged in
- returns 400 if customerId is not provided
- returns 400 if movieId is not provided
- returns 404 if no rental found for the combination customer/movie
- returns 400 if rental already processed
- returns 200 if valid request
- returns the rental (the operation summary)
- set the return date
- calculate the rental fee
- increase the stock
