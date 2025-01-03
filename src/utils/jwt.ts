import jwt from 'jsonwebtoken'
import fs from "fs";
import path from "path";


const publicKey = fs.readFileSync(
  path.join(process.cwd(), "/auth.pub.key"),
  "utf8"
);

/// verify JWT
export const verifyJWT = (token: string) => {
	// return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
	return new Promise((resolve, reject) => {
		jwt.verify(token, publicKey, {algorithms: ['RS256']}, (err, decoded) => {
			if (err) {
				console.log(err)
				reject(err);
			} else {
				resolve(decoded);
			}
		});
	});
}

export const verifyToken = (token: string, secret: string) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				reject(err)
			} else {
				resolve(decoded);
			}
		});
	});
}
