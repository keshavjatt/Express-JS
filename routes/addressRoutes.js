const addressController = require("../controller/addressController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/user/address", authMiddleware, addressController.createAddress);
router.delete("/user/address/", authMiddleware, addressController.deleteAddress);


module.exports = router;
