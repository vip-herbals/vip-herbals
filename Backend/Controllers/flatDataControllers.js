const { flatValidator } = require("../Validation/validation")
const FlatData = require("../Models/flatData")
const flatData = require("../Models/flatData");

const postFlatData = async (req, res) => {
    const { error } = flatValidator(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const flat = new FlatData({
        flat_id: req.body.flat_id,
        apartment: req.body.apartment,
        block: req.body.block,
        type: req.body.type,
        flatNumber: req.body.flatNumber,
        residents: req.body.residents
    });

    try {
        const savedFlatData = await flat.save();
        res.send(savedFlatData);
    } catch (err) {
        res.status(400).send(err);
    }
}

const getAllflats = async (req, res, next) => {
    let { flatNumber, apartment, type } = req.query;

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    let sortByflatNumber = flatNumber === 'asc' ? 1 : flatNumber === 'desc' ? -1 : 0;
    if (type !== undefined && apartment === undefined) {
        const flatDatas = await flatData.countDocuments(
            {
                type: { $regex: type }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(flatDatas / limit);
        try {
            const results = await flatData.find({
                type: { $regex: type }
            })
                .sort({ flatNumber: sortByflatNumber })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else if (type === undefined && apartment !== undefined) {
        const flatDatas = await flatData.countDocuments(
            {
                apartment: { $regex: apartment }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(flatDatas / limit);
        try {
            const results = await flatData.find({
                apartment: { $regex: apartment }
            })
                .sort({ flatNumber: sortByflatNumber })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else if (apartment !== undefined && type !== undefined) {
        const flatDatas = await flatData.countDocuments(
            {
                apartment: { $regex: apartment },
                type: { $regex: type }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(flatDatas / limit);
        try {
            const results = await flatData.find({
                apartment: { $regex: apartment },
                type: { $regex: type }
            })
                .sort({ flatNumber: sortByflatNumber })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else {
        const flatDatas = await flatData.countDocuments({}, (err) => {
            if (err) console.log(err);
        });
        const finalPage = Math.ceil(flatDatas / limit);
        try {
            const results = await flatData.find({}).sort({ flatNumber: sortByflatNumber }).skip((page - 1) * limit).limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    }
};
const flatDataId = (req, res) => {
    console.log(req.query.id);
    FlatData.findById(req.query.id)
        .then((flatData) => res.json(flatData))
        .catch((err) => res.status(400).json('Error' + err));
};

const getflatSearch = async (req, res) => {
    try {
        await FlatData.find({
            block: {
                $regex: req.query.block,
                $options: "i"
            }
        }, function (err, data) {
            res.send(data)
        })
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

const editFlate = async (req, res) => {
    FlatData.findById(req.params.id)
        .then(item => {
            item.flatNumber = req.body.flatNumber
            item.flat_id = req.body.flat_id
            item.apartment = req.body.apartment
            item.type = req.body.type
            item.block = req.body.block
            item.residents = req.body.residents

            item.save()
                .then(() => res.json("Flat Data updated Successfully!"))
                .catch(err => res.status(400).json(`Error : ${err}`))
        })
        .catch(err => res.status(400).json(`ERROR : ${err}`))
}

const deleteFlate = async (req, res) => {
    FlatData.findByIdAndDelete(req.params.id)
        .then(() => res.json("flat Deleted Successfully"))
        .catch((err) => res.status(400).json("Error: " + err));
}


module.exports = { postFlatData, getAllflats, flatDataId, deleteFlate, getflatSearch, editFlate }