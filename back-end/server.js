const express = require("express");
const fetch = require("cross-fetch");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const multer = require("multer");
const app = express();
const PORT = 8000;

app.use(express.static("uploads"));

var corsOptions = {
  origin: ["http://localhost:8080", "http://localhost:3000"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const DIR = "./uploads";

// File Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const HASURA_ENDPOINT = "https://recepie.hasura.app/v1/graphql";
const HASURA_ADMIN_SECRET =
  "qS3ZBKFUupK316SCcrO3Wgkehg9lFvoNRtynkQPesqtG3XODvUBSC5Lm1YDo1Y3u";

const HASURA_GRAPHQL_JWT_SECRET = "Ggx2g7m88A5f0rmlQfVwti4MshCB6IR1";
const JWT_EXPIRE_TIME = "60m";

const makeGraphQLClient =
  ({ url, headers }) =>
    async ({ query, variables }) => {
      const request = await fetch(url, {
        headers,
        method: "POST",
        body: JSON.stringify({ query, variables }),
      });
      return request.json();
    };

const sendQuery = makeGraphQLClient({
  url: HASURA_ENDPOINT,
  headers: {
    "X-Hasura-Admin-Secret": HASURA_ADMIN_SECRET,
  },
});

function generateJWT({ allowedRoles, defaultRole, x_hasura_user_id }) {
  const payload = {
    claims: {
      "x-hasura-allowed-roles": allowedRoles,
      "x-hasura-default-role": defaultRole,
      "x-hasura-user-id": x_hasura_user_id,
    },
  };
  return jwt.sign(payload, HASURA_GRAPHQL_JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: JWT_EXPIRE_TIME,
  });
}

app.post("/api/actions/signup", async (req, res) => {
  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const request = await sendQuery({
    query: `
      mutation insertUser {
        insert_users_one(object: {email: "${email}", password: "${hashedPassword}"}) {
          email
          id
          password
        }
      }`,
  });

  if (request.errors) {
    console.log(request.errors[0].message);
    res.json({ Error: "User already exists!" });
  }

  console.log(request.data.insert_users_one);

  const token = generateJWT({
    defaultRole: "user",
    allowedRoles: ["user"],
    x_hasura_user_id: await request.data.insert_users_one.id,
  });

  res.json({ token });
});

app.post("/api/actions/login", async (req, res) => {
  const request = await sendQuery({
    query: `
    query {
      users(where: {email: {_similar: "${req.body.signin_email}"}}) {
        id
        email
        password
      }
    }
    `,
  });

  const dbUser = request.data.users[0];
  if (!dbUser)
    return res.status(400).json({ error: "Invalid Username or Password" });
  const validPassword = bcrypt.compareSync(
    req.body.signin_password,
    dbUser.password
  );
  if (!validPassword) return res.status(400).json({ error: "Invalid" });
  const token = generateJWT({
    defaultRole: "user",
    allowedRoles: ["user"],
    x_hasura_user_id: dbUser.id,
  });
  usrId = await dbUser.id;
  usrEmail = await dbUser.email;
  return res.json({ token, usrId, usrEmail });
});

app.post("/api/actions/new", async (req, res) => {
  // const reqFiles = [];
  // const url = req.protocol + "://" + req.get("host");
  // for (var i = 0; i < req.files.length; i++) {
  //   reqFiles.push(url + "/public/" + req.files[i].filename);
  // }
  // const request = await sendQuery({
  //   query: `
  //   mutation {
  //     insert_recipes_one(object: {
  //       category: "Cat1",
  //       description: "Test description",
  //       duration: "12",
  //       title: "Test title",
  //       creator: "96ee592d-1e4d-432b-b18f-1534ea8444ed"}) {
  //         id
  //         title
  //         category
  //         description
  //         duration
  //         creator
  //     }
  //   }
  //   `,
  // });

  console.log(req.body);

  // if (request.errors) {
  //   console.log(request.errors[0].message);
  //   res.json({ Error: request.errors[0].message });
  // }

  // console.log(request);

  // res.json(request);
});

app.get("/api/actions/recipes", async (req, res) => {
  const result = await sendQuery({
    query: `
    query {
      recipes {
        id
        duration
        description
        creator
        created_at
        category
        title
        updated_at
      }
    }
    
    
    `,
  });
  // console.log(request)

  const dbData = result.data.recipes;
  if (!dbData) return res.status(400).json({ error: "Nothing Found!" });
  console.log(dbData);

  return res.json({ recipes: dbData });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
