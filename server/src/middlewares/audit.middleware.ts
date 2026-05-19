import type { Request, Response, NextFunction } from 'express';

import mongoose from 'mongoose';

import { createAuditLog } from '../services/audit.service.js';

interface AuditOptions {
  action: string;
}

const auditMiddleware = (options: AuditOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', async () => {
      try {
        const payload: Record<string, unknown> = {
          action: options.action,

          method: req.method,

          path: req.originalUrl,

          statusCode: res.statusCode,

          message: `${options.action} completed`,
        };

        if (req.user?.userId) {
          payload.userId = new mongoose.Types.ObjectId(req.user.userId);
        }

        if (req.body?.email) {
          payload.email = req.body.email;
        }

        if (req.ip) {
          payload.ip = req.ip;
        }

        if (req.headers['user-agent']) {
          payload.userAgent = req.headers['user-agent'];
        }

        await createAuditLog(payload);
      } catch (error) {
        console.error('Audit log failed:', error);
      }
    });

    next();
  };
};

export default auditMiddleware;
