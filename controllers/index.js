const router = require('express').Router();

// Import API routes, home routes, and dashboard routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');

// Use the defined routes for different parts of the application
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

// Handle 404 errors by sending a response with a 404 status
router.use((req, res) => {
  res.status(404).end();
});

// Export the router
module.exports = router;
