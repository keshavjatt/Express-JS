const addressController = require("../controller/addressController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/user/address", authMiddleware, addressController.createAddress);



module.exports = router;
