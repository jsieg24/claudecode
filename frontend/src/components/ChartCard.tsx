import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children, action }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {action}
        </Box>
        <Box sx={{ width: '100%', height: 300 }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
