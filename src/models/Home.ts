import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  topBar: {
    type: String,
    default: "Contact Us +91 70336 50159",
  },
  carousel: [
    {
      img: { type: String, required: true },
      href: { type: String, default: "" },
    },
  ],
});

export default mongoose.models.Home || mongoose.model("Home", homeSchema);
