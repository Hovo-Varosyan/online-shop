const loginModel = require("../model/model");


class Cart {

    static count = async (req, res, next) => {
        try {

            const userId = req.user.id.trim();
            const cardId = req.body._id.trim();
            const cardCount = parseInt(req.body.count)
            const user = await loginModel.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'not user' });
            }

            const updatedUser = await loginModel.findOneAndUpdate(
                { _id: userId, 'card._id': cardId },
                { $set: { "card.$.count": cardCount } },
                { new: true }
            );
            if (!(updatedUser)) {
                return res.status(500).json({ message: "data false" })
            }

            return res.status(200).json({ message: true });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ err: error.message });
        }
    }

    static add = async (req, res, next) => {
        try {
            const updatedUser = await loginModel.findByIdAndUpdate(
                req.user.id,
                {
                    $push: {
                        card: {
                            ...req.body,
                        },
                    },
                },
                { new: true }
            );
            return res.json({ updatedUser });
        } catch (e) {
            return res.json({ err: e.message });
        }
    };


    static delete = async (req, res, next) => {

        try {
            const userId = req.user.id.trim();
            const cardId = req.query.id.trim();

            const user = await loginModel.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'not user' });
            }
            const updatedUser = await loginModel.findByIdAndUpdate(
                userId,
                { $pull: { card: { _id: cardId } } },
                { new: true }
            );
            if (!(updatedUser)) {
                return res.status(500).json({ message: "data false" })
            }

            return res.status(200).json({ message: true });

        } catch (error) {

            return res.status(500).json({ err: error.message });
        }
    };

}

module.exports=Cart