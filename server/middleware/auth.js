import jwt from "jsonwebtoken";

//wants to like a post
//click the like button => auth middleware (NEXT) => like controller...

const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1]; //taking the token from the frontend browser & it is present in 1 index after splitting
    const isCustomAuth = token.length < 500; //Checking if it is google auth token or jwt auth token

    let decodedData;

    if (token && isCustomAuth) {
      //if token is jwt token
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData.id;
      //if (decodedData !== null) req.userId = decodedData.id;
    } else {
      //If token is google token
      decodedData = jwt.decode(token);
      req.userId = decodedData.sub;
      //if (decodedData !== null) req.userId = decodedData.sub; //sub is googles name for a specific id that differentiates every single GOOGLE user
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export default auth;
