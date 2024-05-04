const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const userRoute = require('./routes/userRoute');
const tweetRoute = require('./routes/tweetRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const uploadRoute = require('./routes/uploadRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/api/users', userRoute);
app.use('/api/tweets', tweetRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/upload', uploadRoute);

const rootdir = path.resolve();

// serving the frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(rootdir, '/frontend/dist')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(rootdir, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});

const io = require('./socket').init(server);
io.on('connection', (socket) => {
  console.log('Client Connected');
  socket.on('disconnect', () => {
    console.log('Client has left');
  });
});
