import express from 'express';
import { DateTime } from 'luxon';
import { validateTimezone } from './validators.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/time', (req, res) => {
  try {
    // Check if request body exists and has timezone
    if (!req.body || !req.body.timezone) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required field: timezone'
      });
    }

    const { timezone } = req.body;

    // Validate timezone
    if (!validateTimezone(timezone)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid timezone identifier'
      });
    }

    // Get current time in requested timezone
    const currentTime = DateTime.now().setZone(timezone);

    // Check if timezone conversion was successful
    if (!currentTime.isValid) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to process timezone conversion'
      });
    }

    return res.json({
      status: 'success',
      requested_timezone: timezone,
      current_time: currentTime.toISO()
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});