import jwt from 'jsonwebtoken';

export function generateToken(data) {
  const SECRET = process.env.JWT_SECRET ;
  const token=  jwt.sign({data}, SECRET, {
    expiresIn: '7d',
  });
  return token;
}


export function protect(req, res, next) {
  
  const token = req.cookies.token;
  const SECRET = process.env.JWT_SECRET ;
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
}


export function authenticate(req, res, next) {
  
  const token = req.cookies.token;
  const SECRET = process.env.JWT_SECRET ;
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    if(!decoded){
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
    return res.status(200).json({success:true});
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
}