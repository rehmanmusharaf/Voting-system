const sendToken = async (user, statuscode, res) => {
  try {
    // console.log("Send Token function run!");
    const token = await user.getJwtToken();

    // console.log("token is  : ", token);
    const option = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    // user = Object.keys(user)
    //   .filter((objKey) => objKey !== "password")
    //   .reduce((newObj, key) => {
    //     newObj[key] = user[key];
    //     return newObj;
    //   }, {});
    delete user.password;
    // console.log("after deleting user password user is", user);
    res
      .status(statuscode)
      .cookie("token", token, option)
      .json({ success: true, user, token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error During token genaration",
      error: error.message,
    });
  }
};

module.exports = sendToken;
