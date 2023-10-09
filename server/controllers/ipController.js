const axios = require("axios");
const requestIp = require("request-ip");
const Ip = require("../models/ipModel");

const port = process.env.PORT || 3001;
const domain = process.env.DOMAIN;

const ipController = {
  generateUrl: (req, res) => {
    const { originalUrl } = req.body;
    const urlId = Math.random().toString(32).substring(2, 8);
    const generatedUrl = `${domain}:${port}/ip/${urlId}`;

    const ipData = new Ip({
      urlId: urlId,
      originalUrl: originalUrl,
      generatedUrl: generatedUrl,
    });

    ipData
      .save()
      .then(() => {
        const data = {
          urlId: urlId,
          originalUrl: originalUrl,
          generatedUrl: generatedUrl,
        };

        res.json(data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  },

  captureIp: (req, res) => {
    const { urlId } = req.params;

    Ip.findOne({ urlId: urlId })
      .then((ipData) => {
        const { originalUrl } = ipData;
        const ip = requestIp.getClientIp(req);

        axios
          .get(`http://ip-api.com/json/${ip}`)
          .then((response) => {
            const { lat, lon } = response.data;
            const data = {
              urlId: urlId,
              originalUrl: originalUrl,
              ip: ip,
              latitude: lat,
              longitude: lon,
              createdAt: Date.now(),
            };

            console.log(data);

            res.redirect(originalUrl);
          })
          .catch((error) => {
            console.error("Error fetching geolocation data:", error);
            s;
            res.redirect(originalUrl);
          });
      })
      .catch((error) => {
        console.error("Error finding data:", error);
      });
  },
};

module.exports = ipController;
