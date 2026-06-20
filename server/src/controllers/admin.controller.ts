import type { Request, Response } from 'express';

import { getAdminDashboardStatsService } from '../services/admin.service.js';

export const getAdminDashboard = async (
  _req: Request,
  res: Response
) => {
  const stats = await getAdminDashboardStatsService();

  res.status(200).json({
    success: true,
    data: stats,
  });
};