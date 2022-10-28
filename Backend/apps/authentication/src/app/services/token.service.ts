import { sign, verify } from 'jsonwebtoken';

function signToken(uid, username, email, role) {
  const token = sign(
    {
      id: uid,
      username: username,
      email: email,
      role: role,
    },
    process.env.JWT_SECRET
  );
  return token;
}

function verifyToken(token) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return false;
  }
}

export { signToken, verifyToken };
