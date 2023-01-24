import path from 'path';
import express from "express";
import winston from 'winston';
import expressWinston from 'express-winston';
import {fileURLToPath} from 'url';

const PORT = 3005;

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console()
  ],
});

const app = express();
app.use(express.static("external"));
app.use(expressWinston.logger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ],
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
}));

let requestCount = 0;

const items = [
  "Lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipisicing",
  "elit",
  "Architecto",
  "asperiores",
  "beatae",
  "corporis",
  "deserunt",
  "fugit",
  "illo",
  "nemo",
  "sapiente",
  "sed",
  "vel",
  "voluptatem",
];

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.get('/', function(req, res) {
  throw Error();
  res.sendFile(path.join(__dirname, '/index.html'))
});

app.get("/hello", (req, res) => {
  logger.info(`user requested homepage ${requestCount}`);
  res.send(`hello world ${requestCount}`);
  requestCount++;
});

app.get("/items", (req, res) => {
  logger.info("user requested items");
  const sortDirection = req.query.sort;
  res.send(
    JSON.stringify(
      items.sort((a, b) => {
        if (sortDirection === "desc") {
          if (a > b) return 1;
          if (a < b) return -1;
        }

        if (sortDirection === "asc") {
          if (a > b) return -1;
          if (a < b) return 1;
        }

        return 0;
      })
    )
  );
});
app.use(expressWinston.errorLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ],
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
}))
app.listen(PORT, () => {
  logger.info(`app is ready on ${PORT}`);
});


