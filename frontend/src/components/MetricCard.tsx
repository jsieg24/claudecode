import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface MetricCardProps {
  title: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  trend?: number;
  color?: string;
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  trend,
  color = 'primary.main',
  icon,
}) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ color, fontWeight: 'bold' }}>
              {prefix}
              {typeof value === 'number' ? value.toLocaleString() : value}
              {suffix}
            </Typography>
            {trend !== undefined && (
              <Box display="flex" alignItems="center" mt={1}>
                {trend >= 0 ? (
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: 20 }} />
                ) : (
                  <TrendingDownIcon sx={{ color: 'error.main', fontSize: 20 }} />
                )}
                <Typography
                  variant="body2"
                  sx={{
                    color: trend >= 0 ? 'success.main' : 'error.main',
                    ml: 0.5,
                  }}
                >
                  {Math.abs(trend).toFixed(1)}%
                </Typography>
              </Box>
            )}
          </Box>
          {icon && (
            <Box sx={{ color, opacity: 0.3 }}>
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
