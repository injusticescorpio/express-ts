import crypto from 'crypto';

export const random=()=>crypto.randomBytes(128).toString('base64');
const SECRET_KEY="injustice-scorpio"

export const authentication=(salt:string,password:string)=>{
    return crypto.createHmac('sha256',[salt,password].join('/')).update(SECRET_KEY).digest('hex')
}