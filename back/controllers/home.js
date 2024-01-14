const productModel = require("../model/product");

class Home {
    static homrout = async (req, res, next) => {
        try {
            if (req.query.category) {
                const { category } = req.query;
                const data = await productModel.find({ category });

                return res.json({
                    data: [...data, { statusProduct: data.length > 0 ? true : false }]

                });

            } else if (req.query.search) {

                const { search } = req.query;
                const product = await productModel.find();
                const data = product.filter((i) => {
                    const name = i.name.toLowerCase();
                    return name.includes(search.toLowerCase());
                });
                return res.json({
                    data: [...data, { statusProduct: data.length > 0 ? true : false }]

                });

            } else {
                const data = await productModel.find();
                return res.json({
                    data: [...data, { statusProduct: data.length > 0 ? true : false }]

                });
            }
        } catch (e) {
            return res.json({ err: e.message });
        }
    };
}
module.exports = Home;
