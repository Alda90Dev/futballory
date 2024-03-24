const { response } = require('express');
const Edition = require('../models/edition');
const EditionStadium = require('../models/edition_stadium');

const createEditionStadium = async (req, res = response) => {
    try {
        const editionStadium = new EditionStadium(req.body);
        await editionStadium.save();   

        res.json({
            success: true,
            editionStadium
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getStadiumsByEdition = async(req, res) => {
    const edition_id = req.params.edition_id;

    try {
        const edition =  await Edition.findOne({ _id: edition_id }, 'name name_en').lean();
        const allStadiums = await EditionStadium.find({ edition_id: edition_id }).populate('stadium').lean();

        const editions = [edition];
        const stadiums = await setStadiumsJson(editions, allStadiums);

        res.json({
            success: true,
            editions: stadiums
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getStadiums = async(req, res) => {
    try {
        const editions =  await Edition.find({ status: 'ACTIVE' }, 'name name_en').lean();
        const editionsIds = editions.map(edition => edition._id);
        const allStadiums = await EditionStadium.find({ edition_id: { $in: editionsIds } }).populate('stadium').lean();

        const stadiums = await setStadiumsJson(editions, allStadiums);

        res.json({
            success: true,
            editions: stadiums
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

async function setStadiumsJson(editions, allStadiums) {
    const stadiums = [];
    editions.forEach(edit => {
        const stadiumsByEdition = allStadiums.filter(stadium => stadium.edition_id.equals(edit._id));
        const objByEditions = {
            _id: edit._id,
            edition: edit.name,
            edition_en: edit.name_en,
            stadiums: stadiumsByEdition
        };
        stadiums.push(objByEditions);
    }, {});

    return stadiums
} 

module.exports = {
    createEditionStadium,
    getStadiumsByEdition,
    getStadiums
}
