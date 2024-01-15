import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jwtService } from '../services';


export const ensureAuthenticated: RequestHandler = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: 'Not authenticated.' }
    });
  }

  const [ type, token ] = authorization.split(' ');
  const dataToken = jwtService.verify(token);
  if(type !== 'Bearer' || dataToken === 'INVALID_TOKEN') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: 'Invalid token.' }
    });
  }
  if(dataToken === 'JWT_SECRET_NOT_FOUND'){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: 'Error while verifying token.' }
    });
  }

  req.headers.userId = dataToken.uid.toString();

  return next();
};