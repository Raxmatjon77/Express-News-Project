const News = require("../models/news");
const Category = require("../models/category");
class NewsController {
  async createNews(req, res, next) {
    let { title, category, body, filename } = req.body;
    console.log(filename);

    if (!title || !category || !body) {
      return res.status(404).json({
        message: "Please enter all fields !",
      });
    }
    let news;

    try {
      news = await News.create({
        title,
        category,
        body,
        image: "/uploads/news-photos/" + filename,
      });
      console.log(category);
      let newsCategory;
      try{
        newsCategory = await Category.findOne( {_id:category} )
      }
      catch(err){

      }
     
      return res.status(200).json({
        message: "Success",
        news:
        { title: news.title,
          body: news.body,
          image: news.image,
          category: newsCategory} });
    } catch (error) {
      console.error(error.message);
    }
  }
}
module.exports = new NewsController();
