import express from "express";
import pino from "pino";

const logger = pino();

const app = express();
const PORT = 3005;

app.use(express.static("external"));

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

app.get("/", (req, res) => {
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

app.listen(PORT, () => {
  logger.info(`app is ready on ${PORT}`);
});