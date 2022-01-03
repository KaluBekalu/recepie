const axios = require("../node_modules/axios");

const kk = () => {
  axios
    .post("http://localhost:8000/api/actions/login", {
      headers: {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "mailer@sample.com",
          password: "testpass",
        }),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

kk();
