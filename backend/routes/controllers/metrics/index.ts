/**
   * LOGIC :
   */
  const readMetric = async (req, res) => {
    try { 
      res.status(200).render("index.ejs")
    } catch (error) {
      console.log("ERROR MESSAGE :", error.message);
      console.log("ERROR :", error);
      res.status(400).json({ message: error.message });
    }
  };
  module.exports = readMetric;