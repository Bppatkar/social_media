import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    email: {
      type: String,
    },
    method: {
      type: String,
    },
    path: {
      type: String,
    },
    ip: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    statusCode: {
      type: Number,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
