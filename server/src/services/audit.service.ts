import mongoose from 'mongoose';

import AuditLog from '../models/auditLog.model.js';

interface AuditLogEntry {
  action: string;
  userId?: mongoose.Types.ObjectId | null;
  email?: string | null;
  method?: string | null;
  path?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  statusCode?: number | null;
  message?: string | null;
}

export const createAuditLog = async (
  payload: AuditLogEntry | Record<string, unknown>
) => {
  await AuditLog.create(payload);
};
