import {Router} from 'express';

const router = Router();

router.get('/health', (_req, res)=>{
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
})

router.get('/metrics', (_req, res)=>{
  const memoryUsage = process.memoryUsage();
  // Here you would typically gather and return your application's metrics
  res.status(200).json({
    success:true,
    uptime: process.uptime(),
    memory: {
      rss: memoryUsage.rss,
      heapTotal: memoryUsage.heapTotal,
      heapUsed: memoryUsage.heapUsed,
      external: memoryUsage.external
    },
    cpuUsage: process.cpuUsage(),
    platform: process.platform,
    nodeVersion: process.version,
  });
});


export default router;