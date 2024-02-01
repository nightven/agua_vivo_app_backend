const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FRONT_END,
  SECRET_KEY,
  BACK_END,
  DEFAULT_PASSWORD,
} = process.env;

const queryString = require("query-string");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const {
  findUserByEmail,
  updateUserById,
  googleCollection,
} = require("../db/services/googleServices");
const { ctrlWrapper } = require("../helpers");

const googleAuth = async (req, res) => {
  const paramsStr = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `http://localhost:8000/google/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${paramsStr}`
  );
};

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `http://localhost:8000/google/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const email = userData.data.email;

  let user = await findUserByEmail({ email });

  if (!user) {
    user = await googleCollection({
      name: userData.data.name,
      email,
      avatar: userData.data.picture,
      verify: true,
      password: DEFAULT_PASSWORD,
    });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  await updateUserById(user._id, { token });

  // Замість /google посилання на майбутній ендпоінт на фронтенді
  res.redirect(`http://localhost:5173/agua_vivo_app/google?token=${token}`);
};

module.exports = {
  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect),
};
