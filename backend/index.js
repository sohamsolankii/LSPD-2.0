// Routes
import authRoutes from './src/routes/auth.route.js'
import commentRoutes from './src/routes/comment.route.js'
import tipRoutes from './src/routes/tip.route.js'
import crimeRoutes from './src/routes/crime.route.js'
import announcementRoutes from './src/routes/announcement.route.js'
import reportCrimeRoutes from './src/routes/reportCrime.route.js'
import jobRoutes from './src/routes/job.route.js'
import applicationRoutes from './src/routes/application.route.js'
import chatRoutes from './src/routes/chat.route.js'
import wantedUserRoutes from './src/routes/crime.route.js'
import pressRoutes from './src/routes/press.route.js'

import {appConfig, app} from './config.js'

// * Config of App
appConfig()

app.use('/api/v1/auth', authRoutes)
    .use('/api/v1/comment', commentRoutes)
    .use('/api/v1/tip', tipRoutes)
    .use('/api/v1/crime', crimeRoutes)
    .use('/api/v1/announcement', announcementRoutes)
    .use('/api/v1/reportCrime', reportCrimeRoutes)
    .use('/api/v1/job', jobRoutes)
    .use('/api/v1/application', applicationRoutes)
    .use('/api/v1/chat', chatRoutes)
    .use('/api/v1/wanted', wantedUserRoutes)
	.use('/api/v1/press', pressRoutes)

