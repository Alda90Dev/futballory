const { response } = require('express');
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

const getEditionStadiums = async(req, res) => {
    const edition_id = req.params.edition_id;
    const stadiums = await EditionStadium.find({ edition_id: edition_id }).populate('stadium').lean();

    res.json({
        success: true,
        stadiums
    });
}

module.exports = {
    createEditionStadium,
    getEditionStadiums
}
