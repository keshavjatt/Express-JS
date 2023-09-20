const upload = require("../middleware/uploadMiddleware");
const router = express.Router();
router.post("/user/forgotpassword", authController.forgetPassword);

router.put(
  "/user/verify-reset-password/:resetToken",
  authController.resetPassword
);

router.post(
  "/user/profile-image",
  authMiddleware,
  upload.single("profileImage"),
  authController.profileImage
);

module.exports = router;