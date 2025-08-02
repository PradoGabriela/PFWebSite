# Portfolio Website Deployment Guide

## Prerequisites
- Node.js 18+ installed
- MySQL database access
- Gmail account with App Password for email functionality

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your production values:
   - Database credentials
   - Email configuration (Gmail + App Password)
   - Set NODE_ENV=production
   - Set appropriate PORT

## Installation

```bash
npm install
```

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### With PM2 (Recommended for Production)
```bash
npm install -g pm2
pm2 start ecosystem.config.json --env production
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] Email functionality tested
- [ ] SSL certificate configured (if using HTTPS)
- [ ] Domain DNS pointing to server
- [ ] Firewall configured (allow port 80/443)
- [ ] Process manager (PM2) configured
- [ ] Monitoring/logging set up
- [ ] Backup strategy in place

## Health Check
Visit `/health` endpoint to verify the application is running correctly.

## Troubleshooting

### Database Issues
- Verify database credentials in `.env`
- Check database server accessibility
- Ensure MySQL2 driver compatibility

### Email Issues
- Verify Gmail App Password is correct (no spaces)
- Check if 2FA is enabled on Gmail account
- Test with a simple email first

### Performance
- Monitor memory usage with `/health` endpoint
- Use PM2 for process management
- Consider enabling gzip compression
- Optimize images and static assets
